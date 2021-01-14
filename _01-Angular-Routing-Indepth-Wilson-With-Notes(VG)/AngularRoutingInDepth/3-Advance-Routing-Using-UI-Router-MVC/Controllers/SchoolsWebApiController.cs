using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _3_Advance_Routing_Using_UI_Router_MVC.Controllers
{ 
    public class SchoolsWebApiController : ApiController
    {
        RoutingDBEntities _context = new RoutingDBEntities();

        public SchoolsWebApiController()
        {
            _context.Configuration.LazyLoadingEnabled = false;
        }

        // GET: api/SchoolsWebApi
        public IEnumerable<School> Get()
        {
            return _context.Schools.ToList();
        }

        // GET: api/SchoolsWebApi/5
        public School Get(int id)
        {
            //var query = _context.Classrooms.Where(n => n.Classroom_Id == id);
            //return query.FirstOrDefault();
            return (_context.Schools.Where(n => n.School_Id == id)).FirstOrDefault();
        }

        // POST: api/SchoolsWebApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SchoolsWebApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SchoolsWebApi/5
        public void Delete(int id)
        {
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _context.Dispose();
        }
    }
}
