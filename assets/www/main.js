$(document).ready(function() {
	
});

function newImage() {
	image_id = call('image/random');
	image = call('image/get',{'image':image_id});
}

function call(method, opt) {
	try {
		result = api.call(method, opt);
		if (result.message) {
			message = result.message;
			if (result.url) message = '<a href="'+result.url+'">'+message+'</a>';
			noty({text:message});
		}
		return result;
	}
	catch(e) {
		exception_handler(e);
	}
}

api = {
	client : function (method, opt) {
		url = '/api/' + method;
		response = $.parseJSON($.ajax({
			type: 'post',
			async: false,
			url: url,
			data: opt,
			dataType: 'json'
		}).responseText);
		if (response.error) {
			throw {name:response.error, message:response.message};
		}
		return response;
	},
	call : function(method, opt) {
		return this.client(method, opt);
	}
};