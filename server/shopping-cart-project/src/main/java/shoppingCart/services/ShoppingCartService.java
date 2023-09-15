package shoppingCart.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import shoppingCart.dto.ProductDTO;
import shoppingCart.dto.ShoppingCartDTO;
import shoppingCart.entities.Product;
import shoppingCart.entities.ShoppingCart;
import shoppingCart.repositories.ProductRepository;
import shoppingCart.repositories.ShoppingCartRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoppingCartService {

    @Autowired
    private final ShoppingCartRepository shoppingCartRepository;
    private final KafkaTemplate<String, ShoppingCart> kafkaTemplate;
    private final ProductQuantityService productQuantityService;
    @Autowired
    private ProductRepository productRepository;

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

    public ShoppingCartDTO createShoppingCart(Long userId, ShoppingCartDTO shoppingCart) {
        List<Product> productsList = new ArrayList();

        var foundShoppingCart = shoppingCartRepository.findByUserId(userId);

        if (foundShoppingCart == null) {
            ShoppingCart newShoppingCart = shoppingCartRepository.save(shoppingCart.buildShoppingCart());

            System.out.println("cart does not exist");

            for (ProductDTO product : shoppingCart.getProducts()) {
                Product newProduct = product.buildProduct();
                newProduct.setShopping_cart(newShoppingCart);
                productsList.add(newProduct);
            }
            productRepository.saveAll(productsList);

            ModelMapper modelMapper = new ModelMapper();
            ShoppingCartDTO result = modelMapper.map(newShoppingCart, ShoppingCartDTO.class);
            result.setProducts(productsList.stream()
                    .map(p -> modelMapper.map(p, ProductDTO.class))
                    .collect(Collectors.toList()));

            return modelMapper.map(result, ShoppingCartDTO.class);

        } else {
            System.out.println("cart already exists");

            for (ProductDTO product : shoppingCart.getProducts()) {
                System.out.println("for");
                Product newProduct = product.buildProduct();
                newProduct.setShopping_cart(foundShoppingCart);
                productsList.add(newProduct);
                System.out.println("newProduct");
                productRepository.saveAll(productsList);
                System.out.println("saved");
            }
        }

        return shoppingCart;
    }

    public void deleteItem(Long id) {
        shoppingCartRepository.deleteById(id);
    }

    public ShoppingCart getShoppingByUserId(Long userId) {
        return shoppingCartRepository.findByUserId(userId);
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
