require "bundler/setup"
require "cuba"
require "cuba/render"
require "ment"

require_relative "config/encoding"
require_relative "config/settings"

Cuba.plugin(Cuba::Render)
Cuba.settings[:render][:template_engine] = "haml"
Cuba.plugin(Ment)

Dir["./models/**/*.rb"].each  { |f| require(f) }
Dir["./services/**/*.rb"].each  { |f| require(f) }
Dir["./helpers/**/*.rb"].each  { |f| require(f) }
Dir["./routes/**/*.rb"].each  { |f| require(f) }

Cuba.use(Web::Socket)

Cuba.use(
  Rack::Static,
  urls: %w(/js /css /img),
  root: "./public"
)

Cuba.plugin(ApplicationHelpers)

Cuba.define do
  on get do
    on "chat" do
      render "chat", {}, "chat_layout"
    end

    on root do
      res.redirect "/chat"
    end
  end
end