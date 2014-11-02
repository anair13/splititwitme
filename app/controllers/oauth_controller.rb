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

def get_user_authorization(redirect_uri)
    # Redirects user to Venmo authorization page
    # Returns the user back to redirect_uri when finished
    client_id = "2071"
    scopes = "make_payments"
    response_type = "code"
    redirect_to "https://api.venmo.com/v1/oauth/authorize?client_id=" + client_id + "&scope=" + scopes + "&response_type=" + response_type + "&redirect_uri=" + redirect_uri
end
