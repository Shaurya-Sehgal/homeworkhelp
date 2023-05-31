create database homeworkhelp;

use homeworkhelp;

create table
    user (
        username varchar(255) primary key,
        displayname varchar(255),
        password varchar(255),
        email varchar(255)
    );

create table
    homework (
        id int primary key auto_increment,
        title varchar(255),
        content varchar(255),
        username varchar(255),
        tags varchar(255),
        subject varchar(255),
        date varchar(255),
        foreign key (username) references user(username)
    );

create table
    answer (
        id int primary key auto_increment,
        answer varchar(255),
        date varchar(255),
        answerid varchar(255),
        username varchar(255),
        homework_id int,
        foreign key (username) references user(username),
        foreign key (homework_id) references homework(id)
    );