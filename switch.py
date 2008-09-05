import wsgiref.handlers
import re
from google.appengine.ext import webapp

class MainPage(webapp.RequestHandler):
  def get(self):
      
      target = 'uhm, not found?'
      
      if re.search(r'ladyonictprojects.nl', self.request.host):
        target = open("ladyOnIctProjects/index.html", "r").read()
      elif re.search(r'zuidvast.nl', self.request.host):
        target = open("zuidvast/index.html", "r").read()        
      else:
        target = open("index.html", "r").read()   
   
      self.response.headers['Content-Type'] = 'text/html'
      self.response.out.write(target)

def main():
  application = webapp.WSGIApplication([('/*', MainPage)],debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()