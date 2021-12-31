
using Shop.Models.EF;
using Shop.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Repo
{
    public class ProductRepository
    {
        static ShoppEntities db;
        static ProductRepository()
        {
            db = new ShoppEntities();
        }
        public static ProductModel Get(int id)
        {
            var p = (from pr in db.Products
                     where pr.ProductID == id
                     select pr).FirstOrDefault();
            /*return new ProductModel() { 
                Id= p.Id,
                Name = p.Name,
                Price = p.Price
            };*/
            ProductModel pm = new ProductModel()
            {
                ProductID = p.ProductID,
                Product_Name = p.Product_Name,
                Basic_Price = p.Basic_Price
            };
            return pm;


        }
        public static List<ProductModel> GetAll()
        {
            var products = new List<ProductModel>();
            foreach (var p in db.Products)
            {
                ProductModel pm = new ProductModel()
                {
                    ProductID = p.ProductID,
                    Product_Name = p.Product_Name,
                    Basic_Price = p.Basic_Price
                };
                products.Add(pm);
            }
            return products;
        }
    }
}