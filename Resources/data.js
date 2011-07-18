(function () {
	coscup.data = {};
	
	coscup.data.saveData = function(){
		Ti.API.info('saveData()');
		Titanium.App.Properties.setString('lastUpdate', new Date().getTime());
		Titanium.App.Properties.setString('program', JSON.stringify(coscup.data.program));
		Titanium.App.Properties.setString('programTypes', JSON.stringify(coscup.data.programTypes));
		Titanium.App.Properties.setString('programRooms', JSON.stringify(coscup.data.programRooms));
		Ti.API.info(Titanium.App.Properties.getString('program').length);
	}
	coscup.data.loadData = function(){
		coscup.data.lastUpdate = parseInt(Titanium.App.Properties.getString('lastUpdate', 0));
		coscup.data.program = JSON.parse(Titanium.App.Properties.getString('program'));
		coscup.data.programTypes = JSON.parse(Titanium.App.Properties.getString('programTypes'));
		coscup.data.programRooms = JSON.parse(Titanium.App.Properties.getString('programRooms'));
	}
	
	coscup.data.needUpdate = function(){
		if(new Date().getTime() - parseInt(Titanium.App.Properties.getString('lastUpdate', 0)) > 86400000)
		{
			return true;
		}else
		{
			return false;
		}
	}
	
	
})();
