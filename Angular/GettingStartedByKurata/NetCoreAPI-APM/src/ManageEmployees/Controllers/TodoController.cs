using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using ManageEmployees.Models;




//The preceding code:

// Defines an empty controller class. In the next sections, we'll add methods to implement the API.
// The constructor uses Dependency Injection to inject the database context(TodoContext) 
// into the controller.The database context is used in each of the CRUD methods in the controller.
// The constructor adds an item to the in-memory database if one doesn't exist.


namespace ManageEmployees.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class TodoController : Controller
    {
        //private readonly ManageApmDBContext _context;
        private readonly TodoContext _context2;

        //public TodoController(ManageApmDBContext context)
        public TodoController(TodoContext context)
        {
            _context2 = context;

            //if (_context.TodoItems.Count() == 0)
             if (_context2.LanguageVM.Count() == 0)
            {
                _context2.LanguageVM.Add(new LanguagesVM {Id=1, Language = "English" });
                _context2.LanguageVM.Add(new LanguagesVM {Id=2, Language = "Spanish" });
                _context2.LanguageVM.Add(new LanguagesVM {Id=3, Language = "French" });
                _context2.LanguageVM.Add(new LanguagesVM {Id=4, Language = "Other" });
                _context2.SaveChanges();

            }
        }


        //The GetAll method returns an IEnumerable. MVC automatically serializes the object to JSON and writes
        //the JSON into the body of the response message. The response code for this method is 200, 
        //assuming there are no unhandled exceptions. (Unhandled exceptions are translated into 5xx errors.)
        [HttpGet]

        //public IEnumerable<LanguagesVM> GetAll()

        //IActionResult is simply the interface and an ActionResult is a generic implementation of that same interface.
        //With regards to your IActionResult, the reason that this interface exists, is that there are a wide range 
        //of ways that you can return content from MVC controllers that aren't limited to just ActionResults :
        //Examples: JsonResult, ContentResult, EmptyResult, FileResult, etc...
        public IActionResult Get()
        {
            // return _context.TodoItems.ToList();
            // return _context.LanguagesVM.ToList();
            if(_context2.LanguageVM.ToList().Any())
                return Ok(_context2.LanguageVM.ToList());
            return NoContent();
        }

        //"{id}" is a placeholder variable for the ID of the todo item. When GetById is invoked, 
        //it assigns the value of "{id}" in the URL to the method's id parameter.

        //Name = "GetTodo" creates a named route and allows you to link to this route in an HTTP Response

        //GetById has two different return types:
        //If no item matches the requested ID, the method returns a 404 error.This is done by returning NotFound.
       //Otherwise, the method returns 200 with a JSON response body.This is done by returning an ObjectResult

           [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(int id)
        {
            var item = _context2.LanguageVM.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }


        //This is an HTTP POST method, indicated by the [HttpPost] attribute. The [FromBody] attribute tells MVC
        //to get the value of the to-do item from the body of the HTTP request.

        // The CreatedAtRoute method returns a 201 response, which is the standard response for an HTTP POST
        //method that creates a new resource on the server.CreatedAtRoute also adds a Location header to the response. 
        //The Location header specifies the URI of the newly created to-do item.
        
         [HttpPost]
        public IActionResult Create([FromBody] LanguagesVM item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context2.LanguageVM.Add(item);
            _context2.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        }


        //Update is similar to Create, but uses HTTP PUT. The response is 204 (No Content). 
        //According to the HTTP spec, a PUT request requires the client to send the entire updated entity, 
        //not just the deltas. To support partial updates, use HTTP PATCH.

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] LanguagesVM item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var todo = _context2.LanguageVM.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.Language = item.Language;
           // todo.Name = item.Name;

            _context2.LanguageVM.Update(todo);
            _context2.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var todo = _context2.LanguageVM.First(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _context2.LanguageVM.Remove(todo);
            _context2.SaveChanges();
            return new NoContentResult();
        }
    }
}