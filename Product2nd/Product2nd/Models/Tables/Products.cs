﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Product2nd.Models.Entities;

namespace Product2nd.Models.Tables
{
    public class Products
    {
        SqlConnection conn;
        public Products(SqlConnection conn)
        { this.conn = conn; }
        public void Create(Product p)
        {  conn.Open();
            string query = string.Format("insert into Products values ('{0}',{1},{2},'{3}')", p.Name, p.Qty, p.Price, p.Des);
            SqlCommand cmd = new SqlCommand(query, conn);
            int r = cmd.ExecuteNonQuery();
            conn.Close();
        }
        public List<Product> Get()
        {   conn.Open();
            string query = "select * from Products";
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            List<Product> products = new List<Product>();
            while (reader.Read())
            {    Product p = new Product()
                {   Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Qty = reader.GetInt32(reader.GetOrdinal("Qty")),
                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                    Des = reader.GetString(reader.GetOrdinal("Des"))
                };
                products.Add(p);
            }   conn.Close();
            return products;
        }
        public int Delete(int id)
        {   conn.Open();
            string query = String.Format("Delete from Products where Id={0}", id);
            SqlCommand cmd = new SqlCommand(query, conn);
            int res = cmd.ExecuteNonQuery();
            conn.Close();
            return res;
        }
        public Product Get(int id)
        {
            conn.Open();
            string query = String.Format("Select * from Products where Id={0}", id);
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader reader = cmd.ExecuteReader();
            Product s = null;
            while (reader.Read())
            {
                s = new Product()
                {   Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Qty = reader.GetInt32(reader.GetOrdinal("Qty")),
                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                    Des = reader.GetString(reader.GetOrdinal("Des"))
                };
            }
            conn.Close();
            return s;
        }
        public int Edit(Product p)
        {   conn.Open();
            string query = String.Format("update Products set Name='{0}',Qty={1},Price={2},Des='{3}'where Id='{4}'",p.Name,p.Qty,p.Price,p.Des,p.Id);
            SqlCommand cmd = new SqlCommand(query, conn);
            int a = cmd.ExecuteNonQuery();
            conn.Close();
            return a;
        }
       
    }
}