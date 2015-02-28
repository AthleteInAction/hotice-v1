class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def dev_db
    result = ParseAPI::Connect.new application_id: 'pTgNnmnQSpIeZrFHrzWhdEHBsQpUJPiiFemsbUme',rest_key: 'X4YzW6g7pAq60pJCTAsQ3lfyOEQuEl1yznPLgixr'
  end
  helper_method :dev_db

  def current_user
    session[:user]
  end
  helper_method :current_user

  def authorize
    redirect_to login_url, alert: "Not authorized" if session[:user].nil?
  end

end