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
		
		var loading = Titanium.UI.createImageView({
			image: 'images/loading.png',
			width: 60,
			width: 60
		});
		
		indicatorContainer.add(loading);
		win.add(indicatorContainer);
		return win;
	};
	
	coscup.ui.init = function() {
		switch (coscup.osname){
			case 'andoird':
				coscup.appTabGroup = coscup.ui.createAppTabGroup();
				coscup.appTabGroup.open();
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
		coscup.starredTab = Titanium.UI.createTab({
			title: _('starred'),
			window: coscup.ui.createStarredWin()
		});
		
		appTabGroup.addTab(coscup.coscupTab);
		appTabGroup.addTab(coscup.scheduleTab);
		appTabGroup.addTab(coscup.data.programTab);
		appTabGroup.addTab(coscup.placeTab);
		//appTabGroup.addTab(coscup.socialTab);
		appTabGroup.addTab(coscup.starredTab);
		
		coscup.coscupTab.icon = 'images/coscup_tab_icon.png';
		coscup.scheduleTab.icon = 'images/schedule_tab_icon.png';
		coscup.data.programTab.icon = 'images/program_tab_icon.png';
		coscup.placeTab.icon = 'images/place_tab_icon.png';
		//coscup.socialTab.icon = 'images/social_tab_icon.png';
		coscup.starredTab.icon = 'images/star_tab_icon.png';

		return appTabGroup;
	}
	
	coscup.ui.createCoscupWin = function(){
		var win = Titanium.UI.createWindow({
			backgroundColor: '#fff',
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
			//navBarHidden: true,
		});
	
		var infoSection = Ti.UI.createTableViewSection();
		infoSection.add(Ti.UI.createTableViewRow({title: _('about'), id: 'about', backgroundColor: '#fff'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('venue'), id: 'venue', backgroundColor: '#fff'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('sponsors'), id: 'sponsors', backgroundColor: '#fff'}));
		infoSection.add(Ti.UI.createTableViewRow({title: _('blog'), id: 'blog', backgroundColor: '#fff'}));
		
		
		var socialSection = Ti.UI.createTableViewSection({headerTitle: _('social')});
		socialSection.add(Ti.UI.createTableViewRow({title: _('twitter'), id: _('twitter'), backgroundColor: '#fff'}));
		socialSection.add(Ti.UI.createTableViewRow({title: _('plurk'), id: _('plurk'), backgroundColor: '#fff'}));
		
		//var upcomingSection = Ti.UI.createTableViewSection({headerTitle: _('upcoming')});
		//infoSection.add(Ti.UI.createTableViewRow({title: _('twitter')}));

		var data = [
			infoSection,
			socialSection,
			//upcomingSection
		];

		var table = Titanium.UI.createTableView({data: data});
		
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad')
		{
			table.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
			table.backgroundColor = '#EEE';
			//table.backgroundImage = 'images/background.jpg';
			
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
							Ti.API.info('programTypes:' + coscup.data.programTypes);
							Ti.API.info('programRooms:' + coscup.data.programRooms);
							coscup.ui.init();
						});
					}
				});
				alertDialog.show();
				

			});
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

		//win.add(header);
		win.add(table);
		return win;
	}
	
	coscup.ui.createScheduleWin = function(){
		var win = Titanium.UI.createWindow({
			title: _('schedule'),
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'}),
			backgroundColor: '#fff'
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
			title: _('program'),
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		var table = coscup.ui.createProgramTypeTableView();
		win.add(table);
		
		
		return win;
	}
	
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
					className: 'star',
					programId: program.id,
					width: 30,
					height: 30,
					left: 15
				});
				
				if(coscup.data.isStarred(program.id)){
					starImageView.image = 'images/starred.png';
				}else{
					starImageView.image = 'images/unstarred.png';
				}
				
				starImageView.addEventListener('click', function(e){
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
					left: 60,
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
					left: 60,
					bottom: 10	
				});
				
				var colorDot = Titanium.UI.createView({
					backgroundColor: coscup.ui.color['PROGRAM_TYPE_'+program.type],
					borderRadius: 4,
					width: 6,
					height: 6,
					left: 63,
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
					left: 73,
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
	/*
	coscup.ui.createSocialWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		return win;
	}*/
	
	coscup.ui.createStarredWin = function(){
		var win = Titanium.UI.createWindow({
			barColor: '#408937',
			titleControl: Titanium.UI.createImageView({image: 'images/logo.png'})
		});
		
		if(coscup.osname === 'iphone' || coscup.osname === 'ipad'){
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
			win.rightNavButton = clearButton;
		}

		var table =  coscup.ui.createStarredProgramTableView({headerType: 'day'}, coscup.data.program);
		win.add(table);
		
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
		table.search = search;
		var data;

		table.showData = function(){
			data = [];
			for(var i = 0, l = programs.length; i<l; i++)
			{
				var program = programs[i];
				
				var row = coscup.ui.createProgramRow(program);
				//
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

				data.push(row);
			}
			
			table.setData(data);
		}
		
		table.addEventListener('click', function(e){
			coscup.currentProgramTableView = table;
			if(e.source.className === 'star')
			{
				//alert(coscup.data.isStarred(e.source.programId));
				var unstarCallback = function(){
					e.source.image = 'images/unstarred.png';
				}
				
				if(coscup.data.isStarred(e.source.programId)){
					coscup.data.unstarProgramById(e.source.programId, unstarCallback);
				}else{
					coscup.data.starProgramById(e.source.programId, function(){
						e.source.image = 'images/starred.png';
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
			Ti.API.info('app:starUpdate triggerer!');
			for(var i = 0, l = data.length; i < l; i++){
				var program = data[i];
				if(program.programId === e.id){
					var row = coscup.ui.createProgramRow(coscup.data.getProgramById(e.id));
					var highlightView = Titanium.UI.createView({backgroundColor: '#FFFFCC', width: '100%', height: '100%', left: 0, top: 0});
					if(coscup.currentProgramTableView === table){
						row.add(highlightView);		
						var animation = Titanium.UI.createAnimation();
						animation.opacity = 0;
						animation.duration = 500;
						table.updateRow(i, row);
						highlightView.animate(animation);
					} else{
						table.updateRow(i, row);
					}
				}			
			}
		});
		
		
		Titanium.App.addEventListener('app:starClear', function(){
				Ti.API.info('clear');
				table.showData();
		});
		
		return table;
	};
	
	//***
		coscup.ui.createStarredProgramTableView = function(option, programs){
		var search = Titanium.UI.createSearchBar({
    		showCancel: false,
  			hintText: _('search_program')
		});
		
		var table = Titanium.UI.createTableView(option);
		table.filterAttribute = 'filter';
		table.search = search;
		var data;

		table.showData = function(){
			data = [];
			for(var i = 0, l = programs.length; i<l; i++)
			{
				var program = programs[i];
				
				var row = coscup.ui.createProgramRow(program);
				//
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
				
				if(coscup.data.isStarred(program.id)){
					data.push(row);
				}
			}
			
			if(data.length === 0){
				data = [{title: _('no_starred_program')}];
			}
			table.setData(data);
		}
		
		table.addEventListener('click', function(e){
			coscup.currentProgramTableView = table;
			if(e.source.className === 'star')
			{
				//alert(coscup.data.isStarred(e.source.programId));
				var unstarCallback = function(){
					e.source.image = 'images/unstarred.png';
					table.deleteRow(e.index);
					if(coscup.data.starredPrograms.length == 0){
						table.setData([{title: _('no_starred_program')}]);
					}
				}
				
				if(coscup.data.isStarred(e.source.programId)){
					coscup.data.unstarProgramById(e.source.programId, unstarCallback);
				}else{
					coscup.data.starProgramById(e.source.programId, function(){
						e.source.image = 'images/starred.png';
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
		
		Titanium.App.addEventListener('app:starClear', function(){
			table.setData([{title: _('no_starred_program')}]);
		});
		
		return table;
	};
	//
	
	coscup.ui.createProgramRow = function (program) {
		var row = Titanium.UI.createTableViewRow({
			height: 'auto',
			backgroundColor: '#fff'
		});
		
		if(program.type != 0)
		{
			daysChild = true;
		}
		
		row.programId = program.id;
		row.filter = program.name + coscup.data.programTypes[row.type] + coscup.data.programRooms[program.room][coscup.i18n.locale];
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
			className: 'star',
			programId: program.id,
			width: 30,
			height: 30,
			left: 14
		});
		
		//Ti.API.info(coscup.data.isStarred(program.id));
		if(coscup.data.isStarred(program.id)){
			starImageView.image = 'images/starred.png';
		}else{
			starImageView.image = 'images/unstarred.png';
		}
		
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
			left: 60,
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
			left: 60,
			bottom: 10	
		});
		
		var colorDot = Titanium.UI.createView({
			backgroundColor: coscup.ui.color['PROGRAM_TYPE_'+program.type],
			borderRadius: 4,
			width: 6,
			height: 6,
			left: 63,
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
			left: 73,
			top: 10	
		});
		
		row.add(nameLabel);
		row.add(timeRoomLabel);
		row.add(starImageView);
		
		if(row.type > 0)
		{
			row.add(colorDot);
			row.add(programTypeLabel);
		}
		return row;
	}
	
	coscup.ui.createProgramTypeTableView = function(){
		var programTypes = coscup.data.programTypes;
		programTypes[0] = _('all_programs');
		var data = [];
		for(var i = 0, l = programTypes.length; i < l; i++){
			var programType = programTypes[i];
			
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