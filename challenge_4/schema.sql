DROP DATABASE IF EXISTS connectfour;

CREATE DATABASE connectfour;

USE connectfour;

CREATE TABLE rows (
    rowid int not null auto_increment primary key,
    col1 boolean not null,
    col2 boolean not null,
    col3 boolean not null,
    col4 boolean not null,
    col5 boolean not null,
    col6 boolean not null,
    col7 boolean not null
);

INSERT INTO rows (col1, col2, col3, col4, col5, col6, col7) 
VALUES (false, false, false, false, false, false, false), 
    (false, false, false, false, false, false, false),
    (false, false, false, false, false, false, false),
    (false, false, false, false, false, false, false),
    (false, false, false, false, false, false, false),
    (false, false, false, false, false, false, false);
