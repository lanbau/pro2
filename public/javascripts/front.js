$(document).ready(function () {
    var lock = new Auth0Lock(
        // These properties are set in auth0-variables.js
        AUTH0_CLIENT_ID,
        AUTH0_DOMAIN
    );

    var userProfile

    document.getElementById('btn-login').addEventListener('click', function () {
      lock.show(function (err, profile, token) {
        if (err) {
          // Error callback
          console.error("Something went wrong: ", err);
          alert("Something went wrong, check the Console errors");
        } else {
          // Success calback

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          document.getElementById('login-box').style.display = 'none';
          document.getElementById('logged-in-box').style.display = 'inline';

          document.getElementById('nick').textContent = profile.nickname;
        }
      });
    });

    document.getElementById('btn-api').addEventListener('click', function () {
        document.getElementById('top').style.display = 'none';
        document.getElementById('logged-in-box').style.display = 'none';
        document.getElementById('wrapper').style.display = 'inline-block';
        console.log(userProfile.identities[0].access_token)
        var at = userProfile.identities[0].access_token
        FB.getLoginStatus(function (response) {
          console.log(response)
          if (response.status === 'connected') {
            var adnum
            var adstring
            FB.api('/me', {fields: 'adaccounts'}, function (response) {
              console.log(response)
              adnum = response.adaccounts.data[0].account_id
              adstring = '/act_'+ adnum +'/campaigns'
              console.log(adstring)
              FB.api(
                adstring,
                'GET',
                {"fields":"id,name,start_time,effective_status"},
                function(response) {
                    // Insert your code here
                    console.log(response)
                    console.log(response.data)
                    var arr = response.data
                    arr.forEach(function(obj){
                      console.log(obj)
                      var tabl = document.getElementById('tabl')
                      var thead = document.createElement('thead')
                      var tbody = document.createElement('tbody')
                      var row = document.createElement('tr')

                      var tr = document.createElement('tr')
                      // Table Cell
                      var leftRow = document.createElement('td')
                      leftRow.innerHTML = "Name"
                      tr.appendChild(leftRow)
                      var rightRow = document.createElement('td')
                      rightRow.innerHTML = "Value"
                      tr.appendChild(rightRow)
                      thead.appendChild(tr)
                      tabl.appendChild(thead)
                      // Add the table rows
                      // use for of 
                      // Object.keys(obj).forEach(...)
                      // for (const [key, val] of Object.entries(obj)) { ... }
                      for (var name in obj) {
                          var value = obj[name];
                          var tr = document.createElement('tr');
                          var leftRow = document.createElement('td');
                          leftRow.innerHTML = name;
                          tr.appendChild(leftRow);
                          var rightRow = document.createElement('td');
                          rightRow.innerHTML = value;
                          tr.appendChild(rightRow);
                          tbody.appendChild(tr)
                          tabl.appendChild(tbody)
                      }
                    })
                }
              )
            })
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
          } else {
            // the user isn't logged in to Facebook.
          }
         })
    })
})
