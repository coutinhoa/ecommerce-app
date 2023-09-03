package shoppingCart.exceptions;

public class QuantityNotAvailableException extends RuntimeException {
    public QuantityNotAvailableException() {
        String s = "Not enough items available";
    }
}
