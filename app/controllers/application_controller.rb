require 'jwt'

class ApplicationController < ActionController::Base
    
    protect_from_forgery with: :null_session, unless: -> { request.format.json? }

    def current_user
        begin
          decoded_token = JWT.decode bearer_token, nil, false
          @current_user ||= User.find_by(id: decoded_token.first["id"]) if decoded_token.first["id"]
        rescue JWT::DecodeError
          @current_user = nil
        end
    end

    helper_method :current_user

    def authorize
        puts current_user
        render body: nil, status: :unauthorized unless current_user
    end

    def bearer_token
      pattern = /^Bearer /
      header  = request.headers['Authorization']
      header.gsub(pattern, '') if header && header.match(pattern)
    end
end
