require 'rubygems'
require 'json'

def json_to_transaction_params(json)
    return JSON.parse(json)
end

def make_transactions(access_token, payees, charges)
    # Performs transactions

    # Args:
    # access_token -- oauth token for the user received from get_user_authorization()
    # payees       -- array of user ids to pay / charge
    # charges      -- array of amounts to pay / charge (charges are negative)
    for (payee, charge) in payees.zip(charges)
        email = payee
        note = "Thanks! Processed successfully through splitwitme."
        amount = charge
        audience = "private"
        resp = `curl -X POST -d "access_token=#{access_token}&email=#{email}&note=#{note}&amount=#{amount}&audience=#{audience}" "https://api.venmo.com/v1/payments"`
        puts(resp)
    end
end

def get_access_token_and_user_id(client_id, code, client_secret)
    # Takes a client_id, code (from get_user_authorization) and client_secret
    # and returns an [access_token, user_id] pair that can be used with venmo API calls
    resp = JSON.parse(`curl -X POST -d "client_id=#{client_id}&code=#{code}&client_secret=#{client_secret}" "https://api.venmo.com/v1/oauth/access_token"`)
    puts([resp["access_token"]] + [resp["username"]])
    return [resp["access_token"]] + [resp["username"]]
end
