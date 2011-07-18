var coscup = {};
coscup.osname = Titanium.Platform.osname;
//TODO: need to fix lunch first time bug
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
		Ti.API.info('sponsors:' + coscup.data.sponsors);	
		coscup.appTabGroup = coscup.ui.createAppTabGroup();
		coscup.appTabGroup.open();
	});
}else{
	Ti.API.info('No need to update');
	coscup.data.loadData();
	coscup.appTabGroup = coscup.ui.createAppTabGroup();
	coscup.appTabGroup.open();
}


	