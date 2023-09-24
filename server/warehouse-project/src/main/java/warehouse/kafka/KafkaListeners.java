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

    @KafkaListener(topics = "update-inventory", groupId = "foo1")
    void listenerShoppingCart(String jsonData) throws JsonProcessingException {
        log.info("Message received");
        log.info(jsonData);
        WarehouseProductDTO[] products = objectMapper.readValue(jsonData, WarehouseProductDTO[].class);
        System.out.println("products:" + products);
        //productService.reduceAvailableProducts(products);
    }
}
