Titanium.UI.setBackgroundColor = '#676835';

var coscup = {};
coscup.app = {};
coscup.app.osname = Titanium.Platform.osname;
coscup.app.version = Titanium.Platform.version;

Ti.API.info('version: '+coscup.app.version);
Titanium.include('data.js');
Titanium.include('network.js');
Titanium.include('ui.js');
Titanium.include('i18n.js');
coscup.indicatorWin = coscup.ui.createIndicatorWin();
	
if(coscup.data.needUpdate())
{
	Ti.API.info('Data expired...');
	coscup.network.updateAll(function(){
		Ti.API.info('Data updated');
		Ti.API.info('program:' + coscup.data.program);
		Ti.API.info('programTypes:' + coscup.data.programTypes);
		Ti.API.info('programRooms:' + coscup.data.programRooms);
		coscup.ui.init();
	});
}else{
	Ti.API.info('No need to update');
	coscup.data.loadData();
	Ti.API.info('Data loaded');
	Ti.API.info('program:' + coscup.data.program);
	Ti.API.info('programTypes:' + coscup.data.programTypes);
	Ti.API.info('programRooms:' + coscup.data.programRooms);
	Ti.API.info('coscup.data.starredPrograms: '+ coscup.data.starredPrograms);
	coscup.ui.init();
}