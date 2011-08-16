(function () {
	coscup.util = {};
	coscup.util.random = function(){
		var randseed = new Date().getTime();
  		randseed = (randseed * 9301 + 49297) % 233280;
  		return randseed/(233280.0);
	}
	
	////
	Array.prototype.sortOn = function(){
		var dup = this.slice();
		if(!arguments.length) return dup.sort();
		var args = Array.apply(null,arguments);
		return dup.sort(function(a,b){
			var props = args.slice();
			var prop = props.shift();
			while(a[prop] == b[prop] && props.length) prop = props.shift();
			return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
		});
	};
	
	
	///http://www.tutorialspoint.com/javascript/array_indexof.htm
	
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
	    var len = this.length;
	
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;
	
	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}
	
	Array.prototype.removeItem = function(index) { 
	var i = 0; 
	while (i < this.length) { 
		if (this[i] == index) { 
			this.splice(i, 1); 
		} else { 
				i++; 
			} 
		} 
	} 
	
	///
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g,"");
	}
	
	///
	
	if (!Array.prototype.filter)
	{
	  Array.prototype.filter = function(fun /*, thisp*/)
	  {
	    var len = this.length;
	    if (typeof fun != "function")
	      throw new TypeError();
	
	    var res = new Array();
	    var thisp = arguments[1];
	    for (var i = 0; i < len; i++)
	    {
	      if (i in this)
	      {
	        var val = this[i]; // in case fun mutates this
	        if (fun.call(thisp, val, i, this))
	          res.push(val);
	      }
	    }
	
	    return res;
	  };
	}
	
	///
	Date.prototype.hhmm = function() {
		var date=this;
		var h = date.getHours();
		var m = (this.getMinutes()<10)? ('0'+this.getMinutes()) : this.getMinutes();
		return h+':'+m;
	}
	
	/// color 
	//http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript
	// Use
	//var darker = cosup.util.darkerColor('rgba(80, 75, 52, .5)', .2);
	//var lighter = cosup.util.lighterColor('rgba(80, 75, 52, .5)', .2);

	var pad = function(num, totalChars) {
	    var pad = '0';
	    num = num + '';
	    while (num.length < totalChars) {
	        num = pad + num;
	    }
	    return num;
	};
	
	// Ratio is between 0 and 1
	var changeColor = function(color, ratio, darker) {
	    // Trim trailing/leading whitespace
	    color = color.replace(/^\s*|\s*$/, '');
	
	    // Expand three-digit hex
	    color = color.replace(
	        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
	        '#$1$1$2$2$3$3'
	    );
	
	    // Calculate ratio
	    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
	        // Determine if input is RGB(A)
	        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '\\s*,\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '\\s*,\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '(?:\\s*,\\s*' +
	            '(0|1|0?\\.\\d+))?' +
	            '\\s*\\)$'
	        , 'i')),
	        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,
	
	        // Convert hex to decimal
	        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
	            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
	            function() {
	                return parseInt(arguments[1], 16) + ',' +
	                    parseInt(arguments[2], 16) + ',' +
	                    parseInt(arguments[3], 16);
	            }
	        ).split(/,/),
	        returnValue;
	
	    // Return RGB(A)
	    return !!rgb ?
	        'rgb' + (alpha !== null ? 'a' : '') + '(' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
	            ) + ', ' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
	            ) + ', ' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
	            ) +
	            (alpha !== null ? ', ' + alpha : '') +
	            ')' :
	        // Return hex
	        [
	            '#',
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2),
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2),
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2)
	        ].join('');
	};
	
	coscup.util.lighterColor = function(color, ratio) {
	    return changeColor(color, ratio, false);
	};
	coscup.util.darkerColor = function(color, ratio) {
	    return changeColor(color, ratio, true);
	};
	


})();
