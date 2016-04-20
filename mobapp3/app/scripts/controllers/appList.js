'use strict';

//Offers page List

mobapp.controller('AppListController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$rootScope,$state,appConfig,siteConfig,getAppList,appIonicLoader,$cordovaDevice,$cordovaGeolocation,appListvalue,$cordovaNetwork,$ionicLoading,AuthService,authUserLog){


		appIonicLoader.show();    							//loading image
		$scope.myData				= {};
		$scope.myData.showIt			= true;					//Mobbanner image show
		$scope.myData.showIt1 			= false; 				//No categories available image hide


		$scope.pageHeader       		= appConfig.app_name;
		$scope.pageHeaderSecond    		= appConfig.app_name_second;
		$scope.imgUrl				= siteConfig.imageUrl;
		$scope.currency				= siteConfig.currency;


	
	/**************** TRACK THE GEOLOCATION START ****************/

	
		$cordovaGeolocation.getCurrentPosition()
	
		.then(function (position) {
			var lat  = position.coords.latitude;
			var long = position.coords.longitude;
			window.localStorage.setItem('appLatitude',lat);
			window.localStorage.setItem('appLongitude',long);		
		}, function(err) {
			// An error occured.
		});
	
	// begin watching
	
			var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });
			watch.promise.then(function() { /* Not  used */ }, 
		function(err) {
			// An error occurred.
		}, 
		function(position) {
			// Active updates of the position here  , position.coords.[ latitude / longitude]
		
		});
	
	// clear watch
	
			$cordovaGeolocation.clearWatch(watch.watchID);
			var appLatitude 	= window.localStorage.getItem('appLatitude');
			var appLongitude 	= window.localStorage.getItem('appLongitude');	
			window.localStorage.removeItem('appLatitude');
			window.localStorage.removeItem('appLongitude');

	
	/****************** TRACK THE GEOLOCATION END ********************/


	
	/**************** TRACK THE DEVICE INFORMATION START ****************/
	
			var appDevice 				= $cordovaDevice.getDevice();
			var appModel 				= $cordovaDevice.getModel();
			var appManufacturer			= device.manufacturer;
			var appPlatform 			= $cordovaDevice.getPlatform();
			var appUuid 				= $cordovaDevice.getUUID();
			var appVersion 				= $cordovaDevice.getVersion();
			var appInnerWidth			= $window.innerWidth;
			var appInnerHeight			= $window.innerHeight;
			var networkState 			= navigator.connection.type;
			//var networkState 			= '2G';
			var appUserId 				= localStorage.getItem('userId');
		
			console.log("AppListController Called");

	
	/**************** TRACK THE DEVICE INFORMATION END ****************/

			$scope.appDevice	= appDevice;
			$scope.appModel 	= appModel;
			$scope.appManufacturer  = appManufacturer;
			$scope.appPlatform 	= appPlatform;
			$scope.appUuid 		= appUuid;
			$scope.appVersion 	= appVersion;
			$scope.appLatitude 	= appLatitude;
			$scope.appLongitude	= appLongitude;
			$scope.appInnerWidth	= appInnerWidth;
			$scope.appInnerHeight	= appInnerHeight;
			$scope.networkState 	= networkState;

	/********************TRACK DEVICE INFORMATION USING GEO LOCATION START******************/
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
	function onSuccess(position) {
	
		   	 $scope.Latitude	= position.coords.latitude;
		   	 $scope.Longitude	= position.coords.longitude;
		   	 $scope.Accuracy		= position.coords.accuracy;
		   	 var Accuracy		= position.coords.accuracy;
			 localStorage.setItem('Accuracy',Accuracy);
		   	 $scope.Timestamp		= position.timestamp;
		   	 var Timestamp		= position.timestamp;
		   	 localStorage.setItem('Timestamp',Timestamp);
		   	 $scope.Altitude	= position.coords.altitude;
		    	 $scope.AltitudeAccuracy= position.coords.altitudeAccuracy;
		  	 $scope.Heading		= position.coords.heading;
			 $scope.Speed		= position.coords.speed ;
		   	
	}
	function onError(error) {
	
    			console.log(error);
   	}

   	var Accuracy	=localStorage.getItem('Accuracy');
   	var Timestamp 	=localStorage.getItem('Timestamp');


	/*****************Telecom Operator tracking starts************************/
		
	var onDeviceReady = function(){
	    		window.plugins.TelephonyInfo.get(function(imeiSIM1,imeiSIM2) {
	       					localStorage.setItem('teleco',imeiSIM1);
	       					localStorage.setItem('teleco1',imeiSIM2);
	       					$scope.imei2= imeiSIM2;
		   	}, function() {
	    
             	});        
	};
		
		
			onDeviceReady();
			
	
			var teleco=localStorage.getItem('teleco');
			var teleco1=localStorage.getItem('teleco1');
			$scope.teleco=localStorage.getItem('teleco');
			$scope.teleco1=localStorage.getItem('teleco1');

	
	/*******************Telecom Operator tracking ends*************************/

		
	/*********************TRACK DEVICE INFORMATION USING GEO LOCATION END********************/		

	
	//APPEND TO THE URL REQUEST Parameters
	
	var target = {userid:appUserId,appDevice:appDevice,appModel:appModel,appPlatform:appPlatform,appUuid:appUuid,appVersion:appVersion,appLatitude:appLatitude,appLongitude:appLongitude,appInnerWidth:appInnerWidth,appInnerHeight:appInnerHeight,networkState:networkState,Accuracy:Accuracy,Timestamp:Timestamp,teleco:teleco,teleco1:teleco1,appManufacturer:appManufacturer};
			
	getUserAppList(target);

	// Displays User app list for offers page.
	 function getUserAppList(target) {

			//Check For Internet...
  		  $scope.onlineStatus = onlineStatus;  
   		  $scope.$watch('onlineStatus.isOnline()', function(online) {
    		  $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{



		//Checking for User Login Details (User is deleted by admin or not)  ***Starts***
		
		var appUserEmail 	= window.localStorage.getItem('appEmail');
		var appUserPassword 	= window.localStorage.getItem('appPassword');
		var credentials	= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
						authUserLog.isLogged = true;
						console.log('User Info Available', data);		
						console.log("Net available");  
						$scope.myData = {};
		               		 	$scope.myData.showIt = true;
							// Call appIonicLoader to show loader 

						 //Fetching the app data form list and checks for null
						 
						getAppList.getAppData(target)
						    .success(function (appList) {
						     	var value='null';
						    	if(appList==value)  // If app is not available
						    	{	
							    	$scope.myData.showIt = false;
							    	appIonicLoader.hide();
							    	console.log("null called");
							    	$scope.myData.applist = false;
							    	$scope.myData.showIt1 = true;
							       	console.log("null ended");	
							       	}
						       	else			// Is app is available
						       	{

						       		$scope.myData.showIt  = false;
						       		$scope.myData.applist = true;
						    		appIonicLoader.hide();
								$scope.availAppList   = appList;
						       		appListvalue.store(appList);
						  	}
							console.log(appList);
				
						    })
						    .error(function (error) {
						    		$scope.myData.showIt = false;
						    		appIonicLoader.hide();
								$scope.availAppListStatus 	= 'Unable to load App Wall data: ' + error.msg;
						    })
						    .finally(function(){
		
						     });

		
					 	$scope.AppBigImage = function(bannerid,request_id) {

							getAppList.callLGforImpression(bannerid,request_id)
								.success(function () {
									console.log("success Lg File called");                
						   		})
						    		.error(function (error) {
									console.log("Unable to call Lg File");
						    		});
					 		
								 localStorage.setItem('bannerid',bannerid);
								 localStorage.setItem('request_id',request_id);
								 $state.go('app.appDetail');
							}
						$scope.in = function(ind,bannerid) {
						     	localStorage.setItem('bannerid',bannerid);
							localStorage.setItem('in',ind);
						}

		  }
	          else			//Checking for User Login Details (User is deleted by admin or not)  ***Ends***
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
						appIonicLoader.hide();
						//InternetCheck.show();
						console.log("Net is not available");
						$timeout(function(){
							     //InternetCheck.hide(); 	 
							     alert("Not able to connect to Mobbanner \n Please check your network \n connection and try again");
							     $state.go('app.appHome.balance');
							     //$window.location.reload();
							     console.log("Reloaded");        
						},5000);
		

}
});	
    };
    


$scope.doRefresh = function() {

		getAppList.getAppData(target)
	        .success(function (appList) {
		        $scope.availAppList 		= appList;
		        appListvalue.store(appList);
		        console.log(appList);
		 })
		 .error(function (error) {
		        $scope.availAppListStatus 	= 'Unable to load App Wall data: ' + error.msg;
		 })
            	 .finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		 });
}; 	
});



// Function not used
mobapp.controller('AppRechargeController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,AuthService,authUserLog){


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


				$scope.pageHeader       		= appConfig.app_name;
				$scope.pageHeaderSecond    		= appConfig.app_name_second;
				$scope.imgUrl				= siteConfig.imageUrl;
				$scope.currency				= siteConfig.currency;	

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
else		  //If Internet Is Not Available
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



//Offers Page Big Picture display

mobapp.controller('AppDetailController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$stateParams,$state,appConfig,siteConfig,getAppList,$ionicSlideBoxDelegate,$interval,appIonicLoader,$ionicNavBarDelegate,appListvalue,getAppBigImage,AuthService,authUserLog,getPageContent){


    		 appIonicLoader.show();
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


						$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
						$scope.imgUrl				= siteConfig.imageUrl;
						$scope.currency				= siteConfig.currency;
						var slideCounter			= 1;	
						var maxSlides 				= 1;
						var target 				= '';
						$scope.selectIndex			= ($stateParams.selectIndex)?$stateParams.selectIndex:'';
						var selectIndex1			= localStorage.getItem('in');
						$scope.myActiveSlide 			= selectIndex1;
						$scope.bannerid				= localStorage.getItem('bannerid');
						console.log($scope.bannerid);
						var appId				= ($stateParams.appId)?$stateParams.appId:'';
						var request_id				= ($stateParams.request_id)?$stateParams.request_id:'';
	
	
						//CALL THE SERVICE TO RETRIEVE THE OFFER WALL LIST ARRAY STORED FROM AppListController
		
					    	var appDetailList 		= appListvalue.retrieve();
						var maxSlides 			= appDetailList.length;
						console.log("appDetailList",appDetailList);
						console.log(appDetailList.length);
						appListvalue.destory();
						var appid=localStorage.getItem('bannerid');
						var userId=localStorage.getItem('userId');

						getPageContent.getPageContentData()
							.success(function (Content) {
								 console.log(Content);
							  	 $scope.PageContent=Content;
		
							})
							.error(function (error) {
								$scope.availPageContentStatus 	= 'Unable to load App Wall data: ' + error.msg;
							})
							.finally(function(){
								// Call appIonicLoader to hide loader
					   		});
	
					       getAppBigImage.getDetails(userId,appid)
						   	.success(function (appList) {
							    	appListvalue.store(appList);
							    	var appDetailList 		= appListvalue.retrieve();
							    	//alert("appDetailList="+appDetailList);
							    	$scope.availAppList 		= appDetailList;
							    	$scope.filename    		= $scope.availAppList.filename;
							    	//alert("$scope.filename="+$scope.filename);
							    	$scope.bannertext    		= $scope.availAppList.bannertext;
							    	$scope.quotes    		= $scope.availAppList.quotes;
							    	$scope.points    		= $scope.availAppList.points;
							    	$scope.big_picture    		= $scope.availAppList.big_picture;
							    	$scope.click_url    		= $scope.availAppList.click_url;
								$scope.appBigImage 		= appList;
							  	appListvalue.store(appList);
								console.log(appList);		
						    	})
						    	.error(function (error) {
								$scope.availappBigImageStatus 	= 'Unable to load App Wall data: ' + error.msg;
						   	})
							.finally(function(){
								// Call appIonicLoader to hide loader 
								appIonicLoader.hide();
							});

					 		$scope.setActive = function(idx) {
					   			 $scope.slides[idx].active=true;
					 		 }

							
					     $scope.goPlayStore	= function(url){
					     
							//alert("google playstore url="+url);
							var urlTargetParams	=localStorage.getItem('urlTargetParams');
							var bannerid	=localStorage.getItem('bannerid');
							var request_id	=localStorage.getItem('request_id');
							//alert("urlTargetParams="+urlTargetParams);
							var installurl=url+'bannerid='+bannerid+'&request_id='+request_id+'&'+urlTargetParams;
							//alert("installurl"+installurl);
							$window.open(installurl,'_system','location=yes');		
							console.log(url);			
							
					    };
					    $scope.goBack = function() {
							$ionicNavBarDelegate.back();
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
