Rails.application.routes.draw do
  resources :locations
  namespace :api, defaults: { format: :json } do
    resources :photos
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
