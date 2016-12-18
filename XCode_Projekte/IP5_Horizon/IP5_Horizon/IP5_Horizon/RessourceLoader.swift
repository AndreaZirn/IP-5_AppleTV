//
//  RessourceLoader.swift
//  IP5_Horizon
//
//  Created by Andrea Zirn on 13.12.16.
//  Copyright © 2016 Andrea Zirn. All rights reserved.
//

import JavaScriptCore

@objc protocol ResourceLoaderExport : JSExport {
    static func create() -> ResourceLoaderExport
    func loadBundleResource(_ name: String) -> String
    func urlForResource(_ name: String) -> String
}

@objc class ResourceLoader: NSObject, ResourceLoaderExport {
    
    static func create() -> ResourceLoaderExport {
        return ResourceLoader()
    }
    
    func loadBundleResource(_ name: String) -> String {
        let path = Bundle.main.path(forResource: name, ofType: nil)
        do {
            return try String(contentsOfFile: path!,
                              encoding: String.Encoding.utf8)
        } catch {
            print("There was a problem")
            return ""
        }
    }
    
    func urlForResource(_ name: String) -> String {
        return Bundle.main.url(forResource: name, withExtension: nil)!.absoluteString
    }
}
