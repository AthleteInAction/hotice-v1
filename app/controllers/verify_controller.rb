class VerifyController < ApplicationController

	def verify_email

		render layout: 'splash'

	end

	def reset_password

		render layout: false

	end

	def reset_password_do

		call = db.APICall method: 'POST',path: '/requestPasswordReset',payload: {email: params[:email]}

		render json: call

	end

	def password_changed

		render layout: 'splash'

	end

	def email_verified

		render layout: false

	end

	def invalid_link

		render layout: 'splash'

	end

end