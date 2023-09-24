package shoppingCart.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import shoppingCart.dto.ProductDTO;
import shoppingCart.dto.ShoppingCartDTO;
import shoppingCart.entities.Product;
import shoppingCart.entities.ShoppingCart;
import shoppingCart.exceptions.QuantityNotAvailableException;
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
                int availableQuantityWarehouse = productQuantityService.getProductQuantity(Math.toIntExact(product.getId()));

                if (availableQuantityWarehouse < newProduct.getQuantity()) {
                    throw new QuantityNotAvailableException();
                }
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
        System.out.println(userId);

        ShoppingCart cart = shoppingCartRepository.findByUserId(userId);

        ModelMapper modelMapper = new ModelMapper();
        ShoppingCartDTO cartDTO = modelMapper.map(cart, ShoppingCartDTO.class);
        List<ProductDTO> products = cartDTO.getProducts();
        System.out.println("for cycle:" + products);
        for (ProductDTO product : products) {
            int availableQuantityWarehouse = productQuantityService.getProductQuantity(Math.toIntExact(product.getId()));
            System.out.println(availableQuantityWarehouse);
            System.out.println(product.getQuantity());
            if (availableQuantityWarehouse < product.getQuantity()) {
                System.out.println("not enough");
                throw new QuantityNotAvailableException();
            } else {
                System.out.println("purchased");
                kafkaTemplate.send("shopping-cart-topic", cart);
                //kafkaTemplate.send("update-inventory", cart.getProducts());
                shoppingCartRepository.deleteByUserId(userId);
            }
        }
        //productRepository.deleteByShoppingCartId(cart.getId());
        return shoppingCartRepository.findByUserId(userId);
    }
}
