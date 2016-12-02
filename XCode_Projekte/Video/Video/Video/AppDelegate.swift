import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {
    
    var window: UIWindow?
    
    var appController: TVApplicationController?
    static let TVBaseURL = "http://localhost:9001/"
    static let TVBootURL = "\(AppDelegate.TVBaseURL)js/application.js"
    
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        
        // initializing the Controller
        let appControllerContext = TVApplicationControllerContext()
        
        
        
        // path to your main Javascript file, root directory of the server
        guard let javaScriptURL = URL(string: AppDelegate.TVBootURL) else { fatalError("unable to create NSURL") }
        appControllerContext.javaScriptApplicationURL = javaScriptURL
        appControllerContext.launchOptions["BASEURL"] = AppDelegate.TVBaseURL
        
        // starts the controller with the configured context
        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        return true
    }
    
}
