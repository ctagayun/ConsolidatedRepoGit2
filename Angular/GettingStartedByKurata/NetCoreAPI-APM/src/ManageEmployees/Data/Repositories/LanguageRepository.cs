using ManageEmployees.Data.Abstract;
using ManageEmployees.Data.Base;
using ManageEmployees.Models.Entities;

namespace ManageEmployees.Data.Repositories
{
    public class LanguageRepository : EntityBaseRepository<Language>, ILanguageRepository
    {
        public LanguageRepository(ManageEmployeesContext context) : base(context) { }
    }
}
