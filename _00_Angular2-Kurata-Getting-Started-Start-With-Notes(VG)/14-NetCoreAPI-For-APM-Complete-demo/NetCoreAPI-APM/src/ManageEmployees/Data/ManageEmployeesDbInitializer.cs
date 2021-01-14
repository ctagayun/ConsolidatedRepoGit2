using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManageEmployees.Models.Entities;
using ManageEmployees.Models.Enums;

namespace ManageEmployees.Data
{
    public class ManageEmployeesDbInitializer
    {
        private static ManageEmployeesContext context;

        public static void Initialize(IServiceProvider serviceProvider)
        {
            context = (ManageEmployeesContext) serviceProvider.GetService(typeof (ManageEmployeesContext));
            InitializeDatabase();
        }

        private static void InitializeDatabase()
        {
            if (!context.Products.Any())
            {
                Product prod1 = new Product
                {
                    ProductName = "Leaf Rake",
                    ReleaseDate = Convert.ToDateTime("March 19, 2016"),
                    ProductCode = "GDN-0011",
                    Price = 19.95,
                    Description = "Leaf rake with 48-inch wooden handle.",
                    StarRating = 3.2,
                    ImageUrl = "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                            
                };
               
                Product prod2 = new Product
                {
                    ProductName = "Garden Cart",
                    ReleaseDate = Convert.ToDateTime("March 18, 2016"),
                    ProductCode = "GDN-0023",
                    Price = 32.99,
                    Description = "15 gallon capacity rolling garden cart",
                    StarRating = 4.2,
                    ImageUrl = "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"

                };
                Product prod3  = new Product
                {
                    ProductName = "Hammer",
                    ReleaseDate = Convert.ToDateTime("May 21, 2016"),
                    ProductCode = "TBX-0048",
                    Price = 8.9,
                    Description = "Curved claw steel hammer.",
                    StarRating = 4.8,
                    ImageUrl = "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"

                };
                Product prod4 = new Product
                {
                    ProductName = "Saw",
                    ReleaseDate = Convert.ToDateTime("May 15, 2016"),
                    ProductCode = "TBX-022",
                    Price = 11.55,
                    Description = "Leaf rake with 48-inch wooden handle.",
                    StarRating = 3.7,
                    ImageUrl = "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"

                };

                Product prod5 = new Product
                {
                    ProductName = "Video Game Controller",
                    ReleaseDate = Convert.ToDateTime("October 15, 2015"),
                    ProductCode = "GMG-0042",
                    Price = 35.95,
                    Description = "Standard two-button video game controller.",
                    StarRating = 4.6,
                    ImageUrl = "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"

                };
                context.Products.Add(prod1);
                context.Products.Add(prod2);
                context.Products.Add(prod3);
                context.Products.Add(prod4);
                context.Products.Add(prod5);
                 context.SaveChanges();
            }


            if (!context.Languages.Any())
            {
                Language lang1 = new Language
                {
                    LanguageName = "English",
                    RecordStatus = RecordStatus.Active
                };
                Language lang2 = new Language
                {
                    LanguageName = "Spanish",
                    RecordStatus = RecordStatus.Active
                };
                Language lang3 = new Language
                {
                    LanguageName = "French",
                    RecordStatus = RecordStatus.Active
                };
                Language lang4 = new Language
                {
                    LanguageName = "Other",
                    RecordStatus = RecordStatus.Active
                };
                context.Languages.Add(lang1);
                context.Languages.Add(lang2);
                context.Languages.Add(lang3);
                context.Languages.Add(lang4);
                context.SaveChanges();
            }

            if (!context.Departments.Any())
            {
                Department dpt1 = new Department { Name = "Development", Description= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua. This is supporting text.", RecordStatus = RecordStatus.Active };
                Department dpt2 = new Department { Name = "Marketing", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua. This is supporting text.", RecordStatus = RecordStatus.Active };
                Department dpt3 = new Department { Name = "Consulting", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua. This is supporting text.",RecordStatus = RecordStatus.Active };

                context.Departments.Add(dpt1); //id=1
                context.Departments.Add(dpt2); //id=2
                context.Departments.Add(dpt3); //id=3

                context.SaveChanges();
            }

            if (!context.Employees.Any())
            {
                Employee emp1 = new Employee
                {
                    FirstName = "Adam",
                    LastName = "Abraham",
                    BirthDate = DateTime.Now.Date.AddYears(-24),
                    DepartmentId = 1,
                    JobPosition = JobPosition.Junior,
                    RecordStatus = RecordStatus.Active 
                };
                Employee emp2 = new Employee
                {
                    FirstName = "Alexandra",
                    LastName = "Allan",
                    BirthDate = DateTime.Now.Date.AddYears(-23),
                    DepartmentId = 1,
                    JobPosition = JobPosition.Senior,
                    RecordStatus = RecordStatus.Active
                };
                Employee emp3 = new Employee
                {
                    FirstName = "Bella",
                    LastName = "Chapman",
                    BirthDate = DateTime.Now.Date.AddYears(-20),
                    DepartmentId = 2,
                    JobPosition = JobPosition.Trainee,
                    RecordStatus = RecordStatus.Active
                };
                Employee emp4 = new Employee
                {
                    FirstName = "Frank",
                    LastName = "Clark",
                    BirthDate = DateTime.Now.Date.AddYears(-30),
                    DepartmentId = 3,
                    JobPosition = JobPosition.Senior,
                    RecordStatus = RecordStatus.Active
                };
                context.Employees.Add(emp1);
                context.Employees.Add(emp2);
                context.Employees.Add(emp3);
                context.Employees.Add(emp4);
                context.SaveChanges();
            }

            if (!context.Contracts.Any())
            {
                Contract ct1 = new Contract
                {
                    Name="Contract ct1",
                    Amount = 50000,
                    EmployeeId = 1,
                    StartDate = DateTime.Now.Date,
                    EndDate = DateTime.Now.Date.AddYears(2),
                    RecordStatus = RecordStatus.Active
                };

                Contract ct2 = new Contract
                {
                    Name = "Contract ct2",
                    Amount = 45000,
                    EmployeeId = 1,
                    StartDate = DateTime.Now.Date.AddYears(-3),
                    EndDate = DateTime.Now.Date,
                    RecordStatus = RecordStatus.Active
                };
                Contract ct3 = new Contract
                {
                    Name = "Contract ct3",
                    Amount = 45000,
                    EmployeeId = 1,
                    StartDate = DateTime.Now.Date.AddYears(-3),
                    EndDate = DateTime.Now.Date,
                    RecordStatus = RecordStatus.Active
                };
                Contract ct4 = new Contract
                {
                    Name = "Contract ct4",
                    Amount = 45000,
                    EmployeeId = 2,
                    StartDate = DateTime.Now.Date.AddYears(-3),
                    EndDate = DateTime.Now.Date,
                    RecordStatus = RecordStatus.Active
                };
                Contract ct5 = new Contract
                {
                    Name = "Contract ct5",
                    Amount = 45000,
                    EmployeeId = 3,
                    StartDate = DateTime.Now.Date.AddYears(-3),
                    EndDate = DateTime.Now.Date,
                    RecordStatus = RecordStatus.Active
                };

                context.Contracts.Add(ct1);
                context.Contracts.Add(ct2);
                context.Contracts.Add(ct3);
                context.Contracts.Add(ct4);
                context.Contracts.Add(ct5);

                context.SaveChanges();
            }
        }
    }
}
