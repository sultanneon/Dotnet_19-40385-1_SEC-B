
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using Product2nd.Models.Entities;


namespace Product2nd.Models.Tables
{
    public class Orders
    {
        SqlConnection conn;
        public Orders(SqlConnection conn)
        {
            this.conn = conn;
        }
        public List<Order> Get()
        {
            conn.Open();
            string query = "select * from Products,Orders where Products.Id=Orders.ProductId";
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Order> orders = new List<Order>();
            Product p;
            Order s;
            while (reader.Read())
            {
                s = new Order();
                s.Products = new List<Product>();
                p = new Product()
                {
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Price = (float)reader.GetDouble(reader.GetOrdinal("Amount"))
                };
                s.OrderId = reader.GetString(reader.GetOrdinal("OrderId"));
                s.Products.Add(p);
                orders.Add(s);
            }
            conn.Close();
            return orders;
        }
        public int Place(string orderId, int productId, float amount)
        {
            conn.Open();
            string query = String.Format("insert into Orders values ('{0}',{1},{2})", orderId, productId, amount);
            SqlCommand cmd = new SqlCommand(query, conn);
            int r = cmd.ExecuteNonQuery();
            conn.Close();
            return r;
        }
    }
}