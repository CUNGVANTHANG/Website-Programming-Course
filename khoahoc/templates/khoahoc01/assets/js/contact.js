'use strict';

var nhContact = {
	init: function(){
		var self = this;

		// validate element
		if($('form[nh-form-contact]').length == 0){
			return false;
		}
		nhMain.validation.phoneVn();
		$.each($('form[nh-form-contact]'), function( index, contact) {	
			var formElement = $(contact);
			var formCode = formElement.attr('nh-form-contact');
			if(formCode.length == 0){
				return false;
			}

			var validator = formElement.validate({
				ignore: ":hidden",
	            errorPlacement: function(error, element) {
	            	var messageRequired = element.attr('message-required');
	            	if(typeof(messageRequired) != _UNDEFINED && messageRequired.length > 0){
	            		error.text(messageRequired);
	            	}
	            	error.addClass('invalid-feedback')

	                var group = element.closest('.input-group');
	                if (group.length) {
	                    group.after(error);
	                }else if(element.hasClass('select2-hidden-accessible')){
	            		element.closest('.form-group').append(error);
	                }else{
	                	element.after(error);
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input, textarea', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

			formElement.on('click', '[nh-btn-action="submit"]', function(e){
				e.preventDefault();

		  		if (validator.form()) {
		  			nhMain.showLoading.page();

		  			nhMain.reCaptcha.check(function(token){
		  				var formData = formElement.serialize() + '&form_code=' + formCode;
		  				if(token != null){
		  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
		  				}
						nhMain.callAjax({
							url: formElement.attr('action'),
							data: formData
						}).done(function(response) {
							nhMain.showLoading.remove();
							
						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
				            if (code == _SUCCESS) {
				            	nhMain.showAlert(_SUCCESS, message);
				            	location.reload();
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
						});
		  			});				
				}
			});
		});
	}
}

$(document).ready(function() {
	nhContact.init();
});