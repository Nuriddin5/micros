using Microsoft.EntityFrameworkCore;

namespace MicrosTest_01_10.Context
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }
        public virtual DbSet<WeatherForecast> WeatherForecasts { get; set; }
    }

}
