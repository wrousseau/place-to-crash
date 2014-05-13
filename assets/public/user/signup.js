$(function () {
    $('.button-checkbox').each(function () {
        // Settings
        var $widget = $(this),
        $button = $widget.find('button'),
        $checkbox = $widget.find('input:checkbox'),
        color = $button.data('color'),
        settings = {
            on: {
                icon: 'glyphicon glyphicon-check'
            },
            off: {
                icon: 'glyphicon glyphicon-unchecked'
            }
        };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.prop('checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
        $(".modal-footer button").on('click', function() {
            $checkbox.prop('checked', true);
            $("button:submit").prop("disabled", false);
            updateDisplay();
        })
        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.prop('checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
            .removeClass()
            .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                .removeClass('btn-default')
                .addClass('btn-' + color + ' active');
            }
            else {
                $button
                .removeClass('btn-' + color + ' active')
                .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });

    $('#signupForm').bootstrapValidator({
        message: 'Ce champs est invalide',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        submitHandler: function(validator, form, submitButton) {
            if (!$("input:checkbox").prop("checked"))
            {
                $('#t_and_c_m').modal();
                $
                return;
            }
            if ($(form).isValid())
                alert("ok");
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
                validators: {
                    notEmpty: {
                        message: "Le nom d'utilisateur est requis"
                    },
                    callback: {
                        message: "Le nom d'utilisateur est déjà utilisé",
                        callback: function(input) {
                            $.ajaxSetup({
                                async: false
                            });
                            var found = false;
                            $.get("find", function(data) {
                                $.each(data, function (index, value) {
                                    if (value.n.data.username.toLowerCase() === input.toLowerCase())
                                        found = true;
                                });
                            });
                            $.ajaxSetup({
                                async: true
                            });
                            return !found;
                        }
                    },
                    stringLength: {
                        min: 5,
                        max: 30,
                        message: "Le nom d'utilisateur doit comprendre entre 5 et 30 caractères"
                    }
                }
            },
            email: {
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
                            $.get("find", function(data) {
                                $.each(data, function (index, value) {
                                    if (value.n.data.email.toLowerCase() === input.toLowerCase())
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
            password: {
                validators: {
                    notEmpty: {
                        message: "Le mot de passe est requis"
                    },
                    different: {
                        field: 'username',
                        message: "Le mot de passe ne peut être identique au nom d'utilisateur"
                    }
                }
            },
            passwordConfirmation: {
                validators: {
                    notEmpty: {
                        message: "Le mot de passe est requis"
                    },
                    identical: {
                        field: 'password',
                        message: "Les deux mots de passe ne correspondent pas"
                    }
                }
            },
        }
    });
});