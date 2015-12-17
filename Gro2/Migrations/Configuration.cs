namespace Gro2.Migrations
{
    using Gro2.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Gro2.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Gro2.Models.ApplicationDbContext context)
        {
            context.Categories.AddOrUpdate(x => x.Id,
                new Category() { Id=1, Name = "Fruit"},
                new Category() { Id=2, Name = "Dairy"}
                );

            context.Products.AddOrUpdate(x => x.Id,
                new Product() { Id = 1, Name = "Orange", CategoryId = 1},
                new Product() { Id = 2, Name = "Milk", CategoryId = 2}
                );
        }
    }
}
