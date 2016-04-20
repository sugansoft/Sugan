'use strict';
/* Ionic Starter App, v0.9.20
 * checklist-model for selectAll option
 * Modules for Mobapp3 with ionic and ngCordova
 * checklist-model for select all unselectall functions
 */

 //Adding this for ngCordova plugin in local notification plugin add feature not available for initial.js
//var mobapp = angular.module('Mobapp3', ['checklist-model','ionic','ngCordova','ngCordova.plugins']);
var mobapp = angular.module('Mobapp3',['checklist-model','ionic','ngCordova']);

//Keyboard initializing

mobapp.run(function($ionicPlatform, $rootScope, $location, authUserLog, $ionicLoading, $cordovaNetwork ,onlineStatus,$state,$timeout,$cordovaLocalNotification,$cordovaPush) {
	
  				$ionicPlatform.ready(function() {
  				console.log("hello");							      
							
  
    				if(window.cordova && window.cordova.plugins.Keyboard && window.plugin && window.plugin.notification.local) {
    									
      									cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
									
      									
      							}
    							if(window.StatusBar) {
      
     									StatusBar.styleDefault();
    							}
    							

    							
							/* 
      							$cordovaLocalNotification.add({
								id: '1',
								message: "Push!!"
							    })
    							       window.plugin.notification.local.onadd = function () {
								    var notification = {
									id: 1,
									state: 1,
									json: 1
								    };
								    $timeout(function() {
									$rootScope.$broadcast("$cordovaLocalNotification:added", notification);
								    });
							}  
    							$cordovaLocalNotification.add({
              								  id: '1',
              								  message: "Push!!"
           						})
    							cordova.plugins.notification.local.schedule({
									  id         : 1,
									  title      : 'I will bother you every minute',
									  text       : '.. until you cancel all notifications',
									  sound      : null,
									  every      : 'minute',
									  autoClear  : false,
									  at         : new Date(new Date().getTime() + 10*1000)
							});
							*/
    
    							
				});
				
    	
  				$ionicPlatform.onHardwareBackButton(function() {
  				
  							alert("Back Button is pressed");
							$ionicLoading.show({
									template: "Press again to exit"
							});
							event.preventDefault();
							event.stopPropagation();
				});




				//Hardware Back Button for "Press again to exit"
	
				$ionicPlatform.registerBackButtonAction(function () {
				
							if(($state.current.name=="app.appHome.balance")||($state.current.name=="app.appHome.recharge")||($state.current.name=="app.appDetail")||($state.current.name=="app.credited")||($state.current.name=="app.debited")||($state.current.name=="about")||($state.current.name=="home")||($state.current.name=="profile")||($state.current.name=="notification")||($state.current.name=="feedback")||($state.current.name=="app.appHome.offer")||($state.current.name=="feedbacksuccess")||($state.current.name=="rechargeconf")||($state.current.name=="share")||($state.current.name=="FAQ")||($state.current.name=="PrivacyPolicy")||($state.current.name=="Terms"))
							{
								if($state.current.name=="app.appHome.offer")
								{		
									if($rootScope.backButtonPressedOnceToExit)
									{
										navigator.app.exitApp();
									}
									else
									{
										$rootScope.backButtonPressedOnceToExit = true;
										$ionicLoading.show({
											template: "Press again to exit"
										});
										$timeout(function(){
											$ionicLoading.hide(); 	 //Icon Hide
										},1000);
									}
						
								}
								else
								{
									$state.go('app.appHome.offer');
									$rootScope.backButtonPressedOnceToExit = false;
								}
  							}
  							else
  							{
  								if($state.current.name=="login"||($state.current.name=="register")||($state.current.name=="forgotPassword")||($state.current.name=="category")||($state.current.name=="newPassword")||($state.current.name=="noInternet")||($state.current.name=="newPasswordSuccess"))
  			       					{
									window.history.back();
  			
  			       					}
  								else
			       					{
									navigator.app.exitApp();
			       					}		
  							}
				}, 100);

});



//States & Controllers
mobapp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {	


				//Login & Register button entry
				$stateProvider
						.state('entry', {
      							url: '/entry',
      							templateUrl: 'templates/entry.html',
      							controller: 'entryController',
      							access : { requiredAuthentication: false }
    						})
    
    						.state('app', {
     							url: '/app',
      							abstract: true,
      							templateUrl: 'templates/menu.html',
      							controller: 'AppCtrl',
      							access : { requiredAuthentication: true }
    						})

    		
   				/*** MAIN PAGE TABS START ***/
   	
    	       					.state('app.appHome', {
      							url: '/appHome',
      							abstract: true,
      							templateUrl: 'templates/appHome.html',
      							controller: "AppHomeController",
      							access : { requiredAuthentication: true }
    						})

     
          			//offers page 

    	    					.state('app.appHome.offer', {
     		    					  url: "/offer",
     			 				  views: {
        							'appHome-offer': {
          			 				templateUrl: "templates/appHome-offer.html",
          			 				controller: "AppListController"
        					 		}
      								},
     			 				 access : { requiredAuthentication: true }
     						 }) 
     						 	
         		       //balance page

    						.state('app.appHome.balance', {
     		     					url: "/balance",
      							views: {
        							'appHome-balance': {
          							templateUrl: "templates/appHome-balance.html",
          							controller: "appWalletBalanceController"
        					   		}
      			       					},
      							access : { requiredAuthentication: true }
    						 })

			      /*** MAIN PAGE TABS END ***/

	
         		      //recharge page

        					.state('app.appHome.recharge', {
      		  					url: "/recharge",
      		      					views: {
        							'appHome-recharge': {
          							templateUrl: "templates/recharge.html",
          							controller: "appWalletRechargeController"
        					   		}
      			      					},
      							access : { requiredAuthentication: true }
    						})


        			//Big Image displays afer offers page

 	       					.state('app.appDetail', {
      		   				 	url: "/appDetail",
		   					templateUrl: "templates/appDetail.html",
                   					controller: 'AppDetailController',
                   					access : { requiredAuthentication: true }
               					})

     
				// BALANCE CREDIT HISTORY
	
						.state('app.credited', {
		   					url: "/credited",
		   					templateUrl: "templates/appCredited.html",
		   					controller: "appWalletCreditedController",
		   					access : { requiredAuthentication: true }
						})

		
				// BALANCE DEBIT HISTORY
	
						.state('app.debited', {
	           					url: "/debited",
      		   					templateUrl: "templates/appDebited.html",
		  					controller: "appWalletDebitedController",
		   					access : { requiredAuthentication: true }
						})

		
				// LOGIN 
		
    						.state('login', {
      		    					url: "/login",
 		     					templateUrl: "templates/sign-in.html",
 		     					controller: 'SignInCtrl',
 		     					access : { requiredAuthentication: false }
 						})


     				//LOGOUT
     	
     						.state('logout', {
      		    					url: "/logout",
      		    					templateUrl: "templates/sign-in.html",
 		    					controller: 'logoutController',
		    					access : { requiredAuthentication: false }
 						})


        			//FeedbackSuccess
        
				     		.state('feedbacksuccess', {
					      		   url: "/feedbacksuccess",
							   templateUrl: "templates/feedbacksuccess.html",
					      		   controller: 'feedbacksuccessController',
					      		   access : { requiredAuthentication: false }
					    	})
					    	
				//ABOUT US
				    	
				     		.state('about', {
					      		   url: "/about",
							   templateUrl: "templates/about.html",
							   controller: 'aboutController',
					  		   access : { requiredAuthentication: true }
				   		})
   		
				//FAQ
				    	
				     		.state('FAQ', {
					      		   url: "/FAQ",
							   templateUrl: "templates/FAQ.html",
							   controller: 'FAQController',
					  		   access : { requiredAuthentication: true }
				   		})
				//PrivacyPolicy
				    	
				     		.state('PrivacyPolicy', {
					      		   url: "/PrivacyPolicy",
							   templateUrl: "templates/PrivacyPolicy.html",
							   controller: 'PrivacyPolicyController',
					  		   access : { requiredAuthentication: true }
				   		})
				//Terms
				    	
				     		.state('Terms', {
					      		   url: "/Terms",
							   templateUrl: "templates/Terms.html",
							   controller: 'TermsController',
					  		   access : { requiredAuthentication: true }
				   		})
   		


			    	//HOME
			    	
			     			.state('home', {
			      		  		 url: "/home",
			  		   		 templateUrl: "templates/Home.html",
			  		   		 controller: 'homeController',
					   		 access : { requiredAuthentication: true }
						})


			    	//PASSWORD

			     			.state('password', {
			 		   		url: "/password",
			 		  		templateUrl: "templates/password.html",
					   		controller: 'passwordController',
			    		   		access : { requiredAuthentication: true }
			   			})
			    

				//Profile
	
			     			.state('profile', {
				   		  	url: "/profile",
						        templateUrl: "templates/profile.html",
				  		    	controller: 'profileController',
				  		    	access : { requiredAuthentication: true }
			   			})

				//Notification
		
			    		 	.state('notification', {
			     		    		url: "/notification",
			 		    		templateUrl: "templates/notification.html",
			  		    		controller: 'notificationController',
			  		    		access : { requiredAuthentication: true }
			   		 	})

				//FeedBack
		
			    			.state('feedback', {
			 		  		url: "/feedback",
					   		templateUrl: "templates/feedback.html",
			 		   		controller: 'feedbackController',
			 		   		access : { requiredAuthentication: true }
			  			})
			   
				// FORGOT PASSWORD
	
			     			.state('forgotPassword', {
						   	url: "/forgotPassword",
						   	templateUrl: "templates/forgotPassword.html",
						   	controller: 'forgotPasswordController',
						   	access : { requiredAuthentication: false }
			   			})

				// Splashscreen
	
			   			.state('splashscreen', {
				    		   	url: "/splashscreen",
				     		   	templateUrl: "templates/splashscreen.html",
						   	controller: 'splashscreenController',
				      		   	access : { requiredAuthentication: false }
			    			})
			    
			    	// NEW PASSWORD

				  		.state('newPassword', {
				   		   	url: "/newPassword",
						   	templateUrl: "templates/newPassword.html",
						   	controller: 'newPasswordController',
						   	access : { requiredAuthentication: false }
				 		})

			 		
			    	//NO INTERNET
			    	
				    		.state('noInternet', {
				     		   	url: "/noInternet",
				   		   	templateUrl: "templates/noInternet.html",
				   		   	controller: 'InternetConnectionController',
				   		   	access : { requiredAuthentication: false }
				  		})

			  		
			    	//Registration
			    			
					     	.state('register', {
				   		   	url: "/register",
				     		   	templateUrl: "templates/register.html",
				    		   	controller: 'registerController',
				    		   	access : { requiredAuthentication: false }
				   		})			   		
			   	//category
			   	
				    	  	.state('category', {
				     		  	url: "/category",
				     		  	templateUrl: "templates/category.html",
				     		  	controller: 'categoryController',
				     		 	access : { requiredAuthentication: false }
				    		})
			    	//share
			    	
				    		.state('share', {
					     		url: "/share",
					     		//templateUrl: "templates/category.html",
					      		controller: 'shareController',
					      		access : { requiredAuthentication: false }
				    		})


			    	//Recharge conform 
			    	
			     			.state('rechargeconf', {    	  
					   		url: "/rechargeconf",
							templateUrl: "templates/rechargeconf.html",
					  		controller: 'rechargeconfController',
					 		access : { requiredAuthentication: false }
			 			})
			    
			    	//NEW PASSWORD SUCCESS
			    
				   		.state('newPasswordSuccess', {
							url: "/newPasswordSuccess",
							templateUrl: "templates/newPasswordSuccess.html",
							controller: 'newPasswordController',
							access : { requiredAuthentication: false }
						});

    
	  			var defaultView			= '/entry';
	 		  	var appUserEmail 		= window.localStorage.getItem('appEmail');
			  	var appUserPassword 	= window.localStorage.getItem('appPassword');
		    		console.log(appUserEmail+appUserPassword+defaultView);
   		 		if(appUserEmail && appUserPassword) {
						//defaultView = "/app/appHome/offer";
						defaultView = "/splashscreen";
						console.log(appUserEmail+appUserPassword+defaultView);
				} 
				else
				{
						defaultView = "/entry";
						console.log(appUserEmail+appUserPassword+defaultView);
				}   
    				$urlRouterProvider.otherwise(defaultView);
    
});


// CROSS DOMAIN REST API integration

mobapp.config(['$httpProvider', function($httpProvider) {

	       			$httpProvider.defaults.useXDomain = true;
		        	delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);


// AppConfig information domain,author,company
 
mobapp.value("appConfig",{
    				"app_name":"",
    				"app_version":"",
   				"app_domain":"djaxadserver.com",
    				"app_author":"Suganya",
   				"app_company":"dJAX Ad Server",
    				"test123":"test",
});
/*
//Local Server URL

mobapp.value("appREST",{
    				"baseUrl":"http://50.23.160.154/~proddemo/mobbanner/"
});                             
                                  
mobapp.value("siteConfig",{
				"imageUrl":"http://50.23.160.154/~proddemo/mobbanner/ads/www/images/",
    				"currency":'₹'
});

*/

//Mobbanner Live URL

mobapp.value("appREST",{
    				"baseUrl":"http://mobbanner.com/adserver/"
});                             
                                  
mobapp.value("siteConfig",{
				"imageUrl":"http://mobbanner.com/adserver/ads/www/images/",
    				"currency":'₹'
});



//Authorization login

mobapp.constant('AUTH_EVENTS',{
			        loginSuccess : 'auth-login-success',
			        loginFailed: 'auth-login-failed',
			        logoutSuccess: 'auth-logout-success',
			        sessionTimeout: 'auth-session-timeout',
			        notAuthenticated: 'auth-not-authenticated',
			        notAuthorized: 'auth-not-authorized'    
});


//User Role

mobapp.constant('USER_ROLES',{
   			       all : '*',
			       admin:'admin',
 			       user:'user'
});
