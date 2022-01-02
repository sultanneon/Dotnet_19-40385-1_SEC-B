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
    [EnableCors("*", "*", "*")]
    public class OrderController : ApiController
    {
        [Route("api/Order/All")]
        [HttpGet]
        public List<OrderModel> GetAll()
        {
            return OrderService.GetAll();
        }

     

        [Route("api/Order/delete/{id}")]
        [HttpPost]
        public void Delete(int id)
        {
            OrderService.Delete(id);
        }

        [Route("api/Order/add")]
        [HttpPost]
        public void Add(OrderModel e)
        {
            OrderService.Add(e);
        }

        [Route("api/Order/edit")]
        [HttpPost]
        public void Edit(OrderModel e)
        {
            OrderService.Edit(e);
        }

        [Route("api/Order/get/{id}")]
        [HttpGet]
        public OrderModel Get(int id)
        {
            return OrderService.Get(id);
        }

        [Route("api/Order/search/{id}")]
        [HttpGet]
        public List<OrderModel> Gets(int id)
        {
            return OrderService.Gets(id);
        }

        [Route("api/Order/searchby/{status}")]
        [HttpGet]
        public List<OrderModel> Getsby(string status)
        {
            return OrderService.Getsby(status);
        }

        // customer can watch his order 
        [Route("api/Order/getorder/{id}")]
        [HttpGet]
        public List<OrderModel> Getorder(int id)
        {
            return OrderService.Getorder(id);
        }

     


        [Route("api/Order/orderdetails")]
        [HttpGet]
        public List<OrderdetailsModel> orderdetails()
        {
            return OrderService.orderdetails();
        }
    }
}
