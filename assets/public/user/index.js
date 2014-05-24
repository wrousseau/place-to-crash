$(function(socket) {
	socket.get('/user/find', function(data){
		$.each(data, function (index, value) {
			var userStatusCell = '<td class="user-status"><span class="glyphicon ';
			userStatusCell += (value.online) ? 'glyphicon-ok' : 'glyphicon-remove';
			userStatusCell += '"></span>';
			$( ".tbody" ).append(
				"<tr>" +
				userStatusCell + 
	            "<td>" + value.firstName + "</td>" +
	            "<td>" + value.lastName + "</td>" +
	            "<td>" + value.username + "</td>" +
	            '<td><a href="/user/show/' + value.id + '" class="btn btn-default">Voir</a>' +
	            '<a href="/user/edit/' + value.id + '" class="btn btn-primary">Editer</a>' +
	            '<a href="/user/destroy/' + value.id + '" class="btn btn-danger">Supprimer</a></td>' +
	         	"</tr>"
			);
        });
	})
})