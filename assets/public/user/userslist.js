$(function() {
	$.get('find', function(data){
		$.each(data, function (index, value) {
			$( ".list-group" ).append(
			 "<li class='list-group-item'>"+value.username+"</li>"
			 );
        });
	})
})