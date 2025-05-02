
INSERT INTO Users (UserName, UserPassword, FirstName, LastName, Avatar) VALUES
('DemoStudent', 'demo', 'Demo', 'Lastname', '{"default": true, "data": null}'),
('DemoStudent2', 'demo2', 'Demo2', 'Lastname', '{"default": true, "data": null}'),
('DemoStudent3', 'demo3', 'Demo3', 'Lastname', '{"default": true, "data": null}'),
('DemoStudent4', 'demo4', 'Demo4', 'Lastname', '{"default": true, "data": null}'),
('DemoStudent5', 'demo5', 'Demo5', 'Lastname', '{"default": true, "data": null}'),
('DemoTeacher', 'demot', 'DemoT', 'Lastname', '{"default": true, "data": null}');

INSERT INTO Students (UserID) VALUES
(1), (2), (3), (4), (5); 

INSERT INTO Teachers (UserID) VALUES
(6); 

INSERT INTO Courses (CourseName) VALUES
("Daylight Zone"), ("Twilight Zone"), ("Midnight Zone"); 

INSERT INTO Topics (TopicName, CourseID) VALUES
('Welcome to LifeJacket!', 1),
('Personal Data 1', 1),
('Tracking Methods 1', 1),
('Privacy and Anonymity 1', 1),
('Internet Safety 1', 1); 

INSERT INTO Lessons (LessonName, LessonData, MaxScore, TopicID) VALUES
("Welcome to LifeJacket!",
    '[
        {"type": "read only", "content": {
            "title": "What is LifeJacket?",
            "text": "LifeJacket is a website where you\'ll learn about keeping your data safe on the internet through questions and games. In our lessons, we compare the internet to the ocean and sea creatures to help you remember and understand what we\'re teaching!"
        }},
        {"type": "read only", "content": {
            "title": "The Privacy Paradox",
            "text": "A paradox is when two things don\'t make sense together. The Privacy Paradox is when what you know about staying private online and how you really act aren\'t quite the same."
        }},
        {"type": "multiple choice", "content": {
            "question": "What is LifeJacket for?",
            "answers": [
                {"index": 1, "text": "Blocking trackers"},
                {"index": 2, "text": "Learning about staying safe online"},
                {"index": 3, "text": "Getting rid of all of your data on the internet"},
                {"index": 4, "text": "Making sure your computer floats"}
            ],
            "correctAnswer": 2
        }},
        {"type": "read only", "content": {
            "title": "Let\'s Go!",
            "text": "Now you know what we\'re all about, let\'s get learning!"
        }}
    ]',
    103, 1
),
("Introduction to Personal Data",
    '[
        {"type": "read only", "content": {
            "title": "What is Personal Data?",
            "text": "Personal data is any information relating to a person who could be identified. Even if the info on its own can\'t identify a person, putting enough info together could give enough clues to that person\'s identity."
        }},
        {"type": "read only", "content": {
            "title": "Your personal data",
            "text": "Think of your personal data as a little version of you who lives on the internet."
        }},
        {"type": "multiple choice", "content": {
            "question": "What is Personal Data?",
            "answers": [
                {"index": 1, "text": "Any data about a person"},
                {"index": 2, "text": "Private data that can identify a person"},
                {"index": 3, "text": "Any data that can identify a person"},
                {"index": 4, "text": "Public data about a person"}
            ],
            "correctAnswer": 1
        }}
    ]',
    100, 2
),
("Who Wants My Personal Data?",
    '[
        {"type": "read only", "content": {
            "title": "Why do people want my personal data?",
            "text": "It\'s important to keep your personal data safe, because it can be misused in various ways."
        }}
    ]',
    0, 2
),
("Introduction to Trackers",
    '[
        {"type": "read only", "content": {
            "title": "What is a tracker?",
            "text": "On the internet, a tracker is a piece of code that collects data about a user."
        }}
    ]',
    0, 2
),
("Avoid The Tracker Nets!",
    '[
        {"type": "read only", "content": {
            "title": "Game: Avoid The Tracker Nets!",
            "text": "In this game, your personal data is scattered in the ocean! It\'s up to you to gather it while avoiding the tracker nets. You should recognise the trackers from what you\'ve learned in this topic."
        }},
        {"type": "game", "content": "AvoidTheNetTrackers"}
    ]',
    901, 3
),
("SAMPLE",
    '[
        {"type": "read only", "content": {
            "title": "SAMPLE",
            "text": "SAMPLE"
        }}
    ]',
    0, 3
);


INSERT INTO Classes (DateStarted, CourseID) VALUES
('2025-01-01', 1);

INSERT INTO Teacher_Classes (TeacherID, ClassID) VALUES (1, 1);

INSERT INTO Student_Classes (StudentID, ClassID) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1); 

INSERT INTO Tasks (DateSet, DateDue, LessonID) VALUES ('2025-04-22','2025-04-28', 1);
INSERT INTO Student_Tasks (StudentID, Completed, TaskID) VALUES (1, 0, 1);