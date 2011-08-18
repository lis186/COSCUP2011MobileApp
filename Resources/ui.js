(function () {
	Titanium.include('util.js');
	Titanium.include('network.js');
	Titanium.include('data.js');
	Titanium.include('i18n.js');
	Titanium.include('style.js');
	coscup.ui = {};
	coscup.ui.createIndicatorWin = function()
	{
		var win = Titanium.UI.createWindow({
			backgroundColor: 'transparent'
		});
		
		var indicatorContainer = Titanium.UI.createView(coscup.style.indicatorContainer);	
		var loading = Titanium.UI.createImageView(coscup.style.loading);
		
		indicatorContainer.add(loading);
		win.add(indicatorContainer);
		return win;
	};
	
	coscup.ui.init = function() {
		Ti.API.info(coscup.app.osname);
		switch (coscup.app.osname){
			case 'android':
				coscup.appTabGroup = coscup.ui.createAppTabGroup();
				coscup.appTabGroup.open();
				coscup.appTabGroup.addEventListener('focus', function(e){
					coscup.appTabGroup.activeTab.window.fireEvent('focus');
				})
				break;
			
			case 'iphone':
				coscup.appTabGroup = coscup.ui.createAppTabGroup();
				coscup.appTabGroup.open();
				break;
			
			case 'ipad':
				coscup.appTabGroup = coscup.ui.createAppTabGroup();
				coscup.appTabGroup.open();
				break;
			
			default:
				Ti.API.error('unknow device');
		}
	}
	
	coscup.ui.createAppTabGroup = function () {
		
		var appTabGroup = Titanium.UI.createTabGroup();
		coscup.coscupTab = Titanium.UI.createTab({
			title: 'COSCUP',
			window: coscup.ui.createCoscupWin()
		});
		
		coscup.scheduleTab = Titanium.UI.createTab({
			title: _('schedule'),
			window: coscup.ui.createScheduleWin()
		});
		
		coscup.programTab = Titanium.UI.createTab({
			title: _('program'),
			window: coscup.ui.createProgramWin()
		});
		
		coscup.placeTab = Titanium.UI.createTab({
			title: _('place'),
			window: coscup.ui.createPlaceWin()
		});
		
		coscup.starredTab = Titanium.UI.createTab({
			title: _('starred'),
			window: coscup.ui.createStarredWin()
		});
		
		appTabGroup.addTab(coscup.coscupTab);
		appTabGroup.addTab(coscup.scheduleTab);
		appTabGroup.addTab(coscup.programTab);
		appTabGroup.addTab(coscup.placeTab);
		appTabGroup.addTab(coscup.starredTab);
		
		coscup.coscupTab.icon = 'images/coscup_tab_icon.png';
		coscup.scheduleTab.icon = 'images/schedule_tab_icon.png';
		coscup.programTab.icon = 'images/program_tab_icon.png';
		coscup.placeTab.icon = 'images/place_tab_icon.png';
		coscup.starredTab.icon = 'images/star_tab_icon.png';

		return appTabGroup;
	}
	
	coscup.ui.createCoscupWin = function(){
		var win = Titanium.UI.createWindow({
			title: 'COSCUP',
			backgroundColor: '#fff',
			barColor: coscup.style.color.barColor,
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
	
		var infoSection = Ti.UI.createTableViewSection({headerTitle: _('information')});
		var aboutRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		aboutRow.title = _('about');
		aboutRow.id = 'about';
		infoSection.add(aboutRow);
		
		var busRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		busRow.title = _('bus');
		busRow.id = 'bus';
		infoSection.add(busRow);
		
		var venueRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		venueRow.title = _('venue');
		venueRow.id = 'venue';
		infoSection.add(venueRow);
		
		var sponsorsRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		sponsorsRow.title = _('sponsors');
		sponsorsRow.id = 'sponsors';
		infoSection.add(sponsorsRow);
		
		var blogRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		blogRow.title = _('blog');
		blogRow.id = 'blog';
		infoSection.add(blogRow);
		
		var socialSection = Ti.UI.createTableViewSection({headerTitle: _('social')});
		
		var twitterRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		twitterRow.title = _('twitter');
		twitterRow.id = 'twitter';
		socialSection.add(twitterRow);

		var plurkRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		plurkRow.title = _('plurk');
		plurkRow.id = 'plurk';
		socialSection.add(plurkRow);
		
		var ircRow = Ti.UI.createTableViewRow(coscup.style.menuRow);
		ircRow.title = _('IRC');
		ircRow.id = 'IRC';
		socialSection.add(ircRow);
		
		function isUpcoming(element, index, array) {
			//Ti.API.info(element.from);
			//Ti.API.info(new Date().getTime()/1000);
			var now = new Date();
			return (element.from > now.getTime()/1000);
		}

		function isOngoing(element, index, array) {
			var now = new Date();
			return (element.from > now.getTime()/1000 && element.to < new Date().getTime()/1000);
		}
		
		function createUpcomingSection(){
			var section = Ti.UI.createTableViewSection({headerTitle: _('upcoming')});
		
			for(var i = 0, l = coscup.data.getProgramRooms().length; i < l; i++){
				var upcomingPrograms = coscup.data.getProgramByRoomId(i).filter(isUpcoming);
				if(upcomingPrograms.length > 0){
					programId = upcomingPrograms[0].id;
					var roomRow = coscup.ui.createProgramRow(coscup.data.getProgramById(programId));
					roomRow.id = 'program';
					roomRow.programId = programId;
					roomRow.header = 'coscup.data.getProgramRooms()[i][coscup.i18n.locale]';
					section.add(roomRow);
				}
			}
	
			if(section.rowCount === 0){
				var row = Titanium.UI.createTableViewRow({title: _('see_you_next_year'), backgroundColor: '#fff'});
				section.add(row);
			}
			
			return section;
		}

		var table = Titanium.UI.createTableView();
		
		table.showData = function(){
			var upcomingSection = createUpcomingSection();
			var now =  new Date();
			if(now < new Date(2011, 7, 20)){
				var data = [
				infoSection,
				socialSection,
				upcomingSection
				];
			}else{
				var data = [
				upcomingSection,
				infoSection,
				socialSection
				];			
			}
			table.setData(data);
		}
		
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad')
		{
			table.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
			if(coscup.app.osname === 'ipad'){
				table.backgroundColor = '#eee';
			}
			
			var infoButton = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT
			});
		
			var updateButton = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
			});
			win.leftNavButton = infoButton;
			win.rightNavButton = updateButton;
			
			infoButton.addEventListener('click', function(){
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: _('about_the_app'),
				    message: _('powered_by'),
				    buttonNames: [_('ok')]
				});
				alertDialog.show();
			});
			
			updateButton.addEventListener('click', function(){
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: _('update_data'),
				    message: _('are_you_sure_you_want_to_update_data'),
				    buttonNames: [_('ok'), _('cancel')]
				});
				alertDialog.addEventListener('click', function(e){
					if(e.index === 0){
						coscup.appTabGroup.close();
						Ti.API.info('Update Data');
						coscup.network.updateAll(function(){
							Ti.API.info('Data updated');
							Ti.API.info('program:' + coscup.data.program);
							Ti.API.info('programTypes:' + coscup.data.getProgramTypes());
							Ti.API.info('programRooms:' + coscup.data.getProgramRooms()());
							coscup.ui.init();
						});
					}
				});
				alertDialog.show();
			});
		}
		
		table.addEventListener('click', function(e){
			var url;
			switch (e.rowData.id){
				case 'about':
				url = 'http://coscup.org/2011/'+coscup.i18n.locale+'/about/';
				coscup.appTabGroup.activeTab.open(coscup.ui.createWebSummaryWin({title: _(e.source.id), keyword: e.source.id}));
				break;

				case 'bus':
				url = 'http://blog.coscup.org/2011/08/coscup-2011_16.html';
				coscup.appTabGroup.activeTab.open(coscup.ui.createWebWin({title: _(e.source.id), webUrl: url}));
				break;
				
				case 'venue':
				url = 'http://coscup.org/2011/'+coscup.i18n.locale+'/venue/';
				coscup.appTabGroup.activeTab.open(coscup.ui.createVenueWin());
				break;

				case 'sponsors':
				url = 'http://coscup.org/2011/'+coscup.i18n.locale+'/sponsors/';
				coscup.appTabGroup.activeTab.open(coscup.ui.createWebSummaryWin({title: _(e.source.id), keyword: e.source.id}));
				break;

				case 'blog':
				var blogWin = coscup.ui.createWebWin({title: _(e.source.id), webUrl: 'http://blog.coscup.org/'});
				coscup.appTabGroup.activeTab.open(blogWin);
				break;
				
				case 'twitter':
				var twitterWin = coscup.ui.createWebWin({title: _(e.source.id), webUrl: 'https://twitter.com/#!/coscup'});
				coscup.appTabGroup.activeTab.open(twitterWin);
				break;
				
				case 'plurk':
				var plurkWin = coscup.ui.createWebWin({title: _(e.source.id), webUrl: 'http://www.plurk.com/coscup'});
				coscup.appTabGroup.activeTab.open(plurkWin);
				break;
				
				case 'IRC':
				var ircWin = coscup.ui.createWebWin({title: _(e.source.id), webUrl: 'http://webchat.freenode.net/?channels=coscup'});
				coscup.appTabGroup.activeTab.open(ircWin);
				break;
				
				case 'program':
				
				if(e.x < 55)
				{	
					if(coscup.data.isStarred(e.source.programId)){
						Ti.API.info('unstar ' + e.source.programId);
						coscup.data.unstarProgramById(e.rowData.programId, function(){
							Ti.API.info('unstarred');
							if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
								e.rowData.children[2].image = 'images/unstarred.png';
							}else if(coscup.app.osname === 'android'){
								table.showData();
							}
						});
					}else{
						Ti.API.info('star ' + e.source.programId);
						coscup.data.starProgramById(e.rowData.programId, function(){
							Ti.API.info('starred');
							if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
								e.rowData.children[2].image = 'images/starred.png';
							}else if(coscup.app.osname === 'android'){
								table.showData();
							}
						});
					}
				}else{
					coscup.appTabGroup.activeTab.open(coscup.ui.createProgramDetailWin(e.rowData.programId));
				}
				
				break;
			}			
		});

		win.add(table);
		table.showData();
		
		win.addEventListener('focus', function(){
			table.showData();
		});	
		return win;
	}
	
	coscup.ui.createVenueWin = function(){
		var win = Titanium.UI.createWindow({
			title: _('venue'),
			barColor: coscup.style.color.barColor,
			backgroundColor: '#fff',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'}),
			tabBarHidden: true
		});
		
		var mapView = Titanium.Map.createView({
		    mapType: Titanium.Map.STANDARD_TYPE,
		    region: {
				latitude: 25.041197,
			 	longitude: 121.611920, 
		        latitudeDelta: 0.005,
				longitudeDelta: 0.005
				},
		    animate: true,
		   	regionFit: false,
		    userLocation: true
		});
		
		var venue = Titanium.Map.createAnnotation({
					latitude: 25.041197,
				    longitude: 121.611920,
				    title: _('hss_building'),
				    pincolor: Titanium.Map.ANNOTATION_RED,
				    animate: true,
					rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
		});
		
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
			var directionButtion = Titanium.UI.createButton({
				title: _('directions')
			});
			win.rightNavButton = directionButtion;
			
			directionButtion.addEventListener('click', function()
			{
				var directionsWin = coscup.ui.createWebWin({title: _('directions'), webUrl: 'http://www.sinica.edu.tw/location.htm'});
				coscup.appTabGroup.activeTab.open(directionsWin);
			});
		}

		mapView.annotations = [venue];
		win.add(mapView);
		
		mapView.addEventListener('click', function(e)
		{
			if(e.clicksource === 'rightButton'){
				var dialog = Titanium.UI.createOptionDialog({
				options: [_('open_in_google_maps'), _('sent_via_email'), _('cancel')],
				    cancel: 2
				});
				
				dialog.addEventListener('click', function(e){
					switch(e.index)
					{
						case 0:
							Titanium.Platform.openURL(encodeURI('http://maps.google.com/maps?q='+_('hss_building')+'@'+venue.latitude+','+venue.longitude+'&ie=UTF8&t=h&z=19'));
							break;
						case 1:
							var emailDialog = Titanium.UI.createEmailDialog({html: true});
							emailDialog.subject = _('hss_building');
							emailDialog.toRecipients = [];
							emailDialog.messageBody = '<a href="http://maps.google.com/maps?q='+_('hss_building')+'@'+venue.latitude+','+venue.longitude+'&ie=UTF8&t=h&z=19">'+_('hss_building')+'</a>';
							emailDialog.open();
							break;
						
						default:
						  Ti.API.info('Cancel');
					}
				});
				dialog.show();
			}
		});
		return win;
	}
	
	coscup.ui.createScheduleWin = function(){
		var win = Titanium.UI.createWindow({
			title: _('schedule'),
			barColor: coscup.style.color.barColor,
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'}),
			backgroundColor: '#fff'
		});
		
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad')
		{
			var toolbar = Titanium.UI.createView({
				backgroundImage: 'images/toolbar_bg.png',
				top: -1,
				weight: '100%',
				height: 43
			})
			
			var dataTabbedBar = Titanium.UI.createTabbedBar({
			    labels:[_('day_1'), _('day_2')],
			    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
			    top: 5,
			    height: 30,
			    width: 300,
			    index: 0
			});
			
			dataTabbedBar.addEventListener('click', function (e) {
				switch(e.index)
				{
					case 0:
		   	 		tableContainer.scrollToView(0);
  					break;
					
					case 1:
		   	 		tableContainer.scrollToView(1);
					break;
				}
			})
			win.add(toolbar);
			win.add(dataTabbedBar);
		}
		
		function isDay1(element, index, array) {
		  return (element.from < new Date(2011,7,21).getTime()/1000);
		}
		
		function isDay2(element, index, array) {
		  return (element.from > new Date(2011,7,21).getTime()/1000);
		}
		
		var day1Table = coscup.ui.createProgramTableView({headerType: 'time'}, coscup.data.program.sortOn('from').filter(isDay1));
		var day2Table = coscup.ui.createProgramTableView({headerType: 'time'}, coscup.data.program.sortOn('from').filter(isDay2));
		day1Table.id = 'day1Table';
		day2Table.id = 'day2Table';
		
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad')
		{
			var tableContainer = Titanium.UI.createScrollableView({
			top: 40,
			views: [day1Table, day2Table]
			});
		
			tableContainer.addEventListener('scroll', function(e){
				if(e.source === tableContainer)
				{
					dataTabbedBar.index = e.currentPage;
				}
			});
			win.add(tableContainer);
			
		}else if(coscup.app.osname === 'android')
		{
			day1Table.top = '50dp';
			day2Table.top = '50dp';
			win.add(day1Table);
			win.add(day2Table);
			day1Table.show();
			day2Table.hide();
			
			var buttonContainer = Titanium.UI.createView({
				width: '320dp',
				height: '50dp',
				top: 2
			});
			
			if(Titanium.Platform.displayCaps.platformWidth > 640){
				buttonContainer.left = 0;
			}
			
			var day1Button = Titanium.UI.createButton({
				title: _('day_1'),
				top: 0,
				left: 0,
				width: '50%',
				height: '50dp',
				enabled: false
			});
			
			var day2Button = Titanium.UI.createButton({
				title: _('day_2'),
				top: 0,
				left: '50%',
				width: '50%',
				height: '50dp'
			});
			
			buttonContainer.add(day1Button);
			buttonContainer.add(day2Button);
			win.add(buttonContainer);
			
			day1Button.addEventListener('click', function(e){
				day1Table.show();
				day1Button.enabled = false;
				day2Table.hide();
				day2Button.enabled = true;
			});

			
			day2Button.addEventListener('click', function(e){
				day1Table.hide();
				day1Button.enabled = true;
				day2Table.show();
				day2Button.enabled = false;
			});		
		}
		
		if(coscup.app.osname === 'android'){
			win.addEventListener('focus', function(){
				day1Table.showData();
				day2Table.showData();
			});			
		}
		return win;
	}
	
	coscup.ui.createProgramWin = function(){
		var win = Titanium.UI.createWindow({
			title: _('program'),
			barColor: coscup.style.color.barColor,
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
	
		var table = coscup.ui.createProgramTypeTableView();
			win.add(table);
		
		return win;
	}
	
	coscup.ui.createProgramListWin = function(option, type){
		var win = Titanium.UI.createWindow(option);
		win.barColor = coscup.style.color.barColor;
		function isType(element, index, array) {
			if(type == 0)
			{
				return (element.type != type);
			}else
			{
				return (element.type == type);
			}
		}
		
		var table;
		if(type == 0)
		{
			table = coscup.ui.createProgramTableView({headerType: 'type', searchbar: true}, coscup.data.program.sortOn('type').filter(isType));
			table.id = 'typeTable'
		}else{
			table = coscup.ui.createProgramTableView({headerType: 'day', searchbar: true}, coscup.data.program.sortOn('from').filter(isType));
			table.id = 'allProgramTable'
		}
		
		win.add(table);
		
		win.addEventListener('focus', function(){
			table.showData();
		});
		return win;
	}
	
	coscup.ui.createProgramDetailWin = function(programId){
		var win = Titanium.UI.createWindow({
			tabBarHidden: true,
			barColor: coscup.style.color.barColor,
			title: _('info')
		});
		Ti.API.info('programId:'+ programId);
		
		for(var i = 0, l = coscup.data.program.length; i < l; i++)
		{
			if(coscup.data.program[i].id == programId)
			{
				var program = coscup.data.program[i];
				
				var duration = new Date(program.from*1000).hhmm() + '-' +new Date(program.to*1000).hhmm();
				var room = coscup.data.getProgramRooms()[program.room][coscup.i18n.locale];
				var day = new Date(program.from*1000).getDay();
				
				switch (day)
				{
					case 0:
					day = _('sunday');
					break;
					
					case 1:
					day = _('monday');
					break;
					
					case 2:
					day = _('tuesday');
					break;
					
					case 3:
					day = _('wednesday');
					break;
					
					case 4:
					day = _('thursday');
					break;
					
					case 5:
					day = _('friday');
					break;
					
					case 6:
					day = _('saturday');
					break;
				}
			
				var starImageView = Titanium.UI.createImageView({
					className: 'star',
					programId: program.id,
					width: '30dp',
					height: '30dp',
					left: '15dp'
				});
				
				if(coscup.data.isStarred(program.id)){
					starImageView.image = 'images/starred.png';
				}else{
					starImageView.image = 'images/unstarred.png';
				}
				
				starImageView.addEventListener('click', function(e){
					coscup.currentProgramTableView = null;
					if(coscup.data.isStarred(program.id)){
						coscup.data.unstarProgramById(program.id, function(){
							starImageView.image = 'images/unstarred.png';
						});
					}else{
						coscup.data.starProgramById(program.id, function(){
							starImageView.image = 'images/starred.png';	
						});
					}
					Titanium.App.fireEvent('app:starUpdate');
				});
				
				var nameLabel = Titanium.UI.createLabel(coscup.style.programNameLabel);
				nameLabel.text = program.name;
				
				var timeRoomLabel = Titanium.UI.createLabel(coscup.style.timeRoomLabel);
				timeRoomLabel.text = day + ' ' + duration + ' ' + room;
				
				var colorDot = Titanium.UI.createView(coscup.style.smallColorDot);
				colorDot.backgroundColor = coscup.style.color['PROGRAM_TYPE_'+program.type];
		
				
				var programTypeLabel = Titanium.UI.createLabel(coscup.style.programTypeLabel);
				programTypeLabel.text = coscup.data.getProgramTypes()[program.type];
				
				var infoContainer = Titanium.UI.createView({
					left: 0,
					top: 0,
					right: 0,
					height: 'auto'
				});
				
				if(coscup.app.osname === 'android')
				{
					infoContainer.height = 150;
				}
				
				infoContainer.add(starImageView);
				infoContainer.add(nameLabel);
				infoContainer.add(timeRoomLabel);
				if(program.type !== 0)
				{
					infoContainer.add(colorDot);
					infoContainer.add(programTypeLabel);
				}
				
				var html = '<div style="font-family: Arial">';
				if(typeof(program.speaker) === 'string')
				{
					html += '<b>'+program.speaker+'</b><br>';
				}
				
				if(typeof(program.speakerTitle) === 'string')
				{
					html +=  '<i>'+program.speakerTitle+'</i><p>';
				}
				
				if(typeof(program.bio) === 'string')
				{
					html += program.bio+'<br>';
				}
				
				if(typeof(program['abstract']) === 'string')
				{
					html += program['abstract'];
				}
				
				html += '</div>';

				 var summary = Titanium.UI.createWebView({
				 	html: html,
				 	width: '100%',
				 	bottom: 0,
					backgroundColor: '#fff'
				 })
				
				if(coscup.app.osname === 'android')
				{
					summary.top = 150;
				}
				
				win.add(infoContainer);
				win.add(summary);
				summary.top = infoContainer.toImage().height;
				break;
			}
			
		}
		return win;
	}

	coscup.ui.createPlaceWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: coscup.style.color.barColor,
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
				
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
			if(coscup.app.osname === 'ipad'){
				var floorPlan3F = Titanium.UI.createImageView(coscup.style.ipad.floorPlanImageView);
				floorPlan3F.image = 'images/floorplan3f_h.png';
				var floorPlan4F = Titanium.UI.createImageView(coscup.style.ipad.floorPlanImageView);
				floorPlan4F.image = 'images/floorplan4f_h.png';
				
				floorPlan3F.addEventListener('click', function(e){
					if((e.x > 152 && e.y > 252) && (e.x < 240 && e.y < 396)){
						Ti.API.info('conference room 2');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(3));	
					}else if((e.x > 252 && e.y > 228) && (e.x < 380 && e.y < 390)){
						Ti.API.info('international conference room');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));
					}else if((e.x > 376 && e.y > 274) && (e.x < 495 && e.y < 404)){
						Ti.API.info('conference room 1');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(2));
					}
				});
				
				floorPlan4F.addEventListener('click', function(e){
					if((e.x > 236 && e.y > 240) && (e.x < 409 && e.y < 470)){
						Ti.API.info('international conference room');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));
					}else if((e.x > 249 && e.y > 134) && (e.x < 373 && e.y < 218)){
						Ti.API.info('conference room 3');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(4));
					}
				});
						
			}else if(coscup.app.osname === 'iphone'){
				var floorPlan3F = Titanium.UI.createImageView(coscup.style.iphone.floorPlanImageView);
				floorPlan3F.image = 'images/floorplan3f_h.png';
				var floorPlan4F = Titanium.UI.createImageView(coscup.style.iphone.floorPlanImageView);
				floorPlan4F.image = 'images/floorplan4f_h.png';
				
				floorPlan3F.addEventListener('click', function(e){
					if((e.x > 76 && e.y > 125) && (e.x < 120 && e.y < 200)){
						Ti.API.info('conference room 2');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(3));
					}else if((e.x > 125 && e.y > 114) && (e.x < 190 && e.y < 180)){
						Ti.API.info('international conference room');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));
					}else if((e.x > 76 && e.y > 137) && (e.x < 250 && e.y < 200)){
						Ti.API.info('conference room 1');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(2));
					}
				});
				
				floorPlan4F.addEventListener('click', function(e){
					if((e.x > 118 && e.y > 120) && (e.x < 204 && e.y < 285)){
						Ti.API.info('international conference room');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));
					}else if((e.x > 125 && e.y > 67) && (e.x < 182 && e.y < 109)){
						Ti.API.info('conference room 3');
						coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(4));
					}
				});
				
			}

			var floorPlanContainer = Titanium.UI.createScrollableView({
				views: [floorPlan3F, floorPlan4F]
			});
			win.add(floorPlanContainer);
			
				var toolbar = Titanium.UI.createView({
				backgroundImage: 'images/toolbar_bg.png',
				top: -1,
				weight: '100%',
				height: 43
			})
			
			var floorTabbedBar = Titanium.UI.createTabbedBar({
			    labels:[_('floor3'), _('floor4')],
			    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
			    top: 5,
			    height: 30,
			    width: 300,
			    index: 0
			});
			
			floorTabbedBar.addEventListener('click', function (e) {
				switch(e.index)
				{
					case 0:
		   	 		floorPlanContainer.scrollToView(0);
  					break;
					
					case 1:
		   	 		floorPlanContainer.scrollToView(1);
					break;
				}
			});
			
			floorPlanContainer.addEventListener('scroll', function(e){
				if(e.source === floorPlanContainer)
				{
					floorTabbedBar.index = e.currentPage;
				}
			});
			
			win.add(toolbar);
			win.add(floorTabbedBar);
			
		}else if(coscup.app.osname === 'android'){		
			if(coscup.app.version >= 3){
				win.orientationModes = [Titanium.UI.LANDSCAPE];
				var floorPlan3F = Titanium.UI.createImageView(coscup.style.androidTablet.floorPlanImageView);		
				var floorPlan4F = Titanium.UI.createImageView(coscup.style.androidTablet.floorPlanImageView);
				
				var floor3FLabel = Titanium.UI.createLabel(coscup.style.androidTablet.floorPlanLabel);
				floor3FLabel.text = _('floor3');
				
				var floor4FLabel = Titanium.UI.createLabel(coscup.style.androidTablet.floorPlanLabel);
				floor4FLabel.text = _('floor4');		
				
				var floor3FContainer = Titanium.UI.createView({
					width: '640dp',
					height: '640dp',
					left: 0
				});

				var floor4FContainer = Titanium.UI.createView({
					width: '640dp',
					height: '640dp',
					right: 0
				});
				
				floor3FContainer.add(floor3FLabel);
				floor3FContainer.add(floorPlan3F);

				floor4FContainer.add(floor4FLabel);
				floor4FContainer.add(floorPlan4F);
				
				floorPlan3F.image = 'images/floorplan3f_h.png';
				floorPlan4F.image = 'images/floorplan4f_h.png';
	
				var floor3Froom1View = Titanium.UI.createView({
					//backgroundColor: '#00f',
					width: '140dp',
					height: '162dp',
					left: '250dp',
					top: '230dp',
					opacity: 0.5
				});
				
				var floor4Froom1View = Titanium.UI.createView({
					//backgroundColor: '#00f',
					width: '152dp',
					height: '220dp',
					left: '244dp',
					top: '240dp',
					opacity: 0.5
				});
				
				var room2View = Titanium.UI.createView({
					//backgroundColor: '#0f0',
					width: '120dp',
					height: '144dp',
					left: '400dp',
					top: '240dp',
					opacity: 0.5
				});

				var room3View = Titanium.UI.createView({
					//backgroundColor: '#f00',
					width: '120dp',
					height: '144dp',
					left: '120dp',
					top: '240dp',
					opacity: 0.5
				});
				
				var room4View = Titanium.UI.createView({
					//backgroundColor: '#000',
					width: '152dp',
					height: '140dp',
					left: '244dp',
					top: '100dp',
					opacity: 0.5
				});
				
				floor3Froom1View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));	
				});
				
				floor4Froom1View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));	
				});
				
				room2View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(2));	
				});
				
				room3View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(3));	
				});
				
				room4View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(4));	
				});

				
				floor3FContainer.add(floorPlan3F);
				floor4FContainer.add(floorPlan4F);
			
				//3f
				floor3FContainer.add(floor3Froom1View);
				floor3FContainer.add(room2View);
				floor3FContainer.add(room3View);
				//4f
				floor4FContainer.add(floor4Froom1View);
				floor4FContainer.add(room4View);
				
				floor3FContainer.show();
				floor4FContainer.hide();
				
				win.add(floor3FContainer);
				win.add(floor4FContainer);
				
				function switchLayout(orientation){
					switch (orientation)
					{
						case Titanium.UI.PORTRAIT:
							floor3FContainer.top = 0;
							floor4FContainer.bottom = 0;
							floor3FContainer.left = null;
							floor4FContainer.left = null;
							floor3FContainer.right = null;
							floor4FContainer.right = null;
							break;
							
						case Titanium.UI.UPSIDE_PORTRAIT:
							floor3FContainer.top = 0;
							floor4FContainer.bottom = 0;
							floor3FContainer.left = null;
							floor4FContainer.left = null;
							floor3FContainer.right = null;
							floor4FContainer.right = null;
							break;
												
						case Titanium.UI.LANDSCAPE_LEFT:
							floor3FContainer.left = 0;
							floor4FContainer.right = 0;	
							floor3FContainer.top = null;
							floor4FContainer.top = null;
							floor3FContainer.bottom = null;
							floor4FContainer.bottom = null;
							break;
						
						case Titanium.UI.LANDSCAPE_RIGHT:
							floor3FContainer.left = 0;
							floor4FContainer.right = 0;	
							floor3FContainer.top = null;
							floor4FContainer.top = null;
							floor3FContainer.bottom = null;
							floor4FContainer.bottom = null;
							break;							
					}
				}	
				Titanium.Gesture.addEventListener('orientationchange', function (e) {
					switchLayout(e.orientation);		
				});
				
				switchLayout(Titanium.UI.orientation);
				
			}else {
				var floor3FContainer = Titanium.UI.createView({
					width: '320dp',
					height: '320dp',
					backgroundColor: '#fff',
					visible: true
				});

				var floor4FContainer = Titanium.UI.createView({
					width: '320dp',
					height: '320dp',
					backgroundColor: '#fff',
					visible: false
				});
				var floorPlan3F = Titanium.UI.createImageView(coscup.style.android.floorPlanImageView);		
				var floorPlan4F = Titanium.UI.createImageView(coscup.style.android.floorPlanImageView);
				
				if(Titanium.Platform.displayCaps.platformWidth >= 320){
					floorPlan3F.image = 'images/floorplan3f_h.png';
					floorPlan4F.image = 'images/floorplan4f_h.png';
					
				}else{
					floorPlan3F.image = 'images/floorplan3f_n.png';
					floorPlan4F.image = 'images/floorplan4f_n.png';				
				}

				var floorPlan3F = Titanium.UI.createImageView(coscup.style.iphone.floorPlanImageView);
				floorPlan3F.image = 'images/floorplan3f_h.png';
				var floorPlan4F = Titanium.UI.createImageView(coscup.style.iphone.floorPlanImageView);
				floorPlan4F.image = 'images/floorplan4f_h.png';
				
				
				var floor3Froom1View = Titanium.UI.createView({
					//backgroundColor: '#00f',
					width: '70dp',
					height: '81dp',
					left: '125dp',
					top: '115dp',
					opacity: 0.5
				});
				
				var floor4Froom1View = Titanium.UI.createView({
					//backgroundColor: '#00f',
					width: '76dp',
					height: '110dp',
					left: '122dp',
					top: '120dp',
					opacity: 0.5
				});
				
				var room2View = Titanium.UI.createView({
					//backgroundColor: '#0f0',
					width: '60dp',
					height: '72dp',
					left: '200dp',
					top: '120dp',
					opacity: 0.5
				});

				var room3View = Titanium.UI.createView({
					//backgroundColor: '#f00',
					width: '60dp',
					height: '72dp',
					left: '60dp',
					top: '120dp',
					opacity: 0.5
				});
				
				var room4View = Titanium.UI.createView({
					//backgroundColor: '#000',
					width: '76dp',
					height: '70dp',
					left: '122dp',
					top: '50dp',
					opacity: 0.5
				});
				
				floor3Froom1View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));	
				});
				
				floor4Froom1View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(1));	
				});
				
				room2View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(2));	
				});
				
				room3View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(3));	
				});
				
				room4View.addEventListener('click', function(){
					coscup.appTabGroup.activeTab.open(coscup.ui.createSeatPlanWin(4));	
				});
				
				floor3FContainer.top = '50dp';
				floor4FContainer.top = '50dp';
				
				win.add(floor4FContainer);
				win.add(floor3FContainer);
				
				floor3FContainer.add(floorPlan3F);
				floor4FContainer.add(floorPlan4F);
			
				//3f
				floor3FContainer.add(floor3Froom1View);
				floor3FContainer.add(room2View);
				floor3FContainer.add(room3View);
				//4f
				floor4FContainer.add(floor4Froom1View);
				floor4FContainer.add(room4View);
				
				floor3FContainer.show();
				floor4FContainer.hide();
				
				
				var buttonContainer = Titanium.UI.createView({
					width: '320dp',
					height: '50dp',
					top: 5
				});
				
				var floor3FButton = Titanium.UI.createButton({
					title: _('floor3'),
					top: 0,
					left: 0,
					width: '50%',
					height: '50dp',
					enabled: false
				});
				
				var floor4FButton = Titanium.UI.createButton({
					title: _('floor4'),
					top: 0,
					left: '50%',
					width: '50%',
					height: '50dp'
				});
				
				buttonContainer.add(floor3FButton);
				buttonContainer.add(floor4FButton);
				win.add(buttonContainer);
				
				floor3FButton.addEventListener('click', function(e){
					Ti.API.info('3F');
					floor3FContainer.show();
					floor4FContainer.hide();
					floor3FButton.enabled = false;
					floor4FButton.enabled = true;
				});
			
				floor4FButton.addEventListener('click', function(e){
					Ti.API.info('4F');
					floor3FContainer.hide();
					floor4FContainer.show();
					floor3FButton.enabled = true;
					floor4FButton.enabled = false;
				});			
			}	
		}

		return win;
	}

	coscup.ui.createSeatPlanWin = function(roomId){
		//alert('createSeatPlanWin('+roomId+')');
		Ti.API.info(coscup.data.getProgramRooms());
		Ti.API.info(coscup.data.getProgramRooms()[roomId]);
		Ti.API.info(coscup.data.getProgramRooms()[roomId][coscup.i18n.locale]);
		Ti.API.info(coscup.data.getSeatPlanUrl(roomId));
		return coscup.ui.createWebWin({title: coscup.data.getProgramRooms()[roomId][coscup.i18n.locale]+_('seat_plan'), webUrl: coscup.data.getSeatPlanUrl(roomId)});
	}
		
	coscup.ui.createStarredWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: coscup.style.color.barColor,
			title: _('starred'),
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		var noDataView = Titanium.UI.createLabel({
			text: _('no_starred_program'),
			color: '#333',
			font: {
				fontSize: 20
			},
			textAlign: 'center',
			visible: false
			});
				
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
			var clearButton = Titanium.UI.createButton({
				title: _('clear')
			});
			
			clearButton.addEventListener('click', function(){
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: _('clear_starred'),
				    message: _('are_you_sure_you_want_to_clear'),
				    buttonNames: [_('ok'), _('cancel')]
				});
				alertDialog.addEventListener('click', function(e){
					if(e.index === 0){
						coscup.data.clearStarredPrograms(function(){		
						});
					}
				});
				alertDialog.show();
			});
			win.leftNavButton = clearButton;
			
			var actionButtion = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.ACTION
			});
			
			actionButtion.addEventListener('click', function()
			{	
				if(coscup.app.osname === 'iphone'){
					var dialog = Titanium.UI.createOptionDialog({
						options: [_('sent_via_email'), _('cancel')],
					    cancel: 3
					});
					
					dialog.addEventListener('click', function(e){
						switch(e.index)
						{
							case 0:
								var emailDialog = Titanium.UI.createEmailDialog({html: true});
								emailDialog.subject = _('my_starred_programs_at_coscup');
								emailDialog.toRecipients = [];
								var content = '';
								for(var i = 0, l = coscup.data.getStarredPrograms().length; i < l; i++){
									var programId = coscup.data.getStarredPrograms()[i];
									content += coscup.data.getProgramHTMLById(programId)+'<p>';
								}
								emailDialog.messageBody = content;
								emailDialog.open();
								break;
							
							default:
							  Ti.API.info('Cancel');
						}
					});
					dialog.show();
				}else if(coscup.app.osname === 'ipad'){
					actionButtion.enabled = false;
					var container = Titanium.UI.createView();
					var emailButton = Titanium.UI.createButton({
						title: _('sent_via_email'),
						height: 44
						});
					container.add(emailButton);
				    var popover = Ti.UI.iPad.createPopover({
				    	height: 44,
				    	width: 200,
				    	navBarHidden: true
				    });
				    popover.add(container);
				    popover.show({view: actionButtion, animation: true});
				    emailButton.addEventListener('click', function(){
				    	actionButtion.enabled = true;
		    			var emailDialog = Titanium.UI.createEmailDialog({html: true});
						emailDialog.subject = _('my_starred_programs_at_coscup');
						emailDialog.toRecipients = [];
						var content = '';
						for(var i = 0, l = coscup.data.getStarredPrograms().length; i < l; i++){
							var programId = coscup.data.getStarredPrograms()[i];
							content += coscup.data.getProgramHTMLById(programId)+'<p>';
						}
						emailDialog.messageBody = content;
						emailDialog.open();
						popover.hide({animation: true});
				    });
				    popover.addEventListener('hide', function(){
				    	actionButtion.enabled = true;
				    });
				}
			});
			
			win.rightNavButton = actionButtion;
		}else if(coscup.app.osname === 'android'){
			//TODO: Add Menu for Android
		}
		var table =  coscup.ui.createStarredProgramTableView({searchbar: false}, coscup.data.program);
		
		win.add(table);
		win.add(noDataView);
		
		toggleNoDataView();
		
		function toggleNoDataView(){
			if(coscup.data.getStarredPrograms().length === 0){
				noDataView.show();
				table.hide();
			}else{
				noDataView.hide();
				table.show();
			}
		}
		
		Titanium.App.addEventListener('app:toggleNoDataMessage', function(e){
			toggleNoDataView();
		});
		
		win.addEventListener('open', function(){
			Titanium.App.fireEvent('app:toggleNoDataMessage');
		});
		
		win.addEventListener('focus', function(){
			table.showData();
		});
		
		return win;
	}
	
	coscup.ui.createProgramTableView = function(option, programs){
		var search = Titanium.UI.createSearchBar({
    		showCancel: false,
  			hintText: _('search_program')
		});
		
		var table = Titanium.UI.createTableView(option);
		table.filterAttribute = 'filter';
		if(option.searchbar){
			table.search = search;	
		}
		var data;
			
		table.showData = function(){
			data = [];
			for(var i = 0, l = programs.length; i<l; i++)
			{
				var program = programs[i];
				
				var row = coscup.ui.createProgramRow(program);
				//
				var theDay;
				if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
					switch (option.headerType)
					{
						case 'day':
						if(program.from < new Date(2011,7,21).getTime()/1000)
						{
							row.header = _('day_1');
						}else if(program.from > new Date(2011,7,21).getTime()/1000){
							row.header = _('day_2');
						}
						theDay = row.header;
						
						if(i>0){
							if(row.header == theDay)
							{
								delete row.header;
							}
						}
						break;
						
						case 'time':
						if(i === 0)
						{
							row.header = row.duration;
						}
						else if(i>0){
							if(data[i-1].duration != row.duration)
							{
								row.header = row.duration;
							}
						}
						break;
						
						case 'type':
						if(i === 0)
						{
							row.header = coscup.data.getProgramTypes()[row.type];
						}
						else if(i>0){
							if(data[i-1].type != row.type)
							{
								row.header = coscup.data.getProgramTypes()[row.type];
							}
						}
						break;
						
						default:
						break;
					}					
				}
				
				data.push(row);
			}
			table.setData(data);
		}
		
		table.addEventListener('click', function(e){
			coscup.currentProgramTableView = table;
			Ti.API.info('currentProgramTableView: '+ table.id);
			if(e.x < 55)
			{
				Ti.API.info('======' + e.index + '======');
				Ti.API.info(e.rowData);
				
				if(coscup.data.isStarred(e.source.programId)){
					Ti.API.info('unstar ' + e.source.programId);
					coscup.data.unstarProgramById(e.rowData.programId, function(){
						Ti.API.info('unstarred');
					});
				}else{
					Ti.API.info('star ' + e.source.programId);
					coscup.data.starProgramById(e.rowData.programId, function(){
						Ti.API.info('starred');
					});
				}
			}else
			{
				if(typeof(e.rowData.programId) !== 'undefined'){
					coscup.appTabGroup.activeTab.open(coscup.ui.createProgramDetailWin(e.rowData.programId));		
				}
			}
		});
		
		table.showData();
		
		Titanium.App.addEventListener('app:starUpdate', function(e){
			Ti.API.info(table.id + ' => app:starUpdate triggered!');
			
			if(coscup.currentProgramTableView != table){
				if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
					for(var i = 0, l = data.length; i < l; i++){
						var program = data[i];
						if(program.programId === e.id){
							var row = coscup.ui.createProgramRow(coscup.data.getProgramById(e.id));
							table.updateRow(i, row);
						}
					}
				}else if(coscup.app.osname === 'android'){
					// UpdateRow function in tables that on a inactive window is not stable
					// The workaround is update the data while the window focused
				}
			} else {
				for(var i = 0, l = data.length; i < l; i++){
					var program = data[i];
					if(program.programId === e.id){
						var row = coscup.ui.createProgramRow(coscup.data.getProgramById(e.id));
						if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
							var highlightView = Titanium.UI.createView(coscup.style.highlight);
							row.add(highlightView);
							var animation = Titanium.UI.createAnimation();
							animation.opacity = 0;
							animation.duration = 500;
							table.updateRow(i, row);
							highlightView.animate(animation);
						} else if(coscup.app.osname === 'android'){
							table.updateRow(i, row);
						}
					}	
				}				
			}
			Titanium.App.fireEvent('app:toggleNoDataMessage');
		});
		
		
		Titanium.App.addEventListener('app:starClear', function(){
			Ti.API.info('clear');
			table.showData();
		});	
			return table;
		};
	
		coscup.ui.createStarredProgramTableView = function(option, programs){
		var search = Titanium.UI.createSearchBar({
    		showCancel: false,
  			hintText: _('search_program')
		});
		
		var table = Titanium.UI.createTableView(option);
		table.id = 'starredTable';
		table.filterAttribute = 'filter';
		if(option.searchbar){
			table.search = search;	
		}
		var data;

		table.showData = function(){
			data = [];
			var starredPrograms = coscup.data.getStarredPrograms();

			for(var i = 0, l = starredPrograms.length; i<l; i++)
			{
				var program = coscup.data.getProgramById(starredPrograms[i]);
				
				var row = coscup.ui.createProgramRow(program);
				
				var theDay;
				if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
					switch (option.headerType)
					{
						case 'day':
						if(program.from < new Date(2011,7,21).getTime()/1000)
						{
							row.header = _('day_1');
						}else if(program.from > new Date(2011,7,21).getTime()/1000){
							row.header = _('day_2');
						}
						theDay = row.header;
						
						if(i>0){
							if(row.header == theDay)
							{
								delete row.header;
							}
						}
						break;
						
						case 'time':
						if(i === 0)
						{
							row.header = row.duration;
						}
						else if(i>0){
							if(data[i-1].duration != row.duration)
							{
								row.header = row.duration;
							}
						}
						break;
						
						case 'type':
						if(i === 0)
						{
							row.header = coscup.data.getProgramTypes()[row.type];
						}
						else if(i>0){
							if(data[i-1].type != row.type)
							{
								row.header = coscup.data.getProgramTypes()[row.type];
							}
						}
						break;
						
						default:
						break;
					}
				}
				
				data.push(row);
			}

			table.setData(data);
		}
		
		table.addEventListener('click', function(e){
			coscup.currentProgramTableView = table;
			Ti.API.info('currentProgramTableView: '+ table.id);
			if(e.x < 55)
			{
				Ti.API.info('=>' + e.rowData.programId);
				table.deleteRow(e.index);
				coscup.data.unstarProgramById(e.rowData.programId, function(){
					
				});

			}else
			{
				if(typeof(e.rowData.programId) !== 'undefined'){
					coscup.appTabGroup.activeTab.open(coscup.ui.createProgramDetailWin(e.rowData.programId));		
				}
			}
		});
		
		Titanium.App.addEventListener('app:starClear', function(){
			table.setData([{title: _('no_starred_program')}]);
			Titanium.App.fireEvent('app:toggleNoDataMessage');
		});
		
		Titanium.App.addEventListener('app:starUpdate', function(e){
			Ti.API.info(table.id + ' => app:starUpdate triggered!');
			
			if(coscup.currentProgramTableView != table){
				table.showData();
			}
			Titanium.App.fireEvent('app:toggleNoDataMessage');
		});
		
		return table;
	};
	
	coscup.ui.createProgramRow = function (program) {
		var row = Titanium.UI.createTableViewRow({
			height: 'auto'
		});
		
		var now = new Date();
		if(program.from > now.getTime()/1000){
			//before 
			row.backgroundColor = coscup.style.color.before;
		}else if(program.from < now.getTime()/1000 && program.to > now.getTime()/1000){
			//now
			row.backgroundColor = coscup.style.color.now;
		}else if (program.to < now.getTime()/1000){
			//after
			row.backgroundColor = coscup.style.color.after;
		}
		
		if(program.type != 0)
		{
			daysChild = true;
		}
		
		row.programId = program.id;
		row.filter = program.name + coscup.data.getProgramTypes()[row.type] + coscup.data.getProgramRooms()[program.room][coscup.i18n.locale];
		row.type = program.type;
		row.duration = new Date(program.from*1000).hhmm() + '-' +new Date(program.to*1000).hhmm();
		row.room = coscup.data.getProgramRooms()[program.room][coscup.i18n.locale];
		
		var day = new Date(program.from*1000).getDay();
		row.day = day;
		
		switch (day)
		{
			case 0:
			row.day = _('sunday');
			break;
			
			case 1:
			row.day = _('monday');
			break;
			
			case 2:
			row.day = _('tuesday');
			break;
			
			case 3:
			row.day = _('wednesday');
			break;
			
			case 4:
			row.day = _('thursday');
			break;
			
			case 5:
			row.day = _('friday');
			break;
			
			case 6:
			row.day = _('saturday');
			break;
		}
		 			
		row.starImageView = Titanium.UI.createImageView({
			className: 'star',
			programId: program.id,
			width: '30dp',
			height: '30dp',
			left: '14dp'
		});
		
		//Ti.API.info(coscup.data.isStarred(program.id));
		if(coscup.data.isStarred(program.id)){
			row.starImageView.image = 'images/starred.png';
		}else{
			row.starImageView.image = 'images/unstarred.png';
		}
		
		var nameLabel = Titanium.UI.createLabel(coscup.style.programNameLabel);
		nameLabel.text = program.name;
		
		var timeRoomLabel = Titanium.UI.createLabel(coscup.style.timeRoomLabel);
		timeRoomLabel.text = row.day + ' ' + row.duration + ' ' + row.room;
		
		var colorDot = Titanium.UI.createView(coscup.style.smallColorDot);
		colorDot.backgroundColor = coscup.style.color['PROGRAM_TYPE_'+program.type];
		
		var programTypeLabel = Titanium.UI.createLabel(coscup.style.programTypeLabel);
		programTypeLabel.text = coscup.data.getProgramTypes()[row.type];
		
		row.add(nameLabel);
		row.add(timeRoomLabel);
		row.add(row.starImageView);
		
		if(row.type > 0)
		{
			row.add(colorDot);
			row.add(programTypeLabel);
		}
		return row;
	}
	
	coscup.ui.createProgramTypeTableView = function(){
		var programTypes = coscup.data.getProgramTypes();
		programTypes[0] = _('all_programs');
		var data = [];
		for(var i = 0, l = programTypes.length; i < l; i++){
			var programType = programTypes[i];
			
			var row = Titanium.UI.createTableViewRow({
				height: 'auto',
				backgroundColor: '#fff'
		        });
			row.hasChild = true;
			var nameLabel = Titanium.UI.createLabel(coscup.style.programTypeNameLabel);
			nameLabel.text = programType;
			
			var colorDot = Titanium.UI.createView(coscup.style.bigColorDot);				
			colorDot.backgroundColor = coscup.style.color['PROGRAM_TYPE_'+i];

			row.add(colorDot);
			row.add(nameLabel);	
			data[i] = row;
			
		}
		var table = Titanium.UI.createTableView({
			backgroundColor: '#fff',
			data: data
		});
		
		table.addEventListener('click', function(e){
			var programName;
			if(e.index == 0)
			{
				programName = _('all_programs');
			}else
			{
			 	programName = programTypes[e.index];
			}
			coscup.appTabGroup.activeTab.open(coscup.ui.createProgramListWin({title: programName, tabBarHidden: true}, e.index));
		});
		return table; 
	}
	
	coscup.ui.createWebSummaryWin = function(option){
		var win = Titanium.UI.createWindow(option);
		win.scalesPageToFit = true;
		win.barColor = coscup.style.color.barColor;
		win.navBarHidden = false;
		win.tabBarHidden = true;

		coscup.network.getCoscupWebContent(option.keyword, function(e){
			var webview = Titanium.UI.createWebView({html: e.content});
			win.add(webview);
		});
		
		return win;
	}
	
	coscup.ui.createWebWin = function(option){
		var win = Titanium.UI.createWindow(option);
		win.barColor = coscup.style.color.barColor;
		win.navBarHidden = false;
		win.tabBarHidden = true;
		var webview = Titanium.UI.createWebView({url: option.webUrl});
		webview.currentUrl = option.webUrl;
		win.add(webview);
		
		if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad'){
			var flexSpace = Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			
			var backButton = Titanium.UI.createButton({
				image: 'images/back.png'
			});
			
			var reloadButton = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
			});
			
			var stopButton = Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.STOP
			});
			
			var forwardButton = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.PLAY
			});
			
			var actionButton = Titanium.UI.createButton({
				systemButton: Titanium.UI.iPhone.SystemButton.ACTION
			});

			win.setToolbar([backButton, flexSpace, forwardButton, flexSpace, stopButton, flexSpace, actionButton]);
			
			function updateToolbar(){
				if(webview.canGoBack()){
					backButton.enabled = true;
				}else{
					backButton.enabled = false;
				}
				
				if(webview.canGoForward()){
					forwardButton.enabled = true;
				}else{
					forwardButton.enabled = false;
				}
			}
			
			updateToolbar();
			
			webview.addEventListener('load', function(e)
			{
				Ti.API.debug("url = "+webview.url);
				Ti.API.debug("event url = "+e.url);
				webview.currentUrl = e.url;
				win.setToolbar([backButton, flexSpace, forwardButton, flexSpace, reloadButton, flexSpace, actionButton]);
				updateToolbar();
			});
			
			backButton.addEventListener('click', function () {
				if(webview.canGoBack()){
					webview.goBack();
				}
			});
			
			forwardButton.addEventListener('click', function () {
				if(webview.canGoForward()){
					webview.goForward();
				}
			});

			reloadButton.addEventListener('click', function () {
				webview.reload();
				win.setToolbar([backButton, flexSpace, forwardButton, flexSpace, stopButton, flexSpace, actionButton]);	
			});
			
			stopButton.addEventListener('click', function () {
				webview.stopLoading();
				win.setToolbar([backButton, flexSpace, forwardButton, flexSpace, reloadButton, flexSpace, actionButton]);
			});
			
			actionButton.addEventListener('click', function () {
				Titanium.Platform.openURL(webview.currentUrl);
			});
		}
		return win;
	}
	
	//Start here
	Titanium.App.addEventListener('app:show_indicator', function(){
		coscup.indicatorWin.open();
	});

	Titanium.App.addEventListener('app:hide_indicator', function(){
		coscup.indicatorWin.close();
	});
})();