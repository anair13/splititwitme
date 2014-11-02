class StaticPagesController < ApplicationController
  def index
  	render :file => 'app/views/static_pages/index.html.erb', :layout => false
  end

  def app
  end

end
