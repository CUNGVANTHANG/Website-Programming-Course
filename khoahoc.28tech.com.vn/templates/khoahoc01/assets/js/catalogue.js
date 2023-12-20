'use strict';

var nhTableContent = {
	warpTableNav: null,
	warpTableFixed: null,
	iconSidebar: null,
	tableContent: null,
	tableNav: null,
	htmlTemplate: '\
		<div class="table-content-section">\
			<label nh-table-content="icon" class="table-content-icon" style="display: none">\
				<i class="iconsax isax-category"></i>\
			</label>\
	    	<div class="box-table-nav">\
				<h4 class="title-table-navigation">\
					<i class="iconsax isax-category"></i>\
					<b>'+nhMain.getLabel('muc_luc_noi_dung')+'</b>\
					<span nh-table-content="expand" class="icon-expand"></span>\
				</h4>\
				<nav nh-table-content="nav" class="collapse show"></nav>\
			</div>\
		</div>',
	init: function(){
		var self = this;
		
		self.tableContent = '[nh-table-content="content"]';

		if($(self.tableContent).length == 0){
			return false;
		}

		self.loadElement();

		self.warpTableNav = $('.table-content-section');
		self.warpTableFixed = '[nh-table-content="fixed"]';
		self.iconSidebar = '[nh-table-content="icon"]';
		self.tableNav = '[nh-table-content="nav"]';

		var headings = 'h1, h2, h3, h4, h5';
		
		self.makeIdsHeading(self.tableContent, headings);
		tocbot.init({
			tocSelector: self.tableNav,
			contentSelector: self.tableContent,
			headingSelector: headings,
			linkClass: 'table-link',
			activeLinkClass: 'is-active-link',
			listClass: 'table-content',
			listItemClass: 'list-item',
			activeListItemClass: 'is-active-li',
			scrollSmoothOffset: -200,
			headingsOffset: 200,
			hasInnerContainers: true
		});
		
		self.warpTableNav.on('click', self.iconSidebar, function(e) {
			$(self.warpTableFixed).collapse('show');
		});

		self.warpTableNav.on('click', '[nh-table-content="expand"]', function(e) {
			$(self.tableNav).collapse('toggle');
		});

		$(document).on('click', self.warpTableFixed + ' .title-table-navigation', function(e) {
			$(self.warpTableFixed).collapse('hide');
		});

		$(document).on('click', 'body', function(e) {
			if ((!$(e.target).is('.box-table-fixed *'))){
				$(self.warpTableFixed).collapse('hide');
			}
		});

		var startPoint = $(self.tableContent).offset().top;

		$(window).scroll(function(event){
			var endPoint = startPoint + parseInt($(self.tableContent).css('height'));
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= startPoint && scrollTop <= endPoint) {
				$(self.iconSidebar).show();
				self.appendElement();
				$(self.warpTableFixed + ' .collapse').addClass('show');
			} else {
				$(self.iconSidebar).hide();
				$(self.warpTableFixed).collapse('hide');
			}
		});
	},
	appendElement: function(){
		var self = this;

		var html = $('.box-table-nav').html();

		if($(self.warpTableFixed).length > 0) {
			$(self.warpTableFixed).html('');
			$(self.warpTableFixed).append(html);
		} else {
			var htmlAppend = $('<div nh-table-content="fixed" class="box-table-fixed collapse">').append(html);
			$('body').append(htmlAppend);
		}
	},
	loadElement: function() {
		var self = this;

		$(self.tableContent).before(self.htmlTemplate);
	},
	makeIdsHeading: function(wrapContent = null, heading = []) {
		var self = this;

		if(!nhMain.utilities.notEmpty(wrapContent) || !nhMain.utilities.notEmpty(heading)) return false;

		var content = document.querySelector(wrapContent)
		var headings = content.querySelectorAll(heading)
		var headingMap = {}

		Array.prototype.forEach.call(headings, function (heading) {
		var id = heading.id ? heading.id : heading.textContent.trim().toLowerCase()
		    .split(' ').join('-').replace(/[!@#$%^&*():]/ig, '').replace(/\//ig, '-')
		    id = nhMain.utilities.noUnicode(id)
		    headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0
		    if (headingMap[id]) {
		      	heading.id = id + '-' + headingMap[id]
		    } else {
		      	heading.id = id
		    }
		})
	}
}

$(document).ready(function() {
	nhTableContent.init();
});