using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _2_State_Based_Routing_Using_UI_Router_MVC.Models
{
    public class ClassroomSchoolVM
    {
        public int Classroom_Id { get; set; }
        public string Name { get; set; }
        public string Teacher { get; set; }
        public string SchoolName { get; set; }
        public string Principal { get; set; }
        public IEnumerable<ActivityVM> Activities { get; set; }
    }
}

 