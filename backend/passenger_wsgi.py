import sys
import os
from a2wsgi import ASGIMiddleware

# Add the current directory to the path so it can find server.py
sys.path.insert(0, os.path.dirname(__file__))

from server import app
application = ASGIMiddleware(app)
