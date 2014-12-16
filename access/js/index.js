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
		
		var id = 'gmap';
		var target = $('#' + id);
		var lat = Number(target.attr('data-lat'));
		var lng = Number(target.attr('data-lng'));
		$(this).attr('id', id);
		
		var mapOptions = {
			zoom										: 17,
			center									: new google.maps.LatLng(lat, lng),
			mapTypeId								: google.maps.MapTypeId.ROADMAP,
			disableDoubleClickZoom	: true,
			mapTypeControl					: true,
			panControl							: false,
			zoomControl							: true,
			scrollwheel							: false,
			streetViewControl				: false,
			backgroundColor					: '#fff'
		};
		var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
		google.maps.event.addListener( map, 'tilesloaded', function() {
			
		});
		
		// マーカー
		var markerOptions = {
			map				: map,
			position	: new google.maps.LatLng(lat, lng),
			animation	: google.maps.Animation.DROP
		};
		var marker = new google.maps.Marker(markerOptions);
		
		
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