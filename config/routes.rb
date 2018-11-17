Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope :api do
      get "/place", to: "places#index"
      get "/field/:id" => "fields#find"
      get "/field/:id/promos" => "promos#promos"
      get "/field/:id/events" => "events#events"
      post "/login" => "sessions#create"
      get "/logout" => "sessions#destroy"
      post "/checkout" => "checkout#checkout"
      get "/checkout/new_token" => "checkout#new_token"
  end

  root to: "pages#home"
  get "/login", to: "pages#home"
  get "/field", to: "pages#home"
end
