Rails.application.routes.draw do

  root 'splash#index'

  resources :users
  resources :sessions
  resources :teams

  post '/', to: 'splash#create'

  get '/dashboard', to: 'dashboard#index'

  get '/signout', to: 'sessions#destroy'

  # API
  # ////////////////////////////////////////////////////////////////
  # ////////////////////////////////////////////////////////////////
  namespace :api do
  	namespace :v1 do
        
    	resources :users
    	resources :teams
      resources :notifications
      resources :online
      resources :events

      namespace :zendesk do

        resources :articles

      end

      get 'nhl/scores',to: 'nhl#scores'
      get 'nhl/headlines',to: 'nhl#headlines'

      get 'sso/zendesk' => 'sso#zendesk'
      get 'sso/test' => 'sso#test'

    end
  end
  # ////////////////////////////////////////////////////////////////
  # ////////////////////////////////////////////////////////////////

  # AngularJS Templates
  # ////////////////////////////////////////////////////////////////
  # ////////////////////////////////////////////////////////////////
  get "angularjs/templates/:template" => 'templates#load_template'
  get 'angularjs/components/:template' => 'templates#component_template'
  # ////////////////////////////////////////////////////////////////
  # ////////////////////////////////////////////////////////////////

end