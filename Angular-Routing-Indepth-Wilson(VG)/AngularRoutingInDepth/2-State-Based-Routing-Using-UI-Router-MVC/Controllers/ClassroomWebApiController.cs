using _2_State_Based_Routing_Using_UI_Router_MVC.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _2_State_Based_Routing_Using_UI_Router_MVC.Controllers
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

        //public  ClassroomSchoolVM GetClassroom(int id)
        //{
        //    var query = _context.Classrooms
        //        .Select(n => new { n.Name, n.Teacher, n.Activity }).ToList();

        //    //ClassroomSchoolVM query = ( 
        //    //    from c in _context.Classrooms
        //    //    join ct in _context.Schools on c.School_Id equals ct.School_Id
        //    //    join act in _context.Activities on c.Classroom_Id equals act.Classroom_Id
        //    //    where c.Classroom_Id == id
        //    //    select new ClassroomSchoolVM
        //    //    {
        //    //        Classroom_Id = c.Classroom_Id,
        //    //        Name = c.Name,
        //    //        Teacher = c.Teacher,
        //    //        SchoolName = ct.Name,
        //    //        Principal = ct.Principal,
        //    //        Activities = (from ActivityVM avm in _context.Activities
        //    //                      where avm.Classroom_Id == id
        //    //                      select new ActivityVM
        //    //                      {
        //    //                        Activity_Id = avm.Activity_Id,  
        //    //                        Name = avm.Name,
        //    //                        Date = avm.Date,
        //    //                        Classroom_Id = avm.Classroom_Id,
        //    //                        School_Id = avm.School_Id
        //    //                      }).ToList()
                                       
        //    //    });

        //    return query;
            
        //}
         


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
