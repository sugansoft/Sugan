//
//  Ad_Response.h
//  dJAX_Lib
//
//  Created by System Administrator on 1/14/16.
//  Copyright © 2016 System Administrator. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#include <ifaddrs.h>
#include <arpa/inet.h>
#import <AddressBook/AddressBook.h>
#import <CoreLocation/CoreLocation.h>

@interface Ad_Response : NSObject

- (void)PassZoneid:(int)zoneid;

- (NSString *) ad;

- (void)withLocation:(NSString *)location_value withMacAddress:(NSString *)macaddress_value withWlan:(NSString *)wlan_value withVlan:(NSString *)vlan_value withAge:(int) age_value withGender:(NSString *)gender_value withColor:(NSString *)color_value withHeight:(int)height_value withWeight:(int)weight_value withMarital_status:(NSString *)marital_status_value withCustomVariale:(NSString *)custom_variable_value;

@end

/*
 
 Tera values - OS, Manufactures, Capability, geographihc, user agent,
 System valuse - carrier , ip, latitude & longitude
 
 */



