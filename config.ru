require 'rack/jekyll'

run Rack::Jekyll.new

use Rack::Auth::Basic do |username, password|
  username == "webrtcconfjapan" && password == "2016"
end
