
using System;
using System.Linq;
using System.Web;
using System.Collections.Generic;

namespace Product2nd.Models.Entities
{
    public class Order
    {
        public string OrderId { get; set; }
        public List<Product> Products { get; set; }
    }
}