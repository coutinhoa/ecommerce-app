package warehouse.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import warehouse.entities.WarehouseProduct;
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
        try {
            WarehouseProduct[] products = objectMapper.readValue(jsonData, WarehouseProduct[].class);
            productService.reduceAvailableProducts(products);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


/* When a message is received from the Kafka topic, Spring Kafka will use the
configured message converter (typically JSON or Avro) to deserialize the message payload*/
