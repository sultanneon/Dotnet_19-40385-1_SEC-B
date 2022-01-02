using BEL;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TechShop.Controllers
{
    [EnableCors("*","*","*")]
    public class ReviewsController : ApiController
    {
       
        [Route("api/Reviews/All")]
        [HttpGet]
        public List<ReviewsModel>GetAll()
        {
            return ReviewsService.GetAll();
        }

      

        [Route("api/Reviews/delete/{id}")]
        [HttpPost]
        public void Delete(int id)
        {
            ReviewsService.Delete(id);
        }


        [Route("api/Reviews/get/{id}")]
        [HttpGet]
        public ReviewsModel Get(int id)
        {
            return ReviewsService.Get(id);
        }


        [Route("api/Reviews/add")]
        [HttpPost]
        public void Add(ReviewsModel e)
        {
            ReviewsService.Add(e);
        }

        [Route("api/Reviews/edit")]
        [HttpPost]

        public void Edit(ReviewsModel e)
        {
            ReviewsService.Edit(e);
        }
    }
}
