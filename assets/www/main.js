$(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
	//force image to screen width
	$('#main_img').attr('width',window.innerWidth);
	//Load initial image
	setImage(newImage());
	//Load new image on click
	$('#main_img').click(function() {
		setImage(newImage());
	});
}

function newImage() {
	image_id = call('image/random');
	image = call('image/get',{'image':image_id.response});
	return image;
}

function setImage(image) {
	$('#main_img').attr('src',img_loc+image.filename);
	$('#main_img').imagefit();
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