using ManageEmployees.Data.Abstract;
using ManageEmployees.Data.Base;
using ManageEmployees.Models.Entities;

namespace ManageEmployees.Data.Repositories
{
    public class ProductRepository : EntityBaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ManageEmployeesContext context) : base(context) { }
    }
}