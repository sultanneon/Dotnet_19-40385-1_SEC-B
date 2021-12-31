using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Models.VM
{
    public class ProductModel
    {
        public int ProductID { get; set; }
        public string Product_Name { get; set; }
        public string Basic_Price { get; set; }
        public int CategoryID { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public int Discount_Price { get; set; }
        //  public Nullable<int> Discount_Price { get; set; }

    }
}