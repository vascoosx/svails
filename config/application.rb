# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Svails
  class Application < Rails::Application
    config.load_defaults 6.0

    config.npm.install = ['npm install']
    config.npm.build = ['npm run build']
    config.npm.watch = ['cd svelte_js && rollup -c -w']

    config.npm.install_on_rails_server = false
  end
end
