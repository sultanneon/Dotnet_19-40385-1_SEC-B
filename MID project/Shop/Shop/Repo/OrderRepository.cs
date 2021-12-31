using Shop.Models.EF;
using Shop.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Repo
{
    public class OrderRepository
    {
        static ShoppEntities db;
        static OrderRepository()
        {
            db = new ShoppEntities();
        }

        public static void PlaceOrder(List<ProductModel> products, string cId)
        {
           int q = Int16.Parse(cId);
            Order o = new Order();
            //   o.UserID = cId;      
            o.UserID=q;
            o.Status = "Ordered";
            db.Orders.Add(o);
            db.SaveChanges();
            foreach (var p in products)
            {
                var od = new Orderdetail()
                {
                    ProductID = p.ProductID,
                    // Product_Price = o.Total_Cost,
                    Product_Price = p.Discount_Price,
                    //  Qty = 1,
                    OrderID = o.OrderID
                };
                db.Orderdetails.Add(od);
                db.SaveChanges();
            }

        }
        public static List<Order> MyOrders(int id)
        {
            var orders = from e in db.Orders
                         where e.UserID == id
                         select e;
            return orders.ToList();
        }
    }
}