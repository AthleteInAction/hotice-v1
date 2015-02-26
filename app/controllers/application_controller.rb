class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  Parse.init application_id: 'pTgNnmnQSpIeZrFHrzWhdEHBsQpUJPiiFemsbUme',
           	 api_key: 'X4YzW6g7pAq60pJCTAsQ3lfyOEQuEl1yznPLgixr',
           	 quiet: true

end