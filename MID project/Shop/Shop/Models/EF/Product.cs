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
    
    public partial class Product
    {
        public Product()
        {
            this.Orderdetails = new HashSet<Orderdetail>();
        }
    
        public int ProductID { get; set; }
        public string Product_Name { get; set; }
        public string Basic_Price { get; set; }
        public int CategoryID { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public Nullable<int> Discount_Price { get; set; }
    
        public virtual Category Category1 { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
