$( function() {
 document.addEventListener("deviceready", onDeviceReady, false);
});
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
function onDeviceReady() {
 $('#test').html('Success');
 result = call('user/login',{'username':'testaccount','password':'thisisatest'});
}

function newImage() {
	image_id = call('image/random');
	image = call('image/get',{'image':image_id});
}

function call(method, opt) {
	try {
		result = api.call(method, opt);
		if (result.message) {
			window.MyToast.srt(result.message);
		}
		return result;
	}
	catch(e) {
		exception_handler(e);
	}
}

api = {
	client : function (method, opt) {
		url = api_loc + method;
		response = $.parseJSON($.ajax({
			type: 'post',
			async: false,
			url: url,
			data: opt,
			dataType: 'json'
		}).responseText);
		if (response.hasOwnProperty('error')) {
			throw {name:response.error, message:response.message};
		}
		return response;
	},
	call : function(method, opt) {
		return this.client(method, opt);
	}
};

function exception_handler(e) {
	navigator.notification.alert(e.message);
}