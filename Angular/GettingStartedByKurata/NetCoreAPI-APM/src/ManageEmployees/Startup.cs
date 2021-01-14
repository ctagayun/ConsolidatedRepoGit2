using ManageEmployees.Data;
using ManageEmployees.Data.Abstract;
using ManageEmployees.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ManageEmployees.Models;

namespace ManageEmployees
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            //we loaded appsettings.json so we can access the stuff in there like connection strings
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            //building our application configuration in a property called Configuration (see below)
            Configuration = builder.Build();
        }
        //configuration property
        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            var connection = @"Server=(localdb)\mssqllocaldb;Database=ManageEmployees;Trusted_Connection=True;";
            services.AddDbContext<ManageEmployeesContext>(options => options.UseSqlServer(connection));

           //services.AddDbContext<TodoContext>(options => options.UseInMemoryDatabase());

            // Repositories
            services.AddScoped<IContractRepository, ContractRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<ILanguageRepository, LanguageRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();

            //Adding Cors Config
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    p => p.AllowAnyOrigin().
                    AllowAnyMethod().
                    AllowAnyHeader().
                    AllowCredentials());
             });

            // Add framework services.
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Formatting = Formatting.Indented;
                });


        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseMvc();
            app.UseCors("AllowAll");

            ManageEmployeesDbInitializer.Initialize(app.ApplicationServices);
        }
    }
}
