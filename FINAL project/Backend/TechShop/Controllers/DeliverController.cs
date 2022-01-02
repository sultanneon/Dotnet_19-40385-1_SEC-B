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
    public class DeliverController : ApiController
    {
       
        [Route("api/Deliver/All")]
        [HttpGet]
        public List<DeliverModel> GetAll()
        {
            return DeliverService.GetAll();
        }

        [Route("api/Deliver/Names")]
        [HttpGet]
        public List<string> GetNames()
        {
            return DeliverService.GetNames();
        }

        [Route("api/Deliver/delete/{id}")]
        [HttpPost]
        public void Delete(int id)
        {
            DeliverService.Delete(id);
        }


        [Route("api/Deliver/get/{id}")]
        [HttpGet]
        public DeliverModel Get(int id)
        {
            return DeliverService.Get(id);
        }


        [Route("api/Deliver/add")]
        [HttpPost]
        public void Add(DeliverModel e)
        {
            DeliverService.Add(e);
        }

        [Route("api/Deliver/edit")]
        [HttpPost]

        public void Edit(DeliverModel e)
        {
            DeliverService.Edit(e);
        }
    }
}
