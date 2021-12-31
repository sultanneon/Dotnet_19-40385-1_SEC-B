

using Shop.Models;
using Shop.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Shop.Auth
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class Employeeaccess : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var flag = base.AuthorizeCore(httpContext);
            if (flag)
            {

                var userid = httpContext.User.Identity.Name;
                var db = new ShoppEntities();
                int o = Int16.Parse(userid);
                var customer = (from s in db.Users
                                where s.UserID == o && s.User_Type == "Employee"
                                select s).FirstOrDefault();
                if (customer != null) return true;

            }
            return false;
        }
    }
}