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

        public virtual DbSet<Category> categories { get; set; }
        public virtual DbSet<Transaction> transactions { get; set; }
        public virtual DbSet<User> users { get; set; }
    }
}