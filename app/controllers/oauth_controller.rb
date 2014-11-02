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
    uri = URI("https://api.venmo.com/v1/oauth/payments")
    for (payee, charge) in payees.zip(charges)
        res = Net::HTTP.post_form(uri,
            'access_token' => access_token,
            'user_id'      => payee,
            'note'         => "Thanks for the money, suckers!",
            'amount'       => charge,
            'audience'     => "private"
        )
    end
end

def get_access_token_and_user_id(client_id, code, client_secret)
    # Takes a client_id, code (from get_user_authorization) and client_secret
    # and returns an [access_token, user_id] pair that can be used with venmo API calls
    uri = URI("https://api.venmo.com/v1/oauth/access_token")
    res = Net::HTTP.post_form(uri,
        'client_id'     => client_id,
        'code'          => code,
        'client_secret' => client_secret
    )
    return [res["access_token"]] + [res["username"]]
end
