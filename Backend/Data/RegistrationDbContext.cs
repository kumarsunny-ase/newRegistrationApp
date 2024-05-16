using System;
using Microsoft.EntityFrameworkCore;
using newRegistrationApp.Models.Domain;

namespace newRegistrationApp.Data
{
    public class RegistrationDbContext : DbContext
    {
        public RegistrationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Industry> industries { get; set; }
        public DbSet<Summary> summaries { get; set; }
    }
}

