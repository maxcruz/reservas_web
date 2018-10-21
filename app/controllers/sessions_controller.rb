class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            user_response = { email: user.email }
            render json: { email: user.email }, status: :ok
        else
            render json: {}, status: :unauthorized
        end
    end

    def destroy
        session[:user_id] = nil
        render json: {}, status: :ok
    end

end
