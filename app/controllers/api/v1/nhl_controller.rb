module Api
  module V1
  	class NhlController < ApplicationController

  		def scores

        static = true

        path = "#{Rails.root}/log/scores.jsonp"

        lastGetPath = "#{Rails.root}/log/scoreTime.txt"
        lastGet = File.read(lastGetPath).to_i

        now = Time.now.to_i

        diff = now - lastGet

        if diff > 600# || true # 10 minutes

          static = false

          jsonp = Request.get('http://live.nhle.com/GameData/RegularSeasonScoreboardv3.jsonp')

          if jsonp[:code] == 200

            new_json = jsonp[:body].force_encoding("UTF-8")

            File.open path,'w+' do |f|

              f.write new_json

            end

            File.open lastGetPath,'w+' do |f|

              f.write Time.now.to_i.to_s

            end

          end

        end

        json = File.read path
        json = JSON.parse json.to_s.gsub('loadScoreboard(','').gsub(')','')

        final = []

        json['games'].each_with_index do |game,i|

          final << game if i >= json['startIndex'].to_i

        end

        render json: {scores: final,static: static,diff: diff}

  		end

  		def headlines

  			# http://www.nhl.com/rss/news.xml

  		end

  	end
  end
end