#pragma checksum "C:\Dropbox\Aruuz Project\AruuzNetCore\Aruuz\Views\Home\Users.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7772a274d1239618ea0cdb2d95b6739838a7aeef"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Users), @"mvc.1.0.view", @"/Views/Home/Users.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Dropbox\Aruuz Project\AruuzNetCore\Aruuz\Views\_ViewImports.cshtml"
using Aruuz;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Dropbox\Aruuz Project\AruuzNetCore\Aruuz\Views\_ViewImports.cshtml"
using Aruuz.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7772a274d1239618ea0cdb2d95b6739838a7aeef", @"/Views/Home/Users.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"55ca74f7823b9cc2f43ff7f4d4c154a287a6d3ae", @"/Views/_ViewImports.cshtml")]
    #nullable restore
    public class Views_Home_Users : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("profile-page"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .h6, h6 {
        font-size: .75rem !important;
        font-weight: 500;
        font-family: Roboto,Helvetica,Arial,sans-serif;
        line-height: 1.5em;
        text-transform: uppercase;
    }

    .name h6 {
        margin-top: 10px;
        margin-bottom: 10px;
    }


       
    a .material-icons {
        vertical-align: middle;
    }

   
    .profile-page .page-header {
        height: 380px;
        background-position: center;
    }

    .page-header {
        height: 100vh;
        background-size: cover;
        margin: 0;
        padding: 0;
        border: 0;
        display: flex;
        align-items: center;
    }

    .header-filter:after, .header-filter:before {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: block;
        left: 0;
        top: 0;
        content: """";
    }

    .header-filter::before {
        background: rgba(0,0,0,.1);
    }

    .main-raised {");
            WriteLiteral(@"
        margin: -60px 30px 0;
        border-radius: 6px;
        box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
    }

    .main {
        background: #FFF;
        position: relative;
        z-index: 3;
    }

    .profile-page .profile {
        text-align: center;
    }

        .profile-page .profile img {
            max-width: 160px;
            width: 100%;
            margin: 0 auto;
            -webkit-transform: translate3d(0,-50%,0);
            -moz-transform: translate3d(0,-50%,0);
            -o-transform: translate3d(0,-50%,0);
            -ms-transform: translate3d(0,-50%,0);
            transform: translate3d(0,-50%,0);
        }

    .img-raised {
        box-shadow: 0 5px 15px -8px rgba(0,0,0,.24), 0 8px 10px -5px rgba(0,0,0,.2);
    }

    .rounded-circle {
        border-radius: 50% !important;
    }

    .img-fluid, .img-thumbnail {
        max-width: 100%;
        height: auto;
    }
");
            WriteLiteral(@"
    .title {
        margin-top: 30px;
        margin-bottom: 25px;
        min-height: 32px;
        color: #3C4858;
        font-weight: 700;
        font-family: ""Roboto Slab"",""Times New Roman"",serif;
    }

    .profile-page .description {
        margin: 1.071rem auto 0;
        max-width: 600px;
        color: #999;
        font-weight: 300;
    }

     .profile-page .profile-tabs {
        margin-top: 4.284rem;
    }

   

    .profile-page .profile .name {
        margin-top: -80px;
    }

    img.rounded {
        border-radius: 6px !important;
    }
</style>

");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7772a274d1239618ea0cdb2d95b6739838a7aeef6148", async() => {
                WriteLiteral(@"

    
    <div class=""page-header header-filter img-thumbnail"" data-parallax=""true"" style=""background-image: url('../../images/background23.JPG');""></div>
    <div class=""main main-raised"">
        <div class=""profile-content"">
            <div class=""container"">
                <div class=""row"">
                    <div class=""col-md-6 ml-auto mr-auto"">
                        <div class=""profile"">
                            <div class=""avatar"">
                                <img src=""https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"" alt=""Circle Image"" class=""img-raised rounded-circle img-fluid"">
                            </div>
                            <div class=""name"">
                                <h3 class=""title"">Christian L");
                WriteLiteral(@"ouboutin</h3>
                                <h6>Designer</h6>
                                <a href=""#pablo"" class=""btn btn-just-icon btn-link btn-dribbble""><i class=""fa fa-dribbble""></i></a>
                                <a href=""#pablo"" class=""btn btn-just-icon btn-link btn-twitter""><i class=""fa fa-twitter""></i></a>
                                <a href=""#pablo"" class=""btn btn-just-icon btn-link btn-pinterest""><i class=""fa fa-pinterest""></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""description text-center"">
                    <p>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p>
                </div>
            </div>
        </div>
    </div>
   
");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"

<script>
    var big_image;

    $(document).ready(function () {
        BrowserDetect.init();

        // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
        $('body').bootstrapMaterialDesign();

        window_width = $(window).width();

        $navbar = $('.navbar[color-on-scroll]');
        scroll_distance = $navbar.attr('color-on-scroll') || 500;

        $navbar_collapse = $('.navbar').find('.navbar-collapse');

        //  Activate the Tooltips
        $('[data-toggle=""tooltip""], [rel=""tooltip""]').tooltip();

        // Activate Popovers
        $('[data-toggle=""popover""]').popover();

        if ($('.navbar-color-on-scroll').length != 0) {
            $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
        }

        materialKit.checkScrollForTransparentNavbar();

        if (window_width >= 768) {
            big_image = $('.page-header[data-parallax=""true""]');
  ");
            WriteLiteral(@"          if (big_image.length != 0) {
                $(window).on('scroll', materialKit.checkScrollForParallax);
            }

        }


    });

    $(document).on('click', '.navbar-toggler', function () {
        $toggle = $(this);

        if (materialKit.misc.navbar_menu_visible == 1) {
            $('html').removeClass('nav-open');
            materialKit.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function () {
                $toggle.removeClass('toggled');
            }, 550);

            $('html').removeClass('nav-open-absolute');
        } else {
            setTimeout(function () {
                $toggle.addClass('toggled');
            }, 580);


            div = '<div id=""bodyClick""></div>';
            $(div).appendTo(""body"").click(function () {
                $('html').removeClass('nav-open');

                if ($('nav').hasClass('navbar-absolute')) {
                    $('html').removeClass('nav-open-absolute');
                }
     ");
            WriteLiteral(@"           materialKit.misc.navbar_menu_visible = 0;
                $('#bodyClick').remove();
                setTimeout(function () {
                    $toggle.removeClass('toggled');
                }, 550);
            });

            if ($('nav').hasClass('navbar-absolute')) {
                $('html').addClass('nav-open-absolute');
            }

            $('html').addClass('nav-open');
            materialKit.misc.navbar_menu_visible = 1;
        }
    });

    materialKit = {
        misc: {
            navbar_menu_visible: 0,
            window_width: 0,
            transparent: true,
            fixedTop: false,
            navbar_initialized: false,
            isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
        },

        initFormExtendedDatetimepickers: function () {
            $('.datetimepicker').datetimepicker({
                icons: {
                    time: ""fa fa-clock-o"",
                    date: ""fa fa-calendar"",
                    up: ""fa fa-chevron-u");
            WriteLiteral(@"p"",
                    down: ""fa fa-chevron-down"",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove'
                }
            });
        },

        initSliders: function () {
            // Sliders for demo purpose
            var slider = document.getElementById('sliderRegular');

            noUiSlider.create(slider, {
                start: 40,
                connect: [true, false],
                range: {
                    min: 0,
                    max: 100
                }
            });

            var slider2 = document.getElementById('sliderDouble');

            noUiSlider.create(slider2, {
                start: [20, 60],
                connect: true,
                range: {
                    min: 0,
                    max: 100
                }
            });
        },

        checkScrollForPara");
            WriteLiteral(@"llax: function () {
            oVal = ($(window).scrollTop() / 3);
            big_image.css({
                'transform': 'translate3d(0,' + oVal + 'px,0)',
                '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
            });
        },

        checkScrollForTransparentNavbar: debounce(function () {
            if ($(document).scrollTop() > scroll_distance) {
                if (materialKit.misc.transparent) {
                    materialKit.misc.transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if (!materialKit.misc.transparent) {
                    materialKit.misc.transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
        }, 17)
    };

    // Returns a function,");
            WriteLiteral(@" that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || ""Other"";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || ""Unknown"";
        },
        searchString: function (data) {
            for ");
            WriteLiteral(@"(var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf(""rv:"");
            if (this.versionSearchString === ""Trident"" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [{
            string: navigator.userAgent,
            subString: ""Chrome"",
            identity: ""Chrome""
        },
        {
            string: navigator.userAgent,
        ");
            WriteLiteral(@"    subString: ""MSIE"",
            identity: ""Explorer""
        },
        {
            string: navigator.userAgent,
            subString: ""Trident"",
            identity: ""Explorer""
        },
        {
            string: navigator.userAgent,
            subString: ""Firefox"",
            identity: ""Firefox""
        },
        {
            string: navigator.userAgent,
            subString: ""Safari"",
            identity: ""Safari""
        },
        {
            string: navigator.userAgent,
            subString: ""Opera"",
            identity: ""Opera""
        }
        ]

    };
</script>");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591
