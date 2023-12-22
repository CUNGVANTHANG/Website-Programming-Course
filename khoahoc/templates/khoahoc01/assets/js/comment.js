'use strict';

var nhComment = {
	info: {
		full_name: null,
		email: null,
		phone: null,
		logged: false
	},
	config:{
		max_number_files: 10, // number file upload
		expires_cookie: 10, // number day cookie expires
	},	
	loginModal: null,
	infoModal: null,
	infoForm: null,
	init: function(){
		var self = this;

		self.loginModal = $('#login-modal');
		self.infoModal = $('#info-comment-modal');
		self.infoForm = self.infoModal.find('form#info-comment-form');

		if(self.infoModal.length == 0 || self.infoForm.length == 0){
			nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
			return false;
		}

		self.getInfo();		
		self.event();

		self.comment.init();
		self.rating.init();
	},
	event: function(){
		var self = this;

		nhMain.validation.phoneVn();

		var validatorInfo = self.infoForm.validate({
			ignore: ':hidden',
			rules: {
				full_name: {
					required: true,
					minlength: 6,
					maxlength: 255
				},
				email: {
					required: true,
					email: true,
                    minlength: 10,
                    maxlength: 255
				},
				phone: {
					required: true,
					phoneVN: true
				}
			},
			messages: {
				full_name: {
                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                },
                email: {
                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    email: nhMain.getLabel('email_chua_dung_dinh_dang'),
                	minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
                },
                phone: {
                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
                    phoneVN: nhMain.getLabel('so_dien_thoai_chua_chinh_xac')
                }
            },
            errorPlacement: function(error, element) {
                var group = element.closest('.input-group');
                if (group.length) {
                    group.after(error.addClass('invalid-feedback'));
                }else{                	
                    element.after(error.addClass('invalid-feedback'));
                }
            },
			invalidHandler: function(event, validator) {
				validatorInfo.errorList[0].element.focus();
			},
		});

		self.infoModal.on('click', '#btn-send-info', function(e) {
			e.preventDefault();

			if (validatorInfo.form()) {
				self.setInfo({
					full_name: self.infoForm.find('input[name="full_name"]').val(),
					email: self.infoForm.find('input[name="email"]').val(),
					phone: self.infoForm.find('input[name="phone"]').val(),
				});

				self.infoModal.modal('hide');
				
				if(self.comment.triggerAdd){					
					self.comment.addComment();
				}

				if(self.rating.triggerAdd){
					self.rating.addCommentRating();
				}
			}
		});

		self.infoModal.on('show.bs.modal', function (e) {
		  	self.infoModal.find('input[name="full_name"]').val(self.info.full_name);
		  	self.infoModal.find('input[name="email"]').val(self.info.email);
		  	self.infoModal.find('input[name="phone"]').val(self.info.phone);
		});
	},
	setInfo: function(data = {}){
		var self = this;	

		var full_name = nhMain.utilities.notEmpty(data.full_name) ? data.full_name : null;
		var email = nhMain.utilities.notEmpty(data.email) ? data.email : null;
		var phone = nhMain.utilities.notEmpty(data.phone) ? data.phone : null;

		$.cookie(_INFO_COMMENT, JSON.stringify({
			full_name: full_name,
			email: email,
			phone: phone
		}), {expires: self.config.expires_cookie});

		self.info.full_name = full_name;
		self.info.email = email;
		self.info.phone = phone;

		if(typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member)){
			self.info.logged = true;			
		}

		self.comment.showInfo();
		self.rating.showInfo();
	},
	getInfo: function(config = {}){
		var self = this;

		var loginRequired = typeof(config.login_required) != _UNDEFINED ? config.login_required : 0;		
		var memberInfo = typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member) ? nhMain.dataInit.member : {};

		if(loginRequired == 0){			
			var infoCookie = nhMain.utilities.notEmpty($.cookie(_INFO_COMMENT)) ? JSON.parse($.cookie(_INFO_COMMENT)) : {};

			self.info.full_name = typeof(infoCookie.full_name) != _UNDEFINED ? infoCookie.full_name : null;
			self.info.email = typeof(infoCookie.email) != _UNDEFINED ? infoCookie.email : null;
			self.info.phone = typeof(infoCookie.phone) != _UNDEFINED ? infoCookie.phone : null;
		}

		if(loginRequired > 0 || self.info.full_name == null){
			self.info.full_name = typeof(memberInfo.full_name) != _UNDEFINED ? memberInfo.full_name : null;
			self.info.email = typeof(memberInfo.email) != _UNDEFINED ? memberInfo.email : null;
			self.info.phone = typeof(memberInfo.phone) != _UNDEFINED ? memberInfo.phone : null;
		}

		if(!$.isEmptyObject(memberInfo)){
			self.info.logged = true;
		}

		return self.info;		
	},
	convertFullNameToSpell: function(fullName = null) {
		var self = this;

		if(!nhMain.utilities.notEmpty(fullName)) return '';

		var str = fullName.toString().split(' ');
        var char = '';
        $.each(str, function(key, value) {
            char = char + '' + value.charAt(0);
        });

        return char.toUpperCase().substr(0, 3);
	},
	ajaxAddComment: function(data = {}, callback = null){
		var self = this;

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

	  	nhMain.showLoading.page();
		nhMain.callAjax({
    		async: true,
			url: '/comment/add',
			data: {
				full_name: self.info.full_name,
				email: self.info.email,
				phone: self.info.phone,
				content: typeof(data.content) != _UNDEFINED ? data.content : null,
				images: typeof(data.images) != _UNDEFINED ? data.images : [],
				parent_id: typeof(data.parent_id) != _UNDEFINED ? data.parent_id : null,
				url: window.location.pathname,
				block_code: typeof(data.block_code) != _UNDEFINED ? data.block_code : null,
				type_comment: typeof(data.type_comment) != _UNDEFINED ? data.type_comment : null,
				rating: typeof(data.rating) != _UNDEFINED ? data.rating : null,
			},
		}).done(function(response) {
			callback(response);
            nhMain.showLoading.remove();
		});
	},
	ajaxLoadComment: function(params = {}, options = {}, callback = null){
		var self = this;
		
		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

	    if(typeof(options.show_loading) != _UNDEFINED && Boolean(options.show_loading)){
	    	nhMain.showLoading.page();
	    }

	    if(typeof(params.url) == _UNDEFINED){
	    	params.url = window.location.pathname;
	    }
	    
		nhMain.callAjax({
    		async: true,
			url: '/comment/load',
			data: params,
		}).done(function(response) {
			callback(response);
			nhMain.showLoading.remove();
		});
	},
	ajaxUploadImage: function(formData = {}, callback = null){
		var self = this;

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

	    nhMain.callAjax({
    		async: true,
			url: '/comment/upload-image',
			data: formData,
			contentType: false,
			processData: false,
		}).done(function(response) {

			var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

        	if (code == _ERROR){
        		nhMain.showAlert(_ERROR, message);
        	}

        	if (code == _SUCCESS && !$.isEmptyObject(data)) {
        		callback(data);
            }
		}).fail(function(jqXHR, textStatus, errorThrown){
	    	nhMain.showLog(errorThrown);
		});
	},
	comment: {
		config: {},
		block_code: null,
		wrapElement: null,
		listElement: null,
		contentElement: null,
		listReplyElement: null,
		content: null,
		images: [],
		scrollHeightDefault: 0,
		template:{
			item: '\
				<li nh-comment-item="" is-parent="true" class="comment-item">\
					<div class="post-author">\
						<span class="letter-first"></span>\
						<span class="name-author"></span>\
					</div>\
					<div class="comment-content">\
						<div class="inner-content"></div>\
						<div class="comment-action">\
							<div class="inner-like">\
								<i class="iconsax isax-like-1"></i>\
								<span class="number-like"></span> ' +
								nhMain.getLabel('thich') +
							'</div>\
							<div class="inner-reply">\
								<span class="number-reply"></span> ' +
								nhMain.getLabel('tra_loi') +
							'</div>	\
							<div class="post-date"></div>\
						</div>\
					</div>\
				</li>',
			itemReply: '\
				<li nh-comment-item="" class="reply">\
					<div class="post-author">\
						<span class="letter-first"></span>\
						<span class="name-author"></span>\
					</div>\
					<div class="comment-content">\
						<div class="inner-content"></div>\
						<div class="comment-action">\
							<div class="inner-like">\
								<i class="iconsax isax-like-1"></i>\
								<span class="number-like"></span> ' +
								nhMain.getLabel('thich') +
							'</div>\
							<div class="inner-reply">' +
								nhMain.getLabel('tra_loi') +
							'</div>	\
							<div class="post-date"></div>\
						</div>\
					</div>\
				</li>',
			wrapReply: '<ul class="list-reply"></ul>',				
			inputContent: '\
				<div class="edit-comment">\
					<textarea nh-input-comment class="bg-white" placeholder="'+ nhMain.getLabel('moi_ban_de_lai_binh_luan') +'"></textarea>\
					<div class="box-comment">\
						<label>\
							<i nh-trigger-upload class="fas fa-camera"></i>\
						</label>\
						<input nh-input-comment-images name="files[]" type="file" class="d-none" accept="image/gif, image/jpeg, image/png" multiple="multiple">\
					</div>\
					<ul class="comment-images"></ul>\
					<button nh-btn-send-comment class="button fs-16 py-12 px-15 -dark-1 text-white d-inline-block">' +
						nhMain.getLabel('gui_binh_luan') +
					'</button>\
				</div>',
			moreItem: '<a nh-comment-more="" class="comment-more" href="javascript:;">'+ nhMain.getLabel('xem_them_thao_luan') +'</a>',
			wrapListImageSelect: '<ul class="comment-images"></ul>',
			imageSelect: '\
				<li nh-item-comment-image class="loading">\
					<img class="img-comment" src="">\
					<i class="close-image">x</i>\
				</li>',
		},
		triggerAdd: false,
		init: function(){
			var self = this;

			// validate element
			if($('[nh-comment]').length == 0){
				return false;
			}

			self.wrapElement = $('[nh-comment]');

			var configBlock = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-comment'));
			if($.isEmptyObject(configBlock)){
				nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}
			$.extend(self.config, configBlock);			

			var wrapBlock = self.wrapElement.closest('[nh-block]');
			if(wrapBlock.length > 0 && wrapBlock.attr('nh-block').length > 0){
				self.block_code = wrapBlock.attr('nh-block');
			}

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			if(loginRequired == 1 && nhComment.loginModal.length == 0){
				nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}

			self.listElement = self.wrapElement.find('[nh-list-comment]');
			if(self.listElement.length == 0){
				nhMain.showLog(nhMain.getLabel('chuc_nang_binh_luan_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}

			self.showInfo();

			self.contentElement = self.wrapElement.find('[nh-input-comment]');
			if(self.contentElement.length > 0){
				self.initInputContent(self.contentElement);
			}

			self.event();
			self.loadComment({show_loading: false});
		},
		initInputContent: function(input = null	){
			var self = this;
			if(typeof(input) == _UNDEFINED || input == null || input.length == 0) return false;

			self.scrollHeightDefault = input[0].scrollHeight;
			input[0].setAttribute('style', 'height:' + self.scrollHeightDefault + 'px; overflow-y:hidden;');
			input.on('input', function () {
		        this.style.height = 'auto';
		        this.style.height = this.scrollHeight + 'px';
		    });
		},
		event: function(){
			var self = this;		

			self.wrapElement.on('click', '[nh-btn-send-comment]', function(e){
				self.contentElement = $(this).closest('.edit-comment').find('[nh-input-comment]');
				self.addComment();
			});

			self.wrapElement.on('click', '[nh-comment-change-info]', function(e){
				if(self.logged){
					window.location.href = '/member/dashboard';
				}else{
					nhComment.infoModal.modal('show');
				}				
			});

			self.wrapElement.on('click', '.inner-reply', function(e){
				var commentItem = $(this).closest('li[nh-comment-item][is-parent]');
				if(commentItem.length == 0) return false;

				var commentId = commentItem.attr('nh-comment-item');
				if(!nhMain.utilities.notEmpty(commentId)) return false;

				var numberReply = $(this).find('.number-reply').text();

				var loadReply = false;
				if(nhMain.utilities.notEmpty(numberReply) && commentItem.find('.list-reply').length == 0) {
					loadReply = true;
					commentItem.append(self.template.wrapReply);					
				}

				if(commentItem.find('.edit-comment').length == 0){
					commentItem.append(self.template.inputContent);

					self.contentElement = commentItem.find('[nh-input-comment]');
					self.initInputContent(self.contentElement);
				}

				self.contentElement = commentItem.find('[nh-input-comment]');
				self.contentElement.focus();

				if(loadReply){
					self.loadComment({parent_id: commentId});
				}
				
			});

			self.wrapElement.on('click', '.inner-like', function(e){
				var commentId = $(this).closest('li[nh-comment-item]').attr('nh-comment-item');
				var btnLike = $(this);
				self.likeComment(commentId, function(response){
					var numberLike = typeof(response.number_like) != _UNDEFINED ? response.number_like : '';
					btnLike.find('.number-like').text(numberLike);
	        		btnLike.toggleClass('liked', response.type == 'like' ? true : false);
				});
			});

			self.wrapElement.on('click', '[nh-comment-more]', function(e){
				var commentItem = $(this).closest('li.comment-item');

				var page = $(this).attr('nh-comment-more');
				if(!page > 0) return;

				var commentId = commentItem.length > 0 ? commentItem.attr('nh-comment-item') : null;
				self.loadComment({
					parent_id: commentId,
					page: page
				});
			});

			self.wrapElement.on('click', '[nh-trigger-upload]', function(e){
				var boxComment = $(this).closest('.box-comment');
				if(boxComment.length == 0) return;

				boxComment.find('input[nh-input-comment-images]').trigger('click');
			});

			self.wrapElement.on('change', '[nh-input-comment-images]', function(e) {
				self.showImagesSelect(this);
			});

			self.wrapElement.on('click', '.comment-images .close-image', function(e){
				$(this).closest('li').remove();
			});
		},
		addComment: function(){
			var self = this;

			nhComment.getInfo(self.config);

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			self.content = $.trim(self.contentElement.val());
			self.images = [];

			if(self.content.length == 0){
				nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_noi_dung_binh_luan'));
				self.contentElement.focus();
				return false;
			}

			
			var itemComment = self.contentElement.closest('li[nh-comment-item]');
			var parent_id = itemComment.length > 0 ? itemComment.attr('nh-comment-item') : null;

			if(loginRequired == 1 && !nhComment.info.logged){
				nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'), function(){
					nhComment.loginModal.modal('show');
					nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
				});
				return false;
			}

			if (loginRequired == 0 && !nhMain.utilities.notEmpty(nhComment.info.full_name)) {
				self.triggerAdd = true;
				nhComment.infoModal.modal('show');
				return false;
			}
			
			var wrapInput = self.contentElement.closest('.edit-comment');
			wrapInput.find('li[nh-item-comment-image]').each(function(index) {
				if($(this).hasClass('loading')){
					nhMain.showAlert(_SUCCESS, nhMain.getLabel('vui_long_cho_he_thong_dang_tai_anh_binh_luan'));
					return false;
				}
				if($(this).find('img.img-comment').length > 0){
					self.images.push($(this).find('img.img-comment').attr('src'));
				}			  	
			});

			var data = {
				content: self.content,
				parent_id: parent_id,
				type_comment: _COMMENT,
				rating: self.rating,
				images: self.images,
				block_code: self.block_code
			}
			
  	    	nhComment.ajaxAddComment(data, function(response){
  	    		var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	if (code == _ERROR){
	        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        		nhMain.showAlert(_ERROR, message);
	        	}

	        	if (code == _SUCCESS) {
	        		if(self.config.awaiting_approval > 0){
						nhMain.showAlert(_SUCCESS, nhMain.getLabel('cam_on_ban_da_gui_binh_luan_cho_chung_toi_quan_tri_vien_se_xet_duyet_binh_luan_cua_ban_truoc_khi_dang_tai'));
					}else{
						var wrapList = null;
						if(itemComment.length > 0){
							var numberReply = itemComment.find('.number-reply:first').text();
							if($.isNumeric(numberReply)){
								numberReply ++;
							}else{
								numberReply = 1;
							}
							itemComment.find('.number-reply:first').text(numberReply);

							if(itemComment.find('.list-reply').length == 0){
								itemComment.find('.edit-comment').before(self.template.wrapReply);
							}							
							wrapList = itemComment.find('.list-reply');
						}

						var data = typeof(response.data) != _UNDEFINED ? response.data : '';
						self.appendComment(data, wrapList, {load_first: parent_id > 0 ? false : true});
					}
					self.clearBoxComment();
	            }
	            
  	    	});
		},
		likeComment: function(commentId = null, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
 	        	callback = function () {};
  	    	}

			if(!commentId > 0){
				nhMain.showLog(nhMain.getLabel('khong_lay_duoc_ID_binh_luan'));
				return false;
			}

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			if(loginRequired == 1 && !nhComment.info.logged){
				nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'));
				nhComment.loginModal.modal('show');
				nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
				return false;
			}
			
			if(typeof($.cookie(_LIKE_COMMENT)) == _UNDEFINED){
				$.cookie(_LIKE_COMMENT, JSON.stringify([]), {expires: self.config.expires_cookie});
			}

			var type = null;					
			if($.inArray(parseInt(commentId), JSON.parse($.cookie(_LIKE_COMMENT))) == -1){
				type = _LIKE;				
			}else{
				type = _DISLIKE;				
			}

			nhMain.callAjax({
	    		async: false,
				url: '/comment/like',
				data: {
					comment_id: commentId,
					type: type
				},
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : '';
	        	var id = typeof(data.id) != _UNDEFINED ? data.id : null;
	        	var type = typeof(data.type) != _UNDEFINED ? data.type : null;

	        	if (code == _ERROR){
	        		nhMain.showAlert(_ERROR, message);
	        	}

	        	if (code == _SUCCESS) {
	        		if(id > 0){
	        			var listLiked = JSON.parse($.cookie(_LIKE_COMMENT));
		        		if(type == _DISLIKE){
		        			listLiked.splice( $.inArray(id, listLiked), 1);
		        		}else{
		        			listLiked.push(id);
		        		}
		        		$.cookie(_LIKE_COMMENT, JSON.stringify(listLiked), {expires: self.config.expires_cookie});
	        		}
	        		
	        		callback(data);
	            }
			});
		},
		loadComment: function(params = {}){
			var self = this;
  	    	var parent_id = typeof(params.parent_id) != _UNDEFINED ? parseInt(params.parent_id) : null;

			nhComment.ajaxLoadComment(
  	    	{
  	    		parent_id: parent_id,
  	    		page: typeof(params.page) != _UNDEFINED ? params.page : null,
  	    		type_comment: _COMMENT,
  	    		number_record: typeof(self.config.number_record) != _UNDEFINED ? self.config.number_record : null,
  	    		sort_field: typeof(self.config.sort_field) != _UNDEFINED ? self.config.sort_field : null,
  	    		sort_type: typeof(self.config.sort_type) != _UNDEFINED ? self.config.sort_type : null,
  	    	}, 
  	    	{
  	    		show_loading: typeof(params.show_loading) != _UNDEFINED ? Boolean(params.show_loading) : true
  	    	},
  	    	function(response){
  	    		var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if (code == _ERROR){
	        		var message =  typeof(response.message) != _UNDEFINED ? response.message : null;
	        		nhMain.showLog(message);
	        	}
	        	
	        	if (code == _SUCCESS && nhMain.utilities.notEmpty(data.comments)) {
	        		var wrapReplyElement = null;
					if(parent_id > 0){
						wrapReplyElement = self.wrapElement.find('li[nh-comment-item="' + parent_id + '"]').find('.list-reply');
					}

					var comments = typeof(data.comments) != _UNDEFINED ? data.comments : [];
					$.each(comments, function( index, comment) {						
						self.appendComment(comment, wrapReplyElement);
					});

					var pagination = typeof(data[_PAGINATION]) != _UNDEFINED ? data[_PAGINATION] : [];
					var total = typeof(pagination.total) ? parseInt(pagination.total) : 0;
					var page = typeof(pagination.page) ? parseInt(pagination.page) : 0;
					var pages = typeof(pagination.pages) ? parseInt(pagination.pages) : 0;					

					if(page < pages){
						if(parent_id > 0){
							var replyRatingElement = self.wrapElement.find('li[nh-comment-item="' + parent_id + '"]');
							if(replyRatingElement.length > 0 && replyRatingElement.find('[nh-comment-more]').length == 0){
								replyRatingElement.find('.child-reply').after(self.template.moreItem);
							}							
							replyRatingElement.find('[nh-comment-more]').attr('nh-comment-more', page + 1);
						}else{
							if(self.wrapElement.find('> [nh-comment-more]').length == 0){
								self.listElement.after(self.template.moreItem);
							}
							self.wrapElement.find('> [nh-comment-more]').attr('nh-comment-more', page + 1);
						}						
					} else { 
						self.wrapElement.find('[nh-comment-more]').remove();
					}

					self.wrapElement.find('[nh-total-comment]').text(nhMain.utilities.parseNumberToTextMoney(total));
	            }
  	    	});
		},
		appendComment: function(comment = {}, wrapReplyElement = null, params = {}){
			var self = this;
				
			var loadFirst = typeof(params.load_first) != _UNDEFINED ? Boolean(params.load_first) : false;

			var wrapElement = null;
			var htmlItem = null;
			var appendItem = null;
			if(!nhMain.utilities.notEmpty(wrapReplyElement)){
				wrapElement = self.listElement;
				htmlItem = self.template.item;
			}else{
				wrapElement = wrapReplyElement;
				htmlItem = self.template.itemReply;
			}

			if(loadFirst){
				wrapElement.prepend(htmlItem);
				appendItem = wrapElement.find('li[nh-comment-item]:first-child');
			}else{
				wrapElement.append(htmlItem);
				appendItem = wrapElement.find('li[nh-comment-item]:last-child');
			}
			if(appendItem.length == 0) return;

			var commentId = typeof(comment.id) != _UNDEFINED ? parseInt(comment.id) : null;
			var fullName = typeof(comment.full_name) != _UNDEFINED ? comment.full_name : '';
			var content = typeof(comment.content) != _UNDEFINED ? comment.content : '';
			var time = typeof(comment.time) != _UNDEFINED ? comment.time : '';
			var fullTime = typeof(comment.full_time) != _UNDEFINED ? comment.full_time : '';
			var numberReply = typeof(comment.number_reply) != _UNDEFINED ? comment.number_reply : null;
			var numberLike = typeof(comment.number_like) != _UNDEFINED ? comment.number_like : null;
			var images = typeof(comment.images) != _UNDEFINED ? comment.images : [];
			var isAdmin = typeof(comment.is_admin) != _UNDEFINED ? parseInt(comment.is_admin) : 0;


			if(!nhMain.utilities.notEmpty(fullName) || !nhMain.utilities.notEmpty(content)) return;

			var letterFirst = fullName.slice(0, 1);

			appendItem.attr('nh-comment-item', commentId);
			appendItem.find('.post-author .name-author').text(fullName);
			appendItem.find('.post-author .letter-first').text(letterFirst);			
			appendItem.find('.comment-content .inner-content').html(content.replace(/\n/g, '<br />'));
			appendItem.find('.comment-content .post-date').text(time);
			appendItem.find('.comment-content .number-reply').text(numberReply);
			appendItem.find('.comment-content .number-like').text(numberLike);

			if(isAdmin){				
				appendItem.find('.post-author').append('<span class="is-admin">'+ nhMain.getLabel('quan_tri_vien') +'</span>')
			}

			if(images.length > 0){
				appendItem.find('.comment-content .inner-content').after('<div class="album-images"></div>');
				var wrapAlbum = appendItem.find('.album-images');
				$.each(images, function(index, image) {
					var thumb = nhMain.utilities.getThumbImage(image);
					wrapAlbum.append('<a href="' + nhMain.cdnUrl + image + '"><img class="image-comment" src="' + nhMain.cdnUrl + thumb + '" ></a>');
				});

				wrapAlbum.lightGallery({});
			}

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			if (loginRequired == 0) {
				var listLiked = typeof($.cookie(_LIKE_COMMENT)) != _UNDEFINED ? JSON.parse($.cookie(_LIKE_COMMENT)) : [];
				if($.inArray(commentId, listLiked) > -1){
					appendItem.find('.inner-like').addClass('liked');
				}
			}
		},
		showImagesSelect: function(input = null){
			var self = this;
			if(input == null || typeof(input.files) == _UNDEFINED){
				return false;
			}			

			var wrapComment = $(input).closest('.edit-comment');
			var boxComment = wrapComment.find('.box-comment');
			if(wrapComment.length == 0 || boxComment.length == 0){
				return false;
			}

			var wrapAlbum = wrapComment.find('.comment-images');
			if(wrapAlbum.length == 0){
				boxComment.after(self.template.wrapListImageSelect);
				wrapAlbum = wrapComment.find('.comment-images');
			}
			wrapAlbum.html('');

			$.each(input.files, function(index, file) {
				if(index >= nhComment.config.max_number_files) return;

				var fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				fileReader.onload = function(e) {
			        self.appendImageSelect(fileReader.result, input);
			    }				
			});
			
			$.each(input.files, function(index, file) {
				if(index >= nhComment.config.max_number_files) return;

				var formData = new FormData();
				formData.append('file', file);
				formData.append('path', _COMMENT);

				nhComment.ajaxUploadImage(formData, function(data){
					var urlImage = typeof(data.url) != _UNDEFINED ? data.url : null;
	        		var liElement = wrapAlbum.find('li:eq('+ index +')');
					if(liElement.length > 0){
						liElement.removeClass('loading');
						liElement.find('img.img-comment').attr('src', nhMain.cdnUrl + urlImage);
					}
				});
			});
		},
		appendImageSelect: function(urlImage = null, input = null, params = {}){
			var self = this;

			var wrapAlbum = $(input).closest('.edit-comment').find('.comment-images');
			if(wrapAlbum.length == 0){
				return false;
			}

			if(urlImage == null || typeof(urlImage) == _UNDEFINED || urlImage.length == 0){
				return false;
			}

			wrapAlbum.append(self.template.imageSelect);
			wrapAlbum.find('li:last-child img.img-comment').attr('src', urlImage);
			wrapAlbum.removeClass('d-none');

			if(typeof(params.uploaded) != _UNDEFINED && params.uploaded > 0){
				wrapAlbum.find('li:last-child').removeClass('loading');
			}
		},
		clearBoxComment: function(){
			var self = this;

			var wrap = self.contentElement.closest('.edit-comment');
			if(wrap.length == 0){
				return false;
			}

			self.contentElement.val('');
			self.contentElement.css('height', self.scrollHeightDefault + 'px')
			
			wrap.find('.comment-images').remove();
		},
		showInfo: function(){
			var self = this;
			
			nhComment.getInfo(self.config);
			if(!nhMain.utilities.notEmpty(nhComment.info.full_name)) return false;

			self.wrapElement.find('[nh-comment-fullname]').text(nhComment.info.full_name);
			self.wrapElement.find('[nh-comment-info]').removeClass('d-none');
		}
	},	
	rating: {
		config: {},
		block_code: null,
		content: null,
		rating: null,
		triggerAdd: false,
		wrapElement: null,
		listElement: null,
		formRating: null,
		contentElement: null,
		ratingItem: null,
		template:{
			item: '\
				<li nh-rating-item="" is-parent="true" class="item">\
					<div class="box-rating">\
						<div class="author-info">\
							<span class="letter-first"></span>\
							<div>\
								<span class="post-author"></span>\
								<br />\
								<span class="post-date"></span>\
							</div>\
						</div>\
						<div class="rating-content">\
			                <div class="star-rating">\
			                    <span style="width:100%"></span>\
			                </div>\
							<div class="description"></div>\
							<div class="btn-action">\
								<div class="inner-reply">\
									<i class="iconsax isax-message-text"></i>\
									<span class="number-reply"></span> '+ nhMain.getLabel('tra_loi') +'\
								</div>	\
							</div>\
						</div>\
					</div>\
				</li>',
			itemReply: '\
				<li nh-rating-item="" class="item">\
					<div class="author-info">\
						<div class="meta">\
							<span class="post-author"></span> - \
							<span class="post-date"></span>\
						</div>\
					</div>\
					<div class="rating-content">\
						<div class="description"></div>\
					</div>\
				</li>',
			moreItem: '<a nh-comment-more="" class="comment-more" href="javascript:;">'+ nhMain.getLabel('xem_them_danh_gia') +'</a>',
			formRating: '',
			inputReplyRating: '\
				<div class="rating-form contact-form">\
			    	<div class="form-group">\
						<textarea class="bg-white" nh-input-rating placeholder="'+ nhMain.getLabel('nhan_xet_cua_ban_ve_san_pham_nay') +'"></textarea>\
					</div>\
					<div>\
				        <span nh-btn-reply-rating class="button fs-16 py-12 px-15 -dark-1 text-white d-inline-block">'+ nhMain.getLabel('gui_danh_gia') +'</span>\
					</div>\
				</div>',
			wrapReply: '<ul class="child-reply"></ul>',	
			imageSelect: '\
				<li nh-item-rating-image class="loading">\
					<img class="img-comment" src="">\
					<i class="close-image">x</i>\
				</li>'
		},		
		init: function(){
			var self = this;

			self.wrapElement = $('[nh-rating]');
			self.formRating = $('form[nh-form-rating]');
			self.listElement = self.wrapElement.find('[nh-list-rating]');
			self.contentElement = self.formRating.find('textarea[nh-input-rating]');

			if(self.wrapElement.length == 0) return false;

			var configBlock = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-rating'));
			if($.isEmptyObject(configBlock)){
				nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}
			$.extend(self.config, configBlock);

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			if(loginRequired == 1 && nhComment.loginModal.length == 0){
				nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}

			if(self.listElement.length == 0){
				nhMain.showLog(nhMain.getLabel('chuc_nang_danh_gia_thieu_dieu_kien_de_hoat_dong'));
				return false;
			}

			var wrapBlock = self.wrapElement.closest('[nh-block]');
			if(wrapBlock.length > 0 && wrapBlock.attr('nh-block').length > 0){
				self.block_code = wrapBlock.attr('nh-block');
			}

			self.showInfo();

			self.event();			
			self.loadCommentRating({show_loading: false});
		},
		event: function(){
			var self = this;
			
			nhMain.validation.phoneVn();
			var validatorRating = self.formRating.validate({
				ignore: ':hidden',
				rules: {
					full_name: {
						required: true,
						minlength: 6,
						maxlength: 255
					},
					email: {
						required: true,
						email: true,
	                    minlength: 10,
	                    maxlength: 255
					},
					phone: {
						required: true,
						phoneVN: true
					},
					content: {
						required: true,
						minlength: 20,
						maxlength: 1000
					}
				},
				messages: {
					full_name: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                },
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                },
	                phone: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    phoneVN: nhMain.getLabel('so_dien_thoai_chua_chinh_xac')
	                },
	                content: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else{                	
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validatorRating.errorList[0].element.focus();
				},
			});

			self.wrapElement.on('click', '[nh-btn-send-rating]', function(e){
				e.preventDefault();
				if (validatorRating.form()) {

					self.ratingItem = null;
					self.contentElement = self.formRating.find('textarea[nh-input-rating]');

					nhComment.setInfo({
						full_name: self.formRating.find('input[name="full_name"]').val(),
						email: self.formRating.find('input[name="email"]').val(),
						phone: self.formRating.find('input[name="phone"]').val(),
						full_name: self.formRating.find('input[name="full_name"]').val(),
					});

					self.addCommentRating();
				}				
			});

			self.wrapElement.on('click', '[nh-btn-reply-rating]', function(e){
				e.preventDefault();

				self.ratingItem = $(this).closest('li[nh-rating-item]');
				if(self.ratingItem.length == 0) return false;

				self.contentElement = self.ratingItem.find('textarea[nh-input-rating]');
				if(self.contentElement.length == 0) return false;

				self.addCommentRating();
			});

			self.wrapElement.on('click', '.inner-reply', function(e){
				self.ratingItem = $(this).closest('li[nh-rating-item][is-parent]');
				if(self.ratingItem.length == 0) return false;

				var ratingId = self.ratingItem.attr('nh-rating-item');
				if(!nhMain.utilities.notEmpty(ratingId)) return false;

				if(self.ratingItem.find('.entry-reply').length == 0){
					self.ratingItem.find('.rating-content').append('<div class="entry-reply"></div>');
				}

				var replyWrap = self.ratingItem.find('.entry-reply');
				var numberReply = $(this).find('.number-reply').text();
				var loadReply = false;
				if(nhMain.utilities.notEmpty(numberReply) && replyWrap.find('.child-reply').length == 0) {
					loadReply = true;
					replyWrap.prepend(self.template.wrapReply);
				}

				if(replyWrap.find('.rating-form').length == 0){
					replyWrap.append(self.template.inputReplyRating);
				}

				self.contentElement = self.ratingItem.find('[nh-input-rating]');
				self.contentElement.focus();

				if(loadReply){
					self.loadCommentRating({parent_id: ratingId});
				}
			});

			self.wrapElement.on('click', '[nh-comment-more]', function(e){
				e.preventDefault();

				self.ratingItem = $(this).closest('li[nh-rating-item]');

				var page = $(this).attr('nh-comment-more');
				if(!page > 0) return;

				var commentId = self.ratingItem.length > 0 ? self.ratingItem.attr('nh-rating-item') : null;
				self.loadCommentRating({
					parent_id: commentId,
					page: page
				});
			});

			self.wrapElement.on('click', '[nh-btn-show-rating]', function(e){
				var listRating = !$.isEmptyObject($.cookie(_RATING_LIST)) ? JSON.parse($.cookie(_RATING_LIST)) : [];
				if($.inArray(window.location.pathname, listRating) > -1){
					nhMain.showAlert(_SUCCESS, nhMain.getLabel('ban_da_danh_gia_san_pham_nay_roi'));
					return false
				};
				self.formRating.collapse('toggle');
			});

			self.wrapElement.on('click', '[nh-trigger-upload]', function(e){
				self.formRating.find('input[nh-input-rating-images]').trigger('click');
			});

			self.wrapElement.on('change', '[nh-input-rating-images]', function(e) {
				self.showImagesRating(this);
			});

			self.wrapElement.on('change', '[nh-review-star] input[type="radio"]', function(e) {
				var star = nhMain.utilities.parseInt($(this).val());
				if(star > 5 ) star = 0;

				self.rating = star;
			});

			self.wrapElement.on('click', '.comment-images .close-image', function(e){
				$(this).closest('li').remove();
			});
		},
		addCommentRating: function(){
			var self = this;

			nhComment.getInfo();

			self.content = $.trim(self.contentElement.val());
			self.images = [];

			if(self.content.length == 0){
				nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_noi_dung_binh_luan'));
				self.contentElement.focus();
				return false;
			}

			var loginRequired = typeof(self.config.login_required) != _UNDEFINED ? self.config.login_required : 0;
			if(loginRequired == 1 && !nhComment.info.logged){
				nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_dang_nhap_tai_khoan_de_su_dung_chuc_nang_nay'), function(){
					nhComment.loginModal.modal('show');
					nhComment.loginModal.find('input[name="redirect"]').val(window.location.href);
				});
				return false;
			}

			if (loginRequired == 0 && !nhMain.utilities.notEmpty(nhComment.info.full_name)) {
				self.triggerAdd = true;
				nhComment.infoModal.modal('show');
				return false;
			}

			var parent_id = null;
			if(self.contentElement.closest('li[nh-rating-item]').length > 0){
				var parent_id = self.contentElement.closest('li[nh-rating-item]').attr('nh-rating-item');
			}

			if(parent_id != null){
				self.rating = null;
			}
			
			self.formRating.find('li[nh-item-rating-image]').each(function(index) {
				if($(this).hasClass('loading')){
					nhMain.showAlert(_SUCCESS, nhMain.getLabel('vui_long_cho_he_thong_dang_tai_anh_binh_luan'));
					return false;
				}

				if($(this).find('img.img-comment').length > 0){
					self.images.push($(this).find('img.img-comment').attr('src'));
				}
			});

			var data = {
				content: self.content,
				parent_id: parent_id,
				type_comment: _RATING,
				rating: self.rating,
				images: self.images,
				block_code: self.block_code
			}
			
  	    	nhComment.ajaxAddComment(data, function(response){
  	    		var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	if (code == _ERROR){
	        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        		nhMain.showAlert(_ERROR, message);
	        	}

	        	if (code == _SUCCESS) {
	        		if(self.config.awaiting_approval > 0){
						nhMain.showAlert(_SUCCESS, nhMain.getLabel('cam_on_ban_da_gui_binh_luan_cho_chung_toi_quan_tri_vien_se_xet_duyet_binh_luan_cua_ban_truoc_khi_dang_tai'));
					}else{
						var wrapList = null;
						if(nhMain.utilities.notEmpty(self.ratingItem)){
							var numberReply = self.ratingItem.find('.number-reply:first').text();
							if($.isNumeric(numberReply)){
								numberReply ++;
							}else{
								numberReply = 1;
							}
							self.ratingItem.find('.number-reply:first').text(numberReply);

							if(self.ratingItem.find('.child-reply').length == 0){
								self.ratingItem.find('.rating-form').before(self.template.wrapReply);
							}
							var wrapList = self.ratingItem.find('.child-reply');
						}
						
						var data = typeof(response.data) != _UNDEFINED ? response.data : '';
						self.appendCommentRating(data, wrapList, {load_first: parent_id > 0 ? false : true});
					}

					if(!parent_id > 0){
						var listRating = nhMain.utilities.notEmpty($.cookie(_RATING_LIST)) ? JSON.parse($.cookie(_RATING_LIST)) : [];
						if($.inArray(window.location.pathname, listRating) == -1){
							listRating.push(window.location.pathname);
							$.cookie(_RATING_LIST, JSON.stringify(listRating), {expires: self.config.expires_cookie});
						}						
					}

					self.clearBoxRating();
	            }
	            
  	    	});
		},
		loadCommentRating: function(params = {}){
			var self = this;
  	    	var parent_id = typeof(params.parent_id) != _UNDEFINED ? params.parent_id : null;
  	    	var page = typeof(params.page) != _UNDEFINED ? parseInt(params.page) : null;
  	    	
  	    	nhComment.ajaxLoadComment(
  	    	{
  	    		parent_id: parent_id,
  	    		page: page,
  	    		type_comment: _RATING,
  	    		number_record: typeof(self.config.number_record) != _UNDEFINED ? self.config.number_record : null,
  	    		sort_field: typeof(self.config.sort_field) != _UNDEFINED ? self.config.sort_field : null,
  	    		sort_type: typeof(self.config.sort_type) != _UNDEFINED ? self.config.sort_type : null,
  	    	}, 
  	    	{
  	    		show_loading: typeof(params.show_loading) != _UNDEFINED ? Boolean(params.show_loading) : true
  	    	},
  	    	function(response){
  	    		var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if (code == _ERROR){
	        		var message =  typeof(response.message) != _UNDEFINED ? response.message : null;
	        		nhMain.showLog(message);
	        	}
	        	
	        	if (code == _SUCCESS && nhMain.utilities.notEmpty(data.comments)) {
	        		var wrapReplyElement = null;
					if(parent_id > 0){
						wrapReplyElement = self.wrapElement.find('li[nh-rating-item="' + parent_id + '"]').find('.child-reply');
					}

					var comments = typeof(data.comments) != _UNDEFINED ? data.comments : [];
					$.each(comments, function( index, comment) {						
						self.appendCommentRating(comment, wrapReplyElement);
					});

					var pagination = typeof(data[_PAGINATION]) != _UNDEFINED ? data[_PAGINATION] : [];
					var page = typeof(pagination.page) ? parseInt(pagination.page) : 0;
					var pages = typeof(pagination.pages) ? parseInt(pagination.pages) : 0;
					if(page < pages){
						if(parent_id > 0){
							var replyRatingElement = self.wrapElement.find('li[nh-rating-item="' + parent_id + '"]');
							if(replyRatingElement.length > 0 && replyRatingElement.find('[nh-comment-more]').length == 0){
								replyRatingElement.find('.child-reply').after(self.template.moreItem);
							}							
							replyRatingElement.find('[nh-comment-more]').attr('nh-comment-more', page + 1);
						}else{
							if(self.wrapElement.find('> [nh-comment-more]').length == 0){
								self.listElement.after(self.template.moreItem);
							}
							self.wrapElement.find('> [nh-comment-more]').attr('nh-comment-more', page + 1);
						}						
					} else {
						self.wrapElement.find('[nh-comment-more]').remove();
					}
	            }
  	    	});
		},
		appendCommentRating: function(comment = {}, wrapReplyElement = null, params = {}){
			var self = this;
				
			var loadFirst = typeof(params.load_first) != _UNDEFINED ? Boolean(params.load_first) : false;

			var wrapElement = null;
			var htmlItem = null;
			var appendItem = null;
			if(nhMain.utilities.notEmpty(wrapReplyElement)){				
				wrapElement = wrapReplyElement;
				htmlItem = self.template.itemReply;
			}else{
				wrapElement = self.listElement;
				htmlItem = self.template.item;
			}

			if(loadFirst){
				wrapElement.prepend(htmlItem);
				appendItem = wrapElement.find('li[nh-rating-item]:first-child');
			}else{
				wrapElement.append(htmlItem);
				appendItem = wrapElement.find('li[nh-rating-item]:last-child');
			}

			if(appendItem.length == 0) return;

			var commentId = typeof(comment.id) != _UNDEFINED ? parseInt(comment.id) : null;
			var fullName = typeof(comment.full_name) != _UNDEFINED ? comment.full_name : '';
			var content = typeof(comment.content) != _UNDEFINED ? comment.content : '';
			var time = typeof(comment.time) != _UNDEFINED ? comment.time : '';
			var fullTime = typeof(comment.full_time) != _UNDEFINED ? comment.full_time : '';
			var numberReply = typeof(comment.number_reply) != _UNDEFINED ? comment.number_reply : null;
			var numberLike = typeof(comment.number_like) != _UNDEFINED ? comment.number_like : null;
			var images = typeof(comment.images) != _UNDEFINED ? comment.images : [];
			var isAdmin = typeof(comment.is_admin) != _UNDEFINED ? parseInt(comment.is_admin) : 0;
			var rating = typeof(comment.rating) != _UNDEFINED ? parseInt(comment.rating) : 0;
			var widthRating = 0;
			if(rating >= 1 && rating <= 5){
				widthRating = rating * 20;
			}

			if(!nhMain.utilities.notEmpty(fullName) || !nhMain.utilities.notEmpty(content)) return;

			appendItem.attr('nh-rating-item', commentId);
			appendItem.find('.author-info .post-author').text(fullName);
			appendItem.find('.author-info .letter-first').text(nhComment.convertFullNameToSpell(fullName));
			appendItem.find('.author-info .post-date').text(time);
			appendItem.find('.rating-content .description').text(content);
			appendItem.find('.rating-content .number-reply').text(numberReply);
			appendItem.find('.rating-content .number-like').text(numberLike);

			appendItem.find('.star-rating span').css('width', widthRating + '%');

			if(isAdmin){
				appendItem.find('.post-author').append('<span class="is-admin">'+ nhMain.getLabel('quan_tri_vien') +'</span>');
			}

			if(images.length > 0){
				appendItem.find('.rating-content .description').after('<div class="album-images"></div>');
				var wrapAlbum = appendItem.find('.album-images');
				$.each(images, function(index, image) {
					var thumb = nhMain.utilities.getThumbImage(image);
					wrapAlbum.append('<a href="' + nhMain.cdnUrl + image + '"><img class="image-comment" src="' + nhMain.cdnUrl + thumb + '" ></a>');
				});

				wrapAlbum.lightGallery({});
			}
		},
		clearBoxRating: function(){
			var self = this;

			if(nhMain.utilities.notEmpty(self.contentElement)){
				self.contentElement.val('');
			};
			
			self.formRating.find('.comment-images').remove();
			self.formRating.collapse('hide');
		},
		showImagesRating: function(input = null){
			var self = this;

			if(input == null || typeof(input.files) == _UNDEFINED){
				return false;
			}

			var wrapAlbum = self.formRating.find('.comment-images');
			wrapAlbum.html('');

			$.each(input.files, function(index, file) {
				if(index >= nhComment.config.max_number_files) return;

				var fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				fileReader.onload = function(e) {
			        self.appendImageRating(fileReader.result, input);
			    }
			});

			$.each(input.files, function(index, file) {
				if(index >= nhComment.config.max_number_files) return;

				var formData = new FormData();
				formData.append('file', file);
				formData.append('path', _RATING);

				nhComment.ajaxUploadImage(formData, function(data){
					var urlImage = typeof(data.url) != _UNDEFINED ? data.url : null;
	        		var liElement = wrapAlbum.find('li:eq('+ index +')');
					if(liElement.length > 0){
						liElement.removeClass('loading');
						liElement.find('img.img-comment').attr('src', nhMain.cdnUrl + urlImage);
					}
				});
			});
		},
		appendImageRating: function(urlImage = null, input = null, params = {}){
			var self = this;

			var wrapAlbum = self.formRating.find('.comment-images');
			if(wrapAlbum.length == 0) return false;

			if(!nhMain.utilities.notEmpty(urlImage)) return false;
									
			wrapAlbum.append(self.template.imageSelect);
			wrapAlbum.find('li:last-child img.img-comment').attr('src', urlImage);
			wrapAlbum.removeClass('d-none');

			if(typeof(params.uploaded) != _UNDEFINED && params.uploaded > 0){
				wrapAlbum.find('li:last-child').removeClass('loading');
			}
		},
		showInfo: function(){
			var self = this;
			
			nhComment.getInfo(self.config);
			if(!nhMain.utilities.notEmpty(nhComment.info.full_name)) return false;

			self.formRating.find('input[name="full_name"]').val(nhComment.info.full_name);
		  	self.formRating.find('input[name="email"]').val(nhComment.info.email);
		  	self.formRating.find('input[name="phone"]').val(nhComment.info.phone);
		}
	}
}

$(document).ready(function() {
	nhComment.init();
});