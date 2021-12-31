using Shop.Auth;
using Shop.Models.EF;
using Shop.Models.VM;
using Shop.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Shop.Controllers
{
    [Customeraccess]
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProductSearch()
        {
           // ViewBag.ID = id;
            ShoppEntities db = new ShoppEntities();
            return View(db.Products.ToList());
        }
        public ActionResult AddtoCart(int id)
        {
            var pm = ProductRepository.Get(id);
            List<ProductModel> products;
            if (Session["cart"] == null)
            {
                products = new List<ProductModel>();
            }
            else
            {
                var json = Session["cart"].ToString();
                products = new JavaScriptSerializer().Deserialize<List<ProductModel>>(json);
            }

            products.Add(pm);
            var json2 = new JavaScriptSerializer().Serialize(products);
            Session["cart"] = json2;
            return RedirectToAction("ProductSearch");

        }
        public ActionResult Cart()
        {
            if (Session["cart"] != null)
            {
                var json = Session["cart"].ToString();
                var products = new JavaScriptSerializer().Deserialize<List<ProductModel>>(json);
                return View(products);
            }
            else
            { return RedirectToAction("ProductSearch","Product"); }
        }
        public ActionResult Checkout()
        {
            var json = Session["cart"].ToString();
            var products = new JavaScriptSerializer().Deserialize<List<ProductModel>>(json);
            //  var cid = 1; User.Identity.Name;
            var cid = User.Identity.Name;
            OrderRepository.PlaceOrder(products, cid);
            Session.Remove("cart");
            return RedirectToAction("ProductSearch","Product");


        }
        public ActionResult MyOrders()
         {
             //var cid = 1; User.Identity.Name
             var cid = User.Identity.Name;
             int m = Int16.Parse(cid);
             var orders = OrderRepository.MyOrders(m);
             return View(orders);
         } 
      /*  public ActionResult MyOrders()
        {
            //var cid = 1; User.Identity.Name
          var cid = User.Identity.Name;
          int m = Int16.Parse(cid);
          
            var db = new ShoppEntities();
            var r = (from s in db.Orders
                     where s.UserID == m
                     select s).FirstOrDefault();
            return View(r);
        }
      */
        public ActionResult RemoveCart(int id)
        {

            var db = new ShoppEntities();
            var r = (from s in db.Products
                            where s.ProductID == id
                            select s).FirstOrDefault();
           // Database db = new Database();
           // var n = db.Products.Get(id);

            var cart = Session["cart"];
            var cartProducts = new JavaScriptSerializer().Deserialize<List<Product>>(cart.ToString());
            var b = cartProducts.SingleOrDefault(x => x.ProductID == id);

            if (b != null)
            { cartProducts.Remove(b); }

            var json = new JavaScriptSerializer().Serialize(cartProducts);
            Session["cart"] = json;

            return RedirectToAction("Cart","Product");
        }
    }
}