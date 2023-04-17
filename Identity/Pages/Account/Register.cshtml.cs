using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Aruuz.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Newtonsoft.Json;
using Aruuz.Models;
using System.Net;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
//using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace Aruuz.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<AruuzUser> _signInManager;
        private readonly UserManager<AruuzUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<IdentityRole> _roleManager;
        public readonly IConfiguration _configuration;


        public RegisterModel(IConfiguration configuration,
            UserManager<AruuzUser> userManager,
            SignInManager<AruuzUser> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }
        public class InputModel
        {

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Full name")]
            public string Name { get; set; }

            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "User Name")]
            public string UserName { get; set; }
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
            public string ConfirmPassword { get; set; }

            public string RecaptchaSiteKey { get; set; }
        }
        public static bool ReCaptchaPassed(string gRecaptchaResponse, string secret, ILogger logger)
        {
            HttpClient httpClient = new HttpClient();
            var res = httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={gRecaptchaResponse}").Result;
            if (res.StatusCode != HttpStatusCode.OK)
            {
                logger.LogError("Error while sending request to ReCaptcha");
                return false;
            }

            string JSONres = res.Content.ReadAsStringAsync().Result;
            dynamic JSONdata = JObject.Parse(JSONres);
            if (JSONdata.success != "true")
            {
                return false;
            }

            return true;
        }
        public async Task OnGetAsync(string returnUrl = null)
        {
#if DEBUG
            ViewData["ReCaptchaKey"] = _configuration.GetSection("GoogleReCaptchaLH:key").Value;

#else
            ViewData["ReCaptchaKey"] = _configuration.GetSection("GoogleReCaptcha:key").Value;

#endif
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            var userWithSameEmail = _userManager.Users.Where(m => m.Email == Input.Email).SingleOrDefault(); //checking if the emailid already exits for any user

            if (userWithSameEmail != null)
            {
                ModelState.AddModelError("Email", "User with this email already exists");
                return Page();
            }
            if(Input.UserName.Contains("@") || Input.UserName.Contains("/") || Input.UserName.Contains("\\"))
            {
                ModelState.AddModelError("UserName", "Not a valid Username");
                return Page();
            }
#if DEBUG
            if (!ReCaptchaPassed(
            Request.Form["g-recaptcha-response"], // that's how you get it from the Request object
            _configuration.GetSection("GoogleReCaptchaLH:secret").Value,
            _logger
            ))
            {
                ModelState.AddModelError("ReCaptcha", "Incorrect recaptcha");
                return Page();
            }
#else
            if (!ReCaptchaPassed(
            Request.Form["g-recaptcha-response"], // that's how you get it from the Request object
            _configuration.GetSection("GoogleReCaptcha:secret").Value,
            _logger
            ))
            {
                ModelState.AddModelError("ReCaptcha", "Incorrect recaptcha");
                return Page();
            }
#endif
           
            if (ModelState.IsValid)
            {
                var user = new AruuzUser { Name = Input.Name, UserName = Input.UserName, Email = Input.Email, PhotoURL="/displaypic/default.jpg",BannerURL="/displaypic/defaultbanner.jpg",TagLine=""};
                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    //if (!await _roleManager.RoleExistsAsync("Admin"))
                    //{
                    //    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                    //}

                    //if (!await _roleManager.RoleExistsAsync("User"))
                    //{
                    //    await _roleManager.CreateAsync(new IdentityRole("User"));
                    //}

                    await _userManager.AddToRoleAsync(user, "User");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                        $"Dear {Input.Name}, <br> Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>. <br>Regards,<br>Team Aruuz");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
