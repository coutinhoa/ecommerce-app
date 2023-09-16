package order.controllers;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import order.dto.OrderDTO;
import order.entities.Order;
import order.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class OrderController {

    private final OrderService orderService;

    @Autowired
    OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orders = orderService.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getUserOrder(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrderByUserId(userId);
        return ResponseEntity.ok(orders);
    }


    /*@GetMapping("/{id}")
    Order getProduct(@PathVariable Long id) {
        System.out.println("get id");

        return orderService.getOrder(id);
    }*/

    //deletes all orders of user
    /*@DeleteMapping("/{userId}")
    void deleteUserById(@PathVariable Long userId) {
        log.info("delete");
        orderService.deleteOrder(userId);
    }*/

    //deletes one order
    /*@DeleteMapping("/{id}")
    void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }*/

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderRequest) {
        Order createdOrder = orderService.createOrderWithProducts(orderRequest);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

}
