class SplashController < ApplicationController

	def index

		@errors = {}

		if session[:user]
			redirect_to '/dashboard/'
		else
			render 'index',layout: 'splash'
		end

	end

	def create

		if params[:login] == 'true'

			call = db.APICall path: '/login',method: 'GET',username: params[:email],password: params[:password]

			if call[:code] == 200

				session[:user] = {
					username: call[:body]['username'],
					email: call[:body]['email'],
					email_list: params['email_list'],
					gamertag: call[:body]['gamertag'],
					objectId: call[:body]['objectId'],
					sessionToken: call[:body]['sessionToken']
				}

				if params[:zendesk] == 'true'

					redirect_to "/api/v1/sso/zendesk?return_to=#{ params[:return_to]}"

				else

					redirect_to root_url

				end
	
			else
	
				@errors = call[:body]
	
				render json: @errors
	
			end

		else

			call = db.APICall path: '/users',method: 'POST',payload: {gamertag: params[:gamertag],username: params[:email],email: params[:email],password: params[:password],email_list: params[:email_list]}

			if call[:code] == 201
				
				session[:user] = {
					username: params['email'],
					email: params['email'],
					email_list: params['email_list'],
					gamertag: params['gamertag'],
					objectId: call[:body]['objectId'],
					sessionToken: call[:body]['sessionToken']
				}

				if params[:zendesk] == 'true'

					redirect_to "/api/v1/sso/zendesk?return_to=#{ params[:return_to]}"

				else

					redirect_to '/dashboard/'

				end
	
			else
	
				@errors = call[:body]
	
				render 'index',layout: 'splash'
	
			end

		end

	end

end