DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

USE checkout;

CREATE TABLE f1 (
    userid int not null auto_increment primary key,
    _name varchar(255) not null,
    email varchar(255) not null unique,
    _password varchar(255) not null
);

CREATE TABLE f2 (
    shippingid int not null auto_increment primary key,
    line1 varchar(255) not null,
    line2 varchar(255),
    _state varchar(3) not null,
    zipcode varchar(255) not null,
    userid int not null,
    foreign key (userid) references f1(userid)
);

CREATE TABLE f3 (
    billingid int not null auto_increment primary key,
    creditcard varchar(255) not null,
    expirydate varchar(255) not null,
    cvv varchar(255) not null,
    zipcode varchar(255) not null,
    userid int not null,
    foreign key (userid) references f1(userid)
);