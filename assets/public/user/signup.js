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
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

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

    
    $('#signupForm')
        .bootstrapValidator({
            message: 'Ce champs est invalide',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            submitHandler: function(validator, form, submitButton) {
                alert("test");
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
                }
            }
        })
        .find('button[data-toggle]')
            .on('click', function() {
                var $target = $($(this).attr('data-toggle'));
                alert("test");
        });
});