/*package warehouse.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import warehouse.entities.ProductElasticSearch;
import warehouse.entities.WarehouseProduct;
import warehouse.repositories.ElasticSearchProductsRepository;
import warehouse.repositories.ProductRepository;

import java.util.List;

@Service
public class ElasticSearchProductService {

    private final ProductRepository productRepository;
    private final ElasticSearchProductsRepository productESRepository;

    public ElasticSearchProductService(ProductRepository productRepository, ElasticSearchProductsRepository productESRepository) {
        this.productRepository = productRepository;
        this.productESRepository = productESRepository;
    }

    public WarehouseProduct createProduct(WarehouseProduct product) {
        WarehouseProduct savedProduct = productRepository.save(product);

        ProductElasticSearch productES = new ProductElasticSearch();
        productES.setId(savedProduct.getId());
        productES.setName(savedProduct.getName());
        productES.setType(savedProduct.getType());
        productES.setColour(savedProduct.getColour());
        productES.setCategory(savedProduct.getCategory());
        productES.setDescription(savedProduct.getDescription());
        productESRepository.save(productES);

        return savedProduct;
    }

    public WarehouseProduct getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));
    }


    public List<ProductElasticSearch> searchProductsInElasticsearch(String queryName, String queryDescription) {
        return productESRepository.findByNameOrDescription(queryName, queryDescription);
    }

    public WarehouseProduct updateProduct(Long productId, WarehouseProduct updatedProduct) {
        WarehouseProduct existingProduct = getProduct(productId);
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long productId) {
        getProduct(productId);
        productRepository.deleteById(productId);
        productESRepository.deleteById(productId);
    }
}*/
