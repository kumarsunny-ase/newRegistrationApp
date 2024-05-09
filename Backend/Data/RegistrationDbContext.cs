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

        public DbSet<Company> Companies { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

