//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Shop.Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class User
    {
        public User()
        {
            this.Orders = new HashSet<Order>();
        }
    
        public int UserID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [StringLength(10, ErrorMessage = "Max 10 digit allowed")]
        [MinLength(5)]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not in valid format")]
        public string Email { get; set; }
        [Required]
        [StringLength(10, ErrorMessage = "Max 10 digit allowed")]
        [MinLength(5)]
        public string Password { get; set; }
        [Required]
        public string Contactnumber { get; set; }
        public string User_Type { get; set; }
        public string Status { get; set; }
    
        public virtual ICollection<Order> Orders { get; set; }
    }
}
