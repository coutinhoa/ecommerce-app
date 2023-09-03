CREATE TABLE orders(
    id bigserial primary key,
    user_id bigserial,
    total_price double precision,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO orders (user_id, total_price, created_timestamp) values (5, 0.90, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (7, 1.3, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (4, 4.30, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (1, 1.20, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (4, 2.99, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (5, 4.30, CURRENT_TIMESTAMP);
INSERT INTO orders (user_id, total_price, created_timestamp) values (3, 1.49, CURRENT_TIMESTAMP);




