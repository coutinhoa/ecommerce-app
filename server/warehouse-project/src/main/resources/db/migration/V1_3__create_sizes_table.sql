CREATE TABLE sizes(
    id bigserial primary key,
    sizes character VARYING NOT NULL
);


INSERT INTO sizes (sizes) values ('XS');
INSERT INTO sizes (sizes) values ('S');
INSERT INTO sizes (sizes) values ('M');
INSERT INTO sizes (sizes) values ('L');
INSERT INTO sizes (sizes) values ('XL');

