using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Product2nd.Models.Entities;
using System.Data.SqlClient;
using Product2nd.Models;
using System.Web.Script.Serialization;

namespace Product2nd.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {

            Database db = new Database();
            var products = db.Products.Get();
            return View(products);
            /*
            string connString = @"Server= DESKTOP-O6THEL9\SQLEXPRESS; Database=Product2nd; Integrated Security=true";
            SqlConnection conn = new SqlConnection(connString);
            conn.Open();
            string query = "select * from Products";
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Product> products = new List<Product>();
            while (reader.Read())
            {
                Product p = new Product()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Qty = reader.GetInt32(reader.GetOrdinal("Qty")),
                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                    Des = reader.GetString(reader.GetOrdinal("Des"))
                };
                products.Add(p);
            }
            conn.Close(); 
            return View(products); */

        }
        [HttpGet]
        public ActionResult Create()
        {
            Product p = new Product();
            return View(p);
        }
        [HttpPost]
        public ActionResult Create(Product p)
        {
            if (ModelState.IsValid)
            {
                Database db = new Database();
                db.Products.Create(p);
                /*  string connString = @"Server= DESKTOP-O6THEL9\SQLEXPRESS; Database=Product2nd; Integrated Security=true";
                 SqlConnection conn = new SqlConnection(connString);
                 conn.Open();
                 string query = string.Format("insert into Products values ('{0}',{1},{2},'{3}')", p.Name, p.Qty, p.Price, p.Des);
                 SqlCommand cmd = new SqlCommand(query,conn);
                 int r = cmd.ExecuteNonQuery();
                 conn.Close(); */

                /* SqlDataReader reader = cmd.ExecuteReader();
                 while(reader.Read())
                 {
                     var a = reader.GetString(reader.GetOrdinal("Name"));
                 } */
                return RedirectToAction("Index");
            }
            return View(p);
        }
        [HttpGet]
        public ActionResult Delete(int id)
        {
            Database db = new Database();
            var p = db.Products.Delete(id);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public ActionResult Edit(int id)
        {   Database db = new Database();
            var a = db.Products.Get(id);
            return View(a);
        }
        [HttpPost]
        public ActionResult Edit(Product a)
        { if (ModelState.IsValid)
            {
                Database db = new Database();
                db.Products.Edit(a);
                return RedirectToAction("Index");
            } return View(a);
        }
        public ActionResult Cart(int id)
        {
            Database db = new Database();
            var x = db.Products.Get(id);
            if (Session["Cart"] == null)
            {
                List<Product> products = new List<Product>() ;
                products.Add(x);

                string json = new JavaScriptSerializer().Serialize(products);
                Session["Cart"] = json ;
            }
            else
            {
                var products= new JavaScriptSerializer().Deserialize<List<Product>>(Session["Cart"].ToString()) ;
                products.Add(x);

                string json= new JavaScriptSerializer().Serialize(products) ;
                Session["Cart"] = json ;
            }
            return RedirectToAction("Index");
        }
        public ActionResult RemoveCart(int id)
        {
            Database db = new Database();
            var n = db.Products.Get(id);

            var cart = Session["cart"];
            var cartProducts = new JavaScriptSerializer().Deserialize<List<Product>>(cart.ToString());
            var b = cartProducts.SingleOrDefault(x => x.Id == id);

            if (b != null)
            { cartProducts.Remove(b); }

            var json = new JavaScriptSerializer().Serialize(cartProducts);
            Session["cart"] = json;

            return RedirectToAction("AddedToCart");
        }
        public ActionResult AddedToCart()
        {
            List<Product> products = new List<Product>();
            if (Session["Cart"] != null)
            {
                products = new JavaScriptSerializer().Deserialize<List<Product>>(Session["Cart"].ToString());
                return View(products);
            }
            return View(products);
        }
    }
}