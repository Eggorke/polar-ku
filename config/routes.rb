Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions'
  }

  root 'pages#index'

  namespace :public do
    resources :organizations, only: %i[index]
  end

  namespace :api do
    namespace :v1 do
      get '/self_info', to: 'users#self_info'
    end
  end

  get '*path', to: 'pages#index'
end
