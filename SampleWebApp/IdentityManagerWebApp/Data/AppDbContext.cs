﻿using IdentityManagerWebApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace IdentityManagerWebApp.Data
{
    public class AppDbContext:IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
