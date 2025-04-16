CREATE DATABASE IF NOT EXISTS LifeJacket;
USE LifeJacket;
/*------------------------------------------------------------------------*/
/* Users Table */
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT,
    UserName VARCHAR(30),
    UserPassword VARCHAR(50),
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    Avatar JSON,
    PRIMARY KEY (UserID)
);COMMIT;

INSERT INTO Users (UserName, UserPassword, FirstName, LastName, Avatar) VALUES
('DemoStudent', 'demo', 'Demo', 'Lastname', '{default: true, data: null}'),
('DemoStudent2', 'demo2', 'Demo2', 'Lastname', '{default: true, data: null}'),
('DemoStudent3', 'demo3', 'Demo3', 'Lastname', '{default: true, data: null}'),
('DemoStudent4', 'demo4', 'Demo4', 'Lastname', '{default: true, data: null}'),
('DemoStudent5', 'demo5', 'Demo5', 'Lastname', '{default: true, data: null}'),
('DemoTeacher', 'demot', 'DemoT', 'Lastname', '{default: true, data: null}')
;COMMIT;
/*------------------------------------------------------------------------*/
/* Students Table */
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT,
    UserID INT,
    PRIMARY KEY (StudentID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);COMMIT;

INSERT INTO Students (UserID) VALUES
(1), (2), (3), (4), (5); COMMIT;
/*------------------------------------------------------------------------*/
/* Teachers Table */
CREATE TABLE Teachers (
    TeacherID INT AUTO_INCREMENT,
    UserID INT,
    PRIMARY KEY (TeacherID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);COMMIT;

INSERT INTO Teachers (UserID) VALUES
(6); COMMIT;
/*------------------------------------------------------------------------*/
/* Courses Table */
CREATE TABLE Courses (
	CourseID 	INT AUTO_INCREMENT,
	CourseName	VARCHAR(13),
	PRIMARY KEY (CourseID)
);
INSERT INTO Courses (CourseName) VALUES
("Daylight Zone"), ("Twilight Zone"), ("Midnight Zone"); COMMIT;
/*------------------------------------------------------------------------*/
/* Topics Table */
CREATE TABLE Topics (
	TopicID		INT AUTO_INCREMENT,
	TopicName	VARCHAR(50),
	CourseID	INT,
	PRIMARY KEY (TopicID),
	FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
INSERT INTO Topics (TopicName, CourseID) VALUES
('Personal Data 1', 1),
('Tracking Methods 1', 1),
('Privacy and Anonymity 1', 1),
('Internet Safety 1', 1); COMMIT;
/*------------------------------------------------------------------------*/
/* Lessons Table */
CREATE TABLE Lessons (
	LessonID INT AUTO_INCREMENT,
	LessonName VARCHAR(50),
	LessonData JSON,
	TopicID INT,
	PRIMARY KEY (LessonID),
	FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);
INSERT INTO Lessons (LessonName, LessonData, TopicID) VALUES
(
    "Introduction to Personal Data",
    "lessonParts: [
        {type: 'read only', content: {
            title: 'What is Personal Data?',
            text: 'Personal data is any information relating to a person who could be identified.
            Even if the info on its own can't identify a person, putting enough info togther could
            give enough clues to that person's identity.'
        }},
        {type: 'multiple choice', content: {
            question: 'What is Personal Data?',
            answers: [
                {index: 1, text: 'Any data about a person'},
                {index: 2, text: 'Private data that can identify a person'},
                {index: 3, text: 'Any data that can identify a person'},
                {index: 4, text: 'Public data about a person'}
            ],
            correctAnswer: 1
        }}
    ]"
)
;COMMIT;
/*------------------------------------------------------------------------*/
CREATE TABLE Classes (
	ClassID INT AUTO_INCREMENT,
	DateStarted DATE,
	CourseID INT,
	PRIMARY KEY (ClassID),
	FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Teacher_Classes ( 
        TeacherID       INT,
        ClassID		INT,
        FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
        FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Student_Classes (
	StudentID	INT,
	ClassID		INT,
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
	FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Scores (
	ScoreID INT AUTO_INCREMENT,
	Score INT,
	AttemptDate DATE,
	LessonID INT,
	StudentID INT,
	PRIMARY KEY (ScoreID),
	FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID),
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Tasks (
	TaskID INT AUTO_INCREMENT,
	DateSet DATE,
	DateDue DATE,
	LessonID INT,
	PRIMARY KEY (TaskID),
	FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Student_Tasks (
	StudentID INT,
	Completed BOOLEAN,
	TaskID INT,
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
	FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Groups (
	GroupID INT AUTO_INCREMENT,
	PRIMARY KEY (GroupID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Group_Members (
	GroupID INT,
	StudentID INT,
	FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);
/*------------------------------------------------------------------------*/
CREATE TABLE Group_Tasks (
	GroupID INT,
	Completed BOOLEAN,
	TaskID INT,
	FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
	FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID)
);
/*------------------------------------------------------------------------*/