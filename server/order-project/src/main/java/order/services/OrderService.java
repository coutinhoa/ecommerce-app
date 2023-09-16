package order.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import order.dto.OrderDTO;
import order.dto.ProductDTO;
import order.entities.Order;
import order.entities.Product;
import order.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    @Autowired
    private ObjectMapper objectMapper; // Jackson's ObjectMapper for deserialization

    @Autowired
    OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public List<Order> getOrderByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }


    public Order getOrder(Long id) {
        System.out.println("find by id");
        return orderRepository.findById(id).get();
    }

    public void deleteOrder(Long userId) {
        System.out.println(("service delete"));
        orderRepository.deleteOrderByUserId(userId);
    }

    public void deleteOrderById(Long orderId) {
        System.out.println(("order deleted"));
        orderRepository.deleteById(orderId);
    }

    public Order createOrderWithProducts(OrderDTO orderRequest) {
        Order order = new Order();
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setCreatedTimestamp(OffsetDateTime.now());
        order.setUserId(orderRequest.getUserId());

        List<Product> products = new ArrayList<>();
        for (ProductDTO productDTO : orderRequest.getProducts()) {
            Product product = new Product();
            product.setQuantity(productDTO.getQuantity());
            product.setName(productDTO.getName());
            product.setType(productDTO.getType());
            product.setColour(productDTO.getColour());
            product.setPremiumDelivery(productDTO.isPremiumDelivery());
            product.setIdentity(productDTO.getIdentity());
            product.setProductId(productDTO.getProductId());
            product.setOrder(order);
            products.add(product);
        }

        order.setProducts(products);

        return orderRepository.save(order);
    }
}
