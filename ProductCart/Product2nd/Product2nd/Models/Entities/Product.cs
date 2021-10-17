using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Product2nd.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Enter the name")]
        [StringLength(10, ErrorMessage = "Max 10 digit allowed")]
        [MinLength(4)]
        public string Name { get; set; }
        [Required]
        public Double Price { get; set; }
        [Required]
        public string Des { get; set; }
        [Required]
        public int Qty { get; set; }
        

    }
}