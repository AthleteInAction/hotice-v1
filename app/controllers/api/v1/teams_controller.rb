module Api
  module V1
  	class TeamsController < ApplicationController

  		def index

  			call = db.APICall path: '/classes/Teams',where: {}.to_json

  			render json: call

  		end

  		def create

  			call = db.APICall path: '/classes/Teams',method: 'POST',payload: params[:team]

  			render json: call

  		end

  	end
  end
end