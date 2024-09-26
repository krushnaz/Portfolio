$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Handle any submission errors here if needed
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            // Initialize EmailJS
            emailjs.init("sRVt-vSMRsyDi3DgN"); // Your EmailJS User ID

            var templateParams = {
                from_name: name,
                to_name: email, // Change to the actual recipient's name or fetch dynamically if needed
                subject: subject,
                message: message
            };

            // Send the email
            emailjs.send('service_y1kcwy9', 'template_9c98jch', templateParams) // Replace with your service ID and template ID
                .then(function(response) {
                    // Show success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent successfully!</strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset"); // Reset the form fields
                }, function(error) {
                    // Show error message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset"); // Reset the form fields
                });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    // Tab functionality
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// Clear success messages when the user focuses on the name field
$('#name').focus(function () {
    $('#success').html('');
});
