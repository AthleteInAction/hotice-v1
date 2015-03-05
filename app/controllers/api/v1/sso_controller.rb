module Api
  module V1
  	class SsoController < ApplicationController

  		def zendesk

  			if session[:user]

  				zendesk = {
					email: session[:user]['email'],
					name: session[:user]['gamertag'],
					external_id: session[:user]['objectId'],
					iat: Time.now.to_i,
					jti: rand(2<<64).to_s
				}

				jwt = JWT.encode zendesk,'iVfLWW4F58STWWC7Se84Oa5CcjVTf6y59uq9Yx4rcmTsO6sG'

				redirect_to "https://hotice1.zendesk.com/access/jwt?jwt=#{jwt}&return_to=#{params[:return_to]}"
				final = {
					params: params,
					zd: zendesk,
					jwt: jwt
				}
				# render json: final

  			else

  				redirect_to "/?return_to=#{ params[:return_to]}&zendesk=true&iat=#{params[:timestamp]}"
  				# render json: params

  			end

		end

		def test

			render json: params

		end

	end
  end
end