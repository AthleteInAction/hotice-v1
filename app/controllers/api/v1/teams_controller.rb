module Api
  module V1
  	class TeamsController < ApplicationController

  		def index

  			call = db.APICall path: '/classes/teams'

  			render json: call

  		end

  		def create

  			render json: call

  		end

  	end
  end
end