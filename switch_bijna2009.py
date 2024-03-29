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
    if name == 'Col':
        nick = 'Jonge God Joris'
    if name == 'Maartje':
        nick = 'lekker ding'		
    if name == 'Mitch':
        nick = 'Master Disc'
    if name == 'Viv':
      nick = 'Jonge Godin met ouwe vetklep'      
    if name == 'Steef':
      nick = 'geweldenaar'      
    if name == 'Inge':
      nick = 'lekker stuk'      	  
    if name == 'Rinus':
      nick = 'Jonge god' 
    if name == 'Debbie':
      nick = 'MILF'	     
    if name == 'Tamara':
      nick = 'MILF'	     
    if name == 'Jasper':
      nick = 'Big daddy'	     
    if name == 'Hans':
      nick = 'Spaniard'	     
    if name == 'Maddy':
      nick = 'Doe-mij-maar-een-doos-wijn-Maddy'	     
    if name == 'Erik':
      nick = 'Jonge God'	     
    if name == 'Maickel':
      nick = 'Mighty Mike'	     
    if name == 'Ro':
      nick = 'Ome Ro'
    if name == 'Simone':
      nick = 'MILF'	     
    if name == 'Kas':
      nick = 'Jonge God'	     
    if name == 'Miranda':
      nick = 'MILF'	     
    if name == 'Jochem':
      nick = 'Jonge God'	
    if name == 'Paul':
      nick = 'Bef-oh-la-la-la-matic'	
    if name == 'Ank':
      nick = 'Jonge Godin'	
    if name == 'Car':
      nick = 'ontzettende zuipschuit Car'	
    if name == 'Gijs':
      nick = 'Vader & Moeder Gizo'	  
    if name == 'Mark':
      nick = 'hellimonder'	  
    if name == 'Kim':
      nick = 'Jonge Godin'	  
    if name == 'MenT':
      nick = 'Mark & Tanja'	  
    if name == 'Harry':
      nick = 'Harry'	  
    if name == 'Nens':
      nick = 'Nens'	  
    if name == 'Juud':
      nick = 'Drankorgel'
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
    elif name == 'Rinus':
        hasOffspring = 1
    elif name == 'Debbie':
        hasOffspring = 1 
    elif name == 'Gijs':
        hasOffspring = 1           
    return hasOffspring

class Invites2010(db.Model):
  name = db.StringProperty()
  content = db.StringProperty(multiline=True)
  date = db.DateTimeProperty(auto_now_add=True)
  attend = db.StringProperty()
  cookie = db.StringProperty()
  email = cookie = db.StringProperty()
  voornemen2009 = db.StringProperty(multiline=True)
  trickquestion = db.StringProperty(multiline=True)

class MainPage(webapp.RequestHandler):
  def get(self):
  
    debug = ''
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
    invites_query = Invites2010.all().order('-date')
    invites = invites_query.fetch(100)
 
    ##### getting the queryparamter
    name = str(self.request.path)
    name = name[1:2].upper() + name[2:]
        
    C = Cookie.SmartCookie() 
    hey = ''    
    title = ''
    currentInvitees = ''
    registered = ''
    offspring = 0
    inviteeAmount = 1
    if len(str(name))==0: ##### GEEN query paramater....
        ##### check cookies
        if self.request.headers.get('Cookie'):
            ##### load all cookies
            C.load(self.request.headers.get('Cookie'))   
            ##### Iterate over the cookies, create a hey
            l = currentInvitees = C.keys()          
            i = 0            
            inviteeAmount = 0
            for cookiename in C.iterkeys():
                if not re.search(r'_', cookiename):                  
                  i = i + 1
                  if i == 1:
                      hey = 'Hey '                  
                  name = cookiename
                  inviteeAmount += 1                   
                  registered = 'yep1'            
                  hey = hey + getNick(name)                         
                  if i < l:
                      hey = hey + ', ' 
            if inviteeAmount == 1:
                r = db.GqlQuery("SELECT * FROM Invites2010 WHERE name = :1",name)
                results = r.fetch(5)
                for p in results:
                    registered = p.attend
                
            offspring = hasOffspring(name)
            
    else: ##### WEL query paramater....          
        registered =''        
        if self.request.headers.get('Cookie'):
          C.load(self.request.headers.get('Cookie'))
          if C.has_key(name):
               registered = C[name].value 
          else: ##### Wel een cookie maar niet van deze persoon...
              ##### Check db...
              r = db.GqlQuery("SELECT * FROM Invites2010 WHERE name = :1",name)
              results = r.fetch(5)
              for p in results:
                  registered = p.attend
        else: ##### Maar geen cookie (user zit thuis/ op zijn werk)
          ##### Check db...
          r = db.GqlQuery("SELECT * FROM Invites2010 WHERE name = :1",name)
          results = r.fetch(5)
          for p in results:
            registered = p.attend
        
        offspring = hasOffspring(name)   
		
        if registered == 'ja':
			hey = 'Helemaal geweldig ' + getNick(name) + ', zie je 31 december!'
        elif registered == 'nee':
			hey = 'Hey ' + getNick(name) + ', jammer, hopelijk tot volgend jaar!'
        else:
			hey = 'Hey ' + getNick(name) + ', zin in een feestje?'
			
    if getNick(name) == 'MILF':
        title = 'Slang for an older, sexually attractive woman who is also a mother...'
            
    template_values = {
      'invites': invites,
      'currentInvitees': currentInvitees,
	  'name': name,
      'registered': registered,
      'hey': hey,
      'kids': offspring,
      'inviteeAmount': inviteeAmount,
      'debug': debug,
      'title': title,
      }

    path = os.path.join(os.path.dirname(__file__), target)
    self.response.out.write(template.render(path, template_values))
	

    
class registerInvites2010(webapp.RequestHandler):
  def post(self):
    invites = Invites2010()
          
    ##### Naam en dus cookie met een hoofletter
    name = self.request.get('name')
    name = name[:1].upper() + name[1:]
      
    invites.name          = name
    invites.content       = self.request.get('content')
    invites.attend        = self.request.get('attend')
    invites.cookie        = self.request.get('attend')
    invites.email         = self.request.get('email')
    invites.voornemen2009 = self.request.get('voornemen2009')
    invites.trickquestion = self.request.get('trickquestion')	
	
    invites.put()
    
    cookiename = name
    cookiename = str(cookiename.replace(" ","_"))
    
    if cookiename != '':    
        C = Cookie.SmartCookie() 
        C[cookiename] = self.request.get('attend')
        C[cookiename]['path']='/' 
        C[cookiename]['Max-Age']='2592000' 
        self.response.headers.add_header('Set-Cookie', C.output(header='') )     
    
    self.redirect('/' + self.request.get('name') + '#comments')


application = webapp.WSGIApplication(
                                     [('/', MainPage),
                                      ('/signup', registerInvites2010),                                    
                                      ('/.*', MainPage)],
                                     debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()
