using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ManageEmployees.Models.Enums;
using Newtonsoft.Json;
using ManageEmployees.Models;

namespace ManageEmployees.Models.Entities
{
    public class Product :  IEntityBase
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(250)]
        [JsonProperty("productName")]
        public string ProductName { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [JsonProperty("releaseDate")]
        public DateTime ReleaseDate { get; set; }

        [Required(ErrorMessage = "Product productCode is required.")]
        [StringLength(50)]
        [JsonProperty("productCode")]
        public string ProductCode { get; set; }

        [JsonProperty("price")]
        public double Price { get; set; }


        [StringLength(300)]
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("starRating")]
        public double StarRating { get; set; }


        [StringLength(200)]
        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        public RecordStatus RecordStatus { get; set; }

    }
}
