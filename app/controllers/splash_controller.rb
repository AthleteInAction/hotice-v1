class SplashController < ApplicationController

	def index

		@errors = {}

		if session[:user]
			redirect_to '/dashboard'
		else
			render 'index',layout: 'splash'
		end

	end

	def create

		if params[:login] == 'true'

			call = dev_db.APICall path: '/login',method: 'GET',username: params[:email],password: params[:password]

			if call[:code] == 200

				session[:user] = {
					username: call[:body]['username'],
					email: call[:body]['email'],
					gamertag: call[:body]['gamertag'],
					objectId: call[:body]['objectId'],
					sessionToken: call[:body]['sessionToken']
				}

				redirect_to root_url
	
			else
	
				@errors = call[:body]
	
				render json: @errors
	
			end

		else

			call = dev_db.APICall path: '/users',method: 'POST',payload: {gamertag: params[:gamertag],username: params[:email],email: params[:email],password: params[:password]}

			if call[:code] == 201
	
				render json: call[:body],status: call[:code]
	
			else
	
				@errors = call[:body]
	
				render 'index',layout: 'splash'
	
			end

		end

	end

end