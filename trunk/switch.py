import cgi
import os
import re
import Cookie

from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

class Invites(db.Model):
  #author = db.UserProperty()
  name = db.StringProperty()
  content = db.StringProperty(multiline=True)
  date = db.DateTimeProperty(auto_now_add=True)
  attend = db.StringProperty()
  cookie = db.StringProperty()

class MainPage(webapp.RequestHandler):
  def get(self):
  
    target = 'uhm, not found?'
    
    if re.search(r'test', self.request.host):
      target = 'ladyOnIctProjects/index.html'
    elif re.search(r'zuidvast.nl', self.request.host):
      target = 'zuidvast/index.html'    
    elif re.search(r'bijna2009.', self.request.host):
      target = 'bijna2009/index.html' 
    elif re.search(r'localhost.', self.request.host):
      target = 'bijna2009/index.html'           
    else:
      target = 'index.html'

    invites_query = Invites.all().order('-date')
    invites = invites_query.fetch(100)
        
    cookie = self.request.cookies
    x = self.request.path
    firstletter = x[1:2]
    uppercasefirstletter = firstletter.upper()
    lastletter = x[2:]
    name = uppercasefirstletter + lastletter
      
    #if the cookie is set, show the whole page without the 'zin in...' option...
	#same goes for a db entry... show the whole page (user could be on another pc e.g. @ home)
    C = Cookie.SmartCookie() 
    
    registered =''
    if self.request.headers.get('Cookie') and name != 'Iemand_anders':
      cookiename = name.lower()
      C.load(self.request.headers.get('Cookie')) 
      if C.has_key(cookiename):
           registered = C[cookiename].value
             
    hey = 'Hey ' + name
     
    if name == 'Iemand_anders':
        registered = ''
        name = ''
        hey = ''
        
    if name == 'Inge':
        hey = 'Hey Schatje'
    if name == 'Jochem':
        hey = 'Hey Jonge God'
      
    template_values = {
      'invites': invites,
	  'name': name,
      'registered': registered,
      'hey': hey,
      }

    path = os.path.join(os.path.dirname(__file__), target)
    self.response.out.write(template.render(path, template_values))
	
class registerInvites(webapp.RequestHandler):
  def post(self):
    invites = Invites()

    #if users.get_current_user():
      #greeting.author = users.get_current_user()
      
    invites.name = self.request.get('name')
    invites.content = self.request.get('content')
    invites.attend = self.request.get('attend')
    invites.date = self.request.get('date')
    invites.cookie = 'registered'
    invites.put()
    
    cookiename = str(self.request.get('name',0)).lower()   
    cookiename = cookiename.replace(" ","_")
    
    if cookiename != '':    
        C = Cookie.SmartCookie() 
        C[cookiename] = cookiename
        C[cookiename]['path']='/' 
        C[cookiename]['Max-Age']='2592000' 
        self.response.headers.add_header('Set-Cookie', C.output(header='') )     
    
    self.redirect('/' + self.request.get('name'))


application = webapp.WSGIApplication(
                                     [('/', MainPage),
                                      ('/signup', registerInvites),                                    
                                      ('/.*', MainPage)],
                                     debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()