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
        // ダイアログ以外の部分をクリックされた際に、ダイアログを閉じる
        var closeDialogOnClick = function(e) {
            // ダイアログ以外の部分かどうかを判定
            if ($(e.target).parents('#detail_dialogue').length == 0) {
                // 閉じるボタンを♂
                $('#detail_close').click();
            }
        };
		$('body').addClass('window');
		$('#detail').stop().css({ display : 'block', opacity : 0 }).animate({ opacity : 1 }, 500, 'linear', function() {
			$('#detail_close').off().on({
				click : function() {
					$('#' + _self.curr_id).css({ display : 'none' });
					$('#detail').css({ display : 'none' });
					$('body').removeClass('window');
                    $(document).off('click', 'body.window', closeDialogOnClick);
				}
			}).css({ cursor : 'pointer' });
	        $(document).on('click', 'body.window', closeDialogOnClick);
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
