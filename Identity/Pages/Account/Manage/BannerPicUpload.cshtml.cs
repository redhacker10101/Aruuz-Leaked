using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Aruuz.Areas.Identity.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;

namespace Aruuz.Areas.Identity.Pages.Account.Manage
{
    public class BannerPicUploadModel : PageModel
    {
        private readonly UserManager<AruuzUser> _userManager;
        private readonly SignInManager<AruuzUser> _signInManager;

        public BannerPicUploadModel(
            UserManager<AruuzUser> userManager,
            SignInManager<AruuzUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public string BannerURL { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Display(Name = "Banner link")]
            public string BannerURL { get; set; }
        }

        private async Task LoadAsync(AruuzUser user)
        {
            BannerURL = user.BannerURL;
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }


        public async Task<IActionResult> OnPostChangePhotoAsync(IFormFile file)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }

            if (file != null)
            {
                using var image = Image.Load(file.OpenReadStream(), out IImageFormat format);
                var height = image.Height;
                var width = image.Width;
                if (height < 400 || width < 1200)
                {
                    StatusMessage = "Image size should not be less than 1200x400 pixels.";
                    return RedirectToPage();
                }
                if (width > height)
                {
                    image.Mutate(x => x.Resize(1200, height/width*1200));
                    image.Mutate(x => x.Crop(1200, 400));
                }
                else if (height > width)
                {
                    StatusMessage = "Image size should not be less than 1200x400 pixels and the Image should be landscape.";
                    return RedirectToPage();
                }
                image.Save("./wwwroot/displaypic/_banner_" + user.Id + file.FileName);

                if (image != null)
                {
                    if (String.IsNullOrEmpty(user.BannerURL) || string.Compare(user.BannerURL, "/displaypic/defaultbanner.jpg") == 0)
                    {
                        user.BannerURL = "/displaypic/_banner_" + user.Id + file.FileName;
                        await _userManager.UpdateAsync(user);
                    }
                    else
                    {
                        System.IO.File.Delete("./wwwroot" + user.BannerURL);
                        user.BannerURL = "/displaypic/_banner_" + user.Id + file.FileName;
                        await _userManager.UpdateAsync(user);
                    }
                }
            }

            StatusMessage = "Your picture has been changed.";
            return RedirectToPage();
        }

    }
}
