(function(){
	coscup.i18n = {};
	coscup.i18n.locale = 'en';
	if(coscup.app.osname === 'iphone' || coscup.app.osname === 'ipad' )
	{
		switch(Titanium.Locale.currentLanguage)
		{
			case 'zh-Hant':
				coscup.i18n.locale = 'zh-tw';
				break;
			
			case 'zh-Hans':
				coscup.i18n.locale = 'zh-cn';
				break;
			
			default:
				coscup.i18n.locale = 'en';
				break;
		}
	}else if('android'){
		var locale = Titanium.Locale.currentLanguage + '=' + Titanium.Locale.currentCountry;
		locale = locale.toLowerCase();
		Ti.API.info(locale);
		switch(locale)
		{
			case 'zh=tw':
				coscup.i18n.locale = 'zh-tw';
				break;
			
			case 'zh=cn':
				coscup.i18n.locale = 'zh-cn';
				break;
			
			default:
				coscup.i18n.locale = 'en';
				break;
		}
	}
	
	coscup.i18n.getString = function(key)
	{
		//Ti.API.info(key);
		return coscup.i18n.dictionary[key][coscup.i18n.locale];
	}
	
	////
	coscup.i18n.dictionary = {
		'schedule': {
			'en': 'Schedule',
			'zh-cn': '议程',
			'zh-tw': '議程'
		},
		'program': {
			'en': 'Program',
			'zh-cn': '主题演讲',
			'zh-tw': '主題演講'
		},
		'place': {
			'en': 'Place',
			'zh-cn': '位置',
			'zh-tw': '位置'
		},
		'social': {
			'en': 'Social',
			'zh-cn': '社会化網絡',
			'zh-tw': '社交網路'
		},
		'starred': {
			'en': 'starred',
			'zh-cn': '已加星號',
			'zh-tw': '已加星號'
		},
		'no_program_avaliable': {
			'en': 'No program avaliable',
			'zh-cn': '没有演讲',
			'zh-tw': '沒有演講'
		},
		'day_1': {
			'en': 'Aug 20, 2011 Sat.',
			'zh-cn': '2011年8月20日 星期六',
			'zh-tw': '2011年8月20日 星期六'
		},
		'day_2': {
			'en': 'Aug 20, 2011 Sun.',
			'zh-cn': '2011年8月21日 星期日',
			'zh-tw': '2011年8月21日 星期日'
		},
		'all_programs': {
			'en': 'All programs',
			'zh-cn': '所有議程',
			'zh-tw': '所有議程'
		},
		'sunday': {
			'en': 'Sun.',
			'zh-cn': '週日',
			'zh-tw': '週日'
		},
		'monday': {
			'en': 'Mon.',
			'zh-cn': '週一',
			'zh-tw': '週一'
		},
		'tuesday': {
			'en': 'Tue.',
			'zh-cn': '週二',
			'zh-tw': '週二'
		},
		'tuesday': {
			'en': 'Tue.',
			'zh-cn': '週二',
			'zh-tw': '週二'
		},
		'wednesday': {
			'en': 'Wed.',
			'zh-cn': '週三',
			'zh-tw': '週三'
		},
		'thursday': {
			'en': 'Tue.',
			'zh-cn': '週四',
			'zh-tw': '週四'
		},
		'friday': {
			'en': 'Fri.',
			'zh-cn': '週五',
			'zh-tw': '週五'
		},
		'saturday': {
			'en': 'Sat.',
			'zh-cn': '週六',
			'zh-tw': '週六'
		},
		'info': {
			'en': 'Info',
			'zh-cn': '简介',
			'zh-tw': '簡介'
		},
		'floor3': {
			'en': '3rd Floor',
			'zh-cn': '三楼',
			'zh-tw': '三樓'			
		},
		'floor4': {
			'en': '4th Floor',
			'zh-cn': '四楼',
			'zh-tw': '四樓'			
		},
		'about': {
			'en': 'About the event',
			'zh-cn': '关于活动',
			'zh-tw': '關於活動'			
		},
		'blog': {
			'en': 'Blog',
			'zh-cn': '博客',
			'zh-tw': '部落格'			
		},
		'upcoming': {
			'en': 'Upcoming event',
			'zh-cn': '接下来的活动',
			'zh-tw': '接下來的活動'			
		},
		'sponsors': {
			'en': 'Sponsors',
			'zh-cn': '赞助单位',
			'zh-tw': '贊助單位'			
		},
		'venue': {
			'en': 'Venue',
			'zh-cn': '地点',
			'zh-tw': '地點'			
		},		
		'twitter': {
			'en': 'twitter',
			'zh-cn': 'twitter',
			'zh-tw': 'twitter'			
		},
		'plurk': {
			'en': 'plurk',
			'zh-cn': 'plurk',
			'zh-tw': 'plurk'			
		},
		'floor_3F': {
			'en': '中央研究院人文社會科學館 3樓',
			'zh-cn': '中央研究院人文社会科学馆 3楼',
			'zh-tw': '3F, H.S.S Building, Academia Sinica'			
		},
		'floor_4F': {
			'en': '中央研究院人文社會科學館 4樓',
			'zh-cn': '中央研究院人文社会科学馆 4楼',
			'zh-tw': '4F, H.S.S Building, Academia Sinica'			
		},
		'no_starred_program': {
			'en': 'No starred program yet',
			'zh-cn': '还没有已加星号的议程',
			'zh-tw': '還沒有已加星號的議程'	
		},
		'search_program': {
			'en': 'Search program',
			'zh-cn': '搜寻议程',
			'zh-tw': '搜尋議程'	
		},
		'clear_starred': {
			'en': 'Clear starred record',
			'zh-cn': '清除所有星號',
			'zh-tw': '清除所有星號'
		},
		'are_you_sure_you_want_to_clear': {
			'en': 'Are you sure you want to clear all starred programs?',
			'zh-cn': '你确定要清除所有已加星号的议程吗？',
			'zh-tw': '你確定要清除所有已加星號的議程嗎？'
		},
		'clear': {
			'en': 'Clear',
			'zh-cn': '清除',
			'zh-tw': '清除'
		},
		'ok': {
			'en': 'OK',
			'zh-cn': '确定',
			'zh-tw': '確定'
		},
		'cancel': {
			'en': 'Cancel',
			'zh-cn': '撤消',
			'zh-tw': '取消'
		},
		'about_the_app': {
			'en': 'About the app',
			'zh-cn': '关于本软件',
			'zh-tw': '關於本軟體'
		},
		'powered_by': {
			'en': 'Developed by Justin Lee.\nPowered by Titanium Mobile.\nHerxun Inc.',
			'zh-cn': '李易修(Justin Lee)开发.\n採用Titanium Mobile.\nHerxun Inc.',
			'zh-tw': '李易修(Justin Lee)開發.\n採用Titanium Mobile.\nHerxun Inc.'
		},
		'update_data': {
			'en': 'Updata data',
			'zh-cn': '资料更新',
			'zh-tw': '資料更新'
		},
		'are_you_sure_you_want_to_update_data': {
			'en': 'Are you sure you want to update data?',
			'zh-cn': '你确定要更新资料吗？',
			'zh-tw': '你確定要更新資料嗎？'
		},
		'hss_building': {
			'en': '中央研究院人文社會科學館',
			'zh-cn': '中央研究院人文社会科学馆',
			'zh-tw': 'H.S.S Building, Academia Sinica'			
		},
		'directions': {
			'en': 'Directions',
			'zh-cn': '交通方式',
			'zh-tw': '交通方式'			
		},
		'open_in_google_maps': {
			'en': 'Open in google maps',
			'zh-cn': '使用谷歌地图开启',
			'zh-tw': '使用Google地圖開啓'			
		},
		'sent_via_email': {
			'en': 'Sent via email',
			'zh-cn': '透过电子邮件传送',
			'zh-tw': '透過電子郵件傳送'			
		},
		'my_starred_programs_at_coscup': {
			'en': 'My starred programs at COSCUP 2011',
			'zh-cn': '我加星号的COSCUP 2011议程',
			'zh-tw': '我加星號的COSCUP 2011議程'			
		},
		'information': {
			'en': 'Information',
			'zh-cn': '资讯',
			'zh-tw': '資訊'			
		},
		'see_you_next_year': {
			'en': 'See you next year!',
			'zh-cn': '明年見！',
			'zh-tw': '明年見！'			
		},
		'bus': {
			'en': 'Feeder bus',
			'zh-cn': '客车',
			'zh-tw': '接駁車'			
		},
		'ongoing': {
			'en': 'Ongoing event',
			'zh-cn': '进行中的活动',
			'zh-tw': '進行中的活動'			
		},
	}
})();
function _(key){
	return coscup.i18n.getString(key);
}
