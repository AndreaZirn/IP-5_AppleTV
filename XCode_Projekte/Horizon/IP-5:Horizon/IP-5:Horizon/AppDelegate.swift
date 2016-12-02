//
//  AppDelegate.swift
//  IP-5:Horizon
//

//  Copyright (c) 2016 Andrea Zirn. All rights reserved.
//

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {
    
    var window: UIWindow?
    var appController: TVApplicationController?
    
    // TVBaseURL points to a server on your local machine.
    static let tvBaseURL = "http://localhost:9001/"
    static let tvBootURL = "\(AppDelegate.tvBaseURL)js/application.js"
    
    
    // MARK: UIApplication Overrides
    
    /*func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject : AnyObject]? = [:]) -> Bool {*/
        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
        // Override point for customization after application launch.
        window = UIWindow(frame: UIScreen.main.bounds)
        
        /*
         Create the TVApplicationControllerContext for this application
         and set the properties that will be passed to the `App.onLaunch` function
         in JavaScript.
         */
        let appControllerContext = TVApplicationControllerContext()
        
        
        
        /*
         The JavaScript URL is used to create the JavaScript context for your
         TVMLKit application.
         */
        if let javaScriptURL = URL(string: AppDelegate.tvBootURL) {
            appControllerContext.javaScriptApplicationURL = javaScriptURL
        }
        
        appControllerContext.launchOptions["baseURL"] = AppDelegate.tvBaseURL
        
        /*if let launchOptions = launchOptions as? [String: AnyObject] {
            for (kind, value) in launchOptions {
                appControllerContext.launchOptions[kind] = value
            }
        }*/
        
        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        
        return true
    }
    
    // MARK: TVApplicationControllerDelegate
    
    /*func appController(_ appController: TVApplicationController, didFail error: Error) {
        print("\(#function) invoked with error: \(error)")
        
        let title = "Error Launching Application"
        let message = error.localizedDescription
        let alertController = UIAlertController(title: title, message: message, preferredStyle:.alert)
        
        self.appController?.navigationController.present(alertController, animated: true, completion: nil)
    }*/
    
}
