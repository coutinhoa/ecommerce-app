# event-driven-architecture with kafka events and gRPC

An e-commerce microservices application built with Java, PostgreSQL, C# and Docker Compose. Has 4 microservices that
communicate with each other using Kafka events and gRPC. Allows users to have a shopping cart and purchase items from a
warehouse.
The microservices are Shopping Cart, Order, User and Warehouse.

1. When a user makes a purchase, the shopping cart service communicates with the warehouse service, using gRPC, in order
   to understand if there are enough items available and the price of the items to calculate the total. If there aren't enough items in the warehouse the user will get an error.
2. Otherwise the purchase is finalized an order is created through a kafka event.
3. The warehouse is listening to the shopinng cart topic and in case an order is created the available items are going to be updated.
4. When a user is deleted, the orders of that user will also be deleted through a kafka event.

<img width="659" alt="event-driven-architecture" src="https://github.com/coutinhoa/event-driven-architecture/assets/104270514/fe60f56f-334f-4e3d-a7dc-965a3bc11857">

**Usage**

1. In spring boot terminal go to \kafka-project\Order and run the project with the following command: ./gradlew bootRun.
2. Do the same for Order, Warehouse and User Services.
3. Open a terminal in the kafka-project folder and run docker with the follwoing command: docker-compose up --build
4. Endpoints:

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
