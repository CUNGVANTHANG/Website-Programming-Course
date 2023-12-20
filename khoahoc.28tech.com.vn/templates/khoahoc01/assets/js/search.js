'use strict';

var nhSearch = {
	autoSuggest: {
		keyword: '',
		inputObject: null,
		form: null,
		wrapSuggestionObject: null,
		numberItem: 0,
		startLength: 2,
		init: function(){
			var self = this;

			if($('input[nh-auto-suggest]').length == 0){
				return false;
			}

			$(document).on('keyup', 'input[nh-auto-suggest]', function (e) {
				e.preventDefault();

				self.inputObject = $(this);
				self.form = self.inputObject.closest('form');
				if(self.form.length == 0) return false;

				var keyCode = e.keyCode;

				switch(keyCode){
					// press key arrow down
					case 40:
						self.activeItem('down');						
					break;

					// press key arrow up
					case 38: 
						self.activeItem('up');						
					break;

					// press key enter
					case 13:
						var indexActive = self.getIndexItemActive();
						if(indexActive > -1){
							self.redirectActiveItem(indexActive);
						}else{
							self.form.submit();
						}
					break;

					default:
						if(self.keyword == $.trim(self.inputObject.val())) return false;

						self.keyword = $.trim(self.inputObject.val());
			            self.type = self.inputObject.attr('nh-auto-suggest');  

			           	if(self.keyword.length >= self.startLength){
			           		self.suggestion();
			           	}else{
			           		self.removeSuggestion();
			           	}

					break;
				}
	        });

	        $(document).on('click', 'button[nh-btn-submit]', function (e) {
	        	self.inputObject = $(this);
				self.form = self.inputObject.closest('form');
	        	self.form.submit();
	        });
		},
		getIndexItemActive: function(){
			var self = this;
			if(!self.validateItem()) return false;
			
			var index = -1;
			var listItem = self.wrapSuggestionObject.find('li');
			$.each(listItem, function(indexItem, itemObject) {
			  	if($(itemObject).hasClass('active')){
			  		index = indexItem;
			  	}
			});
			return index;
		},
		activeItem: function(type = 'down'){
			var self = this;
			if(!self.validateItem()) return false;

			var indexCurrent = self.getIndexItemActive();
			self.removeItemActive();

			var index = 0;
			if(indexCurrent != -1) {
				if(type == 'down'){
					index = indexCurrent + 1;
				}else{
					index = indexCurrent - 1;
				}				
			}

			if(index < 0) index = 0;
			if(index >= self.numberItem) index = self.numberItem - 1;

			self.wrapSuggestionObject.find('li:eq('+ index +')').addClass('active');
		},
		redirectActiveItem: function(index) {
			var self = this;

			if(!nhMain.utilities.notEmpty(self.wrapSuggestionObject) || self.wrapSuggestionObject.find('li:eq('+ index +') a').length == 0) return false;
			var urlRedirect = self.wrapSuggestionObject.find('li:eq('+ index +') a').attr('href');

			if(!nhMain.utilities.notEmpty(urlRedirect)) return false;
			document.location.href = urlRedirect;
		},
		removeItemActive: function(){
			var self = this;
			if(!self.validateItem()) return false;

			self.wrapSuggestionObject.find('li').removeClass('active');
		},
		validateItem: function(){
			var self = this;

			if(!nhMain.utilities.notEmpty(self.wrapSuggestionObject)) return false;
			if(!self.wrapSuggestionObject.find('li').length > 0) return false;

			return true;
		},
		suggestion: function(){
			var self = this

			if(!nhMain.utilities.notEmpty(self.inputObject)) return false;
			nhMain.callAjax({
	    		async: true,
				url: '/search/suggest',
				data: {
					keyword: self.keyword,
					type: self.type
				},
				dataType: _HTML
			}).done(function(response) {
				self.form.find('.wrap-suggestion').remove();
				self.form.append(response);

				self.wrapSuggestionObject = self.form.find('.wrap-suggestion');
				self.numberItem = self.wrapSuggestionObject.find('li').length;
			});
		},
		removeSuggestion: function(){
			var self = this;
			if(!nhMain.utilities.notEmpty(self.form) || !nhMain.utilities.notEmpty(self.form.find('.wrap-suggestion'))) return false;			
			self.form.find('.wrap-suggestion').remove();
		}
	}
}

$(document).ready(function() {
	nhSearch.autoSuggest.init();
});