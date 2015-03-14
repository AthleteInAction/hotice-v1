module Api
  module V1
  	class RelationsController < ApplicationController

  		def index

        render json: params

      end

      def create

        call = db.APICall method: 'POST',path: '/classes/Relations',payload: params[:relation]

        render json: call,status: call[:code].to_i

      end

      def update

        call = db.APICall method: 'PUT',path: "/classes/Relations/#{params[:id]}",payload: params[:relation]

        render json: call,status: call[:code].to_i

      end

      def destroy

        call = db.APICall method: 'DELETE',path: "/classes/Relations/#{params[:id]}"

        render json: call,status: call[:code]

      end

  	end
  end
end