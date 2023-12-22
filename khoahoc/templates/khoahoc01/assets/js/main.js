'use strict';

var nhMain = {
	dataInit: [],
	lang: null,
	csrfToken: null,
	isMobile: false,
	fullUrl: null,
	hostName: null,
	protocol: null,
	fullPath: null,
	cdnUrl: null,
	init: function(){
		var self = this;

		self.fullUrl = window.location.href;
		self.hostName = window.location.hostname;
		self.protocol = window.location.protocol;
		self.pathname = window.location.pathname;
		self.fullPath = self.fullUrl.replace(self.protocol + '//' + self.hostName, '');

		self.lang = $('html').attr('lang');
		self.csrfToken = $('html').attr('csrf-token');
		self.dataInit = self.utilities.parseJsonToObject($('input#nh-data-init').val());
		self.cdnUrl = self.utilities.notEmpty(self.dataInit.cdn_url) ? self.dataInit.cdn_url : '';

		self.initLibrary();
		self.initEvent();
		self.initForBlock();
	},
	initLibrary: function(wrap = null) {
		var self = this;
		
		// check mobile
		self.isMobile = typeof(self.dataInit.device) != _UNDEFINED && self.dataInit.device == 1 ? true : false;
		$('body').toggleClass('is-mobile', self.isMobile);

		var wrapElement = $(document);
		if(wrap != null && wrap != _UNDEFINED && wrap.length > 0){
			wrapElement = wrap;
		}

		// init tooltip - tooltip will not work on mobile
		if(wrapElement.find('[data-toggle="tooltip"]').length > 0 && !self.isMobile){
			wrapElement.find('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});	
		}		

		// init light gallery
		wrapElement.find('div[nh-light-gallery]').each(function(index) {			
			var config = self.utilities.parseJsonToObject($(this).attr('nh-light-gallery'));
		  	$(this).lightGallery(config);
		});

		// init slick slider
		wrapElement.find('div[nh-owl-slick][loaded!="1"]').each(function(index) {
			var config = self.utilities.parseJsonToObject($(this).attr('nh-owl-slick'));			

		  	$(this).slick(config);

		  	// lazy load image of slick
		  	$(this).on('beforeChange', function(event, slick, direction){
		  		$(this).find('img[src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]').each(function(index) {
		  			$(this).attr('src', $(this).attr('data-src'));
		  		});
			});
		  	$(this).attr('loaded', 1);

			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			    $('div[nh-owl-slick]').slick('setPosition');
			});
		});		

		if(wrapElement.find('.selectpicker').length > 0){
			wrapElement.find('.selectpicker').selectpicker();
		}		

		if(wrapElement.find('[nh-date]').length > 0){
			wrapElement.find('[nh-date]').datepicker({
				language: self.lang,
				todayHighlight: true
			});
		}

		wrapElement.find('.number-input').each(function() {
			nhMain.input.inputMask.init($(this), 'number');
		});

		wrapElement.on('show.bs.modal', function () {
		    $(this).find('[nh-lazy]').each(function(){
		        var imgLazy = $(this);
		        imgLazy.attr('src', imgLazy.data('src'));
		    });
		});

		wrapElement.on('show.bs.dropdown', function () {
		    $(this).find('[nh-lazy]').each(function(){
		        var imgLazy = $(this);
		        imgLazy.attr('src', imgLazy.data('src'));
		    });
		});

		wrapElement.on('show.bs.collapse', function () {
		    $(this).find('[nh-lazy]').each(function(){
		        var imgLazy = $(this);
		        imgLazy.attr('src', imgLazy.data('src'));
		    });
		});

		wrapElement.on("show.bs.collapse", function () {
		    $(this).find('[nh-owl-slick]').slick('setPosition');
		}); 

		// wrap == null -> page first load
		if(wrap == null){
			
			// show config block
			var template = typeof(self.dataInit.template) != _UNDEFINED ? self.dataInit.template : {};
			if(self.utilities.getParamInUrl('nh-config-block') > 0 && typeof(template.url) != _UNDEFINED){
				var cssUrl = template.url + 'assets/lib/nh-config-block/block.css';
				var jsUrl = template.url + 'assets/lib/nh-config-block/block.js';

				$('<link/>', {rel: 'stylesheet', type: 'text/css', href: cssUrl}).appendTo('body');
				$.getScript(jsUrl);
			}

			// load embed
			self.embedCode.init();

			// load sdk of social
			self.social.init();

			// recaptcha
			self.reCaptcha.init();
		}
	},

	initEvent: function(){
		var self = this;

		// active link
		if(($('a[href="'+ self.fullPath +'"]').length > 0 || $('a[nh-link-redirect="'+ self.fullPath +'"]').length > 0) && !self.isMobile){
			$('a[href="'+ self.fullPath +'"]').each(function( index ){
				$(this).addClass('active');
			});
			
			$('a[nh-link-redirect="'+ self.fullPath +'"]').each(function( index ){
				$(this).addClass('active');
			});
		}
		
		$(document).on('click', 'a[nh-link-redirect]', function(e) {
		    e.preventDefault();
            if(!nhMain.utilities.notEmpty($(this))) return false;
            var redirectHref = $(this).attr('nh-link-redirect');
            window.location = redirectHref;
        });

		// active language
		$(document).on('click', '[nh-active-language]', function(e) {
			self.showLoading.page();

			var lang = $(this).attr('nh-active-language');			
			nhMain.callAjax({
				url: '/language/active',
				data: {
					lang: lang
				},
			}).done(function(response) {
				var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				if(!nhMain.utilities.notEmpty(data.url_redirect)) {
					location.reload();
					return false;
				};
				document.location.href = data.url_redirect;
			});
		});

		// active currency
		$(document).on('click', '[nh-active-currency]', function(e) {
			self.showLoading.page();

			var currency = $(this).attr('nh-active-currency');
			nhMain.callAjax({
				url: '/currency/active',
				data: {
					currency: currency
				},
			}).done(function(response) {
				location.reload();
			});
		});

		$(document).on('click', '[nh-toggle]', function(e) {
			$(this).toggleClass('open');
			var key = $(this).attr('nh-toggle');
			var element = $('[nh-toggle-element="' + key + '"]');

			if(element.length > 0){
				element.toggle();
			}
		});

		$(document).on('click', 'a[nh-to-anchor]', function(e) {
			e.preventDefault();

			var anchor = $("[nh-anchor='"+ $(this).attr('nh-to-anchor') +"']");
			if(anchor.length) {
			    $('html,body').animate({scrollTop: anchor.offset().top - 50}, 'slow');
			}
		});

		$(document).on('click', '[nh-show-password]', function(e) {
			e.preventDefault();

			var inputPassword = $(this).closest('.form-group').find('input[name="password"]');
			var attrType = inputPassword.attr('type') == 'password' ? 'text' : 'password';
			inputPassword.attr('type', attrType);
		});
	},
	initForBlock: function(){
		var self = this;

		// load block by ajax
		$('div[nh-block][type-load="document-ready"]').each(function(index) {
			var blockCode = $(this).attr('nh-block')
			self.ajaxLoadBlock(blockCode);
		});

		// active block
		$(document).on('click', '[nh-active-block]', function(e) {
			var blockCode = $(this).attr('nh-active-block');
			var wrapBlock = $('div[nh-block="'+ blockCode +'"][type-load="active"]');

			if(wrapBlock.length > 0 && wrapBlock.attr('loaded') != 1){
				self.ajaxLoadBlock(blockCode);
			}
		});		

		// active block
		$(document).on('click', '[nh-active-tab]', function(e) {
			var blockCode = $(this).closest('[nh-block]').attr('nh-block');
			var tabIndex = $(this).attr('nh-active-tab');
			var wrapBlock = $(this).closest('[nh-block]').find('div[nh-tab-content="'+ tabIndex +'"]');

			if(wrapBlock.length > 0 && wrapBlock.attr('loaded') != 1){
				self.ajaxLoadBlockTab(blockCode, tabIndex);
			}
		});	
	},
	ajaxLoadBlock: function(blockCode = null){
		var self = this;
		if(typeof(blockCode) == _UNDEFINED || blockCode == null || blockCode.length == 0) return;

		var wrapBlock = $('div[nh-block="'+ blockCode +'"]');		
		self.showLoading.block(wrapBlock);

		self.callAjax({
			url: '/block/ajax-load-content/' + blockCode,
			dataType: _HTML,
		}).done(function(response) {
			wrapBlock.attr('loaded', '1').html(response);

			self.initLibrary(wrapBlock);
			if(typeof(nhLazy) != _UNDEFINED){
				nhLazy.init();
			}
			
			self.showLoading.remove(wrapBlock)
		});
	},
	ajaxLoadBlockTab: function(blockCode = null, tabIndex = null){
		var self = this;
		if(typeof(blockCode) == _UNDEFINED || blockCode == null || blockCode.length == 0) return;

		var wrapBlock = $('div[nh-block="'+ blockCode +'"]');
		var tabContentElement = wrapBlock.find('[nh-tab-content="'+ tabIndex +'"]');
		if(tabContentElement.length == 0) return;

		self.showLoading.block(wrapBlock);

		self.callAjax({
			url: '/block/ajax-load-content/' + blockCode,
			data: {
				'tab_index': typeof(tabIndex) != _UNDEFINED ? tabIndex : '',
			},
			dataType: _HTML,
		}).done(function(response) {
			tabContentElement.attr('loaded', '1').html(response);
			self.initLibrary(wrapBlock);
			if(typeof(nhLazy) != _UNDEFINED){
				nhLazy.init();
			}
			
			self.showLoading.remove(wrapBlock);
		});
	},
	callAjax: function(params = {}){
		var self = this;

		var options = {
			headers: {
		        'X-CSRF-Token': self.csrfToken
		    },
	        async: typeof(params.async) != _UNDEFINED ? params.async : true,
	        url: typeof(params.url) != _UNDEFINED ? params.url : '',
	        type: typeof(params.type) != _UNDEFINED ? params.type : 'POST',
	        dataType: typeof(params.dataType) != _UNDEFINED ? params.dataType : 'json',
	        data: typeof(params.data) != _UNDEFINED ? params.data : {},    
	        cache: typeof(params.cache) != _UNDEFINED ? params.cache : false
	    };

	    if(typeof(params.processData) != _UNDEFINED){
	    	options.processData = params.processData;
	    }

	    if(typeof(params.contentType) != _UNDEFINED){
	    	options.contentType = params.contentType;
	    }

		var ajax = $.ajax(options).fail(function(jqXHR, textStatus, errorThrown){
	    	if(typeof(params.not_show_error) == _UNDEFINED){
	    		self.showLog(errorThrown);
	    	}
		});
	    return ajax;
	},
	getLabel: function(key = null){
		if(typeof(locales[key]) == _UNDEFINED){
			return key;
		}
		return locales[key];
	},
	showLog: function(message = null){
		if(message == null || message.length == 0) return false;
		// console.log('%cWeb4s: ' + message, 'color: #fd397a; font-size: 12px');
	},
	utilities: {
		notEmpty: function(value = null){
			if(typeof(value) == _UNDEFINED){
				return false;
			}

			if(value == null){
				return false;
			}

			if(value.length == 0){
				return false;
			}

			return true;
		},
		parseNumberToTextMoney: function(number = null){
			if (typeof(number) != 'number' || isNaN(number) || typeof(number) == _UNDEFINED) {
		        return 0;
		    }	    
	    	return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		},
		parseTextMoneyToNumber: function(text_number = null){
			if (typeof(text_number) == _UNDEFINED) {
		        return 0;
		    }

			var number = parseFloat(text_number.toString().replace(/,/g, ''));
			if(isNaN(number)) number = 0;
			
			return number;
		},
		parseFloat: function(number = null){
			if (isNaN(number) || typeof(number) == _UNDEFINED || number == null) {
		        return 0;
		    }	

			number = parseFloat(number);
			if (isNaN(number)) {
		        return 0;
		    }
		    return number;
		},
		parseInt: function(number = null){
			if (isNaN(number) || typeof(number) == _UNDEFINED || number == null) {
		        return 0;
		    }	

			number = parseInt(number);
			if (isNaN(number)) {
		        return 0;
		    }
		    return number;
		},
		parseIntToDateString: function(number = null){
			var self = this;
			var date_string = '';
			var int_number = nhMain.utilities.parseInt(number);
			if(int_number > 0){
				var date = new Date(int_number * 1000);	
				date_string = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
			}
			return date_string;
		},
		parseIntToDateTimeString: function(number = null){
			var self = this;
			var date_string = '';
			var int_number = nhMain.utilities.parseInt(number);
			if(int_number > 0){
				var date = new Date(int_number * 1000);
				var minutes = date.getMinutes();
				if(minutes < 10){
					minutes = '0' + minutes;
				}				

				var hours = date.getHours();
				if(hours < 10){
					hours = '0' + hours;
				}

				date_string = hours + ':' + minutes + ' - ' +  date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
			}
			return date_string;
		},
		parseJsonToObject: function(json_string = null){
			var result = {};
			try {
		        result = JSON.parse(json_string);
		    } catch (e) {
		        return {};
		    }
		    return result;
		},
		replaceUrlParam: function(url = null, param = null, value = null){
			if (url == null || typeof(url) == _UNDEFINED || url.length == 0) {
		        return '';
		    }

		    if (param == null || typeof(param) == _UNDEFINED || param.length == 0) {
		        return url;
		    }

			if (value == null || typeof(param) == _UNDEFINED) {
		        value = '';
		    }

		    var pattern = new RegExp('\\b('+ param +'=).*?(&|#|$)');
		    if (url.search(pattern)>=0) {
		        return url.replace(pattern, '$1' + value + '$2');
		    }
		    url = url.replace(/[?#]$/, '');

		    return url + (url.indexOf('?')>0 ? '&' : '?') + param + '=' + value;
		},
		getParamInUrl: function(param_name = null, url = null){
			var self = this;

			if(!self.notEmpty(param_name)) return null;
			if(!self.notEmpty(url)) {
				url = nhMain.fullUrl
			}

			param_name = param_name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + param_name + "(=([^&#]*)|&|#|$)");
		    var results = regex.exec(url);

		    if (!results) return null;
		    if (!results[2]) return '';

		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		},
		getUrlVars: function () {
            var vars = {}, hash;
            var url_decode = decodeURIComponent(window.location.href);
            if (url_decode.indexOf('?') > 0) {
                var hashes = url_decode.slice(url_decode.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars[hash[0]] = hash[1];
                }
            }
            return vars;
        },
		noUnicode: function(text){
			var self = this;

			if(!self.notEmpty(text)) return '';

			text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẩ|ă|ằ|ắ|ẳ|ặ|ẵ/g, 'a');
		    text = text.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ă|Ằ|Ắ|Ặ|Ẵ|ẵ/g, 'a');
		    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ+/g, 'e');
		    text = text.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ+/g, 'e');
		    text = text.replace(/ì|í|ị|ỉ|ĩ/g,'i');
		    text = text.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
		    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ+/g, 'o');
		    text = text.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ+/g, 'o');
		    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		    text = text.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
		    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		    text = text.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
		    text = text.replace(/đ/g, 'd');
		    text = text.replace(/Đ/g, 'd');

		    return text.toLowerCase().trim();
		},
		getThumbImage: function(url = null, size = 150){
			var self = this;

			if(!self.notEmpty(url)) return '';
			if($.inArray(size, [50, 150, 250, 350]) == -1) size = 150;

			var urlSplit = url.split('/');
			urlSplit[1] = 'thumbs';

			var fileName = self.getFileName(url);
			var ext = fileName.split('.').pop();

			if(!self.notEmpty(ext)) return '';
			
			var newFile = fileName.replace('.' + ext, '');
			newFile += '_thumb_' + size + '.' + ext;

			urlSplit[urlSplit.length - 1] = newFile;

			return urlSplit.join('/');
		},
		getFileName: function(path = null){
			var self = this;
			path = path.substring(path.lastIndexOf('/')+ 1);
    		return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
		}
	},
	location: {
		idWrap: null,
		init: function(params = {}){
			var self = this;

			self.idWrap = typeof(params.idWrap) != _UNDEFINED ? params.idWrap : [];	

			$.each(self.idWrap, function(index, idWrap) {
				$(document).on('change', idWrap + ' #city_id', function(e) {
					//clear ward select
					var wardSelect = $(idWrap + ' #ward_id');
					wardSelect.find('option:not([value=""])').remove();
					wardSelect.selectpicker('refresh');

					// clear district select
					var districtSelect = $(idWrap + ' #district_id');
					districtSelect.find('option:not([value=""])').remove();
					districtSelect.selectpicker('refresh');

					// load option district select
					var city_id = $(this).val();
					if(city_id > 0){
						var _data = {};
						_data[_PAGINATION] = {};
						_data[_PAGINATION][_PERPAGE] = 200;

						nhMain.callAjax({
				    		async: false,
							url: '/location/district/json/' + city_id,
							data: _data,
						}).done(function(response) {
							var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	if (code == _SUCCESS) {
			                    if (!$.isEmptyObject(data)) {
			                    	var listOption = '';
							        $.each(data, function (key, item) {
							            listOption += '<option value="' + item.id + '">' + item.name + '</option>';
							        });
							        districtSelect.append(listOption);
							        districtSelect.selectpicker('refresh');
			                    }
				            } else {
				            	nhMain.showLog(message);
				            }
						});
					}
				});

				$(document).on('change', idWrap + ' #district_id', function(e) {
					//clear ward select
					var wardSelect = $(idWrap + ' #ward_id');
					wardSelect.find('option:not([value=""])').remove();
					wardSelect.selectpicker('refresh');

					// load option ward select
					var district_id = $(this).val();				
					if(district_id > 0){
						var _data = {};
						_data[_PAGINATION] = {};
						_data[_PAGINATION][_PERPAGE] = 200;

						nhMain.callAjax({
				    		async: false,
							url: '/location/ward/json/' + district_id,
							data: _data,
						}).done(function(response) {
							var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	if (code == _SUCCESS) {
				            	// append option
			                    if (!$.isEmptyObject(data)) {
			                    	var listOption = '';
							        $.each(data, function (key, item) {
							            listOption += '<option value="' + item.id + '">' + item.name + '</option>';
							        });
							        wardSelect.append(listOption);
							        wardSelect.selectpicker('refresh');
			                    }		                    
				            } else {
				            	nhMain.showLog(message);
				            }
						});
					}
				});
			});
		}
	},
	showAlert: function(type = null, message = null, callback = null, params = {}) {
		var self = this;

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }
				    
		if(type == null && $.inArray(type, [_ERROR, _WARNING, _SUCCESS, _INFO]) == -1){
			type = _ERROR;
		}

		if(message == null){
			message = 'Error';
		}


		var optionsSwal = {
            position: 'bottom',
            text: message,
            showCloseButton: true,
            showCancelButton: false,
            showDenyButton: false,
            confirmButtonText: self.getLabel('dong_y'),
            denyButtonText: self.getLabel('khong')
        };

		switch(type){
			case _ERROR:
				optionsSwal['background'] = '#c33';
				optionsSwal['icon'] = 'error';
				optionsSwal['showConfirmButton'] = false;
				optionsSwal['onClose'] = function(e){
			        callback();
			    }
				swal.fire(optionsSwal);

			break;

			case _SUCCESS:
				optionsSwal['background'] = '#390';
				optionsSwal['icon'] = 'success';
				optionsSwal['showConfirmButton'] = false;
				optionsSwal['onClose'] = function(e){
			        callback();
			    }
				swal.fire(optionsSwal);
			break;

			case _WARNING:
				optionsSwal['background'] = '#d39e00';
				optionsSwal['icon'] = 'warning';
				optionsSwal['showConfirmButton'] = true;
				optionsSwal['showDenyButton'] = true;
				optionsSwal['allowOutsideClick'] = false;
				optionsSwal['showCloseButton'] = false;
				swal.fire(optionsSwal).then((result) => {
				  	if (result.isConfirmed) {
				    	callback();
				  	}
				});
			break;

			case _INFO:
				optionsSwal['background'] = '#007bff';
				optionsSwal['icon'] = 'info';
				optionsSwal['showConfirmButton'] = false;
				optionsSwal['showCloseButton'] = true;
				if(typeof(params.html) != _UNDEFINED && params.html){
					optionsSwal['html'] = message;
				}

				optionsSwal['onClose'] = function(e){
			        callback();
			    }

				swal.fire(optionsSwal);

			break;
		}
	},
	showLoading: {
		htmlTemplate: '\
			<div class="bg-overlay"></div>\
			<div class="sk-flow">\
				<div class="sk-flow-dot"></div>\
				<div class="sk-flow-dot"></div>\
				<div class="sk-flow-dot"></div>\
			</div>',
		block: function(element = null) {
			var self = this;
			if(element == null || typeof(element) == _UNDEFINED || element.length == 0){
				nhMain.showLog(nhMain.getLabel('doi_tuong_hien_thi_loading_khong_ton_tai'));
				return false;
			}
			var htmlLoading = $('<div nh-loading class="loading-block">').append(self.htmlTemplate)
			element.append(htmlLoading);
		},
		page: function(){
			var self = this;
			var htmlLoading = $('<div nh-loading class="loading-page">').append(self.htmlTemplate);
			$('body').append(htmlLoading);
		},
		remove: function(element = null){
			var wrapElement = $(document);
			if(element != null && element != _UNDEFINED && element.length > 0){
				wrapElement = element;
			}
			wrapElement.find('div[nh-loading]').each(function( index ) {
			  	$(this).remove();
			});
		}
	},
	validation: {
		error: {
			show: function(input = null, message = null, callback){
				if(input.length > 0 && message.length > 0){
					input.next('div.error').remove();					
					if (typeof(callback) != 'function') {
				        callback = function () {};
				    }

				    input.closest('.form-group').addClass('is-invalid');
					var name = typeof(input.attr('name')) != _UNDEFINED ? input.attr('name') + '-error' : '';
					var error = '<div id="' + name + '" class="error invalid-feedback">' + message + '</label>';
					input.after(error).focus();
					callback();
				}		
			},
			clear: function(wrapForm = null){
				if(wrapForm.length > 0){
					wrapForm.find('.form-group').removeClass('is-invalid');					
					wrapForm.find('div.error').remove();
				}
			}
		},
		isEmail: function(email = null){
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  		return regex.test(email);
		},
		isPhone: function(phone = null){
			var regex = /[0-9]{10,11}/;
	  		return regex.test(phone);
		},
		phoneVn: function(){
			$.validator.addMethod('phoneVN', function(phone_number, element) {
				phone_number = phone_number.replace( /\(|\)|\s+|-/g, '');
				return this.optional(element) || phone_number.length > 9 && phone_number.match( /^(01|02|03|04|05|06|07|08|09)+([0-9]{8,9})\b$/ );
			}, nhMain.getLabel('so_dien_thoai_chua_dung_dinh_dang'));
		}
	},
	reCaptcha: {
		config: {},
		init: function(){
			var self = this;

			self.config = typeof(nhMain.dataInit.recaptcha) != _UNDEFINED && nhMain.dataInit.recaptcha != null ? nhMain.dataInit.recaptcha : {};
			if(typeof(self.config.use_recaptcha) != _UNDEFINED && Boolean(self.config.use_recaptcha)){
				$('<script />', { type : 'text/javascript', src : 'https://www.google.com/recaptcha/api.js?render=' + self.config.site_key}).appendTo('head');				
			}
		},
		check: function(callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

  			if(Boolean(self.config.use_recaptcha) && grecaptcha != _UNDEFINED){
  				grecaptcha.ready(function() {
		          	grecaptcha.execute(self.config.site_key, {action: 'submit'}).then(function(token) {
		          		callback(token);
		          	});
		        });			
			}else{
				callback(null);
			}
		}
	},
	embedCode: {
		init: function(){
			var self = this;
			
			var embed = typeof(nhMain.dataInit.embed_code) != _UNDEFINED && nhMain.dataInit.embed_code != null ? nhMain.dataInit.embed_code : {};
			var timeDelay = typeof(embed.time_delay) != _UNDEFINED ? nhMain.utilities.parseInt(embed.time_delay) : 0;

			if(timeDelay > 0){
				setTimeout(function(){
					self.loadEmbedDelay();
				}, timeDelay);
			}
		},
		loadEmbedDelay: function(){

			// load embed head
			nhMain.callAjax({
	    		async: false,
				url: '/embed/load-content',
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;	        
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if (code == _SUCCESS) {
	        		var head = nhMain.utilities.notEmpty(data.head) ? data.head : '';
	        		var top_body = nhMain.utilities.notEmpty(data.top_body) ? data.top_body : '';
	        		var bottom_body = nhMain.utilities.notEmpty(data.bottom_body) ? data.bottom_body : '';
	        		if(head.length > 0){
		            	$('head').append(head);
		            }

		            if(top_body.length > 0){
		            	$('head').prepend(top_body);
		            }
		            
		            if(bottom_body.length > 0){
		            	$('body').append(bottom_body);
		            }
	            }			
			});
		}
	},
	social: {
		init: function(){
			var self = this;

			var social = typeof(nhMain.dataInit.social) != _UNDEFINED && nhMain.dataInit.social != null ? nhMain.dataInit.social : {};

			// load sdk and function init of facebook
			var loadSkdFacebook = typeof(social.facebook_load_sdk) != _UNDEFINED ? nhMain.utilities.parseInt(social.facebook_load_sdk) : 0;
			var facebookSdkDelay = typeof(social.facebook_sdk_delay) != _UNDEFINED ? nhMain.utilities.parseInt(social.facebook_sdk_delay) : 0;

			if(loadSkdFacebook > 0 && facebookSdkDelay > 0){
				setTimeout(function(){
					self.loadSdkDelay('facebook');
				}, facebookSdkDelay);				
			}

			// load sdk and function init of google
			var loadSkdGoogle = typeof(social.google_load_sdk) != _UNDEFINED ? nhMain.utilities.parseInt(social.google_load_sdk) : 0;
			var googleSdkDelay = typeof(social.google_sdk_delay) != _UNDEFINED ? nhMain.utilities.parseInt(social.google_sdk_delay) : 0;

			if(loadSkdGoogle > 0 && googleSdkDelay > 0){
				setTimeout(function(){
					self.loadSdkDelay('google');
				}, facebookSdkDelay);
			}
		},
		loadSdkDelay: function(type = null){
			var self = this;

			if(!nhMain.utilities.notEmpty(type)) return false;

			// load embed content
			nhMain.callAjax({
	    		async: false,
	    		dataType: 'html',
				url: '/social/load-sdk/' + type,
			}).done(function(response) {
				$('body').append(response);
			});
		}
	},
	input: {
		inputMask:{
			init: function(el, type = null){
				var self = this;
				var options = {};
				switch(type){
					case 'email':
						options = self.options.email;
						el.inputmask(options);
					break;

					case 'number':
						options = self.options.number;
						el.inputmask('decimal', options);

						el.focus(function() {
						 	$(this).select(); 
						});
					break;

					default:				
					break;
				}				
			},
			options: {
				number: {
					integerDigits: 13,
					autoGroup: true,
					groupSeparator: ',',
					groupSize: 3,
					rightAlign: false,
					allowPlus: false,
    				allowMinus: false,
    				placeholder: ''
		        },
		        email: {
		            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
		            greedy: false,
		            onBeforePaste: function (pastedValue, opts) {
		                pastedValue = pastedValue.toLowerCase();
		                return pastedValue.replace("mailto:", "");
		            },
		            definitions: {
		                '*': {
		                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
		                    cardinality: 1,
		                    casing: "lower"
		                }
		            }
		        }
			}
		}
	}
}

$(document).ready(function() {
	nhMain.init();
});