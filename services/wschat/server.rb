require 'faye/websocket'
#require "cgi"
#require 'rack/utils'

Faye::WebSocket.load_adapter('thin')

module Web
  class Socket
    PING_FREQUENCY = 15
    MAX_LENGTH = 800

    def initialize(app)
      @app     = app
      @users = []
    end

    def call(env)
    	if Faye::WebSocket.websocket?(env)
    		ws = Faye::WebSocket.new(env, nil, { max_length: MAX_LENGTH, ping: PING_FREQUENCY })
    		ws.on :open do |event|
    			#p :open
    			@users << ws
    		end

    		ws.on :message do |event|
    			#p [:message, event.data]
    			@users.each do |user|
                    #CGI::escape_element(event.data)
                    #Rack::Utils.escape_html(event.data)
    				user.send(event.data)
    			end
    		end

            ws.on :error do |event|
                @users.each do |user|
                    user.send("Bad data sent by peer")
                end
            end 

    		ws.on :close do |event|
    			#p [:close, event.code, event.reason]
    			@users.delete(ws)
    			ws = nil
    		end
    		ws.rack_response
    	else
    		@app.call(env)
    	end
    end
  end
end