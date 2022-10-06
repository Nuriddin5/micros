using System.Configuration;
using Microsoft.EntityFrameworkCore;
using MicrosApi.Models;

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

        public virtual DbSet<Category> category { get; set; }
        public virtual DbSet<Transaction> transaction { get; set; }
        public virtual DbSet<User> user { get; set; }
    }
}