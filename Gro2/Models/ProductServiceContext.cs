using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Gro2.Models
{
    public class ProductServiceContext : DbContext
    {


        public ProductServiceContext()
            : base("name=ProductServiceContext")
        {
            this.Database.Log = s => Debug.WriteLine(s);
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

    }
}