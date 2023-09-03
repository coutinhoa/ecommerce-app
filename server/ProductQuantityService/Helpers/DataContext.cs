using Microsoft.EntityFrameworkCore;
using ProductQuantityService.Models;

namespace ProductQuantityService.Helpers
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }


        public DbSet<Product> Products { get; set; }
    }
}
