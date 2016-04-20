alert("Welcome");
  				cordova.plugins.notification.local.schedule({
  id         : 1,
  title      : 'I will bother you every minute',
  text       : '.. until you cancel all notifications',
  sound      : null,
  every      : 'minute',
  autoClear  : false,
  at         : new Date(new Date().getTime() + 10*1000)
});
  				window.plugin.notification.local.add({ message: 'Great app!' }); 
  				window.plugins.notification.local.schedule({
					  id         : 1,
					  title      : 'I will bother you every minute',
					  text       : '.. until you cancel all notifications',
					  sound      : null,
					  every      : 'minute',
					  autoClear  : false,
					  at         : new Date(new Date().getTime() + 10*1000)
				});
				 		var alarmTime = new Date();
						 alert("alarmTime:"+alarmTime);
						 console.log("alarmTime:",alarmTime);
      						 alarmTime.setMinutes(alarmTime.getMinutes() + 1);
      						 
      						  $cordovaLocalNotification.add({
								    id: "1234",
								    date: alarmTime,
								    message: "This is a message",
								    title: "This is a title",
								    autoCancel: true,
								    sound: null
							}).then(function () {
				    				    console.log("The notification has been set");
							});
	    						 window.plugins.notification.local.schedule([{
								    id: 1,
								    text: 'Multi Message 1'
								}, {
								    id: 2,
								    text: 'Multi Message 2'
								}, {
								    id: 3,
								    text: 'Multi Message 3'
								}]);




ionicApp.controller("ExampleController", function($scope, ) {
 
    $scope.add = function() {
       
    };
 
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
 
});
cordova.plugins.notification.local.schedule({
    id: 1,
    title: "Production Jour fixe",
    text: "Duration 1h",
    firstAt: monday_9_am,
    every: "week",
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { meetingId:"123#fg8" }
});

				window.plugin.notification.local.add(
      				      options,
           				 function (result) {
             					 q.resolve(result);
            				},
            			scope);
				
	   window.plugin.notification.local.onadd = function (id, state, json) {
            var notification = {
                id: 'id',
                state: 'state',
                json: 'json'
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
            }
				 $cordovaLocalNotification.add({
            id: "1234",
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
       
    
				 window.plugins.notification.local.schedule([{
                    id: 1,
                    text: 'Multi Message 1'
                }, {
                    id: 2,
                    text: 'Multi Message 2'
                }, {
                    id: 3,
                    text: 'Multi Message 3'
                }]);
                
            			
				cordova.plugins.notification.local.schedule({
  id         : 1,
  title      : 'I will bother you every minute',
  text       : '.. until you cancel all notifications',
  sound      : null,
  every      : 'minute',
  autoClear  : false,
  at         : new Date(new Date().getTime() + 10*1000)
});
				$cordovaLocalNotification.add({
										id: '1',
										message: "Push!!"
									})
				cordova.plugins.notification.local.on("click", function(notification) {
    alert("clicked: " + notification.id);
});

					    document.addEventListener("deviceready", function () {
					      $rootScope.$on("$cordovaLocalNotification:trigger", function (event, notification, state) {
						console.log("notification id:" + notification.id + " state: " + state);
					      });
					    }, false);
		                $cordovaLocalNotification.add({
					id: '1',
					message: "Push!!"
				    })
				
				 window.plugin.notification.local.add({ 
     								 id: 'MYLN',     
      								 message: "this is a notification"
  				 });
					$cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
					    alert("Notification 1234 Scheduled: " + isScheduled);
					    console.log("IsSchedled1234 Called");
					});
						console.log("goBack Called");
  						window.plugin.notification.local.add({
					      id: 'MYLN',
					      title:   'tit',
					      message: 'msg',
					      icon:      'ic_notification',
					      smallIcon: 'ic_notification_small',
				});
				};
				$scope.$on('onReminderAdded', function(event, id, state, json) {
  					console.log('notification ADDED, id: ' + id  + ' state:' + state + ' json:' + json );
				});
				$scope.$on("$cordovaLocalNotification:added", function(id, state, json) {
					console.log("cordovaLocalNotification Called");
   					 alert("Added a notification");
				});
				    $scope.add = function() {
				    console.log("add alled");
					var alarmTime = new Date();
					alarmTime.setMinutes(alarmTime.getMinutes() + 1);
					$cordovaLocalNotification.add({
					    id: "1234",
					    date: alarmTime,
					    message: "This is a message",
					    title: "This is a title",
					    autoCancel: true,
					    sound: null
					}).then(function () {
					    console.log("The notification has been set");
					});
				    };
				 
				   $scope.isScheduled = function() {
				   	console.log("Is Schedled Called");
					$cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
					    alert("Notification 1234 Scheduled: " + isScheduled);
					});
				    }



			module.controller('MyCtrl',
  ['$scope', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification',
   function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {

  $ionicPlatform.ready(function () {

    // ========== Scheduling

    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        data: {
          customProperty: 'custom value'
        }
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleMultipleNotifications = function () {
      $cordovaLocalNotification.schedule([
        {
          id: 1,
          title: 'Title 1 here',
          text: 'Text 1 here',
          data: {
            customProperty: 'custom 1 value'
          }
        },
        {
          id: 2,
          title: 'Title 2 here',
          text: 'Text 2 here',
          data: {
            customProperty: 'custom 2 value'
          }
        },
        {
          id: 3,
          title: 'Title 3 here',
          text: 'Text 3 here',
          data: {
            customProperty: 'custom 3 value'
          }
        }
      ]).then(function (result) {
        // ...
      });
    };

    $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);

      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleEveryMinuteNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        every: 'minute'
      }).then(function (result) {
        // ...
      });
    };

    // =========/ Scheduling

    // ========== Update

    $scope.updateSingleNotification = function () {
      $cordovaLocalNotification.update({
        id: 1,
        title: 'Title - UPDATED',
        text: 'Text - UPDATED'
      }).then(function (result) {
        // ...
      });
    };

    $scope.updateMultipleNotifications = function () {
      $cordovaLocalNotification.update([
        {
          id: 1,
          title: 'Title 1 - UPDATED',
          text: 'Text 1 - UPDATED'
        },
        {
          id: 2,
          title: 'Title 2 - UPDATED',
          text: 'Text 2 - UPDATED'
        },
        {
          id: 3,
          title: 'Title 3 - UPDATED',
          text: 'Text 3 - UPDATED'
        }
      ]).then(function (result) {
        // ...
      });
    };

    // =========/ Update

    // ========== Cancelation

    $scope.cancelSingleNotification = function () {
      $cordovaLocalNotification.cancel(1).then(function (result) {
        // ...
      });
    };

    $scope.cancelMultipleNotifications = function () {
      $cordovaLocalNotification.cancel([1, 2]).then(function (result) {
        // ...
      });
    };

    $scope.cancelAllNotifications = function () {
      $cordovaLocalNotification.cancelAll().then(function (result) {
        // ...
      });
    };

    // =========/ Cancelation

    // ========== Events

    $rootScope.$on('$cordovaLocalNotification:schedule',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:trigger',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:update',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:clear',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:clearall',
    function (event, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:cancel',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:cancelall',
    function (event, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:click',
    function (event, notification, state) {
      // ...
    });

    // =========/ Events

  });

}]);	 

