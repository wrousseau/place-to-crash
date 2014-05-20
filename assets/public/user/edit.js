$(function () {
    
    /**
     * Client Side Validation (bootstrapValidator)
     */
    $('#editForm').bootstrapValidator({
        message: 'Ce champs est invalide',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        submitHandler: function(validator, form, submitButton) {
            validator.defaultSubmit();
        },
        fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        message: 'Le prénom est requis'
                    }
                }
            },
            lastName: {
                validators: {
                    notEmpty: {
                        message: 'Le nom de famille est requis'
                    }
                }
            },
            username: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: "Le nom d'utilisateur est requis"
                    },
                    stringLength: {
                        min: 5,
                        max: 30,
                        message: "Le nom d'utilisateur doit comprendre entre 5 et 30 caractères"
                    },
                    callback: {
                        message: "Le nom d'utilisateur est déjà utilisé",
                        callback: function(input) {
                            $.ajaxSetup({
                                async: false
                            });
                            var found = false;
                            $.get("../find", function(data) {
                                $.each(data, function (index, value) {
                                    if (value.username.toLowerCase() === input.toLowerCase() && value.id !== $("#userId").val())
                                        found = true;
                                });
                            });
                            $.ajaxSetup({
                                async: true
                            });
                            return !found;
                        }                    
                    }
                }
            },
            email: {
                trigger: 'blur',
                validators: {
                    notEmpty: {
                        message: "L'email est requis"
                    },
                    emailAddress: {
                        message: "L'email entré n'est pas un email valide"
                    },
                    callback: {
                        message: "L'email entré est déjà utilisé",
                        callback: function(input) {
                            $.ajaxSetup({
                                async: false
                            });
                            var found = false;
                            $.get("../find", function(data) {
                                $.each(data, function (index, value) {
                                    if (value.email === input.toLowerCase() && value.id !== $("#userId").val())
                                    {
                                        found = true;
                                    }
                                });
                            });
                            $.ajaxSetup({
                                async: true
                            });
                            return !found;
                        }
                    }
                }
            },
        }
    });
});
