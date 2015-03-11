class VerifyController < ApplicationController

	def verify_email

		render layout: 'splash'

	end

	def reset_password

		render layout: false

	end

	def password_changed

		render layout: false		

	end

	def email_verified

		render layout: false

	end

	def invalid_link

		render layout: false

	end

end