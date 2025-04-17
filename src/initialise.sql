
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

INSERT INTO Lessons (LessonName, LessonData, TopicID) VALUES
("Welcome to LifeJacket!",
    '[
        {"type": "read only", "content": {
            "title": "What is LifeJacket?",
            "text": "LifeJacket is a website where you\'ll learn about keeping your data safe on the internet through questions and games. In our lessons, we compare the internet to the ocean and sea creatures to help you remember and understand what we\'re teaching!"
        }},
        {"type": "read only", "content": {
            "title": "What is LifeJacket... continued",
            "text": "The internet ocean can be full of hidden dangers for a surfer like you! Lots of oceanic predators want to get a hold of your personal data or make a meal of your password... Which is why we want you to learn about how to stay safe: by wearing a LifeJacket."
        }}
    ]',
    1
),
("Introduction to Personal Data",
    '[
        {"type": "read only", "content": {
            "title": "What is Personal Data?",
            "text": "Personal data is any information relating to a person who could be identified. Even if the info on its own can\'t identify a person, putting enough info together could give enough clues to that person\'s identity."
        }},
        {"type": "read only", "content": {
            "title": "In the Ocean..",
            "text": "In the ocean, you and your surfboard are the only things that belong to you, and by looking at them we can learn how tall you are, how new your surfboard is and what colour, etc."
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
    2
),
("Who Wants My Personal Data?",
    '[
        {"type": "read only", "content": {
            "title": "Who Wants My Personal Data?",
            "text": "Your personal data is like food for the"
        }},
        {"type": "read only", "content": {
            "title": "Data Jetski",
            "text": "In this game, you\'ll be going out for a race on your jetski and carrying your personal data. The goal? Bring your data through the internet ocean and avoid the predators. Collect any safety equipment for bonus points! Try and reach the end without having all your data eaten!"
        }},
        {"type": "game", "content": "DataJetski"}
    ]',
    2
),
("SAMPLE",
    '[
        {"type": "read only", "content": {
            "title": "SAMPLE",
            "text": "SAMPLE"
        }}
    ]',
    3
),
("SAMPLE",
    '[
        {"type": "read only", "content": {
            "title": "SAMPLE",
            "text": "SAMPLE"
        }}
    ]',
    4
),
("SAMPLE",
    '[
        {"type": "read only", "content": {
            "title": "SAMPLE",
            "text": "SAMPLE"
        }}
    ]',
    5
);

INSERT INTO Classes (DateStarted, CourseID) VALUES
('2025-01-01', 1);

INSERT INTO Teacher_Classes (TeacherID, ClassID) VALUES (1, 1);

INSERT INTO Student_Classes (StudentID, ClassID) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1); 

INSERT INTO Scores (Score, AttemptDate, LessonID, StudentID) VALUES
(100, '2025-01-01', 2, 1);