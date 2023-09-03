package warehouse.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import warehouse.dto.WarehouseProductDTO;
import warehouse.entities.WarehouseProduct;
import warehouse.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository repository;

    ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<WarehouseProduct> getAvailableProducts() {
        return repository.findAvailableProducts();
    }

    public void reduceAvailableProducts(WarehouseProductDTO productInShoppingCart) {
        int inventory = repository.findQuantityById(Math.toIntExact(productInShoppingCart.getId()));
        var newQuantity = inventory - productInShoppingCart.getAvailableQuantity();
        //productInShoppingCart.setAvailableQuantity(newQuantity);
        //price needs to be bigdecimal cause it's money
        //repository.save(newQuantity);
    }

    public List<WarehouseProduct> getAll() {
        return repository.findAll();
    }

    public WarehouseProduct getOrder(Long id) {
        System.out.println("find by id");
        return repository.findById(id).get();
    }

    public Optional<WarehouseProduct> getGarment(Long id) {
        System.out.println("find by id");
        return repository.findById(id);
    }

    public Page<WarehouseProduct> getAllProductsPage(int page, int size) {
        Pageable paging = PageRequest.of(page - 1, size);
        return repository.findAll(paging);
    }

    /*public Page<WarehouseProduct> getAll(String name, int page, int size) {
        Pageable paging = PageRequest.of(page - 1, size);
        return repository.findProducts(paging);
    }*/


    public WarehouseProduct createProduct(WarehouseProduct garment) throws Exception {
        if (!repository.findByName(garment.getName()).isEmpty()) {
            throw new Exception("WarehouseProductDTO already exists");
        }
        return repository.save(garment);
    }

    //TODO: trow exception when garment does not exist

    /*public WarehouseProduct updateProduct(Long id, WarehouseProductDTO garment) {
        return repository.findById(id)
                .map(person -> {
                    person.setName(garment.getName());
                    person.setType(garment.getType());
                    person.setPrice(garment.getPrice());
                    person.setColour(garment.getColour());
                    person.setPremiumDelivery(garment.isPremiumDelivery());
                    person.setIdentity(garment.getIdentity());
                    return repository.save(garment);
                })
                .orElseGet(() -> {
                    garment.setId(id);
                    return repository.save(garment);
                });
    }*/

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
