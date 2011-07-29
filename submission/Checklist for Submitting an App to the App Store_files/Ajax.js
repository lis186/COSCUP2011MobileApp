/* Generic javascript to perform AJAX requests.

using it:
    var ajax = new Ajax();

    var myHandler = function(request) {     // must be defined BEFORE connect
        var response = request.responseText;
    }

    ajax.connect('url', myHandler);
    
If the url is to a mason page, put the code inside the init block and use "print" to return text (to responseText).

xml example:

    var response = request.responseXML.documentElement;
    var result   = xml(response, 'result');  

*/
function Ajax() {

    var request = false;
    try {
         request = new XMLHttpRequest();
    } catch (trymicrosoft) {
         try {
           request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (othermicrosoft) {
           try {
              request = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (failed) {
              request = false;
           }  
         }
    }
    
    if (!request) return false;
        
    this.connect = function(url, handler) {

        request.open('GET', url, true);
        
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                handler(request);
            }
        }

        request.send(null);
    }
    
    return this;
}

function AjaxPost() {

    var request = false;
    try {
         request = new XMLHttpRequest();
    } catch (trymicrosoft) {
         try {
           request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (othermicrosoft) {
           try {
              request = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (failed) {
              request = false;
           }  
         }
    }
    
    if (!request) return false;
        
    this.connect = function(url, strSubmit, handler) {

        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
//                eval(handler + '(request.responseText;);');
                handler(request);
            }
        }

        request.send(strSubmit);
    }
    
    return this;
}

function xml(response, tag) {
    return response.getElementsByTagName(tag)[0].firstChild.data;
}
