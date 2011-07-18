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
	
})();
