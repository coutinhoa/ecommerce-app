using Grpc.Core;
using ProductQuantityService.Helpers;

namespace ProductQuantityService.Services
{
    
    public class ProductQuantitySvc : ProductQuantity.ProductQuantityBase
    {
        private readonly DataContext _context;
        public ProductQuantitySvc(DataContext dataContext) {
            _context = dataContext;
        }

        public override Task<QuantityReply> getProductQuantity(QuantityRequest request, ServerCallContext context)
        {
            try {
                var quantity = _context.Products.Where(product => product.Id == request.Id).First().AvailableQuantity;

                return Task.FromResult(new QuantityReply { Quantity = quantity });
            } catch
            {
                return Task.FromResult(new QuantityReply { Quantity = 0 });
            }           
        }
    }
}