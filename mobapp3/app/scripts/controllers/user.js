'use strict';

mobapp.controller('entryController',function($scope,onlineStatus,InternetCheck,$state,$window,$timeout,$ionicViewService,appIonicLoader,$rootScope) {

	//Check For Internet...
    	$scope.onlineStatus 		= onlineStatus;  
    	$scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status 		= online ? 'true' : 'false';
    


if($scope.online_status=='true')
{

	
	console.log("Net available");


	var appInnerWidth			= $window.innerWidth;
	var appInnerHeight			= $window.innerHeight;
	$scope.Width				= appInnerWidth/8+23+'%';
	var side				= appInnerWidth/16+'%';
	$scope.side1				= side;
	
	var buttonwidth				= appInnerHeight/2-12+'px';
	$scope.start				= buttonwidth;
	$scope.InnerHeight			= appInnerHeight/8+10+'px';
	
	
	$scope.myData = {};    //Image OnLoad...
        $scope.myData.showIt = true;
        appIonicLoader.show();     //Icon OnLoad...
        
	$scope.signIn = function() {
			$state.go('login');
			$ionicViewService.nextViewOptions({
			disableAnimate: true,
			disableBack: true
			});
	}
	$scope.register = function() {
		$state.go('register');
		$ionicViewService.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
	};
	$timeout(function(){
                      $scope.myData.showIt = false;  //Image Hide
                      appIonicLoader.hide();          //Icon Hide
		},1000);



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

mobapp.controller('SignInCtrl', function($scope,onlineStatus,$state,appConfig,AuthService,authUserLog,appIonicLoader,$timeout,$ionicLoading,$ionicModal,Session,$rootScope,InternetCheck,$window) {

		//Check For Internet...
		 $scope.onlineStatus 		= onlineStatus;  
    		 $scope.$watch('onlineStatus.isOnline()', function(online) {
        	 $scope.online_status 		= online ? 'true' : 'false';
 
if($scope.online_status=='true')
{

		    console.log("Net available");	
		    $scope.pageHeader         = appConfig.app_name+' '+appConfig.app_version;
		    $scope.loginTitle         = 'Sign in to Mob Banner';
		    $scope.emailPlaceTxt      = 'Email';
		    $scope.pwdPlaceTxt        = 'Password';
		    $scope.signinBtnTxt       = 'SIGN IN';
		    $scope.signupLabel        = 'Are you new user ? Click here to join with us!';
		    $scope.signupBtnTxt       = 'CREATE NEW ACCOUNT';
		    $scope.forgotPassword     = 'Forgot Password?';
		    $scope.formError          = false;
		    $scope.status             = 'Loading...';
		    $scope.user               = {username : '', password: ''};
		    $scope.inputType = 'password';
  
		   // Hide & show password function
		   $scope.hideShowPassword = function(){
   		 		if ($scope.inputType == 'password')
     				 	$scope.inputType = 'text';
    		 		else
      				 	$scope.inputType = 'password';
  	 	   };
		   $scope.signIn         = function(credentials){		
		   // Call appIonicLoader to show loader 
		   appIonicLoader.show();				
		   AuthService.validate(credentials,function(data){
			
			if(data.response === 'success'){
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				authUserLog.isLogged = true;
				console.log('Sign-In', data);
				window.localStorage.setItem('appEmail',credentials.email);
				window.localStorage.setItem('appPassword',credentials.password);			
				/*** SHOW CATEGORY IF USER NOT SELECTED ANY CATEGORY ***/
				if(window.localStorage.getItem('categorySet')) {
					$state.go('app.appHome.offer');
				}
				else
				{
				        //$rootScope.userId=data.userObj.id;
				        var UserId=localStorage.setItem('userId',data.userObj.id);
				        //alert(data.userObj.id);
					$state.go('category');					
				}
				/*** SHOW CATEGORY IF USER NOT SELECTED ANY CATEGORY ***/
			}
			else if(data.response === 'pending'){
				appIonicLoader.hide();
				authUserLog.isLogged = false;				
				//Show Login Error
				$ionicLoading.show({
					template: "Please Activate your link <br>check your mail!!"
				});
				
				$timeout(function(){
					//Hide Login Error
					$ionicLoading.hide();
					
				},3000);
			}
			else{
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				authUserLog.isLogged = false;				
				//Show Login Error
				$ionicLoading.show({
					template: data.msg+"!"
				});				
				$timeout(function(){
					//Hide Login Error
					$ionicLoading.hide();
					
				},3000);
			 }
		   });
		   };	
		   $scope.resetPassword = function() {
				$state.go('forgotPassword');
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

mobapp.controller('registerController',function($scope,onlineStatus,InternetCheck,$window,$timeout,appConfig,$ionicNavBarDelegate,$state,$ionicModal,SignUpService,appIonicLoader,$cordovaDatePicker,$filter,$rootScope,$ionicLoading,getCountryList){
			//Check For Internet...
			$scope.onlineStatus 		= onlineStatus;  
			$scope.$watch('onlineStatus.isOnline()', function(online) {
			$scope.online_status 		= online ? 'true' : 'false';
if($scope.online_status=='true')
{

			console.log("Net available");
			$scope.pageHeader       	= appConfig.app_name+' '+appConfig.app_version;
			$scope.appRegister      	= "Registration";
			$scope.appRegistersubmit        = "GET IN NOW!";
			$scope.user			= {};
			$scope.country			= '';
			$scope.user.gender		= '1';
	
			$scope.goBack 			= function() {
							  $state.go('entry');
			};
	
			/*** COUNTRY SELECT BOX START ***/
			$scope.select = function() {
			      	console.log("Country Called");
			     	$scope.data = {};
				appIonicLoader.show();
			 	//GET Country List		
				getCountryList.getCountryData()
				.success(function (CountryList) {
					$scope.items = CountryList;
					console.log(CountryList);
				})
				.error(function (error) {
					$scope.availCountryListStatus 	= 'Unable to load App Wall data: ' + error.msg;
				})
				.finally(function(){
					// Call appIonicLoader to hide loader
					appIonicLoader.hide();
			   	});
			        $scope.clearSearch = function() {
			        	$scope.data.searchQuery = '';
			        };
					 console.log("Selected");
				  	 $scope.modal.show();	
			 },
			 $scope.value=function(selectid,selectname){
				  console.log(selectid);
				  console.log(selectname);
				  $scope.user.countryname=selectname;
				  $scope.user.country=selectid;
				  $scope.modal.hide();
			}
			$ionicModal.fromTemplateUrl('templates/countryList.html', {
				  scope: $scope,
				  animation: 'slide-in-up'
			}).then(function(modal) {
				  $scope.modal = modal;
			});
			/*** COUNTRY SELECT BOX END ***/

	
			/**** DatePicker for Date  Start****/
			
			var options,
			dateType,
			msg = 'not picked yet',
			handleDatePicker = function (date) {		
			  	 $scope.data[dateType] = date;
			  	 var dateAsString = $filter('date')(date, "dd/MM/yyyy");
			  	 var dateAsString1 = $filter('date')(date, "yyyy/MM/dd");
				 var dateyear = $filter('date')(date, "yyyy");
			  	 var datenewyear = $filter('date')(new Date(), "yyyy");
			  	 var empty="NaN/NaN/0NaN";
			  	 if(dateAsString==empty)
			  	 {
			  		$scope.user.dob= "";
			  		$scope.user.dob1= "";
			  	 }
			  	 else if(dateyear>datenewyear)
			  	 {
			  		$ionicLoading.show({
						template: "Year is Not valid!!",
						maxWidth: 250


					});
					$timeout(function(){
						//Hide Login Error
						$ionicLoading.hide();
					},1000);			
			  		$scope.user.dob= "";
			  		$scope.user.dob1= "";
			  	}
			  	else
			  	{
			  		$scope.user.dob1= dateAsString;
			  		$scope.user.dob=dateAsString1;
			  		$scope.$apply();
			  	}			  
			};
		    	$scope.data = {
		     		date: msg,
		      		time: msg
		       };
		       $scope.pick = function (type) {
		      		options = {
					date: new Date(),
					mode: type
		      		};
		     		dateType = type;
		      		$cordovaDatePicker.show(options, handleDatePicker);
		       };
		      /**** DatePicker for Date  End****/

		      /***** Pattern matching for registration starts******/
				$scope.phonepattern=/^[1-9]+[0-9]*$/;
				$scope.agepattern=/^[1-9]+[0-9]*$/;
				$scope.emailpattern=/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
				$scope.namepattern=/^[a-zA-Z]+[a-zA-Z0-9._#]*$/;
		      /***** Pattern matching for registration ends******/

		       
			//Sign Up button action
			$scope.signup = function(isValid,formData){   
				console.log(formData);
		
				// Call appIonicLoader to show loader 
				appIonicLoader.show();
		
				SignUpService.validate(formData,function(data){
					console.log("Data:",data);
					if(data.response === 'success'){

						$ionicLoading.show({
							template: "Registered Successfully!.<br>You can Login Now",
							maxWidth: 250
						});
						console.log(data);
						$timeout(function(){
							//Hide Sign up Error
							$ionicLoading.hide();
							appIonicLoader.hide();
							$state.go('login');
						},5000);
						// Call appIonicLoader to hide loader 
				
					}else{
						// Call appIonicLoader to hide loader 
						appIonicLoader.hide();
						//Show Sign up Error
				
						if(data.msg.email)
						{
						$ionicLoading.show({
							template: data.msg.email+"!",
							maxWidth: 250
						});
						}
						if(data.msg.mobile)
						{
						$ionicLoading.show({
							template: data.msg.mobile+"!",
							maxWidth: 250
						});
						}
						$timeout(function(){
							//Hide Sign up Error
							$ionicLoading.hide();
						},3000);
						console.log(data);
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

mobapp.controller('forgotPasswordController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$rootScope,$state,appConfig,credentialValidate,appIonicLoader,$ionicLoading,emailSend,getUserProfile){
		//Check For Internet...
    		$scope.onlineStatus 			= onlineStatus;  
    		$scope.$watch('onlineStatus.isOnline()', function(online) {
        	$scope.online_status 			= online ? 'true' : 'false';
if($scope.online_status=='true')
{
		console.log("Net available");
		var appInnerWidth			= $window.innerWidth;
		var appInnerHeight			= $window.innerHeight;
		$scope.Height				= appInnerHeight/20+'%';	
		$scope.pageHeader       		= appConfig.app_name+' '+appConfig.app_version;
		$scope.forgetPasswordInput		= 'Enter your registered email';
		$scope.forgetPasswordButton		= 'Submit';
		$scope.forgotPasswordButtonText		= 'Login';
		$scope.forgotPasswordSuccessNotify	= 'Your password has been resetted successfully';
		$scope.checkUserEmail			= function(userData) {		
		// Call appIonicLoader to show loader 
		appIonicLoader.show();
		
		credentialValidate.emailValidate(userData,function(data){
			if(data.response === 'ok'){
				// Call appIonicLoader to hide loader 
					
					appIonicLoader.hide();	
					$state.go('newPassword');
					$rootScope.useremail	= userData.email;	   	

					/*
				var fields	= userData.email;
				
				emailSend.emailsender(fields,function(data){		
				        
								
					if(data.response === 'ok'){


						appIonicLoader.hide();
						
						$ionicLoading.show({
									template: "Mail Sent Successfully!!!!",
									maxWidth: 250
						});
				
						$timeout(function(){
									//Hide Login Error
									$ionicLoading.hide();
									$state.go('newPasswordSuccess');
									$rootScope.useremail	= userData.email;
						},3000);				
										
					}
					else
					{
						
						appIonicLoader.hide();
									//Show Login Error
						$ionicLoading.show({
									template: "Mail Send Failed!",
									maxWidth: 250
						});
				
						$timeout(function(){
									//Hide Login Error
									$ionicLoading.hide();
						},3000);
					}
								// mail send to user
				});

				*/
				
			}else{
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				
				//Show Login Error
				$ionicLoading.show({
					template: data.msg+"!",
					maxWidth: 250
				});
				
				$timeout(function(){
					//Hide Login Error
					$ionicLoading.hide();
				},3000);
				
			}
		});
		
	}






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
mobapp.controller('newPasswordController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$rootScope,$state,appConfig,updateUserPassword,appIonicLoader){



	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{
	console.log("Net available");






	$scope.userValideEmail				= $rootScope.useremail;
	$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
	$scope.newPasswordButtonText		= 'Reset password';
	$scope.forgotPasswordButtonText		= 'Login';
	$scope.forgotPasswordSuccessNotify	= 'Your password has been Changed Successfully!!';
	$scope.changePassword				= function(userData) {
		
		// Call appIonicLoader to show loader 
		appIonicLoader.show();
		
		var updatePassword	= {upw:userData.password,uconfirm_password:userData.confirmPassword,uemail:$scope.userValideEmail};
		$rootScope.useremail				= '';
		updateUserPassword.update(updatePassword,function(data){
			if(data.response == "ok") {
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				$state.go('newPasswordSuccess');
			}else{
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				$state.go('app.appHome.offer');
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

mobapp.controller('AppHomeController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state){


			$scope.appOffer						= "OFFERS";
			$scope.appBalance					= "BALANCE";
			$scope.appRecharge					= "RECHARGE"; 



});

mobapp.controller('categoryController',function($scope,onlineStatus,InternetCheck,$window,$timeout,appConfig,$state,getCategoryList,updateCategoryList,appIonicLoader,$rootScope,$ionicLoading){



	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{
	console.log("Net available");







	$scope.pageHeader       = appConfig.app_name+' '+appConfig.app_version;
	$scope.myData 			= {};
	appIonicLoader.show();

    //GET Category List		
	getCategoryList.getCategoryData()
	.success(function (CategoryList) {
		$scope.roles		= CategoryList;
		
		var Category=localStorage.setItem('CategoryList',CategoryList);


		
		console.log(CategoryList);
	})
	.error(function (error) {
		$scope.availCategoryListStatus 	= 'Unable to load App Wall data: ' + error.msg;
	})
	.finally(function(){
		// Call appIonicLoader to hide loader
		appIonicLoader.hide();
   	});
    
       
	$scope.selection=[];
	
	// toggle selection for a given employee by name
	$scope.toggleSelection = function toggleSelection(categoryId) {
		
				var idx = $scope.selection.indexOf(categoryId);


				// is currently selected
				if (idx > -1) {

					$scope.selection.splice(idx, 1);
				} // is newly selected
				else {
					$scope.selection.push(categoryId);
				}
				var select = $scope.selection; 
		
		localStorage.setItem('select',select);
	};


	var Category	=localStorage.getItem('CategoryList');
	$scope.roles1 = Category;
  $scope.user = {
    roles: []
  };
  $scope.checkAll = function() {
    $scope.user.roles = $scope.roles.map(function(item) { return item.category_id; });
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push(1);
  };

		
	
 	$scope.categorySubmit = function() {
		var select = $scope.user.roles; 
		localStorage.setItem('select',select);
		var user_id	= localStorage.getItem('userId');;	
		var selection=localStorage.getItem('select');
		var values = {category_id:selection,user_id:user_id};
		appIonicLoader.show();
		if(selection)
		{
		console.log(values);
		updateCategoryList.update(values,function(data){		
			console.log(data);
			if(data.response == "success") {
				//Set the category status to true - this will hide the category in further pages
				window.localStorage.setItem('categorySet','1');
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				console.log("Updated");
				$state.go('app.appHome.offer');
			}else{
				// Call appIonicLoader to hide loader 
				appIonicLoader.hide();
				console.log("error");
				$state.go('login');
			}
		});
		}
		else
		{
		appIonicLoader.hide();
		console.log("Category Not Selected");
				$ionicLoading.show({
					template: "Please select atleast one Category!",
					maxWidth: 250
				});
				$timeout(function(){
					//Hide Login Error
					$ionicLoading.hide();
				},3000);
		}
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

mobapp.controller('appWalletBalanceController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$rootScope,AuthService,authUserLog){

	appIonicLoader.show();
	console.log('appWalletBalanceControllercalled');
	
	$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
	$scope.siteCurrency					= siteConfig.currency;
	$scope.currentBalance      			= 'Current Balance';
	$scope.totalCredited      			= 'Total Amount Credited';
	$scope.totalDebited      			= 'Total Amount Debited';
	$scope.rechargeNow					= "RECHARGE NOW";
	$scope.creditHistory				= "CREDIT HISTORY";
	$scope.debitHistory					= "DEBIT HISTORY";
 
	//GET TOTAL CURRENT, CREDIT, DEBIT BALANCE
	appWalletTotal();
	function appWalletTotal(){



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
		


		// Call appIonicLoader to show loader 
		//appIonicLoader.show();
		
		var user=localStorage.getItem('userId');
		getAppBalance.getTotalBalance(user)
		.success(function(wallet){
			$scope.getTotal	 		= wallet;
		var totRecharge=wallet.totalRecharge;
		var curBalance=wallet.currentBalance;
		window.localStorage.setItem('currentBalance',curBalance);
		console.log("totRecharge",totRecharge);
		console.log("curBalance",curBalance);
			if((totRecharge=== null)&&(curBalance=== null))
			{
			//$scope.totalRecharge1=wallet.totalEarnings;
			//$scope.currentBalance1=wallet.totalEarnings;
			$scope.totalRecharge1="0.00";
			$scope.currentBalance1="0.00";
			}
			else
			{
			$scope.totalRecharge1=totRecharge;
			$scope.currentBalance1=curBalance;
			}
			console.log(wallet);
		})
		.error(function(error){
			$scope.getTotalStatus	= 'Unable to load App details: ' + error.msg;
		})
		.finally(function(){
			// Call appIonicLoader to hide loader
			appIonicLoader.hide();
		});




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

		
	};

	
	$scope.rechargeUser = function() {
	 	console.log("Recharge Button Clicked");
		$state.go('app.appHome.recharge');
	};	
	$scope.goCredit = function() {
		$state.go('app.credited');
	};	
	$scope.goDebit = function() {
		$state.go('app.debited');
	};	

});
mobapp.controller('appWalletCreditedController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicLoading,$ionicNavBarDelegate,$rootScope,AuthService,authUserLog){

	appIonicLoader.show();

	$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
	$scope.siteCurrency					= siteConfig.currency;
	$scope.creditedHistory     			= 'Credit History';

	var appInnerWidth				= $window.innerWidth;
	var appInnerHeight				= $window.innerHeight;
	$scope.Width					= appInnerWidth/8+23+'%';
	var side					= appInnerWidth/16+'%';
	$scope.side1					= side;
	
	

	
	appWalletCredited();
	function appWalletCredited(){





	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{
	console.log("Net available");




		$scope.myData = {};
		$scope.myData.showIt2 = false;
		//Checking for User Login Details (User is deleted by admin or not)
		var appUserEmail 	= window.localStorage.getItem('appEmail');
		var appUserPassword 	= window.localStorage.getItem('appPassword');

		var credentials	= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);
				


		
		// Call appIonicLoader to show loader 
		//appIonicLoader.show();
		var user=localStorage.getItem('userId');		
		getAppBalance.getCreditedHistory(user)
		
		.success(function(credit){


		var result=credit.response;
		console.log(result);
			if(result=='success')
			{
				console.log(credit);
				$scope.creditHistory		= credit.data;
			}
			else
			{	
				appIonicLoader.hide();
				$scope.creditHistory		="";
				$scope.myData.showIt2 = true;	
			}	
			
		})
		.error(function(error){
			$scope.creditHistoryStatus	= 'Unable to load App details: ' + error.msg;
		})
		.finally(function(){
			// Call appIonicLoader to hide loader 
			appIonicLoader.hide();
		});





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





		
	};
	$scope.goBack = function() {
		$state.go('app.appHome.balance');
	};
});
mobapp.controller('appWalletDebitedController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,appConfig,siteConfig,getAppBalance,appIonicLoader,$ionicNavBarDelegate,$rootScope,AuthService,authUserLog,$ionicLoading){

	appIonicLoader.show();
	
	$scope.pageHeader       			= appConfig.app_name+' '+appConfig.app_version;
	$scope.siteCurrency					= siteConfig.currency;
	$scope.debitedHistory      			= 'Debit History';
	appWalletDebited();
	function appWalletDebited(){






	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{
	console.log("Net available");


		$scope.myData = {};
		$scope.myData.showIt2 = false;
		//Checking for User Login Details (User is deleted by admin or not)
		var appUserEmail 	= window.localStorage.getItem('appEmail');
		var appUserPassword 	= window.localStorage.getItem('appPassword');
		var credentials	= {email:appUserEmail,password:appUserPassword};
		AuthService.validate(credentials,function(data){
			
		if(data.response === 'success'){
				authUserLog.isLogged = true;
				console.log('User Info Available', data);
				


		
		// Call appIonicLoader to show loader 
		//appIonicLoader.show();
		var user=localStorage.getItem('userId');
		getAppBalance.getDebitedHistory(user)
		.success(function(debit){
			var result=debit.response;
			console.log(result);
			if(result=='success')
			{
				console.log(debit);
				$scope.debitHistory		= debit.data;
			}
			else 
			{	

				appIonicLoader.hide();
				$scope.debitHistory		="";
				$scope.myData.showIt2 = true;
			}
			
		})
		.error(function(error){
			$scope.debitHistoryStatus	= 'Unable to load App details: ' + error.msg;
		})
		.finally(function(){
			// Call appIonicLoader to hide loader 
			appIonicLoader.hide();
		});
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



	};
	$scope.goBack = function() {
		$state.go('app.appHome.balance');
	};	
});
mobapp.controller('logoutController',function($scope,onlineStatus,InternetCheck,$window,$timeout,$state,$ionicViewService,authUserLog) {

	//Check For Internet...
    $scope.onlineStatus = onlineStatus;  
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status = online ? 'true' : 'false';
    


if($scope.online_status=='true')
{
	console.log("Net available");


	
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
mobapp.directive('match', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		scope: {

			match: '='
		},
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(function() {
				return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
			}, function(currentValue) {
				ctrl.$setValidity('match', currentValue);
			});
		}
	};
});
