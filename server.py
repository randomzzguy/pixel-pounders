#!/usr/bin/env python3
import http.server
import socketserver
import json
import urllib.parse
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/exchange-token':
            # Handle World ID token exchange
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                code = data.get('code')
                
                if not code:
                    self.send_error(400, 'Missing code parameter')
                    return
                
                # Mock successful token exchange
                # In a real implementation, you would exchange the code with World ID API
                mock_response = {
                    'success': True,
                    'token': 'mock_token_' + code[:10],
                    'user_id': 'mock_user_id',
                    'verification_level': 'orb',
                    'timestamp': '2024-01-01T00:00:00Z'
                }
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.end_headers()
                
                response_json = json.dumps(mock_response)
                self.wfile.write(response_json.encode('utf-8'))
                
            except json.JSONDecodeError:
                self.send_error(400, 'Invalid JSON')
            except Exception as e:
                self.send_error(500, f'Server error: {str(e)}')
        else:
            self.send_error(404, 'API endpoint not found')
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print(f"API endpoint available at http://localhost:{PORT}/api/exchange-token")
        httpd.serve_forever()