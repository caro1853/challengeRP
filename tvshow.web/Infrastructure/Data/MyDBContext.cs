using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tvshow.web.Core.Entities;

namespace tvshow.web.Infrastructure.Data
{
    public class MyDBContext: DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {
            /*var builder = new DbContextOptionsBuilder();
            builder.UseSqlServer(@"Server = localhost; Database = tvshow; Trusted_Connection = true");*/
        }

        public DbSet<User> Users { get; set; }
    }
}
