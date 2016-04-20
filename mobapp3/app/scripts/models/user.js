'use strict';
mobapp.factory(
	"transformRequestAsFormPost",
	function() {
		// I prepare the request data for the form post.
		function transformRequest( data, getHeaders ) {
			var headers = getHeaders();
			headers[ "Content-Type" ] = "application/x-www-form-urlencoded; charset=utf-8";
			return( serializeData( data ) );
		}
		// Return the factory value.
		return( transformRequest );
		function serializeData( data ) {
			// If this is not an object, defer to native stringification.
			if ( ! angular.isObject( data ) ) {
				return( ( data == null ) ? "" : data.toString() );
			}
			var buffer = [];
			// Serialize each key in the object.
			for ( var name in data ) {
				if ( ! data.hasOwnProperty( name ) ) {
					continue;
				}
				var value = data[ name ];
				buffer.push(
					encodeURIComponent( name ) +
					"=" +
					encodeURIComponent( ( value == null ) ? "" : value )
				);
			}
			// Serialize the buffer and clean it up for transportation.
			var source = buffer
				.join( "&" )
				.replace( /%20/g, "+" )
			;
			return( source );
		}
	}
);


mobapp.service('Session',function(){
this.create = function(userObj){
				this.id       = userObj.sessionId;
				this.userId   = userObj.userId;
				this.userRole = userObj.userRole;
				this.deviceId = '';
				this.email    = '';
				this.mobile   = '';
				this.apiKey   = '';
			 };
			 
this.destroy = function(){
				this.id         = null;
				this.userId     = null;
				this.userRole   = null;
				this.deviceId = '';
				this.email    = '';
				this.mobile   = '';
				this.apiKey   = '';
			 };
			 
return this;               
			 
});

mobapp.factory('AuthService', ['$http','appREST','transformRequestAsFormPost','Session', function($http,appREST,transformRequestAsFormPost,Session,$rootScope){

			return{
				validate: function(credentials,callback){
					var request = $http({
						method: "POST",
						url: appREST.baseUrl+'index.php/mobileapp/api/user/validate/format/json',
						transformRequest: transformRequestAsFormPost,
						data: {
							uemail: credentials.email,
							upw: credentials.password
						},
						withCredentials: false
					});
			  
					request.success(function(data){
						if(data.response === 'success'){
							Session.create(data.userObj);			
						}
						callback(data);
					});
				},

				isAuthenticated : function(){
					return !!Session.userId;
				},

				isAuthorized : function(authorizedRoles){
					if(!angular.isArray(authorizedRoles)){
						authorizedRoles = [authorizedRoles];
					}
					return (this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole));
				}

			};
}]);
  
mobapp.factory('authUserLog', function() {
			var auth = {
				isLogged: false
			}
			return auth;
});

mobapp.factory('checkInternet', function($cordovaNetwork) {
			var internet = {
				online: true
			}
			return internet;
});
	
mobapp.factory('appIonicLoader',function($ionicLoading){
			return {
			  show: function(){
				$ionicLoading.show({
					content: '<i class="icon ion-looping"></i> Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 100,
					showDelay: 0
				});
			  },
			  //FOR CHECKING INTERNET CONNECTION
			  hide: function(){
				$ionicLoading.hide();  
			  }
			}
});
mobapp.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
			    var onlineStatus = {};

			    onlineStatus.onLine = $window.navigator.onLine;

			    onlineStatus.isOnline = function() {
				return onlineStatus.onLine;
			    }

			    $window.addEventListener("online", function () {
				onlineStatus.onLine = true;
				$rootScope.$digest();
			    }, true);

			    $window.addEventListener("offline", function () {
				onlineStatus.onLine = false;
				$rootScope.$digest();
			    }, true);

			    return onlineStatus;
}]);
mobapp.factory('InternetCheck',function($ionicLoading){
			return {
			  show: function(){
				$ionicLoading.show({
							template: "No Internet Connection Available Close Your App",
							maxWidth: 250
						});
			  		},
			  hide: function(){
				$ionicLoading.hide();  
			  }
			  
			}
	
});

mobapp.factory('credentialValidate',function($http,appREST,transformRequestAsFormPost) {
			  return {
				emailValidate: function(userData,callback) {
					var request	= $http({
						method				: "POST",
						url					: appREST.baseUrl+'index.php/mobileapp/api/user/forgot_password/format/json',
						transformRequest 	: transformRequestAsFormPost,
						data				: {uemail:userData.email},
						withCredentials		: false
					})
					.success(function(data){
						callback(data);
					});
				}
			  }
});


mobapp.factory('emailSend',function($http,appREST,transformRequestAsFormPost) {
			  return {
				emailsender: function(userData,callback) {
						
					var request	= $http({
						method			: "POST",
						url			: appREST.baseUrl+'index.php/mobileapp/api/utilities/email_user/format/json',
						transformRequest 	: transformRequestAsFormPost,
						data			: {email:userData},
						withCredentials		: false
					})
					.success(function(data){
						callback(data);
					});
				}
			  }
});




mobapp.factory('updateUserPassword',function($http,appREST,transformRequestAsFormPost){
			return {
				update: function(userData,callback) {
					var request = $http({
					method				: "POST",
					url					: appREST.baseUrl+'index.php/mobileapp/api/user/update_password/format/json',
					transformRequest	: transformRequestAsFormPost,
					data 				: {upw:userData.upw,uconfirm_password:userData.uconfirm_password,uemail:userData.uemail},
					withCredentials		: false	
					})
					.success(function(data){
						callback(data);
					});
				}
			}
});
//Get the user balance amount
mobapp.factory('getAppBalance',function($http,appREST,Session){
			var urlBase			= appREST.baseUrl;
			//var userId			= $rootScope.userId;
			var getAppBalance	= {};
			getAppBalance.getTotalBalance = function(userId){
				return $http.get(urlBase+'index.php/mobileapp/api/utilities/myRecharge/format/json?user_id='+userId);
			}
			getAppBalance.getCreditedHistory = function(userId){
				return $http.get(urlBase+'index.php/mobileapp/api/utilities/myAppInstall/format/json?user_id='+userId);
			}
			getAppBalance.getDebitedHistory = function(userId){
				return $http.get(urlBase+'index.php/mobileapp/api/utilities/myRechargeHistory/format/json?user_id='+userId);
			}
			return getAppBalance;
});


//Get the App Big Image details
mobapp.factory('getAppBigImage',function($http,appREST,Session){
			var urlBase			= appREST.baseUrl;
			var getAppBigImage	= {};
			getAppBigImage.getDetails = function(userId,appid){
				return $http.get(urlBase+'api/request.php?appid='+appid+'&userid='+userId);  // Mobbanner Live
				//return $http.get(urlBase+'apitest/request.php?appid='+appid+'&userid='+userId);// Local server
			}
			return getAppBigImage;
	
});



//Add SIGNUP user details into DB
mobapp.factory('SignUpService', ['$http','$rootScope','appREST','transformRequestAsFormPost',function($http,$rootScope,appREST,transformRequestAsFormPost){
			    var urlBase			= appREST.baseUrl;
			    return{
			      validate: function(formData,callback){       
					  console.log("FormData:",formData);
				    var request = $http({
					    method: "POST",
					    url: urlBase+'index.php/mobileapp/api/user/signup1/format/json',
					    //url: urlBase+'index.php/mobileapp/api/user/signup/format/json',
					    transformRequest: transformRequestAsFormPost,
					    data: formData,
					    withCredentials: false
				    });
				  
						request.success(function(data){
				      		callback(data);               
						});
			     },
				};
}]);

//Add  User PROFIL details in DB

mobapp.factory('SaveProfile',function($http,appREST,transformRequestAsFormPost){
				var urlBase		= appREST.baseUrl;
				return {
						update: function(data,callback) {	
						var request = $http({
						method			: "POST",
						url			: appREST.baseUrl+'index.php/mobileapp/api/utilities/profileSelect/format/json',
						transformRequest: transformRequestAsFormPost,
						data 			: {user_id:data.user_id,first_name:data.first_name},
						withCredentials	: false	
						})
						.success(function(data){
							callback(data);
							console.log(data);
						});
					}
				}
});


//User Recharge details in DB

mobapp.factory('Recharge',function($http,appREST,transformRequestAsFormPost){
				var urlBase		= appREST.baseUrl;
				return {
						update: function(data,callback) {	
						var request = $http({
						method			: "POST",
						url			: appREST.baseUrl+'index.php/mobileapp/api/utilities/rechargeInsert/format/json',
						transformRequest: transformRequestAsFormPost,
						data 			: {mobile:data.mobile,operator:data.operator,amount:data.amount,user_id:data.user_id,operator_name:data.operator_name},
						withCredentials	: false	
						})
						.success(function(data){
							callback(data);
							console.log(data);
						});
					}
				}
});




//Fetch category list
mobapp.factory('getCategoryList',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var getCategoryList	= {};
				getCategoryList.getCategoryData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/categoryList/format/json');
				};
				return getCategoryList;
});


//Fetch page content
mobapp.factory('getPageContent',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var getPageContent	= {};
				getPageContent.getPageContentData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/PageContent/format/json');
				};
				return getPageContent;
});


//Fetch Share content
mobapp.factory('getShareContent',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var getShareContent	= {};
				getShareContent.getShareContentData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/ShareContent/format/json');
				};
				return getShareContent;
});



//Fetch about content
mobapp.factory('getAboutContent',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var getAboutContent	= {};
				getAboutContent.getAboutContentData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/AboutContent/format/json');
				};
				return getAboutContent;
});




//Fetch Operator list
mobapp.factory('getOperatorList',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var getOperatorList	= {};
				getOperatorList.getOperatorData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/operator/format/json');
				};
				return getOperatorList;
});


//Fetch UserProfile
mobapp.factory('getUserProfile',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var userId 		= localStorage.getItem('userId');
				//alert("userId="+userId);
				var getUserProfile	= {};
				getUserProfile.getgetUserProfileData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/fetch_user/format/json?userid='+userId);
				};
				return getUserProfile;
});

//Fetch UserDetails
mobapp.factory('getUserDetails',function($http,appREST){
				var urlBase		= appREST.baseUrl;
				var userId 		= localStorage.getItem('userId');
				var getUserDetails	= {};
				getUserDetails.getgetUserDetailsData = function() {
					return $http.get(urlBase+'index.php/mobileapp/api/utilities/fetch_user/format/json?userid='+userId);
				};
				return getUserProfile;
});



//Update category list
mobapp.factory('updateCategoryList',function($http,appREST,transformRequestAsFormPost){
				var urlBase		= appREST.baseUrl;
				return {
						update: function(data,callback) {	
						var request = $http({
						method			: "POST",
						url			: appREST.baseUrl+'index.php/mobileapp/api/utilities/categorySelect/format/json',
						transformRequest: transformRequestAsFormPost,
						data 			: {user_id:data.user_id,category_id:data.category_id},
						withCredentials	: false	
						})
						.success(function(data){
							callback(data);
							console.log(data);
						});
					}
				}
});




//Update Feedback
mobapp.factory('updateFeedback', ['$http','$rootScope','appREST','transformRequestAsFormPost',function($http,$rootScope,appREST,transformRequestAsFormPost){
			    var urlBase			= appREST.baseUrl;
			    return{
			    		  validate: function(data,callback){
					  console.log("FormData:",data);
				  	  var request = $http({
					    method: "POST",
					    url: urlBase+'index.php/mobileapp/api/utilities/feedback/format/json',
					    transformRequest: transformRequestAsFormPost,
					    data: {user_id:data.user_id,option:data.option,comments:data.comments},
					    withCredentials: false
				    	   });
				  
						request.success(function(data){
						console.log("success:",data);
				      		callback(data);               
						});
			    		}
				};
}]);

//Fetch country list
mobapp.factory('getCountryList',function($http,appREST){
			var urlBase		= appREST.baseUrl;
			var getCountryList	= {};
			getCountryList.getCountryData = function() {
				return $http.get(urlBase+'index.php/mobileapp/api/utilities/countryList/format/json');
			};
			return getCountryList;
});



mobapp.factory('$cordovaLocalNotification', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
    document.addEventListener('deviceready', function () {
      if ($window.cordova &&
        $window.cordova.plugins &&
        $window.cordova.plugins.notification &&
        $window.cordova.plugins.notification.local) {
        // ----- "Scheduling" events

        // A local notification was scheduled
        $window.cordova.plugins.notification.local.on('schedule', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:schedule', notification, state);
          });
        });

        // A local notification was triggered
        $window.cordova.plugins.notification.local.on('trigger', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:trigger', notification, state);
          });
        });

        // ----- "Update" events

        // A local notification was updated
        $window.cordova.plugins.notification.local.on('update', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:update', notification, state);
          });
        });

        // ----- "Clear" events

        // A local notification was cleared from the notification center
        $window.cordova.plugins.notification.local.on('clear', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:clear', notification, state);
          });
        });

        // All local notifications were cleared from the notification center
        $window.cordova.plugins.notification.local.on('clearall', function (state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:clearall', state);
          });
        });

        // ----- "Cancel" events

        // A local notification was cancelled
        $window.cordova.plugins.notification.local.on('cancel', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:cancel', notification, state);
          });
        });

        // All local notifications were cancelled
        $window.cordova.plugins.notification.local.on('cancelall', function (state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:cancelall', state);
          });
        });

        // ----- Other events

        // A local notification was clicked
        $window.cordova.plugins.notification.local.on('click', function (notification, state) {
          $timeout(function () {
            $rootScope.$broadcast('$cordovaLocalNotification:click', notification, state);
          });
        });
      }
    }, false);
    return {
      schedule: function (options, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.schedule(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      add: function (options, scope) {
        console.warn('Deprecated: use "schedule" instead.');

        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.schedule(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      update: function (options, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.update(options, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      clear: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.clear(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      clearAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.clearAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      cancel: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.cancel(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      cancelAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.cancelAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isPresent: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isPresent(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isScheduled: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isScheduled(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      isTriggered: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.isTriggered(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      hasPermission: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.hasPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      registerPermission: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.registerPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      promptForPermission: function (scope) {
        console.warn('Deprecated: use "registerPermission" instead.');

        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.registerPermission(function (result) {
          if (result) {
            q.resolve(result);
          } else {
            q.reject(result);
          }
        }, scope);

        return q.promise;
      },

      getAllIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getScheduledIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getScheduledIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getTriggeredIds: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getTriggeredIds(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      get: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.get(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAll(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getScheduled: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getScheduled(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAllScheduled: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllScheduled(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getTriggered: function (ids, scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getTriggered(ids, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getAllTriggered: function (scope) {
        var q = $q.defer();
        scope = scope || null;

        $window.cordova.plugins.notification.local.getAllTriggered(function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      getDefaults: function () {
        return $window.cordova.plugins.notification.local.getDefaults();
      },

      setDefaults: function (Object) {
        $window.cordova.plugins.notification.local.setDefaults(Object);
      }
    };
  }]);

