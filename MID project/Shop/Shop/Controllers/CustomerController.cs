using Shop.Auth;
using Shop.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shop.Controllers
{
    [Customeraccess]
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index(User customer)
        {
            return View(customer);
        }
        public ActionResult Profiles()
        {
            var cid = User.Identity.Name;
            int m = Int16.Parse(cid);
            var db = new ShoppEntities();
            var customer = (from s in db.Users
                            where s.UserID == m
                            select s).FirstOrDefault();
            return View(customer);
        }
        public ActionResult Edit()
        {
            var cid = User.Identity.Name;
            int m = Int16.Parse(cid);
            var db = new ShoppEntities();
            var student = (from s in db.Users
                           where s.UserID == m
                           select s).FirstOrDefault();

            return View(student);
        }
        [HttpPost]
        public ActionResult Edit(User st)
        {
            var db = new ShoppEntities();
            var student = (from s in db.Users
                           where s.UserID == st.UserID
                           select s).FirstOrDefault();
            db.Entry(student).CurrentValues.SetValues(st);
            db.SaveChanges();
            return RedirectToAction("Index","Customer",st);
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index","Home");
        }

    }
}