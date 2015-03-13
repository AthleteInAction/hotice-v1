module Api
  module V1
  	class TeamsController < ApplicationController

  		def index

  			call = db.APICall path: '/classes/Relations',where: {type: 'team'}.to_json,include: 'team,user'

  			render json: call

  		end

  		def create

        params[:team][:name_i] = params[:team][:name].to_s.downcase

  			call_1 = db.APICall path: '/classes/Teams',method: 'POST',payload: params[:team]

        r = {
          team: {
            '__type' => 'Pointer',
            'className' => 'Teams',
            'objectId' => call_1[:body]['objectId']
          },
          user: params[:team][:creator],
          type: 'team',
          admin: true
        }

        call_2 = db.APICall path: '/classes/Relations',method: 'POST',payload: r

  			render json: {call_1: call_1,call_2: call_2}

  		end

      def show

        call = db.APICall path: '/classes/Relations',where: {type: 'team',team: {'__type' => 'Pointer','className' => 'Teams','objectId' => params[:id]}}.to_json,include: 'team,user'

        render json: call

      end

  	end
  end
end