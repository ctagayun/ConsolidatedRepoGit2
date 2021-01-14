using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using ManageEmployees.Data.Abstract;
using ManageEmployees.Models.Entities;
using ManageEmployees.Models.Enums;
using ManageEmployees.Data;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ManageEmployees.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;

        
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        [EnableCors("AllowAll")]
        public IActionResult Get()
        {
            var products = _productRepository.GetAll().Where(rs => rs.RecordStatus == RecordStatus.Active);

            if (products.ToList().Any())
                return Ok(products.ToList());

            return NoContent();

           
        }

        [HttpGet("{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Get(int id)
        {
            Product product = _productRepository.GetSingle(p => p.Id == id);
            if (product != null)
                return Ok(product);
            return NotFound();
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        public IActionResult Post([FromBody] Product product)
        {
            try
            {
                var _product = product;
                if (_product == null) throw new ArgumentNullException(nameof(_product));

                _productRepository.Add(_product);
                _productRepository.Commit();

                return Created($"/api/product/{product.Id}", _product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [EnableCors("AllowAll")]
        public void Put(int id, [FromBody] Product product)
        {
            try
            {
                var _product = _productRepository.GetSingle(id);

                if (_product == null) throw new ArgumentNullException(nameof(_product));
                _product.ProductName = product.ProductName;
                _product.ReleaseDate = product.ReleaseDate;
                _product.ProductCode = product.ProductCode;
                _product.Price = product.Price;
                _product.Description = product.Description;
                _product.StarRating = product.StarRating;
                _product.ImageUrl = product.ImageUrl;
                _productRepository.Commit();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Delete(int id)
        {
            var product = _productRepository.GetSingle(id);

            if (product == null) return new NotFoundResult();

            _productRepository.SetStatusDeleted(product);
            _productRepository.Commit();
            return new NoContentResult();
        }
    }
}

