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

				jwt = JWT.encode zendesk,SHARED_SECRET

				redirect_to "https://#{ZENDESK_DOMAIN}.zendesk.com/access/jwt?jwt=#{jwt}&return_to=#{params[:return_to]}"
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

			json = JSON.parse '{"Bridgestone Arena":{"lat":36.15917,"long":-86.77861,"team":"Nashville Predators"},"Canadian Tire Centre":{"lat":45.29694,"long":-75.92722,"team":"Ottawa Senators"},"American Airlines Center":{"lat":32.79056,"long":-96.81028,"team":"Dallas Stars"},"BB&T Center (Sunrise, Florida)":{"lat":26.15833,"long":-80.32556,"team":"Florida Panthers"},"Bell Centre":{"lat":45.49611,"long":-73.56944,"team":"Montreal Canadiens"},"Air Canada Centre":{"lat":43.64333,"long":-79.37917,"team":"Toronto Maple Leafs"},"First Niagara Center":{"lat":42.875,"long":-78.87639,"team":"Buffalo Sabres"},"Consol Energy Center":{"lat":40.43944,"long":-79.98917,"team":"Pittsburgh Penguins"},"Jobing.com Arena":{"lat":33.53194,"long":-112.26111,"team":"Phoenix Coyotes"},"MTS Centre":{"lat":49.89278,"long":-97.14361,"team":"Winnipeg Jets"},"Honda Center":{"lat":33.80778,"long":-117.87667,"team":"Anaheim Ducks"},"Joe Louis Arena":{"lat":42.32528,"long":-83.05139,"team":"Detroit Red Wings"},"Nassau Veterans Memorial Coliseum":{"lat":40.72278,"long":-73.59056,"team":"New York Islanders"},"Pepsi Center":{"lat":39.74861,"long":-105.0075,"team":"Colorado Avalanche"},"Nationwide Arena":{"lat":39.9692833,"long":-83.0061111,"team":"Columbus Blue Jackets"},"Rexall Place":{"lat":53.57139,"long":-113.45611,"team":"Edmonton Oilers"},"PNC Arena":{"lat":35.80333,"long":-78.72194,"team":"Carolina Hurricanes"},"Rogers Arena":{"lat":49.27778,"long":-123.10889,"team":"Vancouver Canucks"},"Scotiabank Saddledome":{"lat":51.0375,"long":-114.05194,"team":"Calgary Flames"},"SAP Center at San Jose":{"lat":37.33278,"long":-121.90111,"team":"San Jose Sharks"},"Prudential Center":{"lat":40.73361,"long":-74.17111,"team":"New Jersey Devils"},"Scottrade Center":{"lat":38.62667,"long":-90.2025,"team":"St. Louis Blues"},"Tampa Bay Times Forum":{"lat":27.94278,"long":-82.45194,"team":"Tampa Bay Lightning"},"Staples Center":{"lat":34.04306,"long":-118.26722,"team":"Los Angeles Kings"},"Madison Square Garden":{"lat":40.75056,"long":-73.99361,"team":"New York Rangers"},"United Center":{"lat":41.88056,"long":-87.67417,"team":"Chicago Blackhawks"},"Xcel Energy Center":{"lat":44.94472,"long":-93.10111,"team":"Minnesota Wild"},"Wells Fargo Center":{"lat":39.90111,"long":-75.17194,"team":"Philadelphia Flyers"},"Verizon Center":{"lat":38.89806,"long":-77.02083,"team":"Washington Capitals"},"TD Garden":{"lat":42.3663028,"long":-71.0622278,"team":"Boston Bruins"}}'

			test = []
			json.each do |key,item|

				# call = db.APICall path: '/classes/Teams',method: 'POST',payload: {name: item['team'],name_i: item['team'].to_s.downcase}
				test << item['team']

			end

			render json: test

		end

	end
  end
end