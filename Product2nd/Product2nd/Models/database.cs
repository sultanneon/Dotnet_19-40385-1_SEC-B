using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Product2nd.Models.Entities;
using Product2nd.Models.Tables;
using System.Linq;
using System.Web;

namespace Product2nd.Models
{
    public class Database
    {   SqlConnection conn;
        public Products Products { get; set; }
        public Database()
        {   string connString = @"Server= DESKTOP-O6THEL9\SQLEXPRESS; Database=Product2nd; Integrated Security=true";
            conn = new SqlConnection(connString);
            Products = new Products(conn);
        }
    }
}