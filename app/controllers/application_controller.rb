class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    # DOCU: Return to main manuis user accesses the login-register page again
    # Triggered by: before_action
    def is_user_available?
        redirect_to "/" if !session[:user_id].present?
    end
end
