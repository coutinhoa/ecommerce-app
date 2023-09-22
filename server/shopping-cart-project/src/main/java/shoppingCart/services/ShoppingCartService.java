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
import java.util.Optional;
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

    public ShoppingCartDTO createShoppingCart(Long userId, ShoppingCartDTO cart) {
        List<Product> productsList = new ArrayList();

        var foundShoppingCart = shoppingCartRepository.findByUserId(userId);

        if (foundShoppingCart == null) {
            ShoppingCart newShoppingCart = shoppingCartRepository.save(cart.buildShoppingCart());

            for (ProductDTO product : cart.getProducts()) {
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
            for (ProductDTO product : cart.getProducts()) {
                Product newProduct = product.buildProduct();
                newProduct.setShopping_cart(foundShoppingCart);
                Optional<Product> foundProduct = productRepository.findByName(newProduct.getName());
                if (foundProduct.isPresent()) {
                    foundProduct.get().setQuantity(foundProduct.get().getQuantity() + 1);
                    productRepository.save(foundProduct.get());
                } else {
                    productsList.add(newProduct);
                    productRepository.saveAll(productsList);
                }
            }
        }

        return cart;
    }

    public ShoppingCart getShoppingByUserId(Long userId) {
        return shoppingCartRepository.findByUserId(userId);
    }

    public ShoppingCart purchaseOrder(Long userId) {
        System.out.println("post");
        System.out.println(userId);

        ShoppingCart cart = shoppingCartRepository.findByUserId(userId);

        /*for (ShoppingCart product : cart) {
            product = cart.getProducts();

            for (Product product : cart.getProducts()) {
                int availableQuantityWarehouse = productQuantityService.getProductQuantity(Math.toIntExact(product.getProductId()));
                if (availableQuantityWarehouse < product.getQuantity()) {
                    throw new QuantityNotAvailableException();
                }
            }
        }*/
        System.out.println("cart:" + cart);
        //send kafka to warehouse a reduce the number of articles
        //kafkaTemplate.send("shopping-cart-topic", cart);
        //shoppingCartRepository.deleteByUserId(userId);
        //productRepository.deleteByShoppingCartId(cart.getId());
        return shoppingCartRepository.findByUserId(userId);
    }
}
