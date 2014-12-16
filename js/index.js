/* ----------------------------------------
 * 
 * Index
 * 
 * ----------------------------------------
 */
var WEBRTC = WEBRTC || {};
var _mdl;

// constructor
$(function()
{
	_mdl = new WEBRTC.Module();
	_mdl.init();
});



/* ----------------------------------------
 * CLASS - Module
 * ----------------------------------------
 */
WEBRTC.Module = function() {
	var _self = this;
	
	
	
	/* ------------------
	 * init
	 */
	this.init = function() {
		
		// overview
		this.setOverview();
		
		// resize
		$(window).on({
			resize	: $.proxy(this._resize, this)
		});
		this._resize();
	}
	
	
	/* ------------------
	 * setOverview
	 */
	this.setOverview = function() {
		var opener = 'img/overview_opener.png';
		var closer = 'img/overview_closer.png';
		$('.overview_item').each(function() {
			if($(this).find('.opener').length > 0) {
				$(this).find('.opener').on({
					click : function() {
						var f = $(this).attr('data-flag') == 'true' ? false : true;
						if(f) {
							$(this).children('img').attr('src', closer);
							$(this).next().slideDown('fast');
						} else {
							$(this).children('img').attr('src', opener);
							$(this).next().slideUp('fast');
						}
						$(this).attr('data-flag', f);
					}
				}).attr('data-flag', false).css({ cursor : 'pointer' });
			}
		});
	}
	
	
	/* ------------------
	 * _resize
	 */
	this._resize = function() {
		var winW = _cmn.ua.isiOS ? window.innerWidth : $(window).width();
		var winH = _cmn.ua.isiOS ? window.innerHeight : $(window).height();
		
	}
	
	return this;
}