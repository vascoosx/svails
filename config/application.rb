# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

require 'external_asset_pipeline/railtie'

Bundler.require(*Rails.groups)

module Svails
  class Application < Rails::Application
    config.load_defaults 6.0

    config.npm.install = ['npm install']
    config.npm.build = ['npm run build']
    config.npm.watch = ['npm run watch', 'cd svelte_js && npm run dev']

    config.npm.install_on_rails_server = false
    config.external_asset_pipeline.fall_back_to_sprockets = true
  end
end
