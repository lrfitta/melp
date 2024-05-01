create database melp;
create user melp_user with encrypted password 'admin';
create schema melp_evaluation;
GRANT ALL ON SCHEMA melp_evaluation TO melp_user;