package warehouse.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import warehouse.dto.WarehouseProductDTO;
import warehouse.services.ProductService;

@Slf4j
@Component
@Transactional
public class KafkaListeners {
    private final ProductService productService;
    private final ObjectMapper objectMapper;

    public KafkaListeners(ProductService service, ObjectMapper objectMapper) {
        this.productService = service;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "shopping-cart-topic", groupId = "foo1")
    void listenerShoppingCart(String jsonData) throws JsonProcessingException {
        log.info("Message received");
        log.info(jsonData);
        WarehouseProductDTO product = objectMapper.readValue(jsonData, WarehouseProductDTO.class);
        System.out.println("Listener received object");
        productService.reduceAvailableProducts(product);
    }
}
