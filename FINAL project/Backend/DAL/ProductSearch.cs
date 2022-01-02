using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductSearch : SRepository<Product, string>
    {

        Entities db;
        public ProductSearch(Entities db)
        {
            this.db = db;
        }

     /*   public List<Product> Gets(string name)
        {
            return db.Products.Where(e => e.PName.ToLower() == name).ToList();
        }*/

        public List<Product> Gets(string name)
        {
            return db.Products.Where(e => e.PName.ToLower().StartsWith(name)).ToList();
        }

    }
}
