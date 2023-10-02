CREATE TABLE products(
    id bigserial primary key,
    name character VARYING NOT NULL,
    type character VARYING NOT NULL,
    price double precision,
    colour character VARYING NOT NULL,
    premium_delivery boolean,
    available_quantity int,
    category character VARYING NOT NULL,
    sizes varchar [],
    description varchar
);

INSERT INTO products (name, type, price, colour, premium_delivery, available_quantity, category, sizes, description)
  VALUES (
      'Superfit',
      'Sandals',
       20,
      'Black',
      true, 4,
      'Man',
      ARRAY ['XS', 'S', 'L'],
      'Summer black sandals for men'
    ),
    (

      'LEGO WEAR',
      'Hat',
      5,
      'Blue',
      false, 3,
      'Kid',
      ARRAY ['M'],
      'Baby hat to protect from sun'
    ),
    (

      'Jack Wolfshirt',
      'T-shirt',
      10,
      'Green',
      true, 5,
    'Man',
    ARRAY ['XS', 'S', 'L'],
    'Green t-shirt, great for sports'
    ),
    (

    'Only',
      'Pants',
      19.63,
      'Strips',
      false,1,
      'Woman',
      ARRAY ['XS', 'S', 'L'],
      'Woman pants great for work'
    ),
    (

      'Idalia',
      'Handbag',
      53.5,
      'Green',
      true,3,
      'Woman',
      ARRAY ['M', 'S'],
      'Can carry a computer and much more'
    ),
    (

      'Nike',
      'T-shirt',
      13.56,
      'White',
      true,19,
      'Man',
      ARRAY ['S', 'L', 'XL'],
      'T-shirt for men, great for summer'
    ),
    (

      'Esprit',
      'Skirt',
      20,
      'Blue',
      false,6,
      'Woman',
      ARRAY ['XS', 'S', 'L'],
      'Summer skirt'
    ),
    (

      'Only',
      'Jacket',
      20,
      'Camel',
      true,2,
      'Woman',
       ARRAY ['XS', 'S'],
       'Winter jacket for colder days'
    ),
    (

      'Nike',
       '3Pack Socks',
      6.99,
      'White',
      true,6,
       'Man',
       ARRAY ['XS', 'S'],
       'White socks for running'
    ),
    (

      'Hunter',
      'Shorts',
      14.99,
      'Blue',
      true,15,
       'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running shorts'
    ),
    (

      'Adidas',
      'Trainers',
      89.32,
      'Blue',
      false,8,
       'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running shoes'
    ),
    (

      'Bergamot',
      'Shorts',
       21,
       'Black',
       false,6,
      'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running shorts'
    ),
    (

      'Superfit',
       'Sandals',
       20,
      'Pink',
       true,0,
      'Kid',
      ARRAY ['XS', 'S', 'L'],
      'Summer sandals'
    ),
    (

       'Only',
       'T-shirt',
       13.59,
       'Blue',
       true,2,
       'Woman',
      ARRAY ['XS', 'S', 'L'],
      'Perfect t-shirt for summer'
    ),
    (

      'WE Fashion',
      'T-shirt',
      9.8,
       'Orange',
      false,4,
      'Kid',
      ARRAY ['XS', 'S', 'L'],
      'Perfect t-shirt for summer'
    ),
    (
      'Only',
      'Denim Shorts',
       22.13,
       'Denim',
      true,1,
       'Woman',
      ARRAY ['XS', 'S', 'L'],
      'Everyday shorts'
    ),
    (
     'Only',
     'Skirt',
     12,
     'Red',
     true,2,
     'Woman',
     ARRAY ['XS', 'S', 'L'],
     'Summer skirt'
    ),
    (
     'Guess',
     'Handbag',
     52.73,
     'Blue',
     true,3,
      'Woman',
     ARRAY ['XS', 'S', 'L'],
     'Work handbag'
    ),
    (
      'WE Fashion',
      'T-shirt',
      10.5,
      'Pink',
      true,2,
     'Kid',
      ARRAY ['XS', 'S', 'L'],
      'Perfect t-shirt for summer'
    ),
    (
     'Calvin Klein',
      'Trainers',
      81.45,
      'White',
     true,0,
      'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running shoes'
    ),
    (
      'Only',
      'Jacket',
      23,
     'Green',
     false,4,
      'Woman',
     ARRAY ['XS', 'S', 'L'],
     'Winter jacket for cold days'
    ),
    (
      'Adidas',
     'Trainers',
     106,
      'White',
      true,3,
      'Woman',
     ARRAY ['XS', 'S', 'L'],
     'Great running shoes'
    ),
    (
      'Nike',
      'Trainers',
     41.34,
     'Blue',
      true,1,
     'Man',
     ARRAY ['XS', 'S', 'L'],
     'Great running shoes'
    ),
    (
      'Nike',
     'T-shirt',
      25,
     'Black',
      false,18,
     'Man',
     ARRAY ['XS', 'S', 'L'],
     'Running t-shirt'
    ),
    (
      'Nike',
      'Jacket',
      36.99,
      'Green',
      true,6,
      'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running jacket'
    ),
    (
      'Guess',
      'Handbag',
       70.8,
      'Brown',
      false,1,
      'Woman',
       ARRAY ['XS', 'S', 'L'],
       'Work handbag'
    ),
    (
       'Nike',
       'Jacket',
       36.45,
       'Grey',
      true,1,
       'Man',
      ARRAY ['XS', 'S', 'L'],
      'Running jacket'
    ),
    (
    'Nike',
    'T-shirt',
    28.95,
    'White',
     false,7,
     'Man',
    ARRAY ['M', 'XL'],
    'T-shirt perfect for running'
    ),
    (
     'Adidas',
     'Trainers',
     76.45,
     'White',
      true,0,
      'Woman',
     ARRAY ['XS', 'S', 'L'],
     'Running shoes'
    );

