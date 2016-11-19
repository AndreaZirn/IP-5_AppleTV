# _*_ coding: utf-8 _*_
#python-3.5.2 Mac OSX 10.5
import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

Port = 9001

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
	'.M3U8': 'application/x-mpegURL',
	'.ts': 'video/MP2T',
    '.html': 'text.html'
}

httpd = socketserver.TCPServer(("", Port), Handler)

print("serving at port", Port)
httpd.serve_forever()
