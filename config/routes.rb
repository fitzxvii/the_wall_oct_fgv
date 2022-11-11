Rails.application.routes.draw do
    # Users Controller
    root "users#login_register"

    post "/register" => "users#register"
    post "/login"    => "users#login"

    get "/logout"    => "users#logout"

    # Messages Controller
    get "/main"     => "messages#index"

    post "/post_message" => "messages#create_message"
    post "/delete_message" => "messages#delete_message"

    # Comments Controller
    post "/post_comment" => "comments#create_comment"
    post "/delete_comment" => "comments#delete_comment"
end
