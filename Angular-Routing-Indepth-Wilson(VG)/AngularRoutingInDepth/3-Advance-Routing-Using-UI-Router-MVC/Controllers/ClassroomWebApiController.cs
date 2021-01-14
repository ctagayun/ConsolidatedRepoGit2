using _3_Advance_Routing_Using_UI_Router_MVC.Models;
using DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace _3_Advance_Routing_Using_UI_Router_MVC.Controllers
{
    public class ClassroomWebApiController : ApiController
    {
        RoutingDBEntities _context = new RoutingDBEntities();

        public ClassroomWebApiController()
        {
            _context.Configuration.LazyLoadingEnabled = false;
        }


        // GET: api/SchoolsWebApi
        public IEnumerable<ClassroomSchoolVM> GetAllClassrooms()
        {
            var query = _context.Classrooms.Join(_context.Schools,
                                      c=>c.School_Id,
                                      ct=> ct.School_Id,
                                      (c,ct) => new ClassroomSchoolVM
                                      {
                                         Classroom_Id = c.Classroom_Id,
                                         Name = c.Name,
                                         Teacher = c.Teacher,
                                         SchoolName = ct.Name
                                      }).ToList();
            
           //var query =  _context.Classrooms.ToList();
            return query;
        }

        // GET: api/ClassroomWebAPI/5
        //public Classroom GetClassroom(int id)
        public ClassroomSchoolVM GetClassroom(int id)
        {
            //var query = _context.Classrooms.Where(n => n.Classroom_Id == id);
            //return query.FirstOrDefault();
            //return (_context.Classrooms.Where(n => n.Classroom_Id == id)).FirstOrDefault();
            //return _context.Classrooms.FirstOrDefault(n => n.Classroom_Id == id);
            var query = _context.Classrooms.Join(_context.Schools,
                                      c => c.School_Id,
                                      ct => ct.School_Id,
                                      (c, ct) => new ClassroomSchoolVM
                                      {
                                          Classroom_Id = c.Classroom_Id,
                                          Name = c.Name,
                                          Teacher = c.Teacher,
                                          SchoolName = ct.Name,
                                          Principal = ct.Principal
                                      }).Where (c=>c.Classroom_Id == id);

            return query.FirstOrDefault();
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
