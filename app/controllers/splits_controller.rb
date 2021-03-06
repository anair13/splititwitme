require 'oauth_controller'
require 'oauth_data'

class SplitsController < ApplicationController
  before_action :set_split, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
  protect_from_forgery :except => :create

  # GET /splits
  # GET /splits.json
  def index
    @splits = Split.all
  end

  # GET /splits/1
  # GET /splits/1.json
  def show
  end

  # GET /splits/new
  def new
    @split = Split.new
  end

  # GET /splits/1/edit
  def edit
  end

  # POST /splits
  # POST /splits.json
  def create
    # this is where the main logic goes
    @split = Split.new(split_params)

    params = json_to_transaction_params(@split.data)
    puts(params)
    code = params["code"]
    raw_payees = params["payees"]
    raw_charges = params["charges"]

    # access_token is the acces token corresponding to the master user
    # master_username is the username of the master user
    access_token, master_username = get_access_token_and_user_id(OAuthData.client_id, code, OAuthData.client_secret)

    # TODO: do actual math here and remove current user
    #master_payee_index = raw_payees.index(master_username)
    #new_payees = raw_payees.delete_at(master_payee_index)
    #new_charges = raw_charges.delete_at(master_payee_index)
    new_payees = raw_payees
    new_charges = raw_charges

    make_transactions(access_token, new_payees, new_charges)

    respond_to do |format|
      if @split.save
        format.html { redirect_to @split, notice: 'Split was successfully created.' }
        format.json { render :show, status: :created, location: @split }
      else
        format.html { render :new }
        format.json { render json: @split.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /splits/1
  # PATCH/PUT /splits/1.json
  def update
    respond_to do |format|
      if @split.update(split_params)
        format.html { redirect_to @split, notice: 'Split was successfully updated.' }
        format.json { render :show, status: :ok, location: @split }
      else
        format.html { render :edit }
        format.json { render json: @split.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /splits/1
  # DELETE /splits/1.json
  def destroy
    @split.destroy
    respond_to do |format|
      format.html { redirect_to splits_url, notice: 'Split was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_split
      @split = Split.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def split_params
      params.require(:split).permit(:data)
    end
end
