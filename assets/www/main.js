$(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
	$.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.hashListeningEnabled = false;
	
    document.addEventListener("backbutton", onBackKeyDown, false);
	
	//force image to screen width
	$('body').live('pagebeforeshow', function() {
		$('.main_image').attr('width',window.innerWidth);
	});

	//Load initial image
	nextImage();
	//Load another image
	newImage();
	
	//Load new image on click
	$('body').click(function() {
		nextImage();
	});
	//Support swiping left and right
	$('body').swipeleft(function() {
		nextImage();
	});
	$('body').swiperight(function() {
		prevImage();
	});
}

function onBackKeyDown() {
	prevImage();
}

function nextImage() {
	image.index++;
	if (image.store.length <= image.index) {
		newImage();
	}
	setImage(image.index,'next');
}

function prevImage() {
	if (image.index > 0) {
		image.index--;
	}
	setImage(image.index,'prev');
}

function newImage() {
	var image_id = call('image/random');
	$.mobile.loadPage(image_id.response, { showLoadMsg: false } );
	image.store.push(image_id.response);
	return image_id.response;
}

function setImage(index, direction) {
	reverse = false;
	if (direction == 'prev') {
		reverse = true;
	}
	$.mobile.changePage(img_loc + image.store[index],{'transition': 'slide', 'reverse': reverse} );
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