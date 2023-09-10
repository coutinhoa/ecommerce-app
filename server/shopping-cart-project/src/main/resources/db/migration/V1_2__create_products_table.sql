CREATE TABLE products(
    id bigserial primary key,
    quantity int,
    name VARCHAR,
    type VARCHAR,
    price double precision,
    colour VARCHAR,
    premium_delivery boolean,
    identity VARCHAR,
    size VARCHAR,
    shopping_cart_id bigserial,
    product_id bigserial
);

