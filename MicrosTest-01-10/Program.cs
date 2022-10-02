
using Microsoft.EntityFrameworkCore;
using MicrosTest_01_10.Context;
using MicrosTest_01_10.Services;

namespace MicrosTest_01_10
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllersWithViews();
            
            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApiDbContext>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("Connection")));

            builder.Services.AddScoped<IAuthService, AuthService>();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}