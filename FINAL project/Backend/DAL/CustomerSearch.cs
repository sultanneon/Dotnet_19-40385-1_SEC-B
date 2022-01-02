using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CustomerSearch : SRepository<Customer, string>
    {

        Entities db;
        public CustomerSearch(Entities db)
        {
            this.db = db;
        }

     /*   public List<Product> Gets(string name)
        {
            return db.Products.Where(e => e.PName.ToLower() == name).ToList();
        }*/

        public List<Customer> Gets(string name)
        {
            return db.Customers.Where(e => e.CName.ToLower().StartsWith(name)).ToList();
        }

    }
}
