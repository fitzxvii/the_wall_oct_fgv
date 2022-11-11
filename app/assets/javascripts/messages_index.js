//= require jquery

$(document).ready(function(){
    $("body")
        .on("submit", "#create_message_form", createMessage)
        .on("submit", ".delete_message_form", submitDeleteMessageForm)
        .on("submit", ".create_comment", createComment)
        .on("submit", ".delete_comment_form", submitDeleteCommentForm);
});

/** DOCU: Function to submit create message form
 * Triggered by: .on("submit", "#create_message_form", createMessage)
 */
function createMessage(){
    let create_message_form = $(this);

    if(create_message_form.attr("data-is_processing") === "0"){
        create_message_form.attr("data-is_processing", "1");

        $.post(create_message_form.attr("action"), create_message_form.serialize(), function(message_data){
            if(message_data.status){
                create_message_form.find("textarea").val("");
                $("#messages-comments").prepend(message_data.result);
            }
            else{
                alert(message_data.error);
            }

            create_message_form.attr("data-is_processing", "0");
        }, "json");
    }

    return false;
}

/** DOCU: Function to delete a message
 * Triggered by: .on("submit", ".delete_message_form", submitDeleteMessageForm)
 */
function submitDeleteMessageForm(){
    let delete_message_form = $(this);

    if(confirm("Are you sure you want to delete this message?")){
        if(delete_message_form.attr("data-is_processing") === "0"){
            delete_message_form.attr("data-is_processing", "1");

            $.post(delete_message_form.attr("action"), delete_message_form.serialize(), function(message_data){
                if(message_data.status){
                    $("#messages-comments").find("#message_"+message_data.result).remove();
                }
                else{
                    alert(message_data.error);
                }

                delete_message_form.attr("data-is_processing", "0");
            }, "json")
        }
    }

    return false;
}

/** DOCU: Function to submit create comment form
 * Triggered by: on("submit", ".create_comment", createComment)
 */
function createComment(){
    let create_comment_form = $(this);

    if(create_comment_form.attr("data-is_processing") === "0"){
        create_comment_form.attr("data-is_processing", "1");

        $.post(create_comment_form.attr("action"), create_comment_form.serialize(), function(comment_data){
            if(comment_data.status){
                create_comment_form.find("textarea").val("");
                $("#comment_list_"+comment_data.result.message_id).prepend(comment_data.result.html);
            }
            else{
                alert(comment_data.error);
            }

            create_comment_form.attr("data-is_processing", "0");
        }, "json")
    }

    return false;
}

/** DOCU: Function to delete a comment
 * Triggered by: .on("submit", ".delete_comment_form", submitDeleteCommentForm)
 */
function submitDeleteCommentForm(){
    let delete_comment_form = $(this);

    if(confirm("Are you sure you want to delete this comment?")){
        if(delete_comment_form.attr("data-is_processing") === "0"){
            delete_comment_form.attr("data-is_processing", "1");

            $.post(delete_comment_form.attr("action"), delete_comment_form.serialize(), function(comment_data){
                if(comment_data.status){
                    $("#comment_"+comment_data.result).remove();
                }
                else{
                    alert(comment_data.error);
                }

                delete_comment_form.attr("data-is_processing", "0");
            }, "json")
        }
    }

    return false;
}