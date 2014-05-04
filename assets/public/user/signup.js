$(document).ready(function(){   
    $("#signupButton").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var email = $("#email").val();
        var lastName = $("#lastName").val();
        var firstName = $("#firstName").val();
        var confirmPassword = $("#confirmPassword").val();
        if (username && password && email && lastName && firstName) {
            if (password === confirmPassword) {
                $.post(
                    '/signup',
                    {username: username, password:password, email: email, firstName: firstName, lastName: lastName},
                    function () {
                        window.location = "/";
                    }
                ).fail(function(res){
                    alert("Erreur: " + res.getResponseHeader("error"));
                });
            } else {
                alert("Les mots de passe entrés ne correspondent pas");
            }   
        } else {
            alert("Un nom d'utilisateur et un mot de passe sont nécessaires");
        }
    });
});