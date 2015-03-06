module Api
  module V1
  	class TeamsController < ApplicationController

  		def index

  			call = db.APICall path: '/classes/Teams',where: params[:constraints]

  			render json: call

  		end

  		def create

        params[:team][:name_i] = params[:team][:name].to_s.downcase

  			call = db.APICall path: '/classes/Teams',method: 'POST',payload: params[:team]

  			render json: call

  		end

  	end
  end
end