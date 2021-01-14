using System;
using System.Linq;
using ManageEmployees.Models.Entities;
using ManageEmployees.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ManageEmployees.Data
{
    //to use the ManageEmployeesContext you can inject it to the controllers.
    //but since we already have an abstraction that we inject in the controller and
    //that allows the controller to query the target database in this case ManageEmployee db
    //we can inject it in EntityBaseRepository.cs class like this:
    //
    // private readonly ManageEmployeesContext _context;
    //public EntityBaseRepository(ManageEmployeesContext context)
    //{
    //    _context = context;
    //}
    //
    // The EntityBaseRepository is inherited by all repositories like ContractRepository
    //thereby making the ManageEmployeesContext avalable in each repository
    public class ManageEmployeesContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Language> Languages { get; set; }

        public DbSet<Product> Products { get; set; }

        //base(options) means pass options to the constructor of my base class which dbContext
        public ManageEmployeesContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Employee>().Property(s => s.DepartmentId).IsRequired();
            modelBuilder.Entity<Employee>().Property(s => s.BirthDate).HasDefaultValue(DateTime.Now);
            modelBuilder.Entity<Employee>().Property(s => s.FirstName);
            modelBuilder.Entity<Employee>().Property(s => s.LastName).IsRequired();
            modelBuilder.Entity<Employee>().Property(s => s.JobPosition).HasDefaultValue(JobPosition.Junior);
            modelBuilder.Entity<Employee>().HasOne(s => s.Department).WithMany(s => s.Employees).HasForeignKey(d=>d.DepartmentId);

            modelBuilder.Entity<Department>().ToTable("Department");
            modelBuilder.Entity<Department>().Property(s => s.Name).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<Department>().Property(s => s.Description).IsRequired();
            modelBuilder.Entity<Department>().HasMany(s => s.Employees);

            modelBuilder.Entity<Contract>().ToTable("Contract");
            modelBuilder.Entity<Contract>().Property(s => s.Amount);
            modelBuilder.Entity<Contract>().Property(s => s.EmployeeId).IsRequired();
            modelBuilder.Entity<Contract>().Property(s => s.StartDate).HasDefaultValue(DateTime.Now).IsRequired();
            modelBuilder.Entity<Contract>().Property(s => s.EndDate).HasDefaultValue(DateTime.Now).IsRequired();
            modelBuilder.Entity<Contract>().HasOne(s => s.Employee);

            modelBuilder.Entity<Language>().ToTable("Language");
            modelBuilder.Entity<Language>().Property(s => s.LanguageName).IsRequired().HasMaxLength(50);

            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Product>().Property(s => s.ProductName).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Product>().Property(s => s.ProductCode).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Product>().Property(s => s.ReleaseDate).HasDefaultValue(DateTime.Now);
        }
    }
}
