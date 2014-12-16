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
	
	// current id
	this.curr_id;
	
	
	/* ------------------
	 * init
	 */
	this.init = function() {
		
		// item
		$('.session_item').each(function() {
			$(this).find('a').on({
				click : function() {
					_self.curr_id = $(this).attr('data-id');
					_self.dialogue();
				}
			});
		});
		
		// resize
		$(window).on({
			resize	: $.proxy(this._resize, this)
		});
		this._resize();
	}
	
	
	/* ------------------
	 * dialogue
	 */
	this.dialogue = function() {
		$('body').addClass('window');
		$('#detail').stop().css({ display : 'block', opacity : 0 }).animate({ opacity : 1 }, 500, 'linear', function() {
			$('#detail_close').off().on({
				click : function() {
					$('#' + _self.curr_id).css({ display : 'none' });
					$('#detail').css({ display : 'none' });
					$('body').removeClass('window');
				}
			}).css({ cursor : 'pointer' });
		});
		$('#' + this.curr_id).css({ display : 'block' });
		this._resize();
	}
	
	
	/* ------------------
	 * _resize
	 */
	this._resize = function() {
		var winW = _cmn.ua.isiOS ? window.innerWidth : $(window).width();
		var winH = _cmn.ua.isiOS ? window.innerHeight : $(window).height();
		
		// detail
		$('#detail').height(winH);
		var y = Math.floor((winH - $('#detail_dialogue').outerHeight()) / 2);
		$('#detail_container').css({ paddingTop : y });
	}
	
	return this;
}