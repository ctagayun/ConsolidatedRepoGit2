using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestLinqCalls
{
    class Program
    {
        static void Main(string[] args)
        {
            RoutingDBEntities _context = new RoutingDBEntities();
            var ninja = _context.Classrooms
               .Select(n => new  { n.Name, n.Teacher, n.Activity }).ToList();

            foreach (var item in ninja)
            {
                Console.WriteLine("item" + item.Name + "  " + item.Activity.Name);
            }
        }
    }
}
