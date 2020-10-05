# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'actionview', '>= 6.0.2.2'
gem 'actionpack', '>= 6.0.3.2'
gem 'activestorage', '>= 6.0.3.1'
gem 'activesupport', '>= 6.0.3.1'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'jbuilder', '~> 2.7'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3'
gem 'rack', '>= 2.2.3'
gem 'rails', '~> 6.0.3'
gem 'sass-rails', '>= 6'

# for svelte
gem 'npm-pipeline-rails', github: 'vascoosx/npm-pipeline-rails'
gem 'sprockets', '~> 4.0'
gem 'external_asset_pipeline'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
