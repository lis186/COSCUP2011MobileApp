(function () {
	Titanium.include('util.js');
	coscup.data = {};
	coscup.data.seatPlanUrl = [
	null,
	'http://goo.gl/v2N4E',
	'http://goo.gl/iNocy',
	'http://goo.gl/riyBd',
	'http://goo.gl/GZsYz'
	];
	
	coscup.data.getSeatPlanUrl = function(roomId){
		return coscup.data.seatPlanUrl[parseInt(roomId)];
	}
	
	coscup.data.saveData = function(){
		Titanium.App.Properties.setString('lastUpdate', new Date().getTime());
		Titanium.App.Properties.setString('program', JSON.stringify(coscup.data.program));
		Titanium.App.Properties.setString('programTypes', JSON.stringify(coscup.data.programTypes));
		Titanium.App.Properties.setString('programRooms', JSON.stringify(coscup.data.programRooms));
	}
	
	coscup.data.loadData = function(){
		coscup.data.lastUpdate = parseInt(Titanium.App.Properties.getString('lastUpdate', 0));
		coscup.data.program = JSON.parse(Titanium.App.Properties.getString('program'));
		coscup.data.programTypes = JSON.parse(Titanium.App.Properties.getString('programTypes'));
		coscup.data.programRooms = JSON.parse(Titanium.App.Properties.getString('programRooms'));
		coscup.data.starredPrograms = Titanium.App.Properties.getList('starredPrograms',[]);
		if(coscup.app.osname === 'android'){
			for( var i = 0; i < coscup.data.starredPrograms.length; i++){
				coscup.data.starredPrograms[i] = parseInt(coscup.data.starredPrograms[i]);
			}
		}
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

	coscup.data.getPrograms = function(){
		return coscup.data.program;
	}
	
	coscup.data.getStarredPrograms = function(){
		return coscup.data.starredPrograms.sort();
	}
	
	coscup.data.getProgramById = function(programId){
		function isTheId(element, index, array) {
		  return (element.id == programId);
		}
		return coscup.data.program.sortOn('from').filter(isTheId)[0]; 
	}

	coscup.data.getProgramByRoomId = function(roomId){
		function inTheRoom(element, index, array) {
			//if(element.room == '0'){
			//	return true;
			//}else {
				return (roomId == element.room);
			//}
		}
		return coscup.data.program.sortOn('from').filter(inTheRoom); 
	}
	
	coscup.data.getProgramHTMLById = function(programId){
		var program = coscup.data.getProgramById(programId);
		var duration = new Date(program.from*1000).hhmm() + '-' +new Date(program.to*1000).hhmm();
		var room = coscup.data.programRooms[program.room][coscup.i18n.locale];
		var day = new Date(program.from*1000).getDay();
		var weekday = '';
		switch (day)
		{
			case 0:
			weekday = _('sunday');
			break;
			
			case 1:
			weekday = _('monday');
			break;
			
			case 2:
			weekday = _('tuesday');
			break;
			
			case 3:
			weekday = _('wednesday');
			break;
			
			case 4:
			weekday = _('thursday');
			break;
			
			case 5:
			weekday = _('friday');
			break;
			
			case 6:
			weekday = _('saturday');
			break;
		}
		
		var html = '<div style="font-family: Arial">';
			html += '<b>'+program.name+'</b><br>';
			html += '<b>'+coscup.data.programTypes[program.type]+'</b><br>';
			html += '<b>'+weekday+' '+duration+' '+room+'<br>';
			if(typeof(program.speaker) === 'string')
			{
				html += '<b>'+program.speaker+'</b><br>';
			}
			
			if(typeof(program.speakerTitle) === 'string')
			{
				html +=  '<i>'+program.speakerTitle+'</i><p>';
			}
		html += '</div>';
		return html;
	}
	
	coscup.data.getProgramTypes = function(){
		return coscup.data.programTypes;
	}
	
	coscup.data.getProgramRooms = function(){
		return coscup.data.programRooms;
	}

	coscup.data.isStarred = function (programId) {
		if(typeof(coscup.data.starredPrograms) != 'undefined'){
			if(coscup.data.starredPrograms.indexOf(parseInt(programId)) == -1){
				return false;
			}else{
				return true;
			}
		}
	}
	
	coscup.data.starProgramById = function (programId, callback) {
		if(coscup.data.starredPrograms.indexOf(parseInt(programId)) == -1 && parseInt(programId) !=NaN){
			coscup.data.starredPrograms.push(parseInt(programId));
			Titanium.App.Properties.setList('starredPrograms', coscup.data.starredPrograms);
			Ti.API.info('=>' + coscup.data.starredPrograms);
			Ti.API.info('fire app:starUpdate');
			Titanium.App.fireEvent('app:starUpdate', {id: parseInt(programId)});
			callback();
		}else{
			Ti.API.info('The program already starred!');
		}
	}
	
	coscup.data.unstarProgramById = function (programId, callback) {
		var index = coscup.data.starredPrograms.indexOf(parseInt(programId));
		if(index >= 0){
			Ti.API.info(coscup.data.starredPrograms);
			coscup.data.starredPrograms.splice(index, 1);
			Ti.API.info('=>' + coscup.data.starredPrograms);
			Titanium.App.Properties.setList('starredPrograms', coscup.data.starredPrograms);
			Ti.API.info('fire app:starUpdate');
			Titanium.App.fireEvent('app:starUpdate', {id: parseInt(programId)});
			callback();
		}else{
			Ti.API.info('The program not yet starred!');
		}
	}
	
	coscup.data.clearStarredPrograms = function (callback) {
		coscup.data.starredPrograms = [];
		Titanium.App.Properties.setList('starredPrograms', []);
		Titanium.App.fireEvent('app:starClear');
		callback();
	}
})();
