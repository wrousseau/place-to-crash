$(function(socket) {
	socket.get('user/find', function(data){
		$.each(data, function (index, value) {
			$( ".tbody" ).append(
				"<tr>" +
	            "<td>" + value.firstName + "</td>" +
	            "<td>" + value.lastName + "</td>" +
	            "<td>" + value.username + "</td>" +
	         	"</tr>"
			);
        });
	})
})