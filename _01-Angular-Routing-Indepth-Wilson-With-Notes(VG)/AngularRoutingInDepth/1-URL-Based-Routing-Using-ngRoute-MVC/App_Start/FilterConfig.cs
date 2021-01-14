using System.Web;
using System.Web.Mvc;

namespace _1_URL_Based_Routing_Using_ngRoute_MVC
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
