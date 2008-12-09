import cgi
import os
import re
import Cookie

from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

def getNick(name):
    nick = name
    if name == 'Inge':
        nick = 'Schatje'
    if name == 'Jochem':
      nick = 'Jonge God'
    if name == 'Stefan':
      nick = 'God'      
    if name == 'sjaak':
        nick = 'Hitsige Harry'
    return nick

def hasOffspring(name):
    hasOffspring = 0
    if name == 'Tamara':
        hasOffspring = 1
    elif name == 'Jasper':
        hasOffspring = 1
    elif name == 'Ro':
        hasOffspring = 1
    elif name == 'Simone':
        hasOffspring = 1
    elif name == 'Merijn':
        hasOffspring = 1
    elif name == 'Debbie':
        hasOffspring = 1    
    return hasOffspring

class Invites(db.Model):
  name = db.StringProperty()
  content = db.StringProperty(multiline=True)
  date = db.DateTimeProperty(auto_now_add=True)
  attend = db.StringProperty()
  cookie = db.StringProperty()
  email = cookie = db.StringProperty()

class MainPage(webapp.RequestHandler):
  def get(self):
  
    target = 'uhm, not found?'    
    if re.search(r'test', self.request.host):
      target = 'ladyOnIctProjects/index.html'
    elif re.search(r'zuidvast.nl', self.request.host):
      target = 'zuidvast/index.html'    
    elif re.search(r'bijna2009.', self.request.host):
      target = 'bijna2009/index.html'    
    else:
      target = 'index.html'

    ##### getting the inviteelist and comments
    invites_query = Invites.all().order('-date')
    invites = invites_query.fetch(100)
 
    ##### getting the queryparamter
    name = str(self.request.path)
    name = name[1:2].upper() + name[2:]
        
    C = Cookie.SmartCookie()     
    currentInvitees = ''
    registered = ''
    offspring = 0
    inviteeAmount = 1
    if len(str(name))==0: ##### GEEN query paramater....
        ##### check cookies
        if self.request.headers.get('Cookie'):
            ##### load all cookies
            C.load(self.request.headers.get('Cookie'))            
            registered = 'yep1'
            
            ##### Iterate over the cookies, create a hey
            currentInvitees = C.keys()
            l = inviteeAmount = len(C)
            i = 0
            hey = 'Hey '
            for name in C.iterkeys():
                i = i + 1
                hey = hey + getNick(name)       
                if i < l:
                    hey = hey + ', ' 
                    
            offspring = hasOffspring(name)
            
    else: ##### WEL query paramater....          
        registered =''
        if self.request.headers.get('Cookie'):
          C.load(self.request.headers.get('Cookie'))
          if C.has_key(name):
               registered = C[name].value    
          else: ##### Maar geen cookie (user zit thuis/ op zijn werk)
            ##### Check db...
            r = db.GqlQuery("SELECT * FROM Invites WHERE name = :1",name)
            results = r.fetch(5)
            for p in results:
                registered = 'yep2'
        
        offspring = hasOffspring(name)              
        hey = 'Hey ' + getNick(name)

    template_values = {
      'invites': invites,
      'currentInvitees': currentInvitees,
	  'name': name,
      'registered': registered,
      'hey': hey,
      'kids': offspring,
      'inviteeAmount': inviteeAmount,
      }

    path = os.path.join(os.path.dirname(__file__), target)
    self.response.out.write(template.render(path, template_values))
	

    
class registerInvites(webapp.RequestHandler):
  def post(self):
    invites = Invites()
          
    ##### Naam en dus cookie met een hoofletter
    name = self.request.get('name')
    name = name[:1].upper() + name[1:]
      
    invites.name    = name
    invites.content = self.request.get('content')
    invites.attend  = self.request.get('attend')
    invites.date    = self.request.get('date')
    invites.cookie  = self.request.get('attend')
	invites.email   = self.request.get('email')
    invites.put()
    
    cookiename = name
    cookiename = str(cookiename.replace(" ","_"))
    
    if cookiename != '':    
        C = Cookie.SmartCookie() 
        C[cookiename] = self.request.get('attend')
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