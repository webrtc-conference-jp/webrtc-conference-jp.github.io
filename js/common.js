

var Nav = {
	init: function () {
		var g_menu = $("#g_menu"), g_ul = g_menu.find("ul");
		
		/*$(window).on("scroll", function () {console.log(st)
			var st = $(window).scrollTop();
			if(st > 100) {
				g_menu.removeClass("open_menu");
			} else {
				g_menu.addClass("open_menu");
				
			}
			checkIcon ()
		})*/
		g_menu.find(".menu_icon").on("touchstart, mousedown", function () {
			$(this).addClass("touched")
		})
		g_menu.find(".menu_icon").on("touchend, mouseup", function () {
			g_menu.toggleClass("open_menu");
			$(this).removeClass("touched")
			checkIcon ()
		})

		function checkIcon () {
			if(g_menu.hasClass("open_menu")) {
				g_menu.find(".fa").removeClass("fa-bars").addClass("fa-close")
			}else{
				g_menu.find(".fa").removeClass("fa-close").addClass("fa-bars")
			}
		}

		if(window.innerWidth < 480) {
			g_menu.removeClass("open_menu");
		}
	}
}

var Modal = {
	elements: {
		overlay: $("#overlay"),
		modal: $("#modal_window")
	},
	init : function () {
		$(document).on("click", "#modal_window .menu_icon, #overlay", Modal.close);
		$(document).on("click", "#session .session_item", Modal.open)
	},
	open : function (e) {
		e.preventDefault()
		console.log(this.id) //session_0xなどid参照が可能

		$('#session_modal .session_detail_inner').hide();
		$('#' + this.getAttribute('data-id')).show();

		var sct = $(window).scrollTop() + 40
		Modal.elements.overlay.fadeIn(200, function () {
			Modal.elements.modal.css({top: sct}).fadeIn(200)
		})
	},
	close : function () {
		Modal.elements.modal.fadeOut(200, function () {
			Modal.elements.overlay.fadeOut(200)
		})
	}
}

var SessionTab = {
	content_inner : $(".content_inner"),
	tabs : $(".day_tab li"),
	init : function () {
		$(document).on("click", ".day_tab a", SessionTab.change)
	},
	change : function (e) {
		e.preventDefault();
		var ids = "#tab_session"+this.id;
		SessionTab.content_inner.removeClass("active_session")
		$(ids).addClass("active_session")
		SessionTab.tabs.removeClass("active_tab")
		$(this).closest("li").addClass("active_tab")
	}
}

window.onload = function () {
	Nav.init();
	// Modal.init() 一時的にモーダルダイアログを無効にする
	SessionTab.init();
}
