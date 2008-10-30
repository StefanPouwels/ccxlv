
var map;
var gdir;
var geocoder = null;
var addressMarker;

function goToPage(pageId)
{
	var pages = Array('home','contact'); //,'over_ons','site_map','extra','vacatures');
	for(i=0;i<pages.length;i++)
	{
		$(pages[i]).style.display = 'none';
		$(pages[i]+"_link").className = 'under';		
	}
	
	$(pageId).style.display = '';
	$(pageId+"_link").className = 'currentmenu';	
	
	if(pageId == "contact")
	{ 
		$('head_image_contact').show();
		$('map_canvas').hide();
		// showAddress($('toAddress').value);
	} 
}

function sa()
{
	var to = $('toAddress').value;  
	$('head_image_contact').hide();
	$('map_canvas').show();
	showAddress(to);
}

/*
function showDirections()
{
	var map = new GMap2(document.getElementById("map_canvas"));
	var gdir = new GDirections(map, document.getElementById("directions"));
	directionsPanel = document.getElementById("map_canvas");
    directions = new GDirections(map, directionsPanel);
    directions.load("from: Gedempte Gracht 25, eindhoven, netherlands to: Willem de Zwijgerstraat 57, eindhoven, netherlands");
}
*/

function showAddress(address) {

  map = new GMap2(document.getElementById("map_canvas"));
  geocoder = new GClientGeocoder();

  if (geocoder) {
    geocoder.getLatLng(
      address,
      function(point) {
        if (!point) {
          alert(address + " is niet gevonden.");
        } else {
          map.setCenter(point, 15);
          var marker = new GMarker(point);
          map.addOverlay(marker);
          // marker.openInfoWindowHtml(address);
        }
      }
    );
  }
}


 
    function initialize() {
      if (GBrowserIsCompatible()) {      
        map = new GMap2(document.getElementById("map_canvas"));
        gdir = new GDirections(map, document.getElementById("directions"));
        GEvent.addListener(gdir, "load", onGDirectionsLoad);
        GEvent.addListener(gdir, "error", handleErrors);
      }
    }
    
    function go()
    {
    	var from = $('fromAddress').value + ', netherlands';
    	var to = $('toAddress').value;    	
    	
    	$('printImg').href = $('printText').href  = 'http://maps.google.nl/maps?f=d&saddr=' + from + '&daddr=' + to + '&t=h&z=15&pw=2';
    	
    	$('directions').innerHTML = '';
    	
   	
    	
        map = new GMap2(document.getElementById("map_canvas"));
        gdir = new GDirections(map, document.getElementById("directions"));
        GEvent.addListener(map, "load", onGMap2Load);
        GEvent.addListener(gdir, "load", onGDirectionsLoad);
        GEvent.addListener(gdir, "error", handleErrors);    	
    	
    	setDirections(from,to,'nl');
    }
    
    function setDirections(fromAddress, toAddress, locale) 
    {    	
      gdir.load("from: " + fromAddress + " to: " + toAddress, { "locale": locale });         
    }
 
    function handleErrors(){
    	
    	$('routeBeschrijving').hide();
    	$('map_canvas').hide();
    	$('head_image_contact').show();
		   
    	
    	// \n Error code: " + gdir.getStatus().code
    	
	   if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
	     alert("Er is geen locatie gevonden voor dit specifieke adres. " +
	     		"Zorg ervoor dat zowel een woonplaats en straatnaam correct zijn ingevuld.");
	   else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
	     alert("Oops, er is iets fout gegaan.\nProbeer het nog een keer.");
	   
	   else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
	     alert("Het adres ontbreekt.\nVul een adres in.");
 
	//   else if (gdir.getStatus().code == G_UNAVAILABLE_ADDRESS)  <--- Doc bug... this is either not defined, or Doc is wrong
	//     alert("The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons.\n Error code: " + gdir.getStatus().code);
	     
	   else if (gdir.getStatus().code == G_GEO_BAD_KEY)
	     alert("The given key is either invalid or does not match the domain for which it was given.");
 
	   else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
	     alert("Oops, het is erg druk op de server.\nProbeer het dadelijk nog eens.");
	    
	   else alert("Oops, er is iets fout gegaan.\nProbeer het nog een keer.");
	   
	}
 
 	function onGMap2Load()
 	{
 		$('head_image_contact').hide();
 		$('map_canvas').show(); 
 	}
 
	function onGDirectionsLoad()
	{ 
      // Use this function to access information about the latest load()
      // results.
    	$('routeBeschrijving').show();	
		      
      // return;
      // e.g.
      // document.getElementById("getStatus").innerHTML = gdir.getStatus().code;
	  // and yada yada yada...
	}
