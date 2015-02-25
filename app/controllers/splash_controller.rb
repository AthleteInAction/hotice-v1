class SplashController < ApplicationController

	def index

		render json: {test: true}

	end

end