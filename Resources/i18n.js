(function(){
	coscup.i18n = {};
	coscup.i18n.locale = 'en';
	if(coscup.osname === 'iphone' || coscup.osname === 'ipad' )
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
		switch(locale)
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
	}
	
	coscup.i18n.getString = function(key)
	{
		//Ti.API.info(key);
		return coscup.i18n.dictionary[key][coscup.i18n.locale];
	}
	
	////
	coscup.i18n.dictionary = {
		schedule: {
			'en': 'Schedule',
			'zh-cn': '议程',
			'zh-tw': '議程'
		},
		program: {
			'en': 'Program',
			'zh-cn': '主题演讲',
			'zh-tw': '主題演講'
		},
		place: {
			'en': 'Place',
			'zh-cn': '位置',
			'zh-tw': '位置'
		},
		social: {
			'en': 'Social',
			'zh-cn': '社会化網絡',
			'zh-tw': '社交網路'
		},
		stared: {
			'en': 'Stared',
			'zh-cn': '已加星號',
			'zh-tw': '已加星號'
		},
		no_program_avaliable: {
			'en': 'No program avaliable',
			'zh-cn': '没有演讲',
			'zh-tw': '沒有演講'
		},
		day_1: {
			'en': 'Aug 20, 2011 Sat.',
			'zh-cn': '2011年8月20日 星期六',
			'zh-tw': '2011年8月20日 星期六'
		},
		day_2: {
			'en': 'Aug 20, 2011 Sun.',
			'zh-cn': '2011年8月21日 星期日',
			'zh-tw': '2011年8月21日 星期日'
		},
		all_programs: {
			'en': 'All programs',
			'zh-cn': '所有議程',
			'zh-tw': '所有議程'
		},
		sunday: {
			'en': 'Sun.',
			'zh-cn': '週日',
			'zh-tw': '週日'
		},
		monday: {
			'en': 'Mon.',
			'zh-cn': '週一',
			'zh-tw': '週一'
		},
		tuesday: {
			'en': 'Tue.',
			'zh-cn': '週二',
			'zh-tw': '週二'
		},
		tuesday: {
			'en': 'Tue.',
			'zh-cn': '週二',
			'zh-tw': '週二'
		},
		wednesday: {
			'en': 'Wed.',
			'zh-cn': '週三',
			'zh-tw': '週三'
		},
		thursday: {
			'en': 'Tue.',
			'zh-cn': '週四',
			'zh-tw': '週四'
		},
		friday: {
			'en': 'Fri.',
			'zh-cn': '週五',
			'zh-tw': '週五'
		},
		saturday: {
			'en': 'Sat.',
			'zh-cn': '週六',
			'zh-tw': '週六'
		},
		info: {
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
		about: {
			'en': 'About the event',
			'zh-cn': '关于活动',
			'zh-tw': '關於活動'			
		},
		blog: {
			'en': 'Blog',
			'zh-cn': '博客',
			'zh-tw': '部落格'			
		},
		upcoming: {
			'en': 'Upcoming event',
			'zh-cn': '接下来的活动',
			'zh-tw': '接下來的活動'			
		},
		sponsors: {
			'en': 'Sponsors',
			'zh-cn': '赞助单位',
			'zh-tw': '贊助單位'			
		},
		venue: {
			'en': 'Venue',
			'zh-cn': '地点',
			'zh-tw': '地點'			
		},		
		twitter: {
			'en': 'twitter',
			'zh-cn': 'twitter',
			'zh-tw': 'twitter'			
		},
		plurk: {
			'en': 'plurk',
			'zh-cn': 'plurk',
			'zh-tw': 'plurk'			
		},
		floor_3F: {
			'en': '中央研究院人文社會科學館 3樓',
			'zh-cn': '中央研究院人文社会科学馆 3楼',
			'zh-tw': '3F, H.S.S Building, Academia Sinica'			
		},
		floor_4F: {
			'en': '中央研究院人文社會科學館 4樓',
			'zh-cn': '中央研究院人文社会科学馆 4楼',
			'zh-tw': '4F, H.S.S Building, Academia Sinica'			
		},
	}
})();
function _(key){
	return coscup.i18n.getString(key);
}
