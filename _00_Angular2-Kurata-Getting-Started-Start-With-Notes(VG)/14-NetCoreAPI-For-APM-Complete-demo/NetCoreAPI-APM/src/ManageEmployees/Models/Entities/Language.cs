using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ManageEmployees.Models.Enums;
using Newtonsoft.Json;
using ManageEmployees.Models;

namespace ManageEmployees.Models.Entities
{
    public class Language  : IEntityBase
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Language name is required.")]
        [StringLength(50)]
        [JsonProperty("languageName")]
        public string LanguageName { get; set; }
        public RecordStatus RecordStatus { get; set; }

}


    
}
