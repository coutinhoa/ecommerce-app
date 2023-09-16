CREATE TABLE users(
    id bigserial primary key,
    name character VARYING NOT NULL,
    password character VARYING NOT NULL,
    phone character VARYING NOT NULL,
    email character VARYING NOT NULL
);

INSERT INTO users (name, password, phone, email) values ('Admin', 'admin', '123456789', 'admin@email.com');
INSERT INTO users (name, password, phone, email) values ('Aaa', 'password1', '111111', 'a@email.com');
INSERT INTO users (name, password, phone, email) values ('Bbb', 'password2', '222222', 'b@email.com');
INSERT INTO users (name, password, phone, email) values ('Ccc', 'password3', '333333', 'c@email.com');
INSERT INTO users (name, password, phone, email) values ('Ddd', 'password4', '444444', 'd@email.com');
INSERT INTO users (name, password, phone, email) values ('Eee', 'password5', '555555', 'e@email.com');
INSERT INTO users (name, password, phone, email) values ('Fff', 'password6', '666666', 'f@email.com');
INSERT INTO users (name, password, phone, email) values ('Ggg', 'password7', '777777', 'g@email.com');



