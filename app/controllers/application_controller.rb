class ApplicationController < ActionController::Base

	require 'ParseAPI'

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Parse.init application_id: 'pTgNnmnQSpIeZrFHrzWhdEHBsQpUJPiiFemsbUme',
  #          	 api_key: 'X4YzW6g7pAq60pJCTAsQ3lfyOEQuEl1yznPLgixr',
  #          	 quiet: false

  private

  def dev_db
    result = ParseAPI::Connect.new application_id: 'pTgNnmnQSpIeZrFHrzWhdEHBsQpUJPiiFemsbUme',rest_key: 'X4YzW6g7pAq60pJCTAsQ3lfyOEQuEl1yznPLgixr'
  end
  helper_method :dev_db

end