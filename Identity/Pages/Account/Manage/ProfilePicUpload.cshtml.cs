using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Aruuz.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SixLabors.ImageSharp;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp.Processing;
using System.IO;
using System;
using SixLabors.ImageSharp.Formats;

namespace Aruuz.Areas.Identity.Pages.Account.Manage
{
    public partial class PicUploadModel : PageModel
    {
        private readonly UserManager<AruuzUser> _userManager;
        private readonly SignInManager<AruuzUser> _signInManager;
        private readonly IEmailSender _emailSender;

        public PicUploadModel(
            UserManager<AruuzUser> userManager,
            SignInManager<AruuzUser> signInManager,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        public string PictureURL { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Display(Name = "Picture link")]
            public string PictureURL { get; set; }
        }

        private async Task LoadAsync(AruuzUser user)
        {
            PictureURL = user.PhotoURL;
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
                if (height < 300 || width < 300)
                {
                    StatusMessage = "Image size should not be less than 300x300 pixels.";
                    return RedirectToPage();
                }
                if(width > height)
                {
                    image.Mutate(x => x.Crop(height, height));
                }
                else if(height > width)
                {
                    image.Mutate(x => x.Crop(width,width));
                }
                image.Mutate(x => x.Resize(300, 300));
                image.Save("./wwwroot/displaypic/" + user.Id + file.FileName);
                if (image != null)
                {
                    if (String.IsNullOrEmpty(user.PhotoURL) || string.Compare(user.PhotoURL, "/displaypic/default.jpg") == 0)
                    {
                        user.PhotoURL = "/displaypic/" + user.Id + file.FileName;
                        await _userManager.UpdateAsync(user);
                    }
                    else
                    {
                        System.IO.File.Delete("./wwwroot" + user.PhotoURL);
                        user.PhotoURL = "/displaypic/" + user.Id + file.FileName;
                        await _userManager.UpdateAsync(user);
                    }
                }
            }

            StatusMessage = "Your picture has been changed.";
            return RedirectToPage();
        }

    }
}
