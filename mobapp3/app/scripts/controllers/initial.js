'use strict';

//AppController for ToggleLeft
mobapp.controller('AppCtrl', function($scope,onlineStatus,InternetCheck,$window,$timeout,$ionicSideMenuDelegate,AuthService,authUserLog,$state) {




		      //Check For Internet...
 		      $scope.onlineStatus = onlineStatus;  
		      $scope.$watch('onlineStatus.isOnline()', function(online) {
		      $scope.online_status = online ? 'true' : 'false';
	    
if($scope.online_status=='true')
{
   	    	        console.log("Net available");
			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){			
			if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);
				$scope.toggleLeft	= function() {
						$ionicSideMenuDelegate.toggleLeft();
				}
		    	}
			else	
			{

				authUserLog.isLogged = false;
				var empty="";
				localStorage.setItem('CategoryList',empty);	
				localStorage.setItem('appEmail',empty);
				localStorage.setItem('appPassword',empty);
				localStorage.setItem('userId',empty);
				localStorage.setItem('select',empty);
				localStorage.setItem('categorySet',empty);
				$state.go('entry');		
		 	}
			});	

}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
		             // InternetCheck.hide(); 
		             // alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
		             $state.go('app.appHome.balance');
			     //$window.location.reload();
		             console.log("Reloaded");        
			},5000);		
}
});	
});



// Function not used
mobapp.controller('splashscreenController', function($scope,onlineStatus,InternetCheck,$window,$timeout,$ionicSideMenuDelegate,$state,appIonicLoader) {

			$scope.myData = {};
			$scope.myData.showIt = true;
			//Check For Internet...
		   	$scope.onlineStatus = onlineStatus;  
			$scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status = online ? 'true' : 'false';		 

if($scope.online_status=='true')
{

			$scope.myData = {};
	      		$scope.myData.showIt = true;	      		
			console.log("Net available");
				      $timeout(function(){
				      $scope.myData.showIt = false;
				      $state.go('app.appHome.balance');
				      console.log("Reloaded");        
			},2000);
}
else		 	//If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	 //Icon Hide
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);
		

}
});	
});


//ABOUT page

mobapp.controller('aboutController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicPlatform,AuthService,authUserLog,getAboutContent){


			$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency				= siteConfig.currency;
			$scope.creditedHistory     			= 'ABOUT US';

	
		        //Check For Internet...
	 	        $scope.onlineStatus = onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
		        $scope.online_status = online ? 'true' : 'false';
		    
if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){			
				if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("ABOUT US CONTROLLER CALLED");

					getAboutContent.getAboutContentData()
					    .success(function (Content) {
						  console.log(Content);
						  $scope.AboutContent=Content;
					     })
					    .error(function (error) {
						  $scope.availAboutContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
					     })
					    .finally(function(){
								// Call appIonicLoader to hide loader
					     });

					$scope.goFAQ = function() {
						$state.go('FAQ');
						//$ionicNavBarDelegate.back();
					};

					$scope.goPrivacyPolicy = function() {
						var url= 'http://mobbanner.com/privacy-policy/';
						$window.open(url,'_system','location=yes');
						//$state.go('PrivacyPolicy');
						//$ionicNavBarDelegate.back();
					};

					$scope.goTerms = function() {
						var urlt= 'http://www.mobbanner.com/terms-conditions/';
						$window.open(urlt,'_system','location=yes');

						//$state.go('Terms');
						//$ionicNavBarDelegate.back();
					};

					
					$scope.goBack = function() {
						$state.go('app.appHome.offer');
						//$ionicNavBarDelegate.back();
					};
				}
				else	
				{

					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
				}
			});	
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);		
}
});


});

//FAQ page

mobapp.controller('FAQController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicPlatform,AuthService,authUserLog,getAboutContent){


			$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency				= siteConfig.currency;
			$scope.FAQ     					= 'FAQ';
			$scope.Terms					= 'Terms and Conditions';
	
		        //Check For Internet...
	 	        $scope.onlineStatus = onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
		        $scope.online_status = online ? 'true' : 'false';
		    
if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){			
				if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("FAQ CONTROLLER CALLED");

					getAboutContent.getAboutContentData()
					    .success(function (Content) {
						  console.log(Content);
						  $scope.AboutContent=Content;
					     })
					    .error(function (error) {
						  $scope.availAboutContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
					     })
					    .finally(function(){
								// Call appIonicLoader to hide loader
					     });

					$scope.goFAQ = function() {
						$state.go('FAQ');
						//$ionicNavBarDelegate.back();
					};

					$scope.goPrivacyPolicy = function() {
						var url= 'http://mobbanner.com/privacy-policy/';
						$window.open(url,'_system','location=yes');
						//$state.go('PrivacyPolicy');
						//$ionicNavBarDelegate.back();
					};

					$scope.goTerms = function() {
						var urlt= 'http://www.mobbanner.com/terms-conditions/';
						$window.open(urlt,'_system','location=yes');

						//$state.go('Terms');
						//$ionicNavBarDelegate.back();
					};
				
					$scope.goBack = function() {
						$state.go('app.appHome.offer');
						//$ionicNavBarDelegate.back();
					};
				}
				else	
				{

					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
				}
			});	
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);		
}
});


});


//FAQ page

mobapp.controller('PrivacyPolicyController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicPlatform,AuthService,authUserLog,getAboutContent){


			$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency				= siteConfig.currency;
			//$scope.FAQ     					= 'FAQ';
			$scope.PrivacyPolicy					= 'PrivacyPolicy';
	
		        //Check For Internet...
	 	        $scope.onlineStatus = onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
		        $scope.online_status = online ? 'true' : 'false';
		    
if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){			
				if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("FAQ CONTROLLER CALLED");

					getAboutContent.getAboutContentData()
					    .success(function (Content) {
						  console.log(Content);
						  $scope.AboutContent=Content;
					     })
					    .error(function (error) {
						  $scope.availAboutContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
					     })
					    .finally(function(){
								// Call appIonicLoader to hide loader
					     });


					$scope.goFAQ = function() {
						$state.go('FAQ');
						//$ionicNavBarDelegate.back();
					};

					$scope.goPrivacyPolicy = function() {
						var url= 'http://mobbanner.com/privacy-policy/';
						$window.open(url,'_system','location=yes');
						//$state.go('PrivacyPolicy');
						//$ionicNavBarDelegate.back();
					};

					$scope.goTerms = function() {
						var urlt= 'http://www.mobbanner.com/terms-conditions/';
						$window.open(urlt,'_system','location=yes');

						//$state.go('Terms');
						//$ionicNavBarDelegate.back();
					};

					
					$scope.goBack = function() {
						$state.go('app.appHome.offer');
						//$ionicNavBarDelegate.back();
					};
				}
				else	
				{

					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
				}
			});	
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);		
}
});


});

//FAQ page

mobapp.controller('TermsController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicPlatform,AuthService,authUserLog,getAboutContent){


			$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency				= siteConfig.currency;
			$scope.FAQ     					= 'FAQ';
			$scope.Terms					= 'Terms and Conditions';
	
		        //Check For Internet...
	 	        $scope.onlineStatus = onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
		        $scope.online_status = online ? 'true' : 'false';
		    
if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){			
				if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("FAQ CONTROLLER CALLED");

					getAboutContent.getAboutContentData()
					    .success(function (Content) {
						  console.log(Content);
						  $scope.AboutContent=Content;
					     })
					    .error(function (error) {
						  $scope.availAboutContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
					     })
					    .finally(function(){
								// Call appIonicLoader to hide loader
					     });

					$scope.goFAQ = function() {
						$state.go('FAQ');
						//$ionicNavBarDelegate.back();
					};

					$scope.goPrivacyPolicy = function() {
						var url= 'http://mobbanner.com/privacy-policy/';
						$window.open(url,'_system','location=yes');
						//$state.go('PrivacyPolicy');
						//$ionicNavBarDelegate.back();
					};

					$scope.goTerms = function() {
						var urlt= 'http://www.mobbanner.com/terms-conditions/';
						$window.open(urlt,'_system','location=yes');

						//$state.go('Terms');
						//$ionicNavBarDelegate.back();
					};

					
					$scope.goBack = function() {
						$state.go('app.appHome.offer');
						//$ionicNavBarDelegate.back();
					};
				}
				else	
				{

					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
				}
			});	
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);		
}
});


});

//HOME page

mobapp.controller('homeController',function($ionicPlatform,$scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,AuthService,authUserLog,$cordovaLocalNotification){


			$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency				= siteConfig.currency;
			//Check For Internet...
			$scope.onlineStatus 				= onlineStatus;  
			$scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status 				= online ? 'true' : 'false';
			
if($scope.online_status=='true')
{

	
		//Checking for User Login Details (User is deleted by admin or not)
		var appUserEmail 	= window.localStorage.getItem('appEmail');
		var appUserPassword 	= window.localStorage.getItem('appPassword');
		var credentials	= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);
				console.log("HOME CONTROLLER CALLED");

 			   		 
							
				/*$scope.goBack = function() {
						$state.go('app.appHome.offer');
					
				};
				*/
				//$scope.addNotification = function(tit, msg) {
				 
				$scope.goBack = function() {

					     alert("Is Schedled Called");
						   
					     
					      
						$ionicPlatform.ready(function() {
						 var now = new Date();
					      console.log("Now:",now);
					      alert("Now:"+now);

					      
					      var _60_seconds_from_now = new Date(now + 60 * 1000);
					      console.log("_60_seconds_from_now:",_60_seconds_from_now);
					      alert("_60_seconds_from_now:"+_60_seconds_from_now);					      

					      
					      var event = {
						id: 1,
						at: _60_seconds_from_now,
						title: "Test Event",
						text: "this is a message about the event"
					      };
					      console.log("event:",event);
					      alert("event:"+event);
  							alert("Local Add Called");
						$cordovaLocalNotification.schedule(event).then(function () {
						  console.log("local add : success");
						});

						alert("Notification Triggered");
					      $rootScope.$on("$cordovaLocalNotification:trigger", function (event, notification, state) {
						console.log("notification id:" + notification.id + " state: " + state);
					      });
						});
						/*
					      var onDeviceReady = function(){
					      
	    		     			alert("Local Add Called");
						$cordovaLocalNotification.schedule(event).then(function () {
						  console.log("local add : success");
						});

						alert("Notification Triggered");
					      $rootScope.$on("$cordovaLocalNotification:trigger", function (event, notification, state) {
						console.log("notification id:" + notification.id + " state: " + state);
					      });

					      };
					      onDeviceReady();
						*/
						
			
					      document.addEventListener("deviceready", function () {
					      	alert("Local Add Called");
						$cordovaLocalNotification.schedule(event).then(function () {
						  console.log("local add : success");
						});

					      }, false);

					      document.addEventListener("deviceready", function () {
					      alert("Notification Triggered");
					      $rootScope.$on("$cordovaLocalNotification:trigger", function (event, notification, state) {
						console.log("notification id:" + notification.id + " state: " + state);
					      });
					    }, false);

					    }
					     

					  
							
				
		}
		else	
		{
				authUserLog.isLogged = false;
				var empty="";
				localStorage.setItem('CategoryList',empty);	
				localStorage.setItem('appEmail',empty);
				localStorage.setItem('appPassword',empty);
				localStorage.setItem('userId',empty);
				localStorage.setItem('select',empty);
				localStorage.setItem('categorySet',empty);
				$state.go('entry');	
		}
		});	
}
else		 //If Internet Is Not Available
{
		//InternetCheck.show();
		console.log("Net is not available");
		$timeout(function(){
		              // InternetCheck.hide(); 	
		              alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
			      $window.location.reload();
		              console.log("Reloaded");        
		},5000);	
}
});
});



//Share Option
mobapp.controller('shareController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,AuthService,authUserLog,getShareContent){
		
			    //Check For Internet...
			    $scope.onlineStatus 		= onlineStatus;  
			    $scope.$watch('onlineStatus.isOnline()', function(online) {
			    $scope.online_status 		= online ? 'true' : 'false';
    
if($scope.online_status=='true')
{

			    //Checking for User Login Details (User is deleted by admin or not)
			    var appUserEmail 	= window.localStorage.getItem('appEmail');
			    var appUserPassword 	= window.localStorage.getItem('appPassword');
			    var credentials	= {email:appUserEmail,password:appUserPassword};
			    AuthService.validate(credentials,function(data){			
			    if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("share called");

					getShareContent.getShareContentData()
					    .success(function (Content) {
						  console.log(Content);
						  var shareConten    	= Content[0].share_content;
						  console.log("",Content[0].share_content);
						  window.localStorage.setItem('ShareContent',shareConten);
					     })
					    .error(function (error) {
						  $scope.availAboutContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
					     })
					    .finally(function(){
								// Call appIonicLoader to hide loader
					     });

					var ShareContent 	= window.localStorage.getItem('ShareContent');
					var message = {
				   		 text: window.localStorage.getItem('ShareContent')
					};
					console.log("message=",message);
					window.socialmessage.send(message);
					$state.go('app.appHome.offer');
   			    }
			    else	
			    {
					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
		            }
			    });	
}
else		 	    //If Internet Is Not Available
{
			    //InternetCheck.show();
			    console.log("Net is not available");
			    $timeout(function(){
				       // InternetCheck.hide(); 	 
				       alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				       $window.location.reload();
				       console.log("Reloaded");        
			    },5000);
}
});
});



//Profile Page
mobapp.controller('profileController',function($scope,onlineStatus,$filter,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getUserProfile,appIonicLoader,SaveProfile,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,AuthService,authUserLog,$ionicLoading){

	
			$scope.pageHeader       		=  appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency			=  siteConfig.currency;
			$scope.profile     			= 'PROFILE';
			$scope.profileSubmit			= 'UPDATE PROFILE';
			$scope.Profile				= {};
			$scope.user				= {};
			$scope.availUserProfile			= {};
			//Check For Internet...
			$scope.onlineStatus = onlineStatus;  
		    	$scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status 			= online ? 'true' : 'false';

if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){
			
			if(data.response === 'success'){
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					appIonicLoader.show();
					console.log("Profile CONTROLLER CALLED");
				/***** Pattern matching for registration starts******/

					$scope.phonepattern=/^[1-9]+[0-9]*$/;
					$scope.emailpattern=/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
					$scope.namepattern=/^[a-zA-Z]+[a-zA-Z0-9._#]*$/;

				/***** Pattern matching for registration ends******/
					$scope.goBack = function() {
							$state.go('app.appHome.offer');
							//$ionicNavBarDelegate.back();
					};
					$scope.availUserProfile			= {};
					
					//GET User Profile		
					getUserProfile.getgetUserProfileData()
					.success(function (UserProfile) {
							console.log("DB CALLLED");
							$scope.availUserProfile 		= UserProfile;
							var Gen					= UserProfile[0].gender;
							var dob					= UserProfile[0].dob;
							$scope.age				= UserProfile[0].age;
							//alert(Gen);
							//alert(dob);
							if(Gen=="m")
							$scope.Gender				= "Male";
							else
							$scope.Gender				= "Female";

							var currentdate= new Date();
							var now = new Date();
    							var past = new Date(dob);
							var nowYear = now.getFullYear();
							var pastYear = past.getFullYear();
							$scope.Age = nowYear - pastYear;
							console.log("UserProfile=",UserProfile);
					})
					.error(function (error) {
							$scope.availUserProfileStatus 	= 'Unable to load App Wall data: ' + error.msg;
					})
					.finally(function(){
							// Call appIonicLoader to hide loader
							//$window.location.reload();
							appIonicLoader.hide();
							
				   	});

				  	//Save Profile Details
					$scope.save = function(Profile) {
							console.log(Profile);
							var first_name 		= Profile.firstname; 
							console.log("first_name=",first_name);
							var user_id 		= localStorage.getItem('userId');
							var values = {first_name:first_name,user_id:user_id};
							appIonicLoader.show();		
							console.log(values);
							SaveProfile.update(values,function(data){		
								console.log(data);
								if(data.response == "success") {
										appIonicLoader.hide();
										$ionicLoading.show({
											template: "Updated Successfully !!!",
											maxWidth: 250
										});
										$timeout(function(){
											//Hide Login Error
											$ionicLoading.hide();
											
											$window.location.reload();
										},3000);
										// Call appIonicLoader to hide loader 				
										console.log("Updated");
								}
								else
								{
										appIonicLoader.hide();
										$ionicLoading.show({
											template: "Error While Updating !!!",
											maxWidth: 250
										});
										$timeout(function(){
											//Hide Login Error
											$ionicLoading.hide();
										},3000);
										// Call appIonicLoader to hide loader 
										console.log("error");
								}
							  });
		
					  };
			 }
			else	
			{

						authUserLog.isLogged = false;
						var empty="";
						localStorage.setItem('CategoryList',empty);	
						localStorage.setItem('appEmail',empty);
						localStorage.setItem('appPassword',empty);
						localStorage.setItem('userId',empty);
						localStorage.setItem('select',empty);
						localStorage.setItem('categorySet',empty);
						$state.go('entry');
			}
		       });	
}
else		       //If Internet Is Not Available
{
		       //InternetCheck.show();
		       console.log("Net is not available");
		       $timeout(function(){
					      //InternetCheck.hide(); 	 
					      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
					      $window.location.reload();
					      console.log("Reloaded");        
		       },5000);		
}
});
});



//Feedback Page
mobapp.controller('feedbackController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,updateFeedback,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicLoading,AuthService,authUserLog){


			$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency			= siteConfig.currency;
			$scope.Feedback     			= 'FeedBack';	
			//Check For Internet...
		        $scope.onlineStatus = onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status 			= online ? 'true' : 'false';
if($scope.online_status=='true')
{

			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){
			
			if(data.response === 'success'){
			
					authUserLog.isLogged = true;
					console.log('User Info Available', data);
					console.log("Feedback CONTROLLER CALLED");
					$scope.goBack = function() {
						       $state.go('app.appHome.offer');
						       //$ionicNavBarDelegate.back();
					};


					
					//GET User Profile		
					$scope.feedbacksubmit = function(formData){   
							console.log(formData);
							var option		= formData.option;
							var comments		= formData.comments;				
							if((option!="")&&(comments!=""))
							{			
								console.log(formData);
								var user_id=localStorage.getItem('userId');
								var option=formData.option;
								var comments=formData.comments;				
								// Call appIonicLoader to show loader 
								appIonicLoader.show();
								var values	= {user_id:user_id,option:option,comments:comments};
								updateFeedback.validate(values,function(data){
								if(data.response === 'ok'){
									appIonicLoader.hide();
									$ionicLoading.show({
										template: "FeedBack is Sent",
										maxWidth: 250
									});
									$timeout(function(){
										$ionicLoading.hide(); 	 //Icon Hide
							      			$state.go('feedbacksuccess');
									},3000);
				
								}
								else
								{
									appIonicLoader.hide();
									$timeout(function(){
										//Hide Sign up Error
										$ionicLoading.hide();
									},3000);
									console.log(data);
								}
								});
							}
							else
							{
								$ionicLoading.show({
									template: "Please Enter all the fields",
									maxWidth: 250
								});
							}
								$timeout(function(){
									//Hide Sign up Error
									$ionicLoading.hide();
								},3000);
					  };
			}
			else	
			{

					authUserLog.isLogged = false;
					var empty="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');
			}
			});	
}
else		 	//If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	 //Icon Hide
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);
}
});
});


//FeedBackSuccess page
mobapp.controller('feedbacksuccessController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,updateFeedback,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicLoading,AuthService,authUserLog){


			$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency			= siteConfig.currency;
			$scope.Feedback     			= 'FeedBack';	
			//Check For Internet...
	   	        $scope.onlineStatus 			= onlineStatus;  
		        $scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status 			= online ? 'true' : 'false';
if($scope.online_status=='true')
{
			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 			= window.localStorage.getItem('appEmail');
			var appUserPassword 			= window.localStorage.getItem('appPassword');
			var credentials				= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){
			
			if(data.response === 'success'){
					authUserLog.isLogged 	= true;
					console.log('User Info Available', data);	
					console.log("Feedback CONTROLLER CALLED");
					$scope.goBack 		= function() {
						$state.go('app.appHome.offer');		
					};		
		    	}
			else	
			{

					authUserLog.isLogged 	= false;
					var empty		="";
					localStorage.setItem('CategoryList',empty);	
					localStorage.setItem('appEmail',empty);
					localStorage.setItem('appPassword',empty);
					localStorage.setItem('userId',empty);
					localStorage.setItem('select',empty);
					localStorage.setItem('categorySet',empty);
					$state.go('entry');

		
			}
			});	
}
else		 	//If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
				     // InternetCheck.hide(); 	 //Icon Hide
				      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
				      $window.location.reload();
				      console.log("Reloaded");        
			},5000);
}
});
});


mobapp.controller('passwordController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$rootScope,$state,appConfig,updateUserPassword,appIonicLoader,$ionicLoading){

		      //Check For Internet...
		       $scope.onlineStatus 		= onlineStatus;  
		       $scope.$watch('onlineStatus.isOnline()', function(online) {
		       $scope.online_status 		= online ? 'true' : 'false';
		    
if($scope.online_status=='true')
{

		      console.log("Net available");
		      $scope.userValideEmail		= localStorage.getItem('appEmail');
		      $scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
		      $scope.newPasswordButtonText	= 'Reset password';
		      $scope.forgotPasswordButtonText	= 'Login';
		      $scope.forgotPasswordSuccessNotify	= 'Your password has been Mailed Successfully!!';
		      $scope.change			= 'Change Password';

		      $scope.goBack = function() {
				    $state.go('app.appHome.offer');
				    //$ionicNavBarDelegate.back();
		      };

	
			$scope.changePassword		= function(userData) {
		
				// Call appIonicLoader to show loader 
				appIonicLoader.show();
				var updatePassword	= {upw:userData.password,uconfirm_password:userData.confirmPassword,uemail:$scope.userValideEmail};
				$rootScope.useremail	= '';
				updateUserPassword.update(updatePassword,function(data){
			
					if(data.response == "ok") {
							// Call appIonicLoader to hide loader 
							appIonicLoader.hide();
							$ionicLoading.show({
								template: "Password Changed Successfully!!!!!",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
		      						$state.go('password');
							},3000);	
					}
					else
					{
							// Call appIonicLoader to hide loader 
							appIonicLoader.hide();
							$ionicLoading.show({
								template: "Wrong Password!!!",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
							},3000);
					}
				});
			};
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
					     // InternetCheck.hide(); 	 //Icon Hide
					      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
					      $window.location.reload();
					      console.log("Reloaded");        
			},5000);
		

}
});
});



mobapp.controller('notificationController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicLoading,AuthService,authUserLog){
			$scope.pageHeader       	= appConfig.app_name+' '+appConfig.app_version;
			$scope.siteCurrency		= siteConfig.currency;
			$scope.notification     	= 'Notification';
	
			//Check For Internet...
		    	$scope.onlineStatus 		= onlineStatus;  
		   	$scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status		= online ? 'true' : 'false';
		    


if($scope.online_status=='true')
{
			//Checking for User Login Details (User is deleted by admin or not)
			var appUserEmail 	= window.localStorage.getItem('appEmail');
			var appUserPassword 	= window.localStorage.getItem('appPassword');
			var credentials	= {email:appUserEmail,password:appUserPassword};
			AuthService.validate(credentials,function(data){
			
				if(data.response === 'success'){
						authUserLog.isLogged = true;
						console.log('User Info Available', data);
						console.log("Notification CONTROLLER CALLED");
						$scope.goBack = function() {
							$state.go('app.appHome.offer');
							//$ionicNavBarDelegate.back();
						};
						
						//GET User Profile		
						$scope.feedbacksubmit = function(formData){   
						console.log(formData);
						var option=formData.option;
						var comments=formData.comments;				
						if((option!="")&&(comments!=""))
						{			
							console.log(formData);
							var user_id=localStorage.getItem('userId');
							var option=formData.option;
							var comments=formData.comments;				
							// Call appIonicLoader to show loader 
							appIonicLoader.show();
							var values	= {user_id:user_id,option:option,comments:comments};
							updateFeedback.validate(values,function(data){
							if(data.response === 'ok'){
								appIonicLoader.hide();
								$ionicLoading.show({
									template: "FeedBack is Sent",
									maxWidth: 250
								});
								$timeout(function(){
									$ionicLoading.hide(); 	 //Icon Hide
						      			$window.location.reload();
								},3000);				
							}
							else
							{
								appIonicLoader.hide();
								$timeout(function(){
									//Hide Sign up Error
									$ionicLoading.hide();
								},3000);
								console.log(data);
							}
							});
						}
						else
						{
							$ionicLoading.show({
								template: "Please Enter all the fields",
								maxWidth: 250
							});
						}	
							$timeout(function(){
							//Hide Sign up Error
							$ionicLoading.hide();
							},3000);
						};
				}
				else	
				{
					  authUserLog.isLogged = false;
					  var empty="";
					  localStorage.setItem('CategoryList',empty);	
					  localStorage.setItem('appEmail',empty);
					  localStorage.setItem('appPassword',empty);
					  localStorage.setItem('userId',empty);
					  localStorage.setItem('select',empty);
					  localStorage.setItem('categorySet',empty);
					  $state.go('entry');
				}
			});	
}
else		 //If Internet Is Not Available
{
			//InternetCheck.show();
			console.log("Net is not available");
			$timeout(function(){
                    		 // InternetCheck.hide(); 	 //Icon Hide
                      		 alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
		      		 $window.location.reload();
                      		 console.log("Reloaded");        
			},5000);
}
});
});

mobapp.controller('appWalletRechargeController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getOperatorList,appIonicLoader,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,$ionicModal,AuthService,authUserLog,$ionicLoading,Recharge,getPageContent){

		$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
		$scope.siteCurrency			= siteConfig.currency;
		$scope.Profile     			= 'PROFILE';
		$scope.user				= {};
		//Check For Internet...
   		 $scope.onlineStatus 			= onlineStatus;  
    		$scope.$watch('onlineStatus.isOnline()', function(online) {
        	$scope.online_status 			= online ? 'true' : 'false';
    
if($scope.online_status=='true')
{
		//Checking for User Login Details (User is deleted by admin or not)
		var appUserEmail 			= window.localStorage.getItem('appEmail');
		var appUserPassword 			= window.localStorage.getItem('appPassword');
		var credentials				= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);
				$scope.pageHeader       	= appConfig.app_name+' '+appConfig.app_version;
				$scope.appRechargesubmit        = "RECHARGE!";
	
				/***** Pattern matching for registration starts******/
					$scope.amountpattern=/^[0-9]*$/;
					$scope.phonepattern=/^[1-9]+[0-9]*$/;
				/***** Pattern matching for registration ends******/ 
				console.log("Recharge CONTROLLER CALLED");
				$scope.goBack = function() {
					$state.go('app.appHome.offer');
					//$ionicNavBarDelegate.back();
				};
			
				/*** Operator SELECT BOX START ***/
	
	
	
				 $scope.select = function() {
			      			 console.log("Operator Called");
						 appIonicLoader.show();
			 	  //GET Operator List		
					getOperatorList.getOperatorData()
					.success(function (OperatorList) {
					$scope.items = OperatorList;
		
					console.log(OperatorList);
					})
					.error(function (error) {
					$scope.availOperatorListStatus 	= 'Unable to load App Wall data: ' + error.msg;
					})
					.finally(function(){
					// Call appIonicLoader to hide loader
					appIonicLoader.hide();
			   		});
			    
				 	console.log("Selected");
				 	 $scope.modal.show();	
			     	},
				$scope.value=function(selectid,selectoperators,selectkey){
				       console.log(selectid);
				       console.log(selectkey);
				       var selectoperators=localStorage.setItem('Operator',selectoperators);
				       var selectkey=localStorage.setItem('selectkey',selectkey);
			 	       
				       
				       $timeout(function(){
					       	$scope.modal.hide();  
					       	//$scope.modal1.show(); 
					var Operator		= localStorage.getItem('Operator');
					$scope.user.operator	= Operator;        
					},10);
				}
				$ionicModal.fromTemplateUrl('templates/operator.html', {
					scope: $scope,
					animation: 'slide-in-up'
					}).then(function(modal) {
					$scope.modal = modal;
				});
	

/*** Operator SELECT BOX END ***/
		$scope.recharge = function(formData){
	
			console.log(formData);
			
		     var amount=formData.amount;
		     var mobile1=localStorage.setItem('mobile',formData.mobile); 
		     var amount1=localStorage.setItem('amount',formData.amount);	
 	             var eq=10;
			if(amount>=eq)
			 {	    		 	
				var currentBalance=localStorage.getItem('currentBalance');
						if(amount<=currentBalance)
						{
							$state.go('rechargeconf');
						}
						else
						{

							$ionicLoading.show({
								template: "Amount entered is greater than your balance!!!",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
							},2000);
				
						}				
			}
			else
			{
				$ionicLoading.show({
					template: "Please Enter the amount above 10",
					maxWidth: 250
				});
				$timeout(function(){
					$ionicLoading.hide(); 	 //Icon Hide
				},2000);
					
			}
							
		}




	}
	else	
		{

		authUserLog.isLogged = false;

		var empty="";
		localStorage.setItem('CategoryList',empty);	
		localStorage.setItem('appEmail',empty);
		localStorage.setItem('appPassword',empty);
		localStorage.setItem('userId',empty);
		localStorage.setItem('select',empty);
		localStorage.setItem('categorySet',empty);

		$state.go('entry');

		
		}
	});
    	



}
else		 //If Internet Is Not Available
{
		alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
		//InternetCheck.show();
		console.log("Net is not available");
		$timeout(function(){
                     // InternetCheck.hide(); 	 //Icon Hide
                      
		      $window.location.reload();
                      console.log("Reloaded");        
		},5000);
		

}
});


});





mobapp.controller('rechargeconfController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getUserProfile,appIonicLoader,SaveProfile,$ionicNavBarDelegate,$rootScope,$ionicSideMenuDelegate,AuthService,authUserLog,$ionicLoading,Recharge){
	$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
	$scope.siteCurrency			= siteConfig.currency;
	$scope.RECHARGE     			= 'Please Confirm The Deatils';
	$scope.rechargeSubmit			= 'CONFIRM';
	$scope.rechargeCancel			= 'CANCEL';
	$scope.Profile				= {};
	$scope.user				= {};
	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{



		appIonicLoader.show();
	
		//Checking for User Login Details (User is deleted by admin or not)
		var appUserEmail 	= window.localStorage.getItem('appEmail');
		var appUserPassword 	= window.localStorage.getItem('appPassword');
		var credentials	= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);


				$scope.mobile 		= localStorage.getItem('mobile'); 
				var oper 		= localStorage.getItem('Operator');
				var len			= oper.length;
				if(len>20)
				{
					var operatorname	= oper.substr(0,20);
				 	$scope.operator 	= operatorname+"...";
				}
				else
				{
					$scope.operator 	= localStorage.getItem('Operator');
				}
				$scope.amount 		= localStorage.getItem('amount'); 
				$scope.user_id 		= localStorage.getItem('userId');

		appIonicLoader.hide();
		console.log("Profile CONTROLLER CALLED");

	
	$scope.goBack = function() {
		var empty="";
               localStorage.setItem('mobile',empty);
	       localStorage.setItem('Operator',empty);
               localStorage.setItem('amount',empty);
		$state.go('app.appHome.recharge');
		//$ionicNavBarDelegate.back();
	};
	

  		 //Save Profile Details

	$scope.goCancel= function(){
		var empty="";
               localStorage.setItem('mobile',empty);
	       localStorage.setItem('Operator',empty);
               localStorage.setItem('amount',empty);
		$state.go('app.appHome.recharge');
	};
  		


	$scope.goSubmit= function(){

	
							$ionicLoading.show({
								template: "Processing....",
								maxWidth: 250
							});

							var mobile 		= localStorage.getItem('mobile'); 
							var operator 		= localStorage.getItem('selectkey');
							var amount 		= localStorage.getItem('amount'); 
							var user_id 		= localStorage.getItem('userId');
							var operator_name 	= localStorage.getItem('Operator');
							var values = {mobile:mobile,operator:operator,amount:amount,user_id:user_id,operator_name:operator_name};
						console.log(values);
						Recharge.update(values,function(data){
							$ionicLoading.hide(); 		
							console.log(data);
							if(data.response == "success") {
							
							$ionicLoading.show({
								template: "Recharge is Done....",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
		      						$state.go('app.debited');
							},3000);
							
							}
							else if(data.response == "pending") {
							
							$ionicLoading.show({
								template: "Recharge is Pending....",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
		      						$state.go('app.debited');
							},3000);
							
							}
							else if(data.response == "failure") {
							
							$ionicLoading.show({
								template: "Recharge Failure....",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
		      						$state.go('app.debited');
							},3000);
							
							}
							else {
								$ionicLoading.show({
								template: "Recharge Failure...",
								maxWidth: 250
							});
							$timeout(function(){
								$ionicLoading.hide(); 	 //Icon Hide
		      						$state.go('app.appHome.recharge');
							},3000);
							}
						     });


		
	};
  	
	



		    	}
	else	
		{
		appIonicLoader.hide();
		authUserLog.isLogged = false;

		var empty="";
		localStorage.setItem('CategoryList',empty);	
		localStorage.setItem('appEmail',empty);
		localStorage.setItem('appPassword',empty);
		localStorage.setItem('userId',empty);
		localStorage.setItem('select',empty);
		localStorage.setItem('categorySet',empty);

		$state.go('entry');

		
		}
	});	




}
else		 //If Internet Is Not Available
{
		//InternetCheck.show();
		console.log("Net is not available");
		$timeout(function(){
                     // InternetCheck.hide(); 	 //Icon Hide
                      alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
		      $window.location.reload();
                      console.log("Reloaded");        
		},5000);
		

}
});


});




