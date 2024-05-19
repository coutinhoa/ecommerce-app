# ecommerce-app using event-driven-architecture with kafka events and gRPC

An e-commerce microservices application built with Java/Spring Boot, PostgreSQL, C#, Docker Compose and Javascript/React. Has 4 microservices that communicate with each other using Kafka events and gRPC. Allows users to have a shopping cart and purchase items from a
warehouse. The microservices are Shopping Cart, Order, User and Warehouse.
This application is a Zalando clone application with product details that allows users to review products,
search clothing and modify the items on their shopping cart and make a purchase.

1. When a user makes a purchase, the shopping cart service communicates with the warehouse service, using gRPC, in order to understand if there are enough items available and the price of the items to calculate the total. If there aren't enough items in the warehouse the user will get an error.
2. Otherwise, the purchase is finalized an order is created through a kafka event.
3. The warehouse is listening to the shopinng cart topic and in case an order is created the available items are going to be updated.
4. When a user is deleted, the orders of that user will also be deleted through a kafka event.

<img width="659" alt="event-driven-architecture" src="https://github.com/coutinhoa/event-driven-architecture/assets/104270514/fe60f56f-334f-4e3d-a7dc-965a3bc11857">




![zalando_home_page](https://user-images.githubusercontent.com/104270514/188320172-c281c498-a306-4f1a-8d90-db91a4701576.jpg)

![zalando_clothes_homepage](https://user-images.githubusercontent.com/104270514/189997218-0d00e6d3-4972-4dfc-9c28-4fd6d6f664e4.jpg)

![zalando_details_page](https://user-images.githubusercontent.com/104270514/188320571-0fd32583-7b43-4970-9ff4-810d2e0d9f01.jpg)

![zalando_details_page_rating](https://user-images.githubusercontent.com/104270514/188320574-32cabc62-d062-4437-b59f-87678509b83a.jpg)

![zalando_login_page](https://user-images.githubusercontent.com/104270514/188320175-3672021c-f62c-4cf2-949e-2b8d78b6a8c7.jpg)

![zalando_shopping_cart](https://user-images.githubusercontent.com/104270514/188320176-308ccbd8-f057-4911-9d32-8490ab1a05eb.jpg)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone this project to your computer with:

```sh
git clone https://github.com/coutinhoa/ecommerce-app.git
```


## Usage

1. Run the web application in the terminal:
```sh
 docker-compose up --build
```

2. Access the application through the browser at http://localhost:3006 with
```sh
npm start 
```

3. Open each BE project individually (Shopping Cart, Order, User, Warehouse and Security) and run the following command on the terminal:
```sh
./gradlew bootRun
```

4. You are able to use the application now!!

5. Some Backend Endpoints:

   POST (makes a purchase and creates an order) -> http://localhost:8081/api/v1/shopping-cart/purchase

   DELETE (deletes a user and the orders of that user) -> http://localhost:8082/api/v1/users/{id}

   GET (gets all orders) -> http://localhost:8083/api/v1/orders

   GET (gets the products of a certain order) -> http://localhost:8083/api/v1/product/order/{orderId}

   GET (it's pageable, give the page(1 or 2) and pageSize(default is 10)) -> http://localhost:8084/api/v1/warehouse

5. gRPC endpoints: grpc://localhost:5164 (on select method use the proto file)
6. Delete a user and check that the orders of that user were deleted.
7. Make a purchase with the following json and verify that a new order and respective products have been created:

`  {"totalPrice": 60.0,
"userId": 3,
"createdTimestamp":"2023-08-25T15:34:07Z",
"products": [
{
"productId": 3,
"quantity": 3
},{
"productId": 7,
"quantity": 7
}
]
}`
