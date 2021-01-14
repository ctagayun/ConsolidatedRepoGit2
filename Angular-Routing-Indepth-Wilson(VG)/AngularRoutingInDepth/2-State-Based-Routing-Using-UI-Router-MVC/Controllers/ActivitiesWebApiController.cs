using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _2_State_Based_Routing_Using_UI_Router_MVC.Controllers
{
    public class ActivitiesWebApiController : ApiController
    {
         RoutingDBEntities _context = new RoutingDBEntities();
         public ActivitiesWebApiController()
        {
            _context.Configuration.LazyLoadingEnabled = false;
        }

        // GET api/<controller>
        public IEnumerable<Activity> Get()
        {
            return _context.Activities.ToList();
        }

        // GET api/<controller>/5
        public Activity Get(int id)
        {
            //var query = _context.Classrooms.Where(n => n.Classroom_Id == id);
            //return query.FirstOrDefault();
            return (_context.Activities.Where(n => n.Activity_Id == id)).FirstOrDefault();
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}