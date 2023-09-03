CREATE TABLE products(
    id bigserial primary key,
    quantity int,
    name character VARYING NOT NULL,
    type character VARYING NOT NULL,
    price double precision,
    colour character VARYING NOT NULL,
    premium_delivery boolean,
    identity character VARYING NOT NULL,
    size character VARYING NOT NULL,
    shopping_cart_id bigserial,
    product_id bigserial
);

