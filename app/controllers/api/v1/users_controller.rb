module Api
  module V1
  	class UsersController < ApplicationController

  		def index

  			call = db.APICall path: '/users',where: params[:constraints]

  			render json: call

  		end

  	end
  end
end