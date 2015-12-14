/* global FB */
document.getElementById('profilepic').addEventListener('click', function () {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      console.log('connected')
      console.log(response)
      console.log(response.authResponse.userID)
      FB.api(
          '/' + response.authResponse.userID + '/picture?type=large',
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log(response.data.url)
              document.getElementById('profile1').innerHTML = '<img src="' + response.data.url + '"/>'
              document.querySelector('img').style.width = '150px'
              document.querySelector('img').style.height = '150px'
            }
          }
      )
      FB.api(
        '/' + response.authResponse.userID + '/likes',
        'GET',
        {},
        function (response) {
           console.log(response)
        }
      )
    }
  })
})
document.getElementById('likes').addEventListener('click', function () {

})
