package shoppingCart.services;

import greet.ProductQuantityGrpc;
import greet.QuantityReply;
import greet.QuantityRequest;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ProductQuantityService {


    private static final Logger logger = LoggerFactory.getLogger(ProductQuantityService.class);

    public int getProductQuantity(int productId) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 5164)
                .usePlaintext()
                .build();

        ProductQuantityGrpc.ProductQuantityBlockingStub stub = ProductQuantityGrpc.newBlockingStub(channel);

        QuantityRequest request = QuantityRequest.newBuilder().setId(productId).build();
        QuantityReply response = stub.getProductQuantity(request);

        var quantity = response.getQuantity();
        logger.info(String.format("getProductQuantity of: %1s is %1s", productId, response.getQuantity()));

        channel.shutdown();
        return quantity;
    }
}
