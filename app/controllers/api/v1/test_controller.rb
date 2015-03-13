module Api
  module V1
  	class TestController < ApplicationController

  		def index

  			test = {
  				team: {
  					'__type' => 'Pointer',
  					'className' => 'Teams',
  					'objectId' => 'wmEe1BrJjy'
  				}
  			}

  			call = db.APICall path: '/classes/Admins',where: test.to_json,include: 'team,user'

        	render json: call

      end

  	end
  end
end