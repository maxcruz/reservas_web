require 'jwt'

class SessionsController < ApplicationController

    def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
            payload = {
              id: user.id,
              email: user.email
            }
            token = JWT.encode payload, nil, 'none'
            render json: { email: user.email, token: token }, status: :ok
        else
            render json: {}, status: :unauthorized
        end
    end

    def destroy
        session[:user_id] = nil
        render json: {}, status: :ok
    end

end
