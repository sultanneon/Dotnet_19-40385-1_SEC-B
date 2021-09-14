using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CV_1st_.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult Bio()
        {
            ViewBag.Objective = "Looking for a challenging role in a reputable IT farm to utilize my .net developing skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector";

            ViewBag.MyName = "Zamil Ahmed";
            ViewBag.FathersName = "Emrul hasan";
            ViewBag.MothersName = "Afifa Rahman";           

            ViewBag.Dob = "15-08-1998";

            return View();
        }
        public ActionResult Education()
        {
           
            ViewBag.year1 = "2013-2015";
            ViewBag.year2 = "2015-2017";
            ViewBag.year3 = "2019-2022";

            ViewBag.exam1 = "SSC";
            ViewBag.exam2= "HSC";
            ViewBag.exam3= "BSC";

            ViewBag.institution1 = "Dagonbhuiyan Academy";
            ViewBag.institution2= "Milestone college";
            ViewBag.institution3= "American International University Bangladesh";
        
            return View();
        }
        public ActionResult Projects()
        {
            string[] project = new string[3];
            project[0] = "Unused space renting,C#";
            project[1] = "E-learning,WEB TECHNOLOGIES";
            project[2] = "Easy travel, ASSEMBLY";
            ViewBag.Projects = project;
            return View();
        }
        public ActionResult References()
        {
            ViewBag.Reference1 = "Tanvir Ahmed,Lecturer,CS dept,American International University Bangladesh(tanvir.ahmed@aiub.edu)";
            ViewBag.Reference2 = "Rashidul Hasan Nabil,Lecturer,CS dept,American International University Bangladesh(rashidul@aiub.edu)";
            return View();
        }
    }
}