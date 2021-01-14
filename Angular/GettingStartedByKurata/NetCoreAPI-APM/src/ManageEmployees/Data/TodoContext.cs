using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
 
namespace ManageEmployees.Models
{

    public class TodoContext : DbContext
    {
        public DbSet<LanguagesVM> LanguageVM { get; set; }


        public TodoContext(DbContextOptions options) : base(options)
        {

        }
    }
}
