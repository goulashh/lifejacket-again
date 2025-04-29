DROP DATABASE IF EXISTS LifeJacket;
CREATE DATABASE LifeJacket;
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
);

/*------------------------------------------------------------------------*/
/* Students Table */
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT,
    UserID INT,
    PRIMARY KEY (StudentID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

/*------------------------------------------------------------------------*/
/* Teachers Table */
CREATE TABLE Teachers (
    TeacherID INT AUTO_INCREMENT,
    UserID INT,
    PRIMARY KEY (TeacherID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

/*------------------------------------------------------------------------*/
/* Courses Table */
CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT,
    CourseName VARCHAR(13),
    PRIMARY KEY (CourseID)
);

/*------------------------------------------------------------------------*/
/* Topics Table */
CREATE TABLE Topics (
    TopicID INT AUTO_INCREMENT,
    TopicName VARCHAR(50),
    CourseID INT,
    PRIMARY KEY (TopicID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

/*------------------------------------------------------------------------*/
/* Lessons Table */
CREATE TABLE Lessons (
    LessonID INT AUTO_INCREMENT,
    LessonName VARCHAR(50),
    LessonData JSON,
    MaxScore INT,
    TopicID INT,
    PRIMARY KEY (LessonID),
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);

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
    TeacherID INT,
    ClassID INT,
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);

/*------------------------------------------------------------------------*/
CREATE TABLE Student_Classes (
    StudentID INT,
    ClassID INT,
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
/* Create View for PercentageScore */
CREATE VIEW ScorePercentages AS
SELECT 
    s.ScoreID,
    s.Score,
    l.MaxScore,
    (s.Score / l.MaxScore * 100) AS PercentageScore,
    s.AttemptDate,
    s.LessonID,
    s.StudentID
FROM 
    Scores s
JOIN 
    Lessons l ON s.LessonID = l.LessonID;
