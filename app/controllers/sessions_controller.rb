class SessionsController < ApplicationController

    def create
        user = User.find_by(params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render body: nil, status: :ok
        else
            render body: nil, status: :unauthorized
        end
    end

    def destroy
        session[:user_id] = nil
        render body: nil, status: :ok
    end

end
