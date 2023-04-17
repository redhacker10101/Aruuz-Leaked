using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Aruuz.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the AruuzUser class
    public class AruuzUser : IdentityUser
    {
        [PersonalData]
        public string Name { get; set; }
        override public string UserName { get; set; }
        public string PhotoURL { get; set; }
        public string BannerURL { get; set; }
        public string TagLine { get; set; }
    }
}
