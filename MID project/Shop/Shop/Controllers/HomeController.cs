using Shop.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Registration(User s)
        {
            var db = new ShoppEntities();
            s.User_Type = "Customer";
            db.Users.Add(s);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Login()
        {

            return View();
        }
        [HttpPost]
        public ActionResult Login(string Username, string Password)
        {
            var db = new ShoppEntities();
            var customer = (from s in db.Users
                            where s.Username == Username && s.Password == Password
                            select s).FirstOrDefault();
        //   int idd = customer.UserID;
            if (customer != null)
            {
                if (customer.User_Type == "Customer")
                {
                    string n = customer.UserID.ToString();
                    // FormsAuthentication.SetAuthCookie(customer.Username,true);
                    FormsAuthentication.SetAuthCookie(n, true);
                    return RedirectToAction("Index", "Customer", customer);
                }
                else if (customer.User_Type == "Employee")
                {
                    string n = customer.UserID.ToString();
                    FormsAuthentication.SetAuthCookie(n, true);
                    return RedirectToAction("Index", "Employee", customer);
                }
                else
                {
                    return View();
                }
            }
            return View(); 
           
        }

    }
}