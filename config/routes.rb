Rails.application.routes.draw do

  root 'splash#index'

  resources :users
  resources :sessions

  post '/', to: 'splash#create'

  get '/dashboard', to: 'dashboard#index'

  get '/signout', to: 'sessions#destroy'

end