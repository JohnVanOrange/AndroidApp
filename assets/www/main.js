$(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	//force image to screen width
	$('#main_img').attr('width',window.innerWidth);
	
	//Load initial image
	nextImage();
	
	//Load new image on click
	$('#main_img').click(function() {
		nextImage();
	});
}

function onBackKeyDown() {
	prevImage();
}

function nextImage() {
	image.index++;
	console.log('imageindex: '+image.index);
	console.log('imagelen: '+image.store.length);
	if (image.store.length <= image.index) {
		console.log('Loading image');
		newImage();
	}
	setImage(image.index);
}

function prevImage() {
	if (image.index > 0) {
		image.index--;
	}
	setImage(image.index);
}

function newImage() {
	image_id = call('image/random');
	newimage = call('image/get',{'image':image_id.response});
	image.store.push(newimage);
	console.log('Image pushed');
	return newimage;
}

function setImage(index) {
	$('#main_img').attr('src',img_loc+image.store[index].filename);
	console.log('Set image: '+img_loc+image.store[index].filename);
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

image = {
	index : -1,
	store : new Array()
};

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