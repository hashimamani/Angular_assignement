/*
 * Cytonn Technologies
 *
 * @author: Hashim Amani <hamani@cytonn.com>
 *
 * Project: Angular JS.
 *
 */

;(function(){
function authInterceptor(API, auth , $window) {
  return {
  
    request: function(config) {
    var token = auth.getToken();
    if(config.url.indexOf(API) === 0 && token) {
    config.headers.Authorization = 'Bearer ';
    }

      return config;
    },

   response: function(res,$window) {
  if(res.config.url.indexOf(API) === 0 && res.data.token) {
    auth.saveToken(res.data.token);
     $window.location.href= "http://localhost:3000/home.html"


     }

       return res;
    },

    responseError: function(res){
      if(res.status === 401){
        $window.location.href = "http://localhost:3000/home.html"
      }
    }
  }
}
 //jwt procedure

function authService($window) {
  var self = this;


  self.parseJwt = function(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse($window.atob(base64));
}
self.saveToken = function(token) {
  $window.localStorage['jwtToken'] = token;
}
self.getToken = function() {
  return $window.localStorage['jwtToken'];
}
self.isAuthed = function() {
  var token = self.getToken();
  if(token) {
    var params = self.parseJwt(token);
    return Math.round(new Date().getTime() / 1000) <= params.exp;
    
  } else {
    return false;
  }
}
self.logout = function() {
  $window.localStorage.removeItem('jwtToken');
}
}

function userService($http, API, auth) {
  var self = this;
  self.getQuote = function() {
    return $http.get(API + '/auth/quote')
  }


  // authentication methods
  self.register = function(username, password) {
  return $http.post(API + '/auth/register', {
      username: username,
      password: password
    })
}
self.login = function(username, password) {
  return $http.post(API + '/auth/login', {
      username: username,
      password: password
    }).then(function(res){
      auth.saveToken(res.data.token)
      return res
    })
}
self.logout = function() {
    auth.logout && auth.logout()
  }

}



function MainCtrl(user, auth) {
  var self = this;

  function handleRequest(res) {
    var token = res.data ? res.data.token : null;
    if(token) { console.log('JWT:', token); }
    self.message = res.data.message;
  }

  self.login = function() {
    user.login(self.username, self.password)
      .then(handleRequest, handleRequest)
  }
  self.register = function() {
    user.register(self.username, self.password)
      .then(handleRequest, handleRequest)
  }
  self.getQuote = function() {
    user.getQuote()
      .then(handleRequest, handleRequest)
  }
  
 
  self.isAuthed = auth.isAuthed
  self.logout = auth.logout
}

//our module
angular.module('app', [])
.factory('authInterceptor', authInterceptor)
.service('user', userService)
.service('auth', authService)
.constant('API', 'http://test-routes.herokuapp.com')
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.controller('Main', MainCtrl)
})();

self.register = function(username, password) {
  return $http.post(API + '/auth/register', {
      username: username,
      password: password
    })
}

self.login = function(username, password) {
  return $http.post(API + '/auth/login', {
      username: username,
      password: password
    })
};

