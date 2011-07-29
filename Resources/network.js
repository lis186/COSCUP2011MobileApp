(function(){
	coscup.network = {};
	Titanium.include('data.js');
	////////////Update Data
	coscup.network.getSponsors = function (callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function()
		{
			//Ti.API.info(this.responseText);
			var result = {};
			if(this.responseText != null)
			{
				result.sponsors = this.responseText;
				//Ti.API.info(result);
			}else
			{
				result.error = 'Unable download sponsors data.';
			}
			
			if(typeof(callback) === 'function'){
				callback(result);
			}
		};
		var url = 'http://coscup.org/2011/api/sponsors/';
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	}
	
	coscup.network.getProgram = function (callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function()
		{
			//Ti.API.info(this.responseText);
			var result = {};
			if(this.responseText != null)
			{
				result.program = this.responseText;
				//Ti.API.info(result);
			}else
			{
				result.error = 'Unable download program data.';
			}
			
			if(typeof(callback) === 'function'){
				callback(result);
			}
		};
		var url = 'http://coscup.org/2011/api/program/';
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	}
	
	coscup.network.getProgramTypes = function (callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function()
		{
			//Ti.API.info(this.responseText);
			var result = {};
			if(this.responseText != null)
			{
				result.programTypes = this.responseText;
				//Ti.API.info(result);
			}else
			{
				result.error = 'Unable download program types data.';
			}
			
			if(typeof(callback) === 'function'){
				callback(result);
			}
		};
		var url = 'http://coscup.org/2011/api/program/types/';
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	}
	
	coscup.network.getProgramRooms = function (callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function()
		{
			//Ti.API.info(this.responseText);
			var result = {};
			if(this.responseText != null)
			{
				result.programRooms = this.responseText;
				//Ti.API.info(result);
			}else
			{
				result.error = 'Unable download program rooms data.';
			}
			
			if(typeof(callback) === 'function'){
				callback(result);
			}
		};
		var url = 'http://coscup.org/2011/api/program/rooms/';
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	}
	
	///////////update all data
	
	coscup.network.updateAll = function(callback){
		Titanium.App.fireEvent('app:show_indicator');
		coscup.network.getProgram(function(e){
			coscup.data.program = JSON.parse(e.program);
			coscup.network.getProgramTypes(function(e){
				coscup.data.programTypes = JSON.parse(e.programTypes);
				coscup.network.getProgramRooms(function(e){
					Titanium.App.fireEvent('app:hide_indicator');
					coscup.data.programRooms = JSON.parse(e.programRooms);
					coscup.data.saveData();
					Ti.API.info('program:' + coscup.data.program);
					Ti.API.info('programTypes:' + coscup.data.programTypes);
					Ti.API.info('programRooms:' + coscup.data.programRooms);
					coscup.data.loadData();					
					callback();
				})
			});
		});
	};
	
	coscup.network.getCoscupWebContent = function(keyword ,callback)
	{
		var xhr = Titanium.Network.createHTTPClient();
		//Titanium.App.fireEvent('app:show_indicator');
		xhr.onload = function()
		{
		//	Titanium.App.fireEvent('app:hide_indicator');
			//Ti.API.info(this.responseText);
			var result = {};
			if(this.responseText != null)
			{
				var doc = this.responseXML.documentElement;
				var content = '<html>';
					content += '<head>';
					content += '<link rel="stylesheet" type="text/css" href="http://coscup.org/2011-theme/assets/mobile.css" media="handheld, screen and (max-width: 480px)" />';
					content += '<link rel="stylesheet" type="text/css" href="http://coscup.org/2011-theme/assets/style.css" media="print, screen and (min-width: 481px)" />';
					content += '</head>';
					content += '<body style="padding: 5px">';
					content += Titanium.XML.serializeToString(doc.getElementsByTagName("results").item(0));
					content += '</body>'
					content += '</html>';
				result.content = content;
				callback(result);
			}else
			{
				result.error = 'Unable download program rooms data.';
			}
			
			if(typeof(callback) === 'function'){
				callback(result);
			}
		};
		
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fcoscup.org%2F2011%2F"+coscup.i18n.locale+"%2F"+keyword+"%2F%22%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22content%22%5D'&diagnostics=true";
		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	}
	//////////
	/*
	coscup.plurkKey = '';
	coscup.network.plurkLogin = function(username, password, callback){
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function()
		{
			Ti.API.info(this.responseText);
			callback(this.responseText);
		};
		var url = 'https://www.plurk.com/API/Users/login?'
				+ 'api_key='+coscup.plurkKey
				+ '&username='+ username
				+ '&password='+ password;

		Ti.API.info(url);
		xhr.open('GET', url);
		xhr.send();
	};*/
})();



