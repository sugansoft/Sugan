//
//  Ad_Response.m
//  dJAX_Lib
//  Author Suganya A
//  Created by System Administrator on 1/14/16.
//  Copyright © 2016 System Administrator. All rights reserved.
//

#import "Ad_Response.h"
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <Foundation/Foundation.h>
#include <ifaddrs.h>
#include <arpa/inet.h>
#import <AddressBook/AddressBook.h>
#import <CoreLocation/CoreLocation.h>
#import <CommonCrypto/CommonDigest.h>
#import <sys/utsname.h>


@implementation Ad_Response

// Parameters for displaying ad

NSString     *deviceType;
NSString     *systemVersion;
NSString     *systemName;
NSString     *carrierName;
NSString     *ip;
NSString     *phone_num;
NSString     *connectiontype;
NSString     *uuid;
NSString     *localDate;
NSString     *Loadurl;
NSString     *AdResponse;
NSString     *adtype;
NSString     *ads;
NSString     *response_value;
NSString     *sha1_Hashed;
NSString     *md5_Hashed;
NSString     *language;
NSString     *useragent;
NSString     *appid;
NSString     *displaytype;
float 	      latitude;
float 	      longitude;
int 	      sizeheight;
int 	      sizewidth;
int 	      zoneid_int;
int           displayheight;
int           displaywidth;






//Pass zoneid for the ad formats

- (void )PassZoneid:(int)zoneid
{
    zoneid_int = zoneid; //Pass zoneid
} 

//Get basic, mraid, iab ad formats value
- (NSString *)ad
{
      [self getURLValues];
      //Load the request in the UIWebView.
 
      if([adtype isEqualToString:@"Video"])
    	{
            
             ads = AdResponse;
        }
      else
       {
		
           NSLog(@"basic ad displaying");
           ads = AdResponse;
		
       }
    return ads;
}

//Get url values
- (void)getURLValues{

  	    [self getParameterValues];
    
	    NSString *zone_id   	= [NSString stringWithFormat: @"zoneid=%d",zoneid_int];
	    NSString *adwidth		= [NSString stringWithFormat: @"&adwidth=%d", sizewidth];
	    NSString *adheight		= [NSString stringWithFormat: @"&adheight=%d", sizeheight];
	    NSString *deviceType1 	= [NSString stringWithFormat: @"&Model=%@", deviceType];
        NSString *devicemake1 	= [NSString stringWithFormat: @"&Make=%@", deviceType];
	    NSString *systemVersion1= [NSString stringWithFormat: @"&Osv=%@", systemVersion];
	    NSString *systemName1 	= [NSString stringWithFormat: @"&Os=%@", systemName];
	    NSString *sizeheight1 	= [NSString stringWithFormat: @"&screenheight=%d", sizeheight];
	    NSString *sizewidth1 	= [NSString stringWithFormat: @"&screenwidth=%d", sizewidth];
	    NSString *carrierName1  = [NSString stringWithFormat: @"&Carrier=%@",carrierName];
	    NSString *ip1 		    = [NSString stringWithFormat: @"&ip=%@",ip];
	    NSString *userphone 	= [NSString stringWithFormat: @"&Viewerphone=%@",phone_num];
	    NSString *lattitude1 	= [NSString stringWithFormat: @"&lattitude=%f",latitude];
	    NSString *longitude1 	= [NSString stringWithFormat: @"&longitude=%f",longitude];
	    NSString *connectiontype1= [NSString stringWithFormat: @"&Connectiontype=%@",connectiontype];
	    NSString *udid1 		= [NSString stringWithFormat: @"&Udid=%@",uuid];
	    NSString *timezone 		= [NSString stringWithFormat: @"&Timezone=%@",localDate];
        NSString *sha1hashed1   = [NSString stringWithFormat: @"&Didsha1=%@",sha1_Hashed];
        NSString *md5hashed1    = [NSString stringWithFormat: @"&Didmd5=%@",md5_Hashed];
        NSString *displaywidth1 = [NSString stringWithFormat: @"&Displaywidth=%d",displaywidth];
        NSString *displayheight1= [NSString stringWithFormat: @"&Displayheight=%d",displayheight];
        NSString *language1     = [NSString stringWithFormat: @"&Language=%@",language];
        NSString *useragent1    = [NSString stringWithFormat: @"&Useragent=%@",useragent];
        NSString *appid1        = [NSString stringWithFormat: @"&Appid=%@",appid];
        NSString *displaytype1  = [NSString stringWithFormat: @"&Devicetype=%@",displaytype];
    
    
        //Appending URL with params
        NSString *urlString = [NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@%@&systemtype=ios",Loadurl,zone_id,adwidth,adheight,deviceType1,systemVersion1, systemName1, sizeheight1, sizewidth1,displaywidth1,displayheight1 ,carrierName1,ip1,userphone,lattitude1,longitude1,connectiontype1,udid1,timezone,useragent1,appid1,language1,sha1hashed1,md5hashed1,displaytype1,devicemake1];
    
        NSCharacterSet *set = [NSCharacterSet URLQueryAllowedCharacterSet];
        NSString *encodedUrl = [urlString stringByAddingPercentEncodingWithAllowedCharacters:set];
    NSLog(@"URL- %@",encodedUrl);
      	//Retreive JSON data
        NSData *jsonData = [NSData dataWithContentsOfURL:[NSURL URLWithString:encodedUrl]];
	    NSDictionary *jsonObjects = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
	    
        //Finding the response element from JSON
    
        response_value = [jsonObjects valueForKey:@"response"];
    
    
	    //Finding an ads element from JSON
	    NSDictionary *currentVersion_ = [jsonObjects objectForKey:@"ads"];
	    
	    //Finding ad_tag element values form pervious element value
	    NSString *currentVersion1 = [currentVersion_ objectForKey:@"ad_tag"];
    
    
  
	    
	    adtype = [currentVersion_ objectForKey:@"ad_type"];
    
        NSDictionary *error = [jsonObjects objectForKey:@"error"];
    
        NSString *description = [error objectForKey:@"description"];
    
    
    
    	   //Decode the json values using stringreplace concept
    	NSString *decode1=[[[[[[[[[currentVersion1 stringByReplacingOccurrencesOfString: @"&amp;" withString: @"&"] stringByReplacingOccurrencesOfString: @"&quot;" withString: @"\""] stringByReplacingOccurrencesOfString: @"&#39;" withString: @"\\"] stringByReplacingOccurrencesOfString: @"&apos;" withString: @"'"] stringByReplacingOccurrencesOfString: @"&gt;" withString: @">"] stringByReplacingOccurrencesOfString: @"&lt;" withString: @"<"] stringByReplacingOccurrencesOfString: @"%253A" withString:@":"] stringByReplacingOccurrencesOfString: @"%2528" withString:@"("] stringByReplacingOccurrencesOfString: @"%2529" withString:@")"];
    
        //Custom Variable Additional Work
          NSString *decode=[decode1 stringByReplacingOccurrencesOfString: @"'></script>" withString:[NSString stringWithFormat:@"'></script>"]];
    
         if ([response_value  isEqual: @"success"])
         {
             AdResponse = decode;
         }
         else
         {
             NSLog(@"No Ads available For this zone");
             AdResponse = description;
         }
        
}


//Get Parameter Values
- (void )getParameterValues {

	    //Device Model
	    deviceType 		= [UIDevice currentDevice].model;
	    
	    //Device system version
	    systemVersion 	= [UIDevice currentDevice].systemVersion;
	    
	    //Device system name
	    systemName    	= [UIDevice currentDevice].systemName;
    
	    //Screen height
	    sizeheight		= [[UIScreen mainScreen] bounds].size.height;
	    
	    //Screen widht
	    sizewidth		= [[UIScreen mainScreen] bounds].size.width;
    
        //Display width
        displaywidth    = [[UIScreen mainScreen] bounds].size.width;
    
        //Display height
        displayheight   = [[UIScreen mainScreen] bounds].size.height;
    
        //UUID
        uuid = [self uniqueIDForDevice];
    
        //SHA
        sha1_Hashed = [self sha1:uuid];
    
        //MD5
        md5_Hashed = [self md5:uuid];
    
        //Device Language
        language = [[NSLocale preferredLanguages] objectAtIndex:0];
    
        //Device UserAgent
        UIWebView* webView = [[UIWebView alloc] initWithFrame:CGRectZero];
        useragent = [webView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
    
        //Application ID
        appid= [[NSBundle mainBundle] bundleIdentifier];
    
	    // Setup the Network Info and create a CTCarrier object
	    CTTelephonyNetworkInfo *networkInfo = [[CTTelephonyNetworkInfo alloc] init];
	    CTCarrier *carrier 	= [networkInfo subscriberCellularProvider];
	    
	    // Get carrier name
	    carrierName 	= [carrier carrierName];
	    
	    // Tracking ip address
	    ip 			= [self getIPAddress];
	    
	    // User Phone number
	    phone_num 		= [[NSUserDefaults standardUserDefaults] stringForKey:@"SBFormattedPhoneNumber"];
	  
    
        //Device Type
        if([UIDevice currentDevice].userInterfaceIdiom==UIUserInterfaceIdiomPad) {
            displaytype     = @"IPAD";
        }else{
            displaytype     = @"IPHONE";
        }
    
    
    
	    // Display Latitude and Longitude
	    CLLocationManager *locationManager;
	    locationManager 	= [[CLLocationManager alloc] init];
	    locationManager.distanceFilter 	= kCLDistanceFilterNone;
	    locationManager.desiredAccuracy 	= kCLLocationAccuracyHundredMeters;
	    [locationManager startUpdatingLocation];
	    
	    latitude 		= locationManager.location.coordinate.latitude;
	    longitude 		= locationManager.location.coordinate.longitude;
	    
	    
	    // Network Type display
	    
	    NSArray *subviews 	= [[[[UIApplication sharedApplication] valueForKey:@"statusBar"] valueForKey:@"foregroundView"]subviews];
	    NSNumber *dataNetworkItemView = nil;
	    for (id subview in subviews) {
		if([subview isKindOfClass:[NSClassFromString(@"UIStatusBarDataNetworkItemView") class]]) {
		    dataNetworkItemView = subview;
		    break;
            }
	    }
    
        //Connection Type
	    connectiontype=@"None";
	    switch ([[dataNetworkItemView valueForKey:@"dataNetworkType"]integerValue]) {
		    
		case 0:
		    NSLog(@"No wifi or cellular");
		    connectiontype=@"None";
		    break;
		    
		case 1:
		    connectiontype=@"2G";
		    break;
		    
		case 2:
		    connectiontype=@"3G";
		    break;
		    
		case 3:
		    connectiontype=@"4G";
		    break;
		    
		case 4:
		    connectiontype=@"LTE";
		    break;
		    
		case 5:
		    connectiontype=@"Wifi";
		    break;
		    
		default:
		    break;
	    }
	    
	    
	    // Tracking UUID
	   // uuid 		= [[NSUUID UUID] UUIDString];
    
	    
	    // Tracking Time Zone
	    
	    localDate 		= [NSDateFormatter localizedStringFromDate:[NSDate date] dateStyle:NSDateFormatterMediumStyle timeStyle:NSDateFormatterMediumStyle];
	    
	    
	    // URL passing parameters values
	   
	    Loadurl         = @"http://182.72.85.2/djaxtesting/howardnew_test/api/request1.php?";
	   //Loadurl  		= @"http://yourwebsite/api/request1.php?";

}



// Get SHA1 Value

-(NSString*) sha1:(NSString*)input
{
    const char *cstr = [input cStringUsingEncoding:NSUTF8StringEncoding];
    NSData *data = [NSData dataWithBytes:cstr length:input.length];
    uint8_t digest[CC_SHA1_DIGEST_LENGTH];
    CC_SHA1(data.bytes, data.length, digest);
    NSMutableString* output = [NSMutableString stringWithCapacity:CC_SHA1_DIGEST_LENGTH * 2];
    for(int i = 0; i < CC_SHA1_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02x", digest[i]];
    return output;
}
// Get Md5 Value

- (NSString *) md5:(NSString *) input
{
    const char *cStr = [input UTF8String];
    unsigned char digest[16];
    CC_MD5( cStr, strlen(cStr), digest ); // This is the md5 call
    NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [output appendFormat:@"%02x", digest[i]];
    return  output;
}

//Tracking UUID

-(NSString*)uniqueIDForDevice
{
    NSString* uniqueIdentifier = nil;
    if( [UIDevice instancesRespondToSelector:@selector(identifierForVendor)] )
    { // >=iOS 7
        uniqueIdentifier = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    }
    else
    { //<=iOS6, Use UDID of Device
        CFUUIDRef uuid = CFUUIDCreate(NULL);
        //uniqueIdentifier = ( NSString*)CFUUIDCreateString(NULL, uuid);- for non- ARC
        uniqueIdentifier = ( NSString*)CFBridgingRelease(CFUUIDCreateString(NULL, uuid));// for ARC
        CFRelease(uuid);
    }
    return uniqueIdentifier;
}


// Get IP Address

- (NSString *)getIPAddress {
    
    NSString *address 		= @"error";
    struct ifaddrs *interfaces  = NULL;
    struct ifaddrs *temp_addr   = NULL;
    int success 		= 0;
    // retrieve the current interfaces - returns 0 on success
    success 			= getifaddrs(&interfaces);
    if (success == 0) {
        // Loop through linked list of interfaces
        temp_addr 		= interfaces;
        while(temp_addr != NULL) {
            if(temp_addr->ifa_addr->sa_family == AF_INET) {
                // Check if interface is en0 which is the wifi connection on the iPhone
                if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
                    // Get NSString from C String
                    address 	= [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
                    
                }
                
            }
            
            temp_addr 		= temp_addr->ifa_next;
        }
    }
    // Free memory
    freeifaddrs(interfaces);
    return address;
    
}


@end

