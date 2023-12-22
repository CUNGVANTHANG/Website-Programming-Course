'use strict';

var nhMenu = {	
	init: function(){
		var self = this;

		if(typeof(nhMain.isMobile) != _UNDEFINED && !nhMain.isMobile){
			self.stickyMenu();
		}
		
		self.tabMenu.init();
		self.mainMenu.init();

		// active menu use nh-toggle
		if($('[nh-menu] a[href="'+ nhMain.pathname +'"]').length > 0 && !nhMain.isMobile){
			$('[nh-menu] a[href="'+ nhMain.pathname +'"]').each(function( index ){

				$(this).addClass('active');

				var toggleElement = $(this).parents('[nh-toggle-element]');
				if(toggleElement.length == 0) return;

				toggleElement.each(function(index){
					$(this).addClass('active').css({'display': 'block'});

					var key = $(this).attr('nh-toggle-element');
					$('[nh-toggle="' + key + '"]').addClass('open');
				});
			});
		}
	},
	stickyMenu: function(endPositionStickyMenu = 150) {
		var self = this;
	
		var sticky = $('.sticky-menu');
		var height = parseInt($('.sticky-menu').css('height'));
		if(sticky.length == 0) return false;

		//
		sticky.wrap('<div style="height:' + height + 'px"></div>');
		var startScroll = $(window).scrollTop();

		$(window).scroll(function(){
		    var scroll = $(window).scrollTop();

		    scroll > startScroll ? sticky.removeClass('scroll-up').addClass('scroll-down') : sticky.removeClass('scroll-down').addClass('scroll-up'), 
		    startScroll = scroll;
		    startScroll > endPositionStickyMenu ? sticky.addClass('fix') : sticky.removeClass('fix');
		})
	},
	tabMenu: {
		init: function(){
			var self = this;

			if($('.tabs-menu').length == 0) return false;

			$('.tabs-menu').each(function(index){
				var menuObject = $(this);
				var maxHeight = 0;

			   	$(this).find('.sub-menu').each(function(){			   	
			   		var height = parseInt($(this).css('height'));
			   		if (height > maxHeight) {
		                maxHeight = height;
		            }
				});
				menuObject.find('.container-menu').css('minHeight', maxHeight);
			});

			$('.tabs-menu .tabs-item > .menu-link').mouseenter(function(){
				var menuObject = $(this).closest('.tabs-menu');

				// remove all class active of tab
				menuObject.find('.tabs-item').removeClass('active');

				// active tab
				$(this).closest('.tabs-item').addClass('active');
			})
		}
	},		
	mainMenu: {
		menuObject: null,
		init: function() {
			var self = this;
			
			self.menuObject = $('[nh-menu="sidebar"]');

			if(self.menuObject == null || self.menuObject == _UNDEFINED || self.menuObject.length == 0){
				return false
			};

			$(document).on('click', '[nh-menu="btn-open"]', function(e) {
				e.preventDefault();
				self.toggleMenu(!self.menuObject.hasClass('open'));
			});

			$(document).on('click', '[nh-menu="btn-close"]', function(e) {
				e.preventDefault();
				self.toggleMenu(false);
			});
			
			$(document).on('click', '.back-drop', function(e) {
				if(($(e.target).is('[nh-menu="close"]') || $(e.target).is('.back-drop.open')) && self.menuObject.hasClass('open')){
					self.toggleMenu(false);
				}
			});
		},
		toggleMenu: function(open = true){
			var self = this;

			self.menuObject.toggleClass('open', open);
			$('.back-drop').toggleClass('open', open);
		},
	}
}

$(document).ready(function() {
	nhMenu.init();
});