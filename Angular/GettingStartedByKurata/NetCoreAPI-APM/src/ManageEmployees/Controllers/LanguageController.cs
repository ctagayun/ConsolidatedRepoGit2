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
    public class LanguageController : Controller
    {
        private readonly ILanguageRepository _languageRepository;

        
        public LanguageController ( ILanguageRepository langaugeRepository)
        {
            _languageRepository = langaugeRepository;
        }

        [HttpGet]
        [EnableCors("AllowAll")]
        public IActionResult Get()
        {
            var languages = _languageRepository.GetAll().Where(rs => rs.RecordStatus == RecordStatus.Active);

            if (languages.ToList().Any())
                return Ok(languages.ToList());

            return NoContent();

           
        }

        [HttpGet("{id}")]
        [EnableCors("AllowAll")]
        public IActionResult Get(int id)
        {
            Language language = _languageRepository.GetSingle(p => p.Id == id);
            if (language != null)
                return Ok(language);
            return NotFound();
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        public IActionResult Post([FromBody] Language language)
        {
            try
            {
                var _language = language;
                if (_language == null) throw new ArgumentNullException(nameof(_language));

                _languageRepository.Add(_language);
                _languageRepository.Commit();

                return Created($"/api/languages/{language.Id}", _language);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [EnableCors("AllowAll")]
        public void Put(int id, [FromBody] Language language)
        {
            try
            {
                var _language = _languageRepository.GetSingle(id);

                if (_language == null) throw new ArgumentNullException(nameof(_language));
                _language.LanguageName = language.LanguageName;
                _language.RecordStatus = language.RecordStatus;

                _languageRepository.Commit();
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
            var language = _languageRepository.GetSingle(id);

            if (language == null) return new NotFoundResult();

            _languageRepository.SetStatusDeleted(language);
            _languageRepository.Commit();
            return new NoContentResult();
        }
    }
}

