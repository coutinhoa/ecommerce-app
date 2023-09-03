CREATE TABLE shopping_cart(
    id bigserial primary key,
    user_id bigserial,
    total_price double precision,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shopping_cart (user_id, total_price, created_timestamp) values (5, 90, CURRENT_TIMESTAMP);





