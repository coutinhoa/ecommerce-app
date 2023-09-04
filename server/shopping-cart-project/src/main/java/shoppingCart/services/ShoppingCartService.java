package shoppingCart.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import shoppingCart.dto.ProductDTO;
import shoppingCart.dto.ShoppingCartDTO;
import shoppingCart.entities.Product;
import shoppingCart.entities.ShoppingCart;
import shoppingCart.repositories.ShoppingCartRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final KafkaTemplate<String, ShoppingCart> kafkaTemplate;
    private final ProductQuantityService productQuantityService;

    @Autowired
    ShoppingCartService(KafkaTemplate<String, ShoppingCart> kafkaTemplate,
                        ShoppingCartRepository shoppingCartRepository,
                        ProductQuantityService productQuantityService) {
        this.kafkaTemplate = kafkaTemplate;
        this.shoppingCartRepository = shoppingCartRepository;
        this.productQuantityService = productQuantityService;
    }

    public List<ShoppingCart> getAll() {
        return shoppingCartRepository.findAll();
    }

    public ShoppingCart addProducts(ShoppingCartDTO orderRequest) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUserId(1L);

        List<Product> products = new ArrayList<>();
        for (ProductDTO productDTO : orderRequest.getProducts()) {
            Product product = new Product();
            product.setQuantity(1);
            product.setName(productDTO.getName());
            product.setType(productDTO.getType());
            product.setProductId(productDTO.getProductId());
            product.setShopping_cart(shoppingCart);
            products.add(product);
        }
        shoppingCart.setProducts(products);

        return shoppingCartRepository.save(shoppingCart);
    }

    public void deleteItem(Long id) {
        shoppingCartRepository.deleteById(id);
    }

    public void purchaseOrder() {

        /*List<ShoppingCart> cart = shoppingCartRepository.findAll();

        for(ShoppingCart product : cart){
            product = cart.getProducts();
            for (Product product : cart.getProducts()) {
                int availableQuantityWarehouse = productQuantityService.getProductQuantity(Math.toIntExact(product.getProductId()));
                if (availableQuantityWarehouse < product.getQuantity()) {
                    throw new QuantityNotAvailableException();
                }
            }
        }
        kafkaTemplate.send("shopping-cart-topic", (ShoppingCart) cart);
        shoppingCartRepository.deleteAll();*/

    }
}
