/*
 * Copyright (c) 2015 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 *
 * Native resource loader that is responsible for loading content from files. 
 * (Only necessary if the content is not loaded over a server, but inside the
 * application)
 */

//
//  RessourceLoader.swift
//  IP5_Horizon
//
//  Created by Andrea Zirn, Joel Blumer on 13.12.16.
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
