using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _1_URL_Based_Routing_Using_ngRoute_MVC.Controllers
{
    public class ClassroomWebApiController : ApiController
    {
        RoutingDBEntities _context = new RoutingDBEntities();

        public ClassroomWebApiController()
        {
            _context.Configuration.LazyLoadingEnabled = false;
        }

        // GET: api/SchoolsWebApi
        public IEnumerable<Classroom> GetAllClassrooms()
        {
            return _context.Classrooms.ToList();
        }

        // GET: api/ClassroomWebAPI/5
        public Classroom GetClassroom(int id)
        {
            //var query = _context.Classrooms.Where(n => n.Classroom_Id == id);
            //return query.FirstOrDefault();
            //return (_context.Classrooms.Where(n => n.Classroom_Id == id)).FirstOrDefault();
            return _context.Classrooms.FirstOrDefault(n => n.Classroom_Id == id);
        }

        // POST: api/ClassroomWebAPI
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ClassroomWebAPI/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ClassroomWebAPI/5
        public void DeleteClassroom(int id)
        {
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _context.Dispose();
        }
    }
}
