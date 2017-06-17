//
//  ViewController.m
//  dJAX_Demo_App
//  Author Suganya A
//  Created by System Administrator on 1/14/16.
//  Copyright © 2016 System Administrator. All rights reserved.
//

#import "ViewController.h"
#import "dJAX_Lib.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    [[[Ad_Response alloc]init] PassZoneid:51]; //Pass zoneid here
    
    NSString *ad_value = [[[Ad_Response alloc] init] ad];

    [self.viewWeb loadHTMLString:ad_value baseURL:nil]; // Display ad using webview
    
    
    [NSTimer scheduledTimerWithTimeInterval:20 target:self selector:@selector(viewDidLoad) userInfo:nil repeats:false]; //Auto Rotate Ad


}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
