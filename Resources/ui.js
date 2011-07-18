(function () {
	Titanium.include('util.js');
	Titanium.include('network.js');
	Titanium.include('date.js');
	Titanium.include('data.js');
	Titanium.include('i18n.js');
	coscup.ui = {};
	coscup.ui.color = {};
	coscup.ui.color.PROGRAM_TYPE_0 = 'transparent';
	coscup.ui.color.PROGRAM_TYPE_1 = 'red';
	coscup.ui.color.PROGRAM_TYPE_2 = '#ff8000';
	coscup.ui.color.PROGRAM_TYPE_3 = 'yellow';
	coscup.ui.color.PROGRAM_TYPE_4 = '#80ff00';
	coscup.ui.color.PROGRAM_TYPE_5 = '#00FF00';
	coscup.ui.color.PROGRAM_TYPE_6 = '#00ff80';
	coscup.ui.color.PROGRAM_TYPE_7 = '#00FFFF';
	coscup.ui.color.PROGRAM_TYPE_8 = '#007FFF';
	coscup.ui.color.PROGRAM_TYPE_9 = 'blue';
	coscup.ui.color.PROGRAM_TYPE_10 = '#7f00ff';
	coscup.ui.color.PROGRAM_TYPE_11 = '#FF00FF';
	coscup.ui.color.PROGRAM_TYPE_12 = '#ff0080';
		
	coscup.ui.createIndicatorWin = function()
	{
		var win = Titanium.UI.createWindow({
			backgroundColor: 'transparent'
		});
		
		var indicatorContainer = Titanium.UI.createView({
			width: 60,
			height: 60,
			backgroundColor: '#000',
			borderRadius: 10,
			opacity: 0.6
		});	
		
		var indicator = Titanium.UI.createActivityIndicator();
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
		{	
			indicator.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
		}
		win.add(indicatorContainer);
		return win;
	};
	
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
		
		coscup.data.programTab = Titanium.UI.createTab({
			title: _('program'),
			window: coscup.ui.createProgramWin()
		});
		
		coscup.placeTab = Titanium.UI.createTab({
			title: _('place'),
			window: coscup.ui.createPlaceWin()
		});
		
		/*
		coscup.socialTab = Titanium.UI.createTab({
			title: _('social'),
			window: coscup.ui.createSocialWin()
		});
		*/
		coscup.staredTab = Titanium.UI.createTab({
			title: _('stared'),
			window: coscup.ui.createStaredWin()
		});
		
		appTabGroup.addTab(coscup.coscupTab);
		appTabGroup.addTab(coscup.scheduleTab);
		appTabGroup.addTab(coscup.data.programTab);
		appTabGroup.addTab(coscup.placeTab);
		//appTabGroup.addTab(coscup.socialTab);
		appTabGroup.addTab(coscup.staredTab);
		
		coscup.coscupTab.icon = 'images/coscup_tab_icon.png';
		coscup.scheduleTab.icon = 'images/schedule_tab_icon.png';
		coscup.data.programTab.icon = 'images/program_tab_icon.png';
		coscup.placeTab.icon = 'images/place_tab_icon.png';
		//coscup.socialTab.icon = 'images/social_tab_icon.png';
		coscup.staredTab.icon = 'images/star_tab_icon.png';

		return appTabGroup;
	}
	
	coscup.ui.createCoscupWin = function(){
		var win = Titanium.UI.createWindow({
			backgroundColor: '#fff',
			barColor: '#408937',
			navBarHidden: true,
		});
		
		var header =Titanium.UI.createImageView({image: 'images/header.png', top: 0, width: 320, height: 84});
		
		
		var infoSection = Ti.UI.createTableViewSection();
		infoSection.add(Ti.UI.createTableViewRow({title: _('about'), id: 'about'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('venue'), id: 'venue'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('sponsors'), id: 'sponsors'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('blog'), id: 'blog'}));
		
		
		var socialSection = Ti.UI.createTableViewSection({headerTitle: _('social')});
		socialSection.add(Ti.UI.createTableViewRow({title: _('twitter'), id: _('twitter')}));
		socialSection.add(Ti.UI.createTableViewRow({title: _('plurk'), id: _('plurk')}));
		
		//var upcomingSection = Ti.UI.createTableViewSection({headerTitle: _('upcoming')});
		//infoSection.add(Ti.UI.createTableViewRow({title: _('twitter')}));

		var data = [
			infoSection,
			socialSection,
			//upcomingSection
		];

		var table = Titanium.UI.createTableView({top: 84, bottom: 0, data: data});
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
		{
			table.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
			//table.backgroundColor = '#fff';
			table.backgroundImage = 'images/background.jpg';
		}
		
		table.addEventListener('click', function(e){
			var url;
			switch (e.source.id){
				case 'about':
				url = 'http://coscup.org/2011/'+coscup.i18n.locale+'/about/';
				coscup.appTabGroup.activeTab.open(coscup.ui.createWebSummaryWin({title: _(e.source.id), keyword: e.source.id}));
				break;
				
				case 'venue':
				url = 'http://coscup.org/2011/'+coscup.i18n.locale+'/venue/';
				coscup.appTabGroup.activeTab.open(coscup.ui.createWebSummaryWin({title: _(e.source.id), keyword: e.source.id}));
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
			}			
			
		});

		win.add(header);
		win.add(table);
		return win;
	}
	
	coscup.ui.createScheduleWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'}),
			backgroundColor: '#000'
		});
		
		
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
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
		
		var tableContainer = Titanium.UI.createScrollableView({
			top: 40,
			views: [day1Table, day2Table]
		});
		
		
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
		{
			tableContainer.addEventListener('scroll', function(e){
				if(e.source === tableContainer)
				{
					dataTabbedBar.index = e.currentPage;
				}
			});
		}else if(coscup.osname === 'android')
		{
			var dayLabel = Titanium.UI.createLabel({
				text: _('day_1'),
				top: 0,
				height: 40
			});
			
			win.add (dayLabel);
			
			tableContainer.addEventListener('scroll', function(e){
				if(e.source === tableContainer)
				{
					dayLabel.text = _('day_'+(e.currentPage+1));
				}
			});
		}

		win.add(tableContainer);
		return win;
	}
	
	coscup.ui.createProgramWin = function(){
		var win = Titanium.UI.createWindow({
			//title: _('program'),
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		var table = coscup.ui.createProgramTypeTableView();
		win.add(table);
		return win;
	}
	
	//TODO: add Stared function
	coscup.ui.createProgramListWin = function(option, type){
		var win = Titanium.UI.createWindow(option);
		win.barColor = '#408937';
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
			table = coscup.ui.createProgramTableView({headerType: 'type'}, coscup.data.program.sortOn('type').filter(isType));
		}else{
			table = coscup.ui.createProgramTableView({headerType: 'day'}, coscup.data.program.sortOn('from').filter(isType));
		}
		
		win.add(table);
		return win;
	}
	
	coscup.ui.createProgramDetailWin = function(programId){
		var win = Titanium.UI.createWindow({
			tabBarHidden: true,
			barColor: '#408937',
			title: _('info')
		});
		Ti.API.info('programId:'+ programId);
		
		for(var i = 0, l = coscup.data.program.length; i < l; i++)
		{
			if(coscup.data.program[i].id == programId)
			{
				var program = coscup.data.program[i];
				
				var duration = new Date(program.from*1000).toString("HH:mm") + '-' +new Date(program.to*1000).toString("HH:mm");
				var room = coscup.data.programRooms[program.room][coscup.i18n.locale];
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
					image: 'images/unstared.png',
					className: 'star',
					programId: program.id,
					width: 30,
					height: 30,
					left: 6
				})
				
				starImageView.addEventListener('click', function(e){
					alert(e.source.programId);
					Titanium.App.fireEvent('app:starUpdate', e.source.programId);
				});
				
				var nameLabel = Titanium.UI.createLabel({
					text: program.name,
					textAlign: 'left',
					color: '#000',
					font: {
						fontWeight: 'bold',
						fontSize: 16
					},
					right: 10,
					top: 30,
					height: 'auto',
					left: 45,
					bottom: 30
				});
				
				var timeRoomLabel = Titanium.UI.createLabel({
					text: day + ' ' + duration + ' ' + room,
					textAlign: 'left',
					color: '#666',
					font: {
						fontSize: 14
					},
					width: 200,
					height: 16,
					left: 45,
					bottom: 10	
				});
				
				var colorDot = Titanium.UI.createView({
					backgroundColor: coscup.ui.color['PROGRAM_TYPE_'+program.type],
					borderRadius: 4,
					width: 6,
					height: 6,
					left: 48,
					top: 15
				});
				
				var programTypeLabel = Titanium.UI.createLabel({
					text: coscup.data.programTypes[program.type],
					textAlign: 'left',
					color: '#666',
					font: {
						fontSize: 14
					},
					width: 200,
					height: 16,
					left: 58,
					top: 10	
				});
				
				var infoContainer = Titanium.UI.createView({
					left: 0,
					top: 0,
					right: 0,
					height: 'auto'
				});
				
				if(coscup.osname === 'android')
				{
					infoContainer.height = 150;
				}
				
				infoContainer.add(colorDot);
				infoContainer.add(programTypeLabel);
				infoContainer.add(nameLabel);
				infoContainer.add(timeRoomLabel);
				if(program.type != 0)
				{
					infoContainer.add(starImageView);
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
				
				if(typeof(program['abstract']) === 'string')
				{
					html += program['abstract'];
				}
				
				html += '</div>';

				 var summary = Titanium.UI.createWebView({
				 	html: html,
				 	width: '100%',
				 	top: infoContainer.toImage().height,
				 	bottom: 0,
					backgroundColor: '#fff'
				 })
				
				if(coscup.osname === 'android')
				{
					summary.top = 150;
				}
				
				win.add(infoContainer);
				win.add(summary);
				break;
			}
			
		}
		return win;
	}
	
	coscup.ui.createProgramListTableView = function()
	{
		var table = Titanium.UI.createTableView();
		
		return table;
	}
	
	coscup.ui.createPlaceWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		var floorplan3F = Titanium.UI.createImageView({image: 'images/floorplan3F.png'});
		
		var floorplan3FContainer = Titanium.UI.createScrollView({
			contentWidth: 'auto',
			contentHeight: 'auto',
			maxZoomScale: 2,
			minZoomScale: 1
		});
		
		floorplan3FContainer.add(floorplan3F);
		
		var floorplan4F = Titanium.UI.createImageView({image: 'images/floorplan4F.png'});
		var floorplan4FContainer = Titanium.UI.createScrollView({
			contentWidth: 'auto',
			contentHeight: 'auto',
			maxZoomScale: 2,
			minZoomScale: 1,
			top: 44
		});
		
		floorplan4FContainer.add(floorplan4F);
		
		var floorplanContainer = Titanium.UI.createScrollableView({
			views: [floorplan3FContainer, floorplan4FContainer]
		});
		
		win.add(floorplanContainer);
		
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
		{
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
		   	 		floorplanContainer.scrollToView(0);
  					break;
					
					case 1:
		   	 		floorplanContainer.scrollToView(1);
					break;
				}
			});
			
			floorplanContainer.addEventListener('scroll', function(e){
				if(e.source === floorplanContainer)
				{
					floorTabbedBar.index = e.currentPage;
				}
			});
			win.add(toolbar);
			win.add(floorTabbedBar);
		}else if(coscup.osname === 'android')
		{
			
			var floorLabel = Titanium.UI.createLabel({
				text: _('floor_3F'),
				top: 0,
				height: 40
			});
			
			win.add (floorLabel);
			
			floorplanContainer.addEventListener('scroll', function(e){
				if(e.source === floorplanContainer)
				{
					floorLabel.text = _('floor_' + (e.currentPage + 3) + 'F');
				}
			});
		}
		
		return win;
	}
	
	coscup.ui.createSocialWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		return win;
	}
	
	coscup.ui.createStaredWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		return win;
	}
	
	coscup.ui.createProgramTableView = function(option, programs, headerType){
		
		var data = [];
		
		for(var i = 0, l = programs.length; i<l; i++)
		{
			var program = programs[i];
			var row = Titanium.UI.createTableViewRow({
				height: 'auto',
				backgroundColor: '#fff'
			});
			
			if(program.type != 0)
			{
				daysChild = true;
			}
			
			row.programId = program.id;
			row.type = program.type;
			row.duration = new Date(program.from*1000).toString("HH:mm") + '-' +new Date(program.to*1000).toString("HH:mm");
			row.room = coscup.data.programRooms[program.room][coscup.i18n.locale];
			
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
			 			
			var starImageView = Titanium.UI.createImageView({
				image: 'images/unstared.png',
				className: 'star',
				programId: program.id,
				width: 30,
				height: 30,
				left: 6
			})
			
			var nameLabel = Titanium.UI.createLabel({
				text: program.name,
				textAlign: 'left',
				color: '#000',
				font: {
					fontWeight: 'bold',
					fontSize: 16
				},
				right: 10,
				top: 30,
				height: 'auto',
				left: 45,
				bottom: 30
			});
			
			var timeRoomLabel = Titanium.UI.createLabel({
				text: row.day + ' ' + row.duration + ' ' + row.room,
				textAlign: 'left',
				color: '#666',
				font: {
					fontSize: 14
				},
				width: 200,
				height: 16,
				left: 45,
				bottom: 10	
			});
			
			var colorDot = Titanium.UI.createView({
				backgroundColor: coscup.ui.color['PROGRAM_TYPE_'+program.type],
				borderRadius: 4,
				width: 6,
				height: 6,
				left: 48,
				top: 15
			});
			
			var programTypeLabel = Titanium.UI.createLabel({
				text: coscup.data.programTypes[row.type],
				textAlign: 'left',
				color: '#666',
				font: {
					fontSize: 14
				},
				width: 200,
				height: 16,
				left: 58,
				top: 10	
			});
			row.add(colorDot);
			row.add(programTypeLabel);
			row.add(nameLabel);
			row.add(timeRoomLabel);
			
			if(row.type > 0)
			{
				row.add(starImageView);
			}
			
			var theDay;
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
					row.header = coscup.data.programTypes[row.type];
				}
				else if(i>0){
					if(data[i-1].type != row.type)
					{
						row.header = coscup.data.programTypes[row.type];
					}
				}
				break;
				
				default:
				break;
			}
		
			data[i] = row;
		}

		var table = Titanium.UI.createTableView(option);
		table.setData(data);
		table.addEventListener('click', function(e){
			if(e.source.className === 'star')
			{
				alert(e.source.programId);
				coscup.staredTab.icon = 'images/social_tab_icon.png';
				Titanium.App.fireEvent('app:starUpdate', e.source.programId);
			}else
			{
				coscup.appTabGroup.activeTab.open(coscup.ui.createProgramDetailWin(e.rowData.programId));	
			}
		});
		return table;
	};
	
	coscup.ui.createProgramTypeTableView = function(){
		var programTypes = coscup.data.programTypes;
		var data = [];
		for(var i = 0, l = programTypes.length; i < l; i++){
			var programType = programTypes[i];
			
			if(programType === null)
			{
				programType = _('all_programs');
			} 
			var row = Titanium.UI.createTableViewRow({
				height: 'auto',
				backgroundColor: '#fff'
		        });
			row.hasChild = true;
			var nameLabel = Titanium.UI.createLabel({
				text: programType,
				textAlign: 'left',
				color: '#000',
				font: {
					fontWeight: 'bold',
					fontSize: 18
				},
				width: 'auto',
				height: 'auto',
				left: 36,
				top: 10,
				bottom: 10
			});
			
			var colorDot = Titanium.UI.createView({
				backgroundColor: coscup.ui.color['PROGRAM_TYPE_'+i],
				borderRadius: 7,
				width: 12,
				height: 12,
				left: 10
			});
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
		win.barColor ='#408937';
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
		win.barColor = '#408937';
		win.navBarHidden = false;
		win.tabBarHidden = true;
		var webview = Titanium.UI.createWebView({url: option.webUrl});
		win.add(webview);
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
