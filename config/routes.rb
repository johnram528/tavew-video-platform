Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #users controller is pending
  namespace :api do
    # resources :users do
      resources :videos
    # end
  end

  get '*path', to: 'static#index'
end
