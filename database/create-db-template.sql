create database homeworkhelp;

use homeworkhelp;

create table
    user (
        username varchar(255) primary key,
        displayname varchar(255),
        password varchar(255),
    );

insert into
    user (
        username,
        displayname,
        password
    )
values ('user1', 'User 1', 'password1');

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

insert into
    homework (
        title,
        content,
        username,
        tags,
        subject,
        date
    )
values (
        'Homework 1',
        'This is the first homework',
        'user1',
        'math',
        'math',
        '2020-01-01'
    );

insert into
    homework (
        title,
        content,
        username,
        tags,
        subject,
        date
    )
values (
        'Homework 2',
        'This is the second homework',
        'user2',
        'math',
        'math',
        '2020-01-02'
    );

insert into
    homework (
        title,
        content,
        username,
        tags,
        subject,
        date
    )
values (
        'Homework 3',
        'This is the third homework',
        'user3',
        'math',
        'math',
        '2020-01-03'
    );