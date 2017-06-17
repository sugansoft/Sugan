//
//  Ad_Response.h
//  dJAX_Lib
//  Author Suganya A
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

@end
