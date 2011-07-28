(function () {
	Titanium.include('util.js');
	Titanium.include('date.js');
	coscup.data = {};
	coscup.data.saveData = function(){
		Ti.API.info('saveData()');
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
		return coscup.data.starredPrograms;
	}
	
	coscup.data.getProgramById = function(programId){
		function isTheId(element, index, array) {
		  return (element.id == programId);
		}
		return coscup.data.program.sortOn('from').filter(isTheId)[0]; 
	}
	
	coscup.data.getProgramHTMLById = function(programId){
		var program = coscup.data.getProgramById(programId);
		var duration = new Date(program.from*1000).toString("HH:mm") + '-' +new Date(program.to*1000).toString("HH:mm");
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
	
	coscup.data.programTypes = function(){
		return coscup.data.programTypes;
	}
	
	coscup.data.programRooms = function(){
		return coscup.data.programRooms;
	}

	coscup.data.isStarred = function (programId) {
		if(typeof(coscup.data.starredPrograms) != 'undefined'){
			if(coscup.data.starredPrograms.indexOf(programId) === -1){
				return false;
			}else{
				return true;
			}
		}
	}
	
	coscup.data.starProgramById = function (programId, callback) {
		Ti.API.info('starProgramById('+programId+')')
		
		if(coscup.data.starredPrograms.indexOf(programId) === -1){
			coscup.data.starredPrograms.push(programId);
			Titanium.App.Properties.setList('starredPrograms', coscup.data.starredPrograms);
			Ti.API.info('=>' + coscup.data.starredPrograms);
			Titanium.App.fireEvent('app:starUpdate', {id: programId});
			callback();
		}else{
			Ti.API.info('The program already starred!');
		}
	}
	
	coscup.data.unstarProgramById = function (programId, callback) {
		Ti.API.info('unstarProgramById('+programId+')')
		
		var index = coscup.data.starredPrograms.indexOf(programId);
		if(index >= 0){
			Ti.API.info(coscup.data.starredPrograms);
			coscup.data.starredPrograms.splice(index, 1);
			Ti.API.info('=>' + coscup.data.starredPrograms);
			Titanium.App.Properties.setList('starredPrograms', coscup.data.starredPrograms);
			Titanium.App.fireEvent('app:starUpdate', {id: programId});
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
