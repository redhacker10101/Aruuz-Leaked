using System;
using Aruuz.Areas.Identity.Data;
using Aruuz.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(Aruuz.Areas.Identity.IdentityHostingStartup))]
namespace Aruuz.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<AruuzContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("AruuzContextConnection")));

                services.AddDefaultIdentity<AruuzUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AruuzContext>();
            });
        }
    }
}