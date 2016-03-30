require "envoker/rack"

Envoker::Rack.load

module Settings
  def self.fetch(key)
    return ENV.fetch(key) do
      raise(sprintf("ENV[%p] not found", key))
    end
  end

  RACK_ENV = fetch("RACK_ENV")
end