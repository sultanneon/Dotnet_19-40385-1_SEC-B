using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Models.VM
{
    public class OrderModel
    {
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public string Status { get; set; }
        public string Order_Date { get; set; }
        public Nullable<int> Total_Cost { get; set; }
    }
}