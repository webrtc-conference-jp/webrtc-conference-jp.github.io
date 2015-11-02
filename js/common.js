

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
		$(".menu_icon").on("touchstart, mousedown", function () {
			$(this).addClass("touched")
		})
		$(".menu_icon").on("touchend, mouseup", function () {
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

window.onload = function () {
	Nav.init()
}
