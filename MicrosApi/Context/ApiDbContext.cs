using System.Configuration;
using Microsoft.EntityFrameworkCore;
using MicrosApi.Models;
using Type = MicrosApi.Models.Type;

namespace MicrosApi.Context
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql().UseSnakeCaseNamingConvention();

        public DbSet<Type> types { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Transaction> transactions { get; set; }
        public DbSet<User> users { get; set; }
    }
}