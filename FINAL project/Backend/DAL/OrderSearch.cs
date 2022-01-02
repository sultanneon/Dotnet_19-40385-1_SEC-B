using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class OrderSearch : SRepository<Order, string>
    {

        Entities db;
        public OrderSearch(Entities db)
        {
            this.db = db;
        }

     /*   public List<Product> Gets(string name)
        {
            return db.Products.Where(e => e.PName.ToLower() == name).ToList();
        }*/

        public List<Order> Gets(string name)
        {
           
                return db.Orders.Where(e => e.OrderStatus.ToLower().Contains(name)).ToList();
            
        }

    }
}
