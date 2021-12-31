using Shop.Auth;
using Shop.Models.EF;
using Shop.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shop.Controllers
{
    [Employeeaccess]
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index(User employee)
        {
            return View(employee);
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
        public ActionResult Profiles()
        {
            var cid = User.Identity.Name;
            int m = Int16.Parse(cid);

            var db = new ShoppEntities();
            var employee = (from s in db.Users
                            where s.UserID == m
                            select s).FirstOrDefault();
            return View(employee);
        }
        public ActionResult Edit()
        {
            var cid = User.Identity.Name;
            int m = Int16.Parse(cid);

            var db = new ShoppEntities();
            var employee = (from s in db.Users
                           where s.UserID == m
                           select s).FirstOrDefault();

            return View(employee);
        }
        [HttpPost]
        public ActionResult Edit(User ab)
        {
            var db = new ShoppEntities();
            var employee = (from s in db.Users
                           where s.UserID == ab.UserID
                           select s).FirstOrDefault();
            db.Entry(employee).CurrentValues.SetValues(ab);
            db.SaveChanges();
            return RedirectToAction("Index", "Customer", ab);
        }
        public ActionResult ProductSearch()
        {
            ShoppEntities db = new ShoppEntities();
            return View(db.Products.ToList());
        }
        public ActionResult ProductEdit(int Id)
        {
            var db = new ShoppEntities();
            var product = (from s in db.Products
                           where s.ProductID == Id
                           select s).FirstOrDefault();

            return View(product);
        }
        [HttpPost]
        public ActionResult ProductEdit(Product pro)
        {
            var db = new ShoppEntities();
            var product = (from s in db.Products
                           where s.ProductID == pro.ProductID
                           select s).FirstOrDefault();
            db.Entry(product).CurrentValues.SetValues(pro);
            db.SaveChanges();
            return RedirectToAction("ProductSearch", "Employee", pro);
        }
        public ActionResult Checkout()
        {
            var db = new ShoppEntities();// Database db = new Database()
            var data = db.Orders.ToList();
            return View(data);
        }
        public ActionResult OrderEdit(int Id)
        {
            var db = new ShoppEntities();
            var Order = (from s in db.Orders
                           where s.OrderID == Id
                           select s).FirstOrDefault();

            return View(Order);
        }
        [HttpPost]
        public ActionResult OrderEdit(Order p)
        {
            var db = new ShoppEntities();
            var order = (from s in db.Orders
                           where s.OrderID == p.OrderID
                           select s).FirstOrDefault();
            db.Entry(order).CurrentValues.SetValues(p);
            db.SaveChanges();
            return RedirectToAction("Checkout", "Employee", p);
        }
       /*   public ActionResult DeleteOrder(OrderModel or)
           {
               var db = new ShoppEntities();
               var student = (from s in db.Orders
                              where s.OrderID == or.OrderID
                              select s).FirstOrDefault();
               db.Orders.Remove(student);
               db.SaveChanges();
               return RedirectToAction("Checkout","Employee",or);
           }  */
        public ActionResult Delete(OrderModel id)
           {
               var db = new ShoppEntities();

            /*  var resa = db.Orderdetails.Where(x => x.OrderID == id.OrderID).First();
               db.Orderdetails.Remove(resa);
               db.SaveChanges();  */

               var res= db.Orders.Where(x => x.OrderID == id.OrderID).First();
               db.Orders.Remove(res);
               db.SaveChanges();

               var list = db.Orders.ToList();
               return View("Checkout",list);
           }
        
    }
}