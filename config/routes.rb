Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions'
  }

  root 'pages#index'

  namespace :api do
    namespace :v1 do
      get '/self_info', to: 'users#self_info'
    end
  end

  get '*path', to: 'pages#index'
end
