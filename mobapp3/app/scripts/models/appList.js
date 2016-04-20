'use strict';

mobapp.factory('getAppList',function($http,appREST){

			var urlBase			= appREST.baseUrl;
			var getAppList			= {};
			var urlTargetParams		= '';
	
			getAppList.getAppData = function(target) {

				var urlTargetParams	= encodeURI('userid='+target.userid+'&deviceName='+target.appDevice.name+'&deviceModel='+target.appModel+'&deviceVersion='+target.appVersion+'&devicePlatform='+target.appDevice.platform+'&uuid='+target.appDevice.uuid+'&latitude='+target.appLatitude+'&longitude='+target.appLongitude+'&Width='+target.appInnerWidth+'&Height='+target.appInnerHeight+'&networkState='+target.networkState+'&Accuracy='+target.Accuracy+'&Timestamp='+target.Timestamp+'&teleco='+target.teleco+'&Manufacturer='+target.appManufacturer);	
				window.localStorage.setItem('urlTargetParams',urlTargetParams);	
				//alert("urlTargetParams="+urlTargetParams);
				//return $http.get(urlBase+'apitest/request.php?'+urlTargetParams); // for developement server
				return $http.get(urlBase+'api/request.php?'+urlTargetParams); // for Mobbanner Live URL
			};
	
			getAppList.callLGforImpression = function(appId,request_id) {
			
				console.log('LG== http://mobbanner.com/adserver/ads/www/delivery/lg.php?bannerid='+appId+'&zoneid=0&request_id='+request_id);
				console.log('lg file called');
				return $http.get(urlBase+'ads/www/delivery/lg.php?bannerid='+appId+'&zoneid=0&request_id='+request_id);
			};
	
			return getAppList;
});

mobapp.service('appListvalue',function(){

			this.store		= function(value) {
				this.list	= value;
				localStorage.setItem('key', value);
				console.log("this.store::"+value);
			};
			this.retrieve	= function() {
				console.log("this.retrieve::"+this.list);
				return this.list;
		
			};
			this.destory	= function() {
				this.list	= null;
			};
			
			return this;
});
