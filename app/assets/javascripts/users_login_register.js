//= require jquery

$(document).ready(function(){
    $("body")
        .on("submit", "#register_form", submitRegisterForm)
        .on("submit", "#login_form", submitLoginForm)
        .on("focus", "p", function(){
            /** Remove error class on selected input field and hide all error messages */
            $(this).find("input").removeClass("error");
            $(".error_msg").addClass("hidden");
        });
});

/** DOCU: Function to submit register form
 * Triggered by: .on("submit", "#register_form", submitRegisterForm)
 */
function submitRegisterForm(){
    let register_form           = $(this);
    let email_input             = $("#register_email_input");
    let first_name_input        = $("#first_name_input");
    let last_name_input         = $("#last_name_input");
    let password_input          = $("#register_password_input");
    let confirm_password_input  = $("#confirm_password_input");

    if(register_form.attr("data-is_processing") === "0"){
        register_form.attr("data-is_processing", "1");

        $.post(register_form.attr("action"), register_form.serialize(), function(register_response){
            if(register_response.status){
                window.location.href = "/main";
            }
            else{
                /** Set input errors in error state if specified in error object */
                /** For email */
                if(register_response.error.email || email_input.val() === ""){
                    email_input.addClass("error");
                    $("#register_email_error_msg").removeClass("hidden").text(register_response.error.email || "");
                }

                /** For first_name */
                if(register_response.error.first_name || first_name_input.val() === ""){
                    first_name_input.addClass("error");
                    $("#first_name_error_msg").removeClass("hidden").text(register_response.error.first_name || "");
                }

                /** For last_name */
                if(register_response.error.last_name || last_name_input.val() === ""){
                    last_name_input.addClass("error");
                    $("#last_name_error_msg").removeClass("hidden").text(register_response.error.last_name || "");
                }

                /** For password */
                if(register_response.error.password || password_input.val() === ""){
                    password_input.addClass("error");
                    $("#register_password_error_msg").removeClass("hidden").text(register_response.error.password || "");
                }

                /** For confirm_password */
                if(register_response.error.confirm_password || confirm_password_input.val() === ""){
                    confirm_password_input.addClass("error");
                    $("#confirm_password_error_msg").removeClass("hidden").text(register_response.error.confirm_password || "");
                }

                /** For exception errors */
                if(register_response.error.exception && !register_response.error.exception.match(/param/gi)){
                    alert(register_response.error.exception);
                }
            }

            register_form.attr("data-is_processing", "0");
        }, "json");
    }

    return false;
}

/** DOCU: Function to submit login form
 * Triggered by: .on("submit", "#login_form", submitLoginForm)
 */
function submitLoginForm(){
    let login_form = $(this);

    if(login_form.attr("data-is_processing") === "0"){
        login_form.attr("data-is_processing", "1");

        $.post(login_form.attr("action"), login_form.serialize(), function(login_response){
            if(login_response.status){
                window.location.href = "/main";
            }
            else{
                /** Set email and password to error state */
                $("#login_email_input").addClass("error");
                $("#login_password_input").addClass("error");

                /** Set error message if any and the error is not missing parameter/s */
                if(login_response.error && !login_response.error.match(/param/gi)){
                    $("#login_error_msg").removeClass("hidden").text(login_response.error || "");
                }
            }

            login_form.attr("data-is_processing", "0")
        }, "json");
    }

    return false;
}