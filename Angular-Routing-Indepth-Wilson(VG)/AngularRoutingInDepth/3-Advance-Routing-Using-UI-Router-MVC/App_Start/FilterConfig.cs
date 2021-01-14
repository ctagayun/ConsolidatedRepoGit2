using System.Web;
using System.Web.Mvc;

namespace _3_Advance_Routing_Using_UI_Router_MVC
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
