
function show_comment_form(abbrev) 
{
    if (posted == 1) 
    {
        alert("Please reload the page if you'd like to post another comment.");
    }
    else 
    {
        var ajax = new Ajax();
        var myHandler = function(request) {
            var response = request.responseText;
            document.form2.action="http://www.idev101.com/comment.html";
            var input   = document.createElement("input");
            input.name  = 'authkey';
            input.type  = 'hidden';
            input.value = response;
            document.form2.appendChild(input);
            document.form2.name.value = '';
            document.form2.email.value = '';
            document.form2.url.value = '';
            document.form2.message.value = '';
            $("#formbutn").hide("fast");
            $("#comment_form").show("medium");
            window.scrollBy(0,100);
            document.form2.name.focus();   
        }   
        ajax.connect('http://www.idev101.com/ajax/getkey.html?abbrev=' + abbrev, myHandler); 
        document.form2.name.focus();
    }
    
}

function show_preview() 
{
    var name    = document.form2.name.value;
    var email   = document.form2.email.value;
    var url     = document.form2.url.value;
    var message = document.form2.message.value;
    var abbrev  = document.form2.abbrev.value;
    var authkey = document.form2.authkey.value;
    var queryString = 'name=' + escape(name) + '&email=' + escape(email) + '&url=' + escape(url) + '&message=' + escape(message) + '&abbrev=' + escape(abbrev) + '&authkey=' + escape(authkey);

    var errorString = "";
    if (name == "") {
        errorString += "Please enter your name.\n"
    }
    if (invalidEmail(email)) {
        errorString += "Please enter a valid e-mail address.\n";
    }
    if (message == "") {
        errorString += "Please enter a message.\n";
    }
    if (errorString != "") {
        alert(errorString);
    }
    else {
        var ajax = new AjaxPost();
        var myHandler = function(request) {
            var response = request.responseText;
            $("#comment_preview").show("medium");
            $("#comment_preview").html("<h3>Message Preview</h3>\n" + response );
        }   
        ajax.connect('http://www.idev101.com/ajax/preview.html', queryString, myHandler); 
    }
}

function post_comment() 
{
    var name    = document.form2.name.value;
    var email   = document.form2.email.value;
    var url     = document.form2.url.value;
    var message = document.form2.message.value;
    var abbrev  = document.form2.abbrev.value;
    var authkey = document.form2.authkey.value;
    var queryString = 'name=' + escape(name) + '&email=' + escape(email) + '&url=' + escape(url) + '&message=' + escape(message) + '&abbrev=' + escape(abbrev) + '&authkey=' + escape(authkey);

    var errorString = "";
    if (name == "") {
        errorString += "Please enter your name.\n"
    }
    if (invalidEmail(email)) {
        errorString += "Please enter a valid e-mail address.\n";
    }
    if (message == "") {
        errorString += "Please enter a message.\n";
    }
    if (errorString != "") {
        alert(errorString);
    }
    else {
        var ajax = new AjaxPost();  
        var myHandler = function(request) {
            var response  = request.responseXML.documentElement;
            alert(response);
            var result    = xml(response, 'result');
            
            if (result == "ok") {
                posted     = 1;
                var newmsg = xml(response, 'html');
                document.form2.authkey.value = '';
                $("#formbutn").hide("fast");
                $("#comment_preview").hide("fast");
                $("#comment_form").hide("fast");
                $("#newcomment").html( response );
                $("#newcomment").show("medium");
            }
            else {
                var errmsg   = xml(response, 'errmsg');
                $("#comment_preview").show("medium");
                $("#comment_preview").html("<h3>Error</h3>\n" + errmsg );
            }
        }   
        ajax.connect('http://www.idev101.com/ajax/post.xml', queryString, myHandler); 
    }
}

function invalidEmail(str) 
{
    var validRegExp = /^[^@]+@[^@]+.[a-z]{2,}$/i;
    if (str.search(validRegExp) == -1)  {
        return 1;
    }
    return 0;
    // return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
}