$(function(socket) {
	socket.get('/user/find', function(data){
		$.each(data, function (index, value) {
			$( ".tbody" ).append(
				"<tr>" +
	            "<td>" + value.firstName + "</td>" +
	            "<td>" + value.lastName + "</td>" +
	            "<td>" + value.username + "</td>" +
	            '<td><a href="user/show/' + value.id + '" class="btn btn-default">Voir</a>' +
	            '<a href="user/edit/' + value.id + '" class="btn btn-primary">Editer</a>' +
	            '<a href="user/destroy/' + value.id + '" class="btn btn-danger">Supprimer</a></td>' +
	         	"</tr>"
			);
        });
	})
})