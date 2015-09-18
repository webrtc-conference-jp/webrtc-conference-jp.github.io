/* ----------------------------------------
 * 
 * JavaScript | BINGO
 * 
 * ----------------------------------------
 */
var WEBRTC = WEBRTC || {};
var _cmn;



/* ------------------
 * constructor
 */
$(function()
{
	// common
	_cmn = new WEBRTC.Common();
	_cmn.init();
});





/* ----------------------------------------
 * CLASS - Common
 * ----------------------------------------
 */
WEBRTC.Common = function() {
	var _self = this;
	
	// ua
	this.ua;
	
	// header
	this.header;
	
	// smooth scroll
	this.scrollParam	= [
		{
			duration		: 850,
			easing			: 'easeOutQuint',
			paddingTop	: 0
		},
		{
			duration		: 850,
			easing			: 'easeOutQuint',
			paddingTop	: -124
		}
	];
	
	
	/* ------------------
	 * init
	 */
	this.init = function() {
		// ua
		this.ua = new WEBRTC.UserAgent();
		
		// header
		var opt = {
			parent : this
		}
		this.header = new WEBRTC.Header(opt);
		this.header.init();
		
		// smooth scroll
		this.setSmoothScroll();
		
		// rollover
		$(".imgover").rollover();
		
		// resize, scroll
		$(window).on({
			resize	: $.proxy(this._resize, this),
			scroll	: $.proxy(this._scroll, this)
		});
		this._resize();
		this._scroll();
	}
	
	
	/* ------------------
	 * _resize
	 */
	this._resize = function() {
		var winW = this.ua.isiOS ? window.innerWidth : $(window).width();
		var winH = this.ua.isiOS ? window.innerHeight : $(window).height();
		var bodyH = document.body.clientHeight;
	}
	
	
	/* ------------------
	 * _scroll
	 */
	this._scroll = function() {
		var scrlY = $(window).scrollTop();
	}
	
	
	/* ------------------
	 * setSmoothScroll
	 */
	this.setSmoothScroll = function() {
		$('.smooth').each(function() {
			if($(this).attr('href') == '#pagetop') {
				$(this).scrollAnchors(_self.scrollParam[0]);
			} else {
				$(this).scrollAnchors(_self.scrollParam[1]);
			}
		});
	}
	
	
	/* ------------------
	 * smoothScrollTo
	 */
	this.smoothScrollTo = function(hash) {
		var h = hash == '#' ? '#pagetop' : hash;
		var s = this.scrollParam[h == '#pagetop' ? 0 : 1];
		var target_offset = $(h).offset();
		var target_top = target_offset.top + s.paddingTop;
		$('html, body').stop().animate({ scrollTop:target_top }, s.duration, s.easing);
	}
	
	return this;
}





/* ----------------------------------------
 * CLASS - Header
 * ----------------------------------------
 */
WEBRTC.Header = function(options) {
	var _self = this;
	
	// parent
	this.parent;
	
	// dom
	this.container = $('#header');
	this.gnavContainer = $('#gnav');
	
	
	/* ------------------
	 * init
	 */
	this.init = function() {
		$.extend(this, options);
		
		// resize, scroll
		$(window).on({
			resize	: $.proxy(this._resize, this),
			scroll	: $.proxy(this._scroll, this)
		});
		this._resize();
		this._scroll();
	}
	
	
	/* ------------------
	 * _resize
	 */
	this._resize = function() {
		var winW = this.parent.ua.isiOS ? window.innerWidth : $(window).width();
		var winH = this.parent.ua.isiOS ? window.innerHeight : $(window).height();
		var bodyH = document.body.clientHeight;
		
		var w = 0;
		this.gnavContainer.find('li').each(function() {
			w += $(this).outerWidth();
		});
		var x = Math.round((winW - w) / 2);
		this.gnavContainer.css({ paddingLeft: x });
	}
	
	
	/* ------------------
	 * _scroll
	 */
	this._scroll = function() {
		var scrlY = $(window).scrollTop();
	}
	
	return this;
}




/* ----------------------------------------
 * CLASS - UserAgent
 * ----------------------------------------
 */
WEBRTC.UserAgent = function() {
	var doc = document;
	var _ua = window.navigator.userAgent.toLowerCase(),
			_IE, _IEver,
			_Chrome, _ChromeVer,
			_FireFox, _FireFoxVer,
			_Safari, _SafariVer,
			_Opera, _OperaVer,
			_Mac, _iPhone, _iPad, _iPod, _iOSver,
			_Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
			_WindowsPhone,
			_bot;

	// ブラウザ判定
	if (_ua.indexOf("msie") != -1) {
		_IE = true;
		_ua.match(/msie (\d+\.\d)/);
		_IEver = parseFloat(RegExp.$1);

	} else if (_ua.indexOf("chrome")  != -1) {
		_Chrome = true;
		_ua.match(/chrome[\/ ]?(\d+\.\d+)/);
		_ChromeVer = parseFloat(RegExp.$1);

	} else if (_ua.indexOf("firefox") != -1) {
		_FireFox = true;
		_ua.match(/firefox[\/ ]?(\d+\.\d+)/);
		_FireFoxVer = parseFloat(RegExp.$1);

	} else if (_ua.indexOf("opera")   != -1) {
		_Opera = true;
		_ua.match(/opera[\/ ]?(\d+\.\d+)/);
		_OperaVer = parseFloat(RegExp.$1);

	} else if (_ua.indexOf("safari")  != -1) {
		_Safari = true;
		_ua.match(/version[\/ ]?(\d+\.\d+)/);
		_SafariVer = parseFloat(RegExp.$1);
	}

	// 携帯端末
	if (_ua.indexOf("iphone") != -1) {
		_iPhone = true;
		_ua.match(/iphone os (\d+)_(\d+)/);
		_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

	} else if (_ua.indexOf("ipad") != -1) {
		_iPad = true;
		_ua.match(/cpu os (\d+)_(\d+)/);
		_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

	} else if (_ua.indexOf("ipod") != -1) {
		_iPod = true;
		_ua.match(/os (\d+)_(\d+)/);
		_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

	} else if (_ua.indexOf("android") != -1) {
		_Android = true;
		_ua.match(/android (\d+\.\d)/);
		_AndroidVer = parseFloat(RegExp.$1);

		if(_ua.indexOf('mobile') != -1) {
			_AndroidMobile = true;
		} else {
			_AndroidTablet = true;
		}
	} else if (_ua.indexOf("windows phone") != -1) {
		_WindowsPhone = true;
	}
	if(_ua.indexOf('mac os') != -1) {
		_Mac = true;
	}

	// クローラー系
	if(_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1) {
		_bot = true;
	}

	var ua = {
		isIE     : (_IE),
		isIE6    : (_IEver == 6.0),
		isIE7    : (_IEver == 7.0),
		isIE8    : (_IEver == 8.0),
		isIE9    : (_IEver == 9.0),
		isIE10   : (_IEver == 10.0),
		isIEgt6  : (_IEver > 6),
		isIEgt7  : (_IEver > 7),
		isIEgt8  : (_IEver > 8),
		isIEgt9  : (_IEver > 9),
		isIEgt10 : (_IEver > 10),
		isIElt6  : (_IE && _IEver < 6),
		isIElt7  : (_IE && _IEver < 7),
		isIElt8  : (_IE && _IEver < 8),
		isIElt9  : (_IE && _IEver < 9),
		isIElt10 : (_IE && _IEver < 10),

		isiPhone        : _iPhone ,
		isiPad          : _iPad,
		isiPod          : _iPod,
		isiOS           : (_iPhone || _iPad || _iPod),
		isAndroid       : _Android,
		isAndroidMobile : _AndroidMobile,
		isAndroidTablet : _AndroidTablet,
		isWindowsPhone  : _WindowsPhone,
		isSmartPhone    : (_iPhone || _iPad || _iPod || _Android || _WindowsPhone),

		isMobile : (_iPhone || _iPod || _AndroidMobile || _WindowsPhone),
		isTablet : (_iPad || _AndroidTablet),

		isSafari  : _Safari,
		isChrome  : _Chrome,
		isOpera   : _Opera,
		isFireFox : _FireFox,
		isMac     : _Mac,

		verIE      : _IEver,
		verFireFox : _FireFoxVer,
		verChrome  : _ChromeVer,
		verSafari  : _SafariVer,
		verOpera   : _OperaVer,
		verAndroid : _AndroidVer,
		veriOS     : _iOSver,

		isBot : _bot
	}

	return ua;
}









