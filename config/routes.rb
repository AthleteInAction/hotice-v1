Rails.application.routes.draw do

  root 'splash#index'

  resources :users

  post '/', to: 'splash#create'

  get '/signin', to: 'sessions#index'
  post '/signin', to: 'sessions#signin'

end