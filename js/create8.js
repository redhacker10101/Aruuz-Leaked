class Notification {
    constructor(idlist, textlist, linklist) {
        this.idlist = idlist;
        this.textlist = textlist;
        this.linklist = linklist;
    }
}
var meter = "";
var poet = "";
var type = "";
var meter_taqti = "";
var editorID = 0;
var sectionID = "";
var inputID = -1;
var hrefOneState = 0;
var hrefTwoState = 1;
var callcount = 0;
var carouselIndex = 0;
var carouselLen = 0;
var carouselList;
var scrollFlag = 0;
$(window).on('load',function () {
    //$(".check").removeClass("hidden");
    var h = document.getElementsByTagName("body")[0];
    if ($("#poetrypanel").is(":visible")) {
       var $span = $(".check2");
        var max = 0;
        var width = 0;
        for (var i = 0; i < $span.length; i++) {
            width = $span[i].offsetWidth;
            if (max < width) {
                max = width;
            }
        }
        var len = $("#poetrypanel").outerWidth();
        var percentage = ((max + 30) / len) * 100;
        // $(".check").addClass("hidden");
        if (percentage < 97) {
            $("#poetrytable").addClass("justifyme");
            // $(".table").addClass("table-bordered");
            $(".data").css("text-align", "justify");
            $(".data").css("text-align-last", "justify");
            $(".data").css("-moz-text-align-last", "justify");
            $(".data").css("-ms-text-align-last", "justify");
            $(".data").css("height", "2em");
            $(".data").css("line-height", "2");
            $(".data").css("content", "");
            $(".data").css("display", "inline-block");
            $(".data").css("width", percentage + "%");
        }
    }
    else
    {
        var $span = $(".check");
        var max = 0;
        var width = 0;
        for (var i = 0; i < $span.length; i++) {
            width = $span[i].offsetWidth;

            if (max < width) {
                max = width;
            }
        }
        var len = $("#poetrypanel2").outerWidth();
        var percentage = ((max + 40) / len) * 100;
        // $(".check").addClass("hidden");
        if (percentage < 97) {
            $("#poetrytable2").addClass("justifyme");
            // $(".table").addClass("table-bordered");
            $(".data2").css("text-align", "justify");
            $(".data2").css("text-align-last", "justify");
            $(".data2").css("-moz-text-align-last", "justify");
            $(".data2").css("-ms-text-align-last", "justify");
            $(".data2").css("height", "2em");
            $(".data2").css("line-height", "2");
            $(".data2").css("content", "");
            $(".data2").css("display", "inline-block");
            $(".data2").css("width", percentage + "%");

        }
    }

});
$('#nav-tab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})
AddAntiForgeryToken = function (data) {
    data.__RequestVerificationToken = $('#__AjaxAntiForgeryForm input[name=__RequestVerificationToken]').val();
    return data;
};
function toggleTaqti(id) {
    if ($('#tablemeters2').hasClass('d-none')) {
        $('#tablemeters2').removeClass('d-none');
        $('#tablemeters2').addClass('d-block');
        if ($('#openingdiv2 .fa').hasClass('fa-caret-down')) {
            $('#openingdiv2 .fa').removeClass('fa-caret-down');
            $('#openingdiv2 .fa').addClass('fa-caret-up');
        }
        if (document.getElementById("taqtiDiv") !== null) {
            var url = "/taqti/poetry2";
            var values = {
                "id": id
            };
            $.ajax({
                type: 'POST',
                url: url,
                data: AddAntiForgeryToken(values),
                async: true,
                timeout: 60000,
                success: function (data) {
                    $('#taqtiDiv').replaceWith(data);
                },
                error: function (x, t, m) {
                    if (t == 'timeout') {
                        var data = "<div class='panel panel-body'><span class='label label-default urdu-small text-right'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                        $('#taqtiDiv').replaceWith(data);
                    }
                }
            });
        }
        else {
            $('#tablemeters2').removeClass('d-block');
            $('#tablemeters2').addClass('d-none');
            if ($('#openingdiv2 .fa').hasClass('fa-caret-up')) {
                $('#openingdiv2 .fa').removeClass('fa-caret-up');
                $('#openingdiv2 .fa').addClass('fa-caret-down');
            }
        }
    }
}
function toggleMeters() {
    if ($('#tablemeters').hasClass('d-none')) {
        $('#tablemeters').removeClass('d-none');
        $('#tablemeters').addClass('d-block');
        if ($('#openingdiv .fa').hasClass('fa-caret-down'))
        {
            $('#openingdiv .fa').removeClass('fa-caret-down');
            $('#openingdiv .fa').addClass('fa-caret-up');
        }
    }
    else {
        $('#tablemeters').removeClass('d-block');
        $('#tablemeters').addClass('d-none');
        if ($('#openingdiv .fa').hasClass('fa-caret-up')) {
            $('#openingdiv .fa').removeClass('fa-caret-up');
            $('#openingdiv .fa').addClass('fa-caret-down');
        }
    }
}
function checkNotifications() {
    var url = "/notification/index";
    var values = {
        "source": "source",
   }; 
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 5000,
        success: function (data) {
            var count = data.length;
            var s = "", a = "";
            var plus = 0;
            var newNotifications = 0;
            if (count > 5) {
                count = 5;
                plus = 1;
            }
            for (var i = 0; i < count; i++) {
                s = "";
                if (!data[i].link || !data[i].text ) {

                }
                else {
                    s = s + data[i].text;
                    if (data[i].read == 0) {
                        newNotifications++;
                        s = "<a class='dropdown-item urdu-tiny text-right text-info' href='" + data[i].link + "'id='" + data[i].id + "'>" + s + "</a>";
                    }
                    else {
                        s = "<a class='dropdown-item urdu-tiny text-right' href='" + data[i].link + "'id='" + data[i].id + "'>" + s + "</a>";

                    }
                    a = a + s;
                }
              }
            a = a + '<div class="dropdown-divider" ></div >';
            a = a + '<a class="dropdown-item urdu-tiny text-right" href="/notification/all/">تمام دکھائیں</a>';

            $('#notificatioDropDown').html(a);
            if (newNotifications > 0) {
                $('#notification .badge').removeClass('.d-none');
                if (plus == 1) {
                    $('#notification .badge').text(newNotifications);
                }
                else {
                    $('#notification .badge').text(newNotifications+"+");
                }
            }
        }
    });
}
function checkMessages() {
    var url = "/message/get";
    var values = {
        "source": "source",
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 5000,
        success: function (data) {
            var count = data.length;
            var s = "", a = "";
            var newMessages = 0;
            var plus = 0;
            if (count > 5) {
                count = 5;
                plus = 1;
            }
            for (var i = 0; i < count; i++) {
                s = "";
                s = s + data[i].text;
                if (data[i].read == 0) {
                    newMessages++;
                    s = "<a class='dropdown-item urdu-tiny text-right text-info' href='" + data[i].link + "'id='" + data[i].id + "'>" + s + "</a>";
                }
                else {
                    s = "<a class='dropdown-item urdu-tiny text-right' href='" + data[i].link + "'id='" + data[i].id + "'>" + s + "</a>";
                }
                a = a + s;
            }

            a = a + '<a class="dropdown-item urdu-tiny text-right text-primary" href="/message/all/">مکالمے دکھائیں</a>';
            a = a + '<a class="dropdown-item urdu-tiny text-right text-primary" href="/message/newmessage/">نیا مکالمہ شروع کریں</a>';

            $('#messageDropDown').html(a);
            if (newMessages > 0) {
                $('#messages .badge').removeClass('.d-none');
                if (plus == 0) {
                    $('#messages .badge').text(newMessages);
                }
                else {
                    $('#messages .badge').text(newMessages+"+");
                }
            }
        }
    });
}
function notificationOpened() {
    $('#notification .badge').text("");
    var objects = $('#notificatioDropDown').children;
    var stringArray = new Array();
    $("#notificatioDropDown > a").each((index, elem) => {
        stringArray[index] = elem.id;
    });
    var url = "/notification/NotificationOpened";
    var values = {
        listkey: stringArray,
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 5000,
        success: function (data) {
           
        }
    });
}
function MessageOpened() {
    $('#messages .badge').text("");
    var objects = $('#messageDropDown').children;
    var stringArray = new Array();
    $("#messageDropDown > a").each((index, elem) => {
        stringArray[index] = elem.id;
    });
    var url = "/message/opened";
    var values = {
        listkey: stringArray,
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 5000,
        success: function (data) {

        }
    });
}
function updateviews(source, id) {
    var url = "/comments/views";
    var values = {
        "source": source,
        "idsource": id
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 1000,
        success: function (data) {

        }
    });
}
function updatelikes(source,parent, id, userid,parentId, val) {
    var url = "/comments/likes";
    var values = {
        "source": source,
        "parent": parent,
        "idsource": id,
        "userid": userid,
        "parentId": parentId,
        "value": val
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 1000,
        success: function (data) {
        }
    });
}
function listLikes(source, id) {
    $("#myModal").removeClass("opened");
    $("#button-label").removeClass("close-it");
    $("#button-label").addClass("info");

    var url = "/comments/listlikes";
    var values = {
        "source": source,
        "idsource": id
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 5000,
        success: function (d) {
            var data = "<div class='modal-content urdu-medium'>" + d + "</div>";
            $("#myModal div.modal-content").replaceWith(data);
        },
        error: function (d) {
            var data = "<div class='modal-content urdu-medium'>" + "فہرست دیکھنے کے لئے لاگ ان ہوں۔"+"</div>";
            $("#myModal div.modal-content").replaceWith(data);
        }
    });
    $('#myModal').modal('toggle');

}
function likeToggle(source,parent, id,parentId, userid) {
    var s = '#like_' + source + "_" + id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
    var v = '#like_' + source + "_" + 'count_' + id.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
    if ($(s).hasClass('outline')) {
        $(s).removeClass('outline');
        $(s).addClass('red');
        $(v).removeClass('d-none');
        var value = parseInt($(v).text(), 10) + 1;
        $(v).text(value);
        updatelikes(source,parent, id, userid, parentId, 1);
    }
    else if ($(s).hasClass('red')) {
        $(s).removeClass('red');
        $(s).addClass('outline');
        var value = parseInt($(v).text(), 10) - 1;
        $(v).text(value);
        updatelikes(source, parent, id, userid, parentId, -1);
    }
}
function populateProgress() {
    var url = "/taqti/ReturnProgress";
    var values = {
        "input": $('#RandText').text()
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 100,
        success: function (data) {
            $('#pbar1').val(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = 0;
                $('#pbar1').val(data);
            }
        }
    });
}
function populateProgress2() {
    var url = "/create/ReturnProgress";
    var values = {
        "input": $('#RandText2').text()
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 100,
        success: function (data) {
              $('#pbar2').val(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = 0;
                $('#pbar2').val(data);
            }
        }
    });
}
function mozun() {
    $("[id^=namozun_]").addClass('hidden');
    $("#toplabel").text("میری شاعری (موزوں)");
}
function toggleHref(e)
{
    if (e == '1') {
        $('html, body').animate({
            scrollTop: $("#contOne").offset().top
        }, 700);

        if (hrefOneState == 0) {
            if (hrefTwoState == 1) { 
                $('#hrefOne').removeClass('glyphicon-minus-sign');
                $('#hrefOne').addClass('glyphicon-plus-sign');
                hrefOneState = 1;
            }
            else
            {
                $('#hrefOne').removeClass('glyphicon-minus-sign');
                $('#hrefOne').addClass('glyphicon-plus-sign');

                hrefOneState = 1;
            }
        }
        else
        {
            if (hrefTwoState == 1) { 
                $('#hrefOne').removeClass('glyphicon-plus-sign');
                $('#hrefOne').addClass('glyphicon-minus-sign');

                hrefOneState = 0;
            }
            else { //toggle
                $('#hrefOne').removeClass('glyphicon-plus-sign');
                $('#hrefOne').addClass('glyphicon-minus-sign');
                $('#hrefTwo').removeClass('glyphicon-minus-sign');
                $('#hrefTwo').addClass('glyphicon-plus-sign');
                hrefOneState = 0;
                hrefTwoState = 1;
            }
        }
    }
    else if (e == '2') {
        $('html, body').animate({
            scrollTop: $("#contOne").offset().top
        }, 700);

        if (hrefTwoState == 0) {
            if (hrefOneState == 1) {
                $('#hrefTwo').removeClass('glyphicon-minus-sign');
                $('#hrefTwo').addClass('glyphicon-plus-sign');

                hrefTwoState = 1;
            }
            else {
                $('#hrefTwo').removeClass('glyphicon-minus-sign');
                $('#hrefTwo').addClass('glyphicon-plus-sign');

                hrefTwoState = 1;
            }

        }
        else {
            if (hrefOneState == 1) {
                $('#hrefTwo').removeClass('glyphicon-plus-sign');
                $('#hrefTwo').addClass('glyphicon-minus-sign');

                hrefTwoState = 0;
            }
            else {
                //toggle
                $('#hrefOne').removeClass('glyphicon-minus-sign');
                $('#hrefOne').addClass('glyphicon-plus-sign');
                $('#hrefTwo').removeClass('glyphicon-plus-sign');
                $('#hrefTwo').addClass('glyphicon-minus-sign');

                hrefOneState = 1;
                hrefTwoState = 0;
            }

        }

    }
}
function taqtiPoetry(e) {
    $('html, body').animate({
        scrollTop: $("#contOne").offset().top
    }, 700);

    if (hrefTwoState == 0) {
        if (hrefOneState == 1) {
            $('#hrefTwo').removeClass('glyphicon-minus-sign');
            $('#hrefTwo').addClass('glyphicon-plus-sign');
            hrefTwoState = 1;
        }
        else
        {
            $('#hrefTwo').removeClass('glyphicon-minus-sign');
            $('#hrefTwo').addClass('glyphicon-plus-sign');
            hrefTwoState = 1;
        }
       
    }
    else {
        if (hrefOneState == 1) {
            $('#hrefTwo').removeClass('glyphicon-plus-sign');
            $('#hrefTwo').addClass('glyphicon-minus-sign');
            hrefTwoState = 0;
        }
        else {
            //toggle
            $('#hrefOne').removeClass('glyphicon-minus-sign');
            $('#hrefOne').addClass('glyphicon-plus-sign');
            $('#hrefTwo').removeClass('glyphicon-plus-sign');
            $('#hrefTwo').addClass('glyphicon-minus-sign');
            hrefOneState = 1;
            hrefTwoState = 0;
        }
       
    }
    if (document.getElementById("taqtiDiv") !== null) {
    var url = "/taqti/poetry2";
    var values = {
        "id": e - 65536
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 60000,
        success: function (data) {
            $('#taqtiDiv').replaceWith(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                $('#taqtiDiv').replaceWith(data);
            }
        }
    });
}
}
function taqtiMyPoetry(e) {
    $('html, body').animate({
        scrollTop: $("#contOne").offset().top
    }, 700);

    if (hrefTwoState == 0) {
        if (hrefOneState == 1) {
            $('#hrefTwo').removeClass('glyphicon-minus-sign');
            $('#hrefTwo').addClass('glyphicon-plus-sign');
            hrefTwoState = 1;
        }
        else {
            $('#hrefTwo').removeClass('glyphicon-minus-sign');
            $('#hrefTwo').addClass('glyphicon-plus-sign');
            hrefTwoState = 1;
        }

    }
    else {
        if (hrefOneState == 1) {
            $('#hrefTwo').removeClass('glyphicon-plus-sign');
            $('#hrefTwo').addClass('glyphicon-minus-sign');
            hrefTwoState = 0;
        }
        else {
            //toggle
            $('#hrefOne').removeClass('glyphicon-minus-sign');
            $('#hrefOne').addClass('glyphicon-plus-sign');
            $('#hrefTwo').removeClass('glyphicon-plus-sign');
            $('#hrefTwo').addClass('glyphicon-minus-sign');
            hrefOneState = 1;
            hrefTwoState = 0;
        }

    }
    if (document.getElementById("taqtiDiv") !== null) {
        var url = "/taqti/mypoetry2";
        var values = {
            "id": e
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: AddAntiForgeryToken(values),
            async: true,
            timeout: 60000,
            success: function (data) {
                $('#taqtiDiv').replaceWith(data);
            },
            error: function (x, t, m) {
                if (t == 'timeout') {
                    var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                    $('#taqtiDiv').replaceWith(data);
                }
            }
        });
    }
}
function outputTaqti() {
    var url = "/taqti/output2";
    var values = {
        "id": $('#inputID').text()
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 60000,
        success: function (data) {
            $('#detailsDiv').replaceWith(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                $('#detailsDiv').replaceWith(data);
            }
        }
    });
}
function outputCreate() {
    var url2 = "/create/output2";
    var values2 = {
        "id": $('#inputID2').text()
    };
    $.ajax({
        type: 'POST',
        url: url2,
        data: AddAntiForgeryToken(values2),
        async: true,
        timeout: 60000,
        success: function (data) {
            $('#detailsDiv2').replaceWith(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                $('#detailsDiv').replaceWith(data);
            }
        }
    });
}
function resultTaqti() {
    var url = "/taqti/result2";
    var values = {
        "text": $('#inputTextRes').text(),
        "isChecked": $('#inputCheckRes').text(),
        "rand": $('#RandText').text()
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 60000,
        success: function (data) {
            $('#detailsDiv').replaceWith(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                $('#detailsDiv').replaceWith(data);
            }
        }
    });

}
function resultCreate() {
    var url2 = "/create/result2";
    var values2 = {
        "text": $('#inputTextRes2').text(),
        "rand": $('#RandText2').text()

    };
    $.ajax({
        type: 'POST',
        url: url2,
        data: AddAntiForgeryToken(values2),
        async: true,
        timeout: 60000,
        success: function (data) {
            $('#detailsDiv2').replaceWith(data);
        },
        error: function (x, t, m) {
            if (t == 'timeout') {
                var data = "<div class='panel panel-body'><span class='label label-default urdu-large'>ٹائم آوٹ خرابی: کافی دیر گذرنے کے بعد بھی آپ کا نتیجہ برامد نہیں ہوا اس کے لئے ہم معذرت خواہ ہیں۔ آپ چاہیں تو یہ خرابی رپورٹ کر سکتے ہیں۔</span></div>";
                $('#detailsDiv').replaceWith(data);
            }
        }
    });

}
function publish() {
    var data = "<div class='modal-body urdu text-right'>\
    <label for='title' class='urdu-naskh-medium'>\
    *عنوان \
    </label>\
    <input class = 'form-control data input-lg urdu-medium' value = ''  id='title' maxlength='100'>\
    </div>";
    $("#myModal div.modal-body").replaceWith(data);
    $("#myModal h4.modal-title").replaceWith("<h4 class='modal-title urdu-naskh' id='modalLabel'>" + "کلام شائع کریں یا لنک حاصل کریں" + "</div>");
    $("#button-label").replaceWith("<p id='button-label' class='urdu-naskh'>شائع کریں/لنک حاصل کریں</p>");
    $("#myModal").removeClass("opened");
    $("#button-label").removeClass("close-it");
    $('#poet-name').UrduEditor(); 
    $('#title').UrduEditor();
    $("#button-label").addClass("publish");
    $('#myModal').modal('toggle');
}
function like(e) {
    var url = "/taqti/like";
    $("#likebutton").addClass("disabled");
    $("#dislikebutton").addClass("disabled");
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken({ url: e }),
        async: false,
        success: function (d) {          
         
        }
    });
   
}
function dislike(e) {
    var url = "/taqti/dislike";
    $("#likebutton").addClass("disabled");
    $("#dislikebutton").addClass("disabled");
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken({ url: e }),
        async: false,
        success: function (d) {
            $("#likebutton").addClass("disabled");
        }
    });
}
function populatepoetry() {
    var url = "/examples/metersList";
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken({ url: e }),
        async: false,
        success: function (d) {
            $("#poetryDiv").replace(d);
        }
    });
}
function taqtiClicked() {
    var changed = $(".data").each(function () { $(this).attr("id"); });

    if (changed.length == 0) {
        $(".alert").show();
        $(".alert").delay(5000).slideUp();
    }
    else {
        var text = "";
        for (i = 0; i < changed.length; i++) {
            text = $('input').filter("[id^=" + $(changed[i]).attr('id') + "]").val();
            var value = $(changed[i]).val();
            var mat = $(changed[i]).attr('id').match("row0_(.*)_Score");
            var id = mat[1].replace(/[^0-9]/g, '');
            var met = mat[1].replace(/[0-9-]/g, '').replace(/[_]/g, ' ');
            var values = {
                "id" : parseInt(id,10), // you want to use radix
                "text": text,
                "meter": met,
                "isChecked": "false"
            }
            var idText =$(changed[i]).attr('id');
            sectionID = idText.substring(12, idText.length);
            var url = "/create/partialindex";
            $('input').filter("[id^=" + $(changed[i]).attr('id') + "]").focus();
            $('input').filter("[id^=" + $(changed[i]).attr('id') + "]").after("<img src='/icons/ajax-loader.gif'></img>").delay(500);

            $.ajax({type: 'POST',
                url: url,
                data: AddAntiForgeryToken(values),
                async: false,
                success: function (data) {
                    $('tbody').filter("[id^=section0_" + sectionID + "]").addClass('remove');
                    $('tbody').filter("[id^=section1_" + sectionID + "]").addClass('remove');
                    $('tbody').filter("[id^=section3_" + sectionID + "]").addClass('remove');
                    $('tbody').filter("[id^=section2_" + sectionID + "]").addClass('remove');
                    $('tbody').filter("[id^=section2_" + sectionID + "]").after(data);
                    $('.remove').remove();
                    $('tbody').filter("[id^=section0_" + sectionID + "]").focus();
        }
    });
        }
    }

}
function dictionaryClicked() {
    var data = "<div class='modal-body text-right'><label for='word-input' class='urdu-medium'>لفظ</label> <input class = 'form-control data urdu-medium input-lg' value = ''  id='word-input'></input></div>";
    $("#myModal div.modal-body").replaceWith(data);
    $("#myModal h4.modal-title").replaceWith("<h4 class='modal-title urdu-medium text-right' id='modalLabel'>" + "مفرد الفاظ کی تقطیع" + "</div>");
    $("#button-label").replaceWith("<p id='button-label' class='urdu-medium'>تقطیع</p>");
    $("#myModal").removeClass("opened");
    $("#button-label").removeClass("close-it");
    $('#word-input').UrduEditor();
    $("#button-label").addClass("dictionary");
    $('#myModal').modal('toggle');
}
function reportClicked(e, name) {
    var data = "<div class='modal-body urdu-medium text-right'>\
            <label for='comments-input' class='urdu-naskh-medium'>تبصرہ </label>\
            <textarea class = 'form-control data urdu-small' id='comments-input'></textarea></div>";

    $("#myModal div.modal-body").replaceWith(data);
    $("#myModal h4.modal-title").replaceWith("<h4 class='modal-title urdu-naskh' id='modalLabel'>" + "خرابی رپورٹ کریں" + "</div>");
    $("#button-label").replaceWith("<p id='button-label' class='urdu-naskh'>رپورٹ</p>");
    $("#myModal").removeClass("opened");
    $("#button-label").removeClass("close-it");
    $('#name-input').UrduEditor();
    $('#name-input').addClass("urdu-medium");
    $('#comments-input').UrduEditor();
    $('#name-input').addClass("urdu");
    $("#button-label").addClass("report");
    if (name != null) {
        $("#button-label").removeClass("report");
        $("#button-label").addClass("report2");
    }

    inputID = e;

    $('#myModal').modal('toggle');
}
function infoClicked(e) {
    $("#myModal").removeClass("opened");
    $("#button-label").removeClass("close-it");
    $("#button-label").addClass("info");
    var url = "/taqti/info";
    var values = {
        "id": e
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: true,
        timeout: 6000,
        success: function (d) {

            var data = "<div class='modal-content urdu'>" + d + "</div>";
            $("#myModal div.modal-content").replaceWith(data);
        }
    });

    $('#myModal').modal('toggle');
}
function modalButtonClicked() {
    if ($("#myModal").hasClass("opened")) {
        if ($("#button-label").hasClass("close-it")) {
            $('#myModal').modal('toggle');
            $("#myModal").removeClass("opened");
            $("#button-label").removeClass("close-it");
        }
    }
    else {

        if ($("#button-label").hasClass("dictionary")) {
            var values = {
                "text": $("#word-input").val(),
                "isChecked": false
            }

            var imgCode = "<div class='modal-body'> <img src='/icons/ajax-loader.gif'></img></div>";
            $("#myModal div.modal-body").replaceWith(imgCode).delay(1000);


            var url = "/create/words";

            $.post(url, AddAntiForgeryToken(values), function (data) {

                var values = "<div class='modal-body'>" + data + "</div>";
                $("#myModal div.modal-body").replaceWith(values);
                $("#button-label").replaceWith("<p id='button-label' class='urdu'>بند کریں</p>");
                $("#button-label").addClass("close-it");
                $("#myModal").addClass("opened");

            });
        }
        else if($("#button-label").hasClass("report"))
        {
            if ($("#comments-input").val() == '') {
                $("#comments-input").after("<div id = 'temp' class = 'red urdu-naskh-medium'><p>تبصرہ لکھنا ضروری ہے </p></div>").delay(2000);
                setTimeout(function () {
                    $('.red').remove();
                }, 2000);
                $("#comments-input").focus();
            }
            else {

                var values = {
                    "inputid": inputID,
                    "comments": $("#comments-input").val()
                }

                var imgCode = "<div class='modal-body'> <img src='/icons/ajax-loader.gif'></img> </div>";
                $("#myModal div.modal-body").replaceWith(imgCode).delay(300);


                var url = "/taqti/report";

                $.post(url, AddAntiForgeryToken(values), function (data) {
                    var values = "<div class='modal-body'>" + "شکریہ۔ آپ کا مسئلہ رپورٹ ہو گیا ہے۔ امید ہے اس کا جلد سدِ باب کیا جائے گا۔" + "</div>";
                    $("#myModal div.modal-body").replaceWith(values);
                    $("#button-label").replaceWith("<p id='button-label' class='urdu'>بند کریں</p>");
                    $("#button-label").addClass("close-it");
                    $("#myModal").addClass("opened");

                });
            }
        }
        else if ($("#button-label").hasClass("report2")) {
           if ($("#comments-input").val() == '') {
                $("#comments-input").after("<div id = 'temp' class = 'urdu-naskh-medium red'><p>تبصرہ لکھنا ضروری ہے </p></div>").delay(2000);
                setTimeout(function () {
                    $('.red').remove();
                }, 2000);
                $("#comments-input").focus();
            }
            else {

                var values = {
                    "inputid": inputID,
                    "name": $("#name-input").val(),
                    "email": $("#email-input").val(),
                    "comments": $("#comments-input").val()
                }

                var imgCode = "<div class='modal-body'> <img src='/icons/ajax-loader.gif'></img> </div>";
                $("#myModal div.modal-body").replaceWith(imgCode).delay(300);


                var url = "/taqti/report";

                $.post(url, AddAntiForgeryToken(values), function (data) {
                    var values = "<div class='modal-body'>" + "شکریہ۔ آپ کا مسئلہ رپورٹ ہو گیا ہے۔ امید ہے اس کا جلد سدِ باب کیا جائے گا۔" + "</div>";
                    $("#myModal div.modal-body").replaceWith(values);
                    $("#button-label").replaceWith("<p id='button-label' class='urdu'>بند کریں</p>");
                    $("#button-label").addClass("close-it");
                    $("#myModal").addClass("opened");

                });
            }
        }
        else if ($("#button-label").hasClass("publish"))
        {
            if ($("#title").val() == '') {
                $("#title").after("<div id = 'temp' class = 'urdu-naskh-medium red'><p>عنوان لکھنا ضروری ہے </p></div>").delay(2000);
                setTimeout(function () {
                    $('.red').remove();
                }, 2000);
                $("#title").focus();
            }
            else
                {
                var values = {
                    "title": $("#title").val(),
                    "text": $("#inputTextRes").text(),
                    "percentage": $("#percentage").text()
                };

                var imgCode = "<div class='modal-body'> <img src='/icons/ajax-loader.gif'></img> </div>";
                $("#myModal div.modal-body").replaceWith(imgCode).delay(300);

                var url = "/poetry/publish";
                $.post(url, AddAntiForgeryToken(values), function (data) {
                    $("#myModal div.modal-body").replaceWith(data);
                    $("#button-label").replaceWith("<p id='button-label' class='urdu'>بند کریں</p>");
                    $("#button-label").addClass("close-it");
                    $("#myModal").addClass("opened");
                    $("#linkbutton").addClass("disabled");
                    $("#linkbutton2").addClass("disabled");

                });
              
            }
        }
    }
}
function wordClicked(word) {
    var data = "<div class='modal-body'></div>";
    $("#myModal div.modal-body").replaceWith(data);
    $("#myModal h4.modal-title").replaceWith("<h4 class='modal-title urdu-naskh text-right' id='modalLabel'>" + "لفظ کی تقطیع" + "</div>");
    $("#myModal").removeClass("opened");
    $("#button-label").replaceWith("<p id='button-label' class='urdu-naskh'>بند کریں</p>");
    $("#button-label").removeClass("close-it");
    $('#myModal').modal('toggle');


    if (word == '---') {
        var values = "<div class='modal-body urdu-small text-right'>" + "اس لفظ کی تقطیع کے بارے میں ہمیں تحفظات ہیں۔ اگر تو اس لفظ میں املا کی اغلاط ہیں تو ان کو درست لکھیں، یا اگر  یہ لفظ کئی الفاظ کا مجموعہ ہے تو سب الفاظ کو الگ الگ لکھیں۔  " + "<br>" +
            "اگر آپ نے اوپر دیئے گئے قاعد کے مطابق لفظ لکھا اور پھر بھی سسٹم تقطیع کرنے میں ناکام رہا ہے تو اس لفظ کو ہمیں <a href= 'https://aruuz.com/discussion?id=vSZWtVktzSJvzedJ756Z'> رپورٹ</a> کریں۔" +
            "</div>";
        $("#myModal div.modal-body").replaceWith(values);
        $("#button-label").addClass("close-it");
        $("#myModal").addClass("opened");
    }
    else {
        var values = {
            "text": word,
            "isChecked": false
        }

        var imgCode = "<div class='modal-body'> <img src='/icons/ajax-loader.gif'></img></div>";
        $("#myModal div.modal-body").replaceWith(imgCode).delay(1000);


        var url = "/create/words";

        $.post(url, AddAntiForgeryToken(values), function (data) {

            var values = "<div class='modal-body'>" + data + "</div>";
            $("#myModal div.modal-body").replaceWith(values);
            $("#button-label").addClass("close-it");
            $("#myModal").addClass("opened");
        });
    }

       
}
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function IsUrl(url)
{
    if(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function rowClicked(id) {
    var a = "#" + id;
    var OriginalContent = $(a).text().replace(/\s+/g, " ");
    OriginalContent = OriginalContent.substring(7, OriginalContent.length);
    var d = "<tr><td colspan = '8'><input class = 'form-control data urdu-small input-lg yauk' id='Editor_" + id +"' value = '" + OriginalContent + "' ></input> </td></tr>";
    $('#saveicon').removeClass('fa-check');
    $('#saveicon').addClass('fa-save');
    if (!$(a).hasClass('done')) {
        $(a).addClass('done');
        $(a).addClass('success');
        $(a).after(d);
        var ed = "[id^=Editor_" + id + "]";
        $('input').filter(ed).setUrduInput();
        //$('input').filter(ed).css("font-size","small");
        setTimeout(function () { $('input').filter(ed).focus() }, 300);
    }
}
function radioLoaded() {
    $('option2').button('toggle');
}
function validate() {
    if (document.getElementById('option1').checked) {
        $('option2').button('toggle');
        if (meter.length == 0) {
            $('[id^=section2]').show();
            $("#outputTable").addClass("table-bordered");
        }
        else {
            var abs = '[id*=-' + meter + '-]';
            $('[id^=section2]').filter(abs).show();
            $("#outputTable").addClass("table-bordered");
        }
    }
    else {
        if (meter.length == 0) {
            $('[id^=section2]').hide();
            $("#outputTable").removeClass("table-bordered");
        }
        else {
            var abs = '[id*=-' + meter + '-]';
            $('[id^=section2]').filter(abs).hide();
            $("#outputTable").removeClass("table-bordered");
        }
    }
}
function validate_create() {
    if (document.getElementById('option1').checked) {
        $('option2').button('toggle');
        if (meter.length == 0) {
            $('[id^=section2]').show();
            $("#outputTable").addClass("table-bordered");
        }
        else {
            var abs = '[id*=-' + meter + '-]';
            $('[id^=section2]').filter(abs).show();
            $("#outputTable").addClass("table-bordered");
        }
    }
    else {
        if (meter.length == 0) {
            $('[id^=section2]').hide();
            $("#outputTable").removeClass("table-bordered");
        }
        else {
            var abs = '[id*=-' + meter + '-]';
            $('[id^=section2]').filter(abs).hide();
            $("#outputTable").removeClass("table-bordered");
        }
    }
}
function menuInit(e) {
    meter = e.substring(15, e.length);
    /*.split('|')[0];
    meter = $.trim(meter);
    meter = meter.replace(/\s/g, '_').replace("/", "");*/
    var select = "[id^=" + e.split('|')[0] + "]";
    $('[id^=meter_taqti_li_]').removeClass('active');
    $(select).addClass('active');
    $('[id^=section0]').hide();
    $('[id^=section1]').hide();
    $('[id^=section2]').hide();
    values = meter.split('|');

    for (var i = 0; i < values.length; i++) {

        var abs = '[id*=-' + values[i].replace("/", "").replace("(", "").replace(")", "") + '-]';
        $("tbody").filter(abs).show();
    }

    if (document.getElementById('option2').checked) {
        $("#outputTable").removeClass("table-bordered");
        $('[id^=section2]').hide();
    }
}
function menuSelect(e) {
    var select = "[id^=meter_taqti_li_" + e.split('|')[0] + "]";
    $('[id^=meter_taqti_li_]').removeClass('active');
    $(select).addClass('active');
    if (e == "all") {
        meter = "all";
        $('[id^=section0]').show();
        $('[id^=section1]').show();
        if (document.getElementById('option1').checked) {
            $('[id^=section2]').show();
            $("#outputTable").addClass("table-bordered");

        }
        else {
            $('[id^=section2]').hide();
            $("#outputTable").removeClass("table-bordered");

        }
    }
    else {
        meter = e;
        $('[id^=section0]').hide();
        $('[id^=section1]').hide();
        $('[id^=section2]').hide();
        values = e.split('|');

        for (var i = 0; i < values.length; i++) {

            var abs = '[id*=-' + values[i].replace("/", "").replace("(", "").replace(")", "") + '-]';
            $("tbody").filter(abs).show();
        }

        $("#outputTable").addClass("table-bordered");


        if (document.getElementById('option2').checked) {
            $("#outputTable").removeClass("table-bordered");
            $('[id^=section2]').hide();
        }
    }
}
function menuSelectExamples(e) {
    var d = e.replace("/", "");
    var select = "[id*=-" + d + "-]";
    $('[id^=meter_li_]').removeClass('active');
    $(select).addClass('active');
    $(this).addClass('active');
    if (e == "all") {
        meter = "";
        if (poet == "") {
            if (type == "") {
                $('tr').show();
            }
            else {
                var tn = '[id*=' + type + ']';
                $("tr").filter(tn).show();
            }
        }
        else {
            if (type == "") {
                var tn = '[id*=-' + poet + '-]';
                $("tr").filter(tn).show();
            }
            else {
                var tn = '[id*=' + type + ']';
                var tn2 = '[id*=' + poet + ']';
                $("tr").filter(tn).filter(tn2).show();
            }

        }
    }
    else {
        meter = e;

        $('tr').hide();
        if (poet == "") {
            if (type == "") {
                var abs = '[id*=-' + e + '-]';
                $("tr").filter(abs).show();
            }
            else {
                var tn = '[id*=' + type + ']';
                var tn2 = '[id*=-' + e + '-]';
                $("tr").filter(tn).filter(tn2).show();
            }
        }
        else {
            if (type == "") {
                var tn = '[id*=' + poet + ']';
                var tn2 = '[id*=-' + e + '-]';
                $("tr").filter(tn).filter(tn2).show();
            }
            else {
                var abs = '[id*=' + type + ']';
                var tn = '[id*=-' + meter + '-]';
                var tn2 = '[id*=' + poet + ']';
                $("tr").filter(abs).filter(tn).filter(tn2).show();
            }
        }
    }
    $('#main').show();
}
function menuSelectPoets(e) {
    var select = "#poet_li_" + e;
    $('[id^=poet_li_]').removeClass('active');
    $(select).addClass('active');
    $(this).addClass('active');
    if (e == "all") {
        poet = "";
        if (meter == "") {
            if (type == "") {
                $('tr').show();
            }
            else {
                var tn = '[id*=' + type + ']';
                $("tr").filter(tn).show();
            }
        }
        else {
            if (type == "") {
                var tn = '[id*=-' + meter + '-]';
                $("tr").filter(tn).show();
            }
            else {
                var tn = '[id*=' + type + ']';
                var tn2 = '[id*=-' + meter + '-]';
                $("tr").filter(tn).filter(tn2).show();
            }

        }
    }
    else {
        poet = e;

        $('tr').hide();
        if (meter == "") {
            if (type == "") {
                var abs = '[id*=' + e + ']';
                $("tr").filter(abs).show();
            }
            else {
                var tn = '[id*=' + type + ']';
                var tn2 = '[id*=' + e + ']';
                $("tr").filter(tn).filter(tn2).show();
            }
        }
        else {
            if (type == "") {
                var tn = '[id*=-' + meter + '-]';
                var tn2 = '[id*=' + e + ']';
                $("tr").filter(tn).filter(tn2).show();
            }
            else {
                var abs = '[id*=' + type + ']';
                var tn = '[id*=-' + meter + '-]';
                var tn2 = '[id*=' + poet + ']';
                $("tr").filter(abs).filter(tn).filter(tn2).show();
            }
        }
    }
    $('#main').show();

}
function menuSelectTypes(e) {
    var select = "#type_li_" + e;
    $('[id^=type_li_]').removeClass('active');
    $(select).addClass('active');
    $(this).addClass('active');
    if (e == "all") {
        type = "";
        if (meter == "") {
            if (poet == "") {
                $('tr').show();
            }
            else
            {
                var tn = '[id*=' + poet + ']';
                $("tr").filter(tn).show();
            }
        }
        else {
            if (poet == "") {
                var tn = '[id*=-' + meter + '-]';
                $("tr").filter(tn).show();
            }
            else {
                var tn = '[id*=' + poet + ']';
                var tn2 = '[id*=-' + meter + '-]';
                $("tr").filter(tn).filter(tn2).show();
            }
           
        }
    }
    else {
        type = e;

        $('tr').hide();
        if (meter == "") {
                if (poet == "") {
                var abs = '[id*=' + e + ']';
                $("tr").filter(abs).show();
            }
            else {
                    var tn = '[id*=' + poet + ']';
                    var tn2 = '[id*=' + e + ']';
                    $("tr").filter(tn).filter(tn2).show();
            }
        }
        else {
            if (poet == "") {
                var tn = '[id*=-' + meter + '-]';
                var tn2 = '[id*=' + e + ']';
                $("tr").filter(tn).filter(tn2).show();
            }
            else {
                var abs = '[id*=' + type + ']';
                var tn = '[id*=-' + meter + '-]';
                var tn2 = '[id*=' + poet + ']';
                $("tr").filter(abs).filter(tn).filter(tn2).show();
            }
        }
    }
    $('#main').show();
}
function textCopy() {
    $("#myModal").addClass("opened");
    $("#button-label").addClass("close-it");
    $("#button-label").addClass("info");
    
    var a = "td.data";
    var OriginalContent = $(a);
    var text = "";

    for (var a = 0; a < OriginalContent.length; a++)
    {
        text += $(OriginalContent[a]).text().replace(/\s+/g, " ") + "<br>";
    }
    var values = "<div class='modal-body'>" + text + "</div>";
    $("#myModal div.modal-body").replaceWith(values);


    $('#myModal').modal('toggle');
}
function saveClicked() {
    if ($('#saveicon').hasClass('fa-save')) {
        var a = "[id^=row0]";
        var OriginalContent = $(a).text().replace(/\s+/g, " ").replace(/تدوین/g, "\n").replace(/\n/,"");
        var values = {
            "text": OriginalContent,
        };
        var url = "/create/save";

        $.ajax({
            type: 'POST',
            url: url,
            data: AddAntiForgeryToken(values),
            async: false,
            success: function (data) {
                $('#saveicon').removeClass('fa-save');
                $('#saveicon').addClass('fa-check');
            }
        });
    }

}
function redirect(uri) {
    if (navigator.userAgent.match(/Android/i))
        document.location = uri;
    else
        window.location.replace(uri);
}
function search()
{
    var searchTerm = $('.search').val();
    if (searchTerm.length >= 3) {
        var url1 = "/selection/search?searchstring=" + searchTerm;
        pathArray = window.location.href.split('/');
        protocol = pathArray[0];
        host = pathArray[2];
        url = protocol + '//' + host + url1;
        redirect(ur1); 
        return false;
    }
    return false;
}
function rowTaqti(id, met, isChecked) {
    var a = "#" + id;
    var text = $(a).text().replace(/\s+/g, " ");
    var values = {
        "text": text,
        "meter": met,
        "id": id,
        "isChecked": isChecked
    };
    var url = "/create/partialindexexamples";
    $('tr').filter(a).replaceWith("<tr id = '" + id + "'><td><img src='/icons/ajax-loader.gif'></img></td></tr>").delay(500);

    $.ajax({
        type: 'POST',
        url: url,
        data: AddAntiForgeryToken(values),
        async: false,
        success: function (data) {
            $('tr').filter(a).replaceWith(data);
            setTimeout(function () {
                $('tr').filter(a).removeClass("warning");
                $('tr').filter(a).addClass("active");
            }, 2000);
        },
        error: function () {
            $('tr').filter(a).replaceWith("<tr><td align='center'>" + text +"</td></tr>");
        },
        timeout: 10000
    });
    return false;
}

function carousel() {
    carouselList = $('.data_row').toArray();
    carouselLen = carouselList.length;
    for (var i = 0; i < carouselLen; i++) {
        carouselList[i].hidden = true;
    }
    if (carouselLen > 0) {
        carouselList[0].hidden = false;
    }
}
function myTimer2() {
    if (carouselIndex < carouselLen - 1) {
        carouselList[carouselIndex].hidden = true;
        carouselList[++carouselIndex].hidden = false; 
    }
    else {
        carouselList[carouselIndex].hidden = true;
        carouselList[0].hidden = false; 
        carouselIndex = 0;
    }
}
$(document).ready(function () {
    var myVar = setInterval(myTimer, 6000);
    //if ($('#nav-home-tab').hasClass('.active')) {
    //    $('#nav-tab a[href="#nav-home"]').tab('show')    }
    //else {
    //    $('#nav-tab a[href="#nav-profile"]').tab('show')    }

    function myTimer() {
        callcount++;
        if (callcount < 0) checkNotifications();

    }
    checkNotifications();
    checkMessages();

    $('.urdukb').UrduEditor();
    $('.urdukb').attr('style', 'width:100%');
    $('.urdukb').addClass('UrduLang');
    $('.yauk').setUrduInput();
    $(".alert").alert();
    $('.carousel').carousel();
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        'placement': 'top auto',
        'container': 'body',
        'delay': { show: 0, hide: 0 },
    });
    $('[data-toggle="tooltip"]').popover({
        trigger: 'hover',
        'placement': 'top auto',
        'container': 'body',
        'delay': { show: 0, hide: 0 },
    });
    $("#mySearchForm").on("submit", function (e) {
        var searchTerm = $('.search1').val();
        if (searchTerm.length > 0) {
            var url1 = "/selection/search?searchstring=" + searchTerm;
            pathArray = window.location.href.split('/');
            protocol = pathArray[0];
            host = pathArray[2];
            url = protocol + '//' + host + url1;
            redirect(url);
            return false;
        }
        return false;
    });
    $("#mySearchForm2").on("submit", function (e) {
        var searchTerm = $('.search2').val();
        if (searchTerm.length > 0) {
            var url1 = "/selection/search?searchstring=" + searchTerm;
            pathArray = window.location.href.split('/');
            protocol = pathArray[0];
            host = pathArray[2];
            url = protocol + '//' + host + url1;
            redirect(url);
            return false;
        }
        return false;
    });
    $('li.dropdown').on('click', function () {
        if ($(this).find('a[aria-expanded]').attr('aria-expanded') == true) {
            $(this).find('a[aria-expanded]').attr('aria-expanded', false);
        }
        else {
            if ($(this).find('#messages').length == 1) {
                MessageOpened();
            }
            else {
                notificationOpened();
            }
            $(this).find('a[aria-expanded]').attr('aria-expanded', true);
        }
    });
});
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300 && scrollFlag == 0) {
        var page = parseInt($('#morestuff').attr('class'));
        if (page != null) {
            scrollFlag = 1;
            $('#morestuff').html("<img src='/icons/ajax-loader.gif'></img>");
            var url = "/home/getmore";
            var values = {
                "page": page,
            };
            $.ajax({
                type: 'POST',
                url: url,
                data: AddAntiForgeryToken(values),
                async: true,
                timeout: 5000,
                success: function (data) {
                    $('#morestuff.' + page).replaceWith(data);
                    scrollFlag = 0;
                }
            });
        }
    }
});