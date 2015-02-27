class SplashController < ApplicationController

	def index

		@errors = {}

		# users_query = Parse::Query.new '_User'
		# users_query.eq("objectId", "EvIBRX0Qds")
		# users = users_query.get

		# render json: users

	end

	def create

		call = dev_db.APICall path: '/users',method: 'POST',payload: {gamertag: params[:gamertag],username: params[:email],email: params[:email],password: params[:password]}

		if call[:code] == 201

			render json: call[:body],status: call[:code]

		else

			@errors = call[:body]

			render 'index'

		end

	end

end