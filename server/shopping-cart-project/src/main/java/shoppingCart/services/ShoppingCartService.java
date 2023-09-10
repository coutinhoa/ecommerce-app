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

    public ShoppingCartDTO createShoppingCart(ShoppingCartDTO shoppingCart) {
        // create the shopping cart
        ShoppingCart newShoppingCart = shoppingCartRepository.save(shoppingCart.buildShoppingCart());

//        boolean productExistsInCart = shoppingCart.getProducts().stream()
//                .anyMatch(cartProduct -> cartProduct.getId().equals(productDTO.getId()));
//
//        if (productExistsInCart) {
//            for (ProductDTO cartProduct : shoppingCart.getProducts()) {
//                if (cartProduct.getId().equals(productDTO.getId())) {
//                    cartProduct.setQuantity(cartProduct.getQuantity() + 1);
//                    System.out.println("exists");
//                    break;
//                }
//            }
//        } else {
        // create the relationships between the shopping cart and the products
        List<Product> productsList = new ArrayList();
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
        //}

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
