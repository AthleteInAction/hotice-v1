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

        invite = {
          type: :team,
          userId: ''
        }

        invities = []
        requests = []
        params[:team][:invited][:objects].each do |user|

          request = {
            method: 'POST',
            path: '/1/classes/Notifications',
            body: {
              type: 'team',
              status: 'pending',
              relatedId: call[:body]['objectId'],
              userId: {
                __type: 'Pointer',
                className: '_User',
                objectId: user[:objectId]
              },
              message: "<span class=\"ruby_highlight\">#{params[:team][:name]}</span> invited you to join their team."

            }
          }

          requests << request# if user[:objectId] != session[:user]['objectId']

        end

        batch = db.APICall path: '/batch',method: 'POST',payload: {requests: requests}

  			render json: {call: call,batch: batch}

  		end

      def show

        call = db.APICall path: '/classes/Teams',where: {objectId: params[:id]}.to_json

        render json: call

      end

  	end
  end
end