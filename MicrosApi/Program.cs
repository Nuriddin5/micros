using MicrosApi.Authentication;
using MicrosApi.Context;
using MicrosApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();
            builder.Services.AddScoped<ITransactionService, TransactionService>();

            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApiDbContext>(opt =>
                opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
            
            

            builder.Services
                .AddAuthentication("BasicAuthHandler")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthHandler>("BasicAuthHandler", _ => { });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Policy1", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("Policy1");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}