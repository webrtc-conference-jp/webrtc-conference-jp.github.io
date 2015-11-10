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
		
		// resize
		$(window).on({
			resize	: $.proxy(this._resize, this)
		});
		this._resize();
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