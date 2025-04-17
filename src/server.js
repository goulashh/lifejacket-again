// INITIAL SETUP

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Do as I say!',
    database: 'LifeJacket'
});
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// FUNCTIONALITY

// LOGIN RELATED
app.post('/api/login', (req, res) => {
    const sql = `
    SELECT u.UserID, s.StudentID, t.TeacherID
    FROM Users u
    LEFT JOIN Students s ON u.UserID = s.UserID
    LEFT JOIN Teachers t ON u.UserID = t.UserID
    WHERE u.Username = ? AND u.UserID = ?
    `;
    const reqData = [req.body.username, req.body.password];
    db.query(sql, reqData, (err, results) => {
        if (err) {return res.status(500).json({ error: err.message });}
        // Is the login right?
        if (results.length > 0) {
            res.send({ 
                success: true, 
                userID: results[0].UserID, 
                studentID: results[0].StudentID, 
                teacherID: results[0].TeacherID, 
                timestamp: new Date().toISOString() });
        }
        else {
            res.send({
                success: false
            });
        }
    });
});


// DASH RELATED
app.get('/api/topicsummary/:studentid', (req, res) => {
    const studentID = parseInt(req.params.studentid);

    // 1. Get topic names
    const topicsForStudent = `
    SELECT t.* FROM Topics t 
    JOIN Courses c ON t.CourseID = c.CourseID
    JOIN Classes cl ON c.CourseID = cl.CourseID
    JOIN Student_Classes sc ON cl.ClassID = sc.ClassID
    JOIN Students s ON sc.StudentID = s.StudentID
    WHERE s.StudentID = ?;`;

    const values = [studentID];
    db.query(topicsForStudent, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        topicNames = results.map(result => result.TopicName); // topic names got!
        topicIDs = results.map(result => result.TopicID);
        courseIDs = results.map(result => result.CourseID); // Different colour buttons will show this?

    // 2. Get amount of lessons for each topic (using TopicID)
        const placeholders = topicIDs.map(() => '?').join(', ');
        const lessonsInTopics = `
        SELECT TopicID, COUNT(LessonID) AS totalLessons
        FROM Lessons
        WHERE TopicID IN (${placeholders})
        GROUP BY TopicID;`;
        db.query(lessonsInTopics, topicIDs, (err2, results2) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }
            totalLessons = results2.map(result => result.totalLessons)

    // 3. Get scores (or not) for each lesson
    console.log("3");
            const scoresOfStudent = `
            SELECT L.TopicID, MaxScores.LessonID, MaxScores.MaxScore
            FROM (
                SELECT LessonID, StudentID, MAX(Score) AS MaxScore
                FROM Scores
                WHERE StudentID = ?
                GROUP BY LessonID, StudentID
            ) AS MaxScores
            JOIN Lessons L ON MaxScores.LessonID = L.LessonID;`;
            db.query(scoresOfStudent, values, (err3, results3) => {
                if (err3) { 
                    return res.status(500).json({ error: err3.message });
                }
                // results split by TopicID
                console.log(results3);
                const resultsByTopic = {};

                results3.forEach(result => {
                    const topicId = result.TopicID;
                    if (!resultsByTopic[topicId]) {
                        resultsByTopic[topicId] = [];
                    }
                    resultsByTopic[topicId].push(
                        result.MaxScore
                    );
                });

    // 4. Format this data for the homepage.
    console.log("RBT " + resultsByTopic[1]);
                const items = [];
                for (let i = 0; i < topicIDs.length; i++) {
                    const scores = {poor: 0, okay: 0, good: 0, notDone: 0};
                    const topicLessonLength = (resultsByTopic[(i + 1).toString()] || []).length;
                    for (let lesson = 0; lesson < topicLessonLength; lesson++) {
                        if (resultsByTopic[(i+1).toString()][lesson] >= 67) {scores.good++;}
                        else if (resultsByTopic[(i+1).toString()][lesson] >= 34) {scores.okay++;}
                        else {scores.poor++;}
                    }
                    scores.notDone = totalLessons[i] - (scores.poor + scores.okay + scores.good);
                    items.push({
                        courseID:   courseIDs[i],
                        topicID:    topicIDs[i],
                        topicName:  topicNames[i],
                        scores:     scores
                    });
                };
                console.log("DONE");
                return res.json(items);
            });
        }); 
    });
});
app.get('/api/leaderboard/:whatOf/:relevantID', (req, res) => {
    whatOfQuery = '';
    data = null;
    switch(req.params.whatOf) {
        case 'global':
            whatOfQuery = `
            SELECT u.Username, SUM(sc.Score) AS totalScore
            FROM Scores sc
            JOIN Students s ON sc.StudentID = s.StudentID
            JOIN Users u ON s.UserID = u.UserID
            GROUP BY s.StudentID
            ORDER BY totalScore DESC
            LIMIT 10;`;
            break;
        case 'topic':
            whatOfQuery = `
            SELECT u.Username, SUM(sc.Score) AS totalScore
            FROM Scores sc
            JOIN Students s ON sc.StudentID = s.StudentID
            JOIN Users u ON s.UserID = u.UserID

            JOIN Lessons l ON sc.LessonID = l.LessonID
            JOIN Topics t ON l.TopicID = t.TopicID
            WHERE t.TopicID = ?

            GROUP BY s.StudentID
            ORDER BY totalScore DESC
            LIMIT 10;`;
            data = [req.params.relevantID];
            break;
    }
    db.query(whatOfQuery, data,
        (err, results) => {
            if (err) { 
                return res.status(500).json({ error: err.message });
            }
            return res.json(results);
        });
});

// TOPIC RELATED
app.get('/api/viewtopic/:topicID/s/:studentID', (req, res) => {
    // Based on the course and topic, lesson details will be fetched.
    db.query(`
        SELECT l.LessonID, l.LessonName, s.Score
        FROM Lessons l
        JOIN Topics t ON t.TopicID = l.TopicID
        LEFT JOIN Scores s ON s.LessonID = l.LessonID AND s.StudentID = ?
        WHERE t.TopicID = ?
        GROUP BY l.LessonID
        ;`,
        [parseInt(req.params.studentID), parseInt(req.params.topicID)],
        (err, results) => {
            if (err) { 
                return res.status(500).json({ error: err.message });
            }
            return res.json(results);
        });
});

// NAVBAR RELATED
app.get('/api/getTaskCount/:studentID', (req, res) => {
    // SQL returns {overdue, due} based on Tasks due and done dates.
    const sql = ``;
    // placeholder data
    return res.json([
        {name: "overdue", count: 1},
        {name: "due", count: 2}
    ]);
});

// LESSON RELATED
app.get('/api/getLessonParts/:lessonID', (req, res) => {
    // placeholder
    return res.json(
    [
        {type: "read only", content: {
            title: "What is Personal Data?",
            text: "Personal data is any information relating to a person who could be identified. Even if the info on its own can't identify a person, putting enough info togther could give enough clues to that person's identity."
        }},
        {type: "multiple choice", content: {
            question: "What is Personal Data?",
            answers: [
                {index: 1, text: "Any data about a person"},
                {index: 2, text: "Private data that can identify a person"},
                {index: 3, text: "Any data that can identify a person"},
                {index: 4, text: "Public data about a person"}
            ],
            correctAnswer: 1
        }},
        {type: "game", content: "DataJetski"}
    ]
    );
    const sql = `SELECT LessonParts FROM Lessons WHERE LessonID = ?;`;
    db.query(sql, [parseInt(req.params.lessonID)], (err, results) => {
        if (err) { 
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
});

app.post('/api/submit', (req, res) => {
    const sql = `
    INSERT INTO Scores (Score, AttemptDate, LessonID, StudentID)
    VALUES (?,?,?,?)
    `;
    const reqData = [req.body.score, new Date().toISOString().split('T')[0], req.body.lessonID, req.body.studentID];
    db.query(sql, reqData, (err, results) => {
        if (err) {return res.status(500).json({ error: err.message });}
        db.commit(err => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({ error: err.message });
                });
            }
            return res.json({ success: true });
        });
    });
});

// LISTENING / RUNNING
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});