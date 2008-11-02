
function goToPage(pageId)
{
	var pages = Array('home','contact','disclaimer'); //,'over_ons','site_map','extra','vacatures');
	for(i=0;i<pages.length;i++)
	{
		$(pages[i]).style.display = 'none';
		if($(pages[i]+"_link"))
			$(pages[i]+"_link").className = 'under';		
	}
	
	$(pageId).style.display = '';
	$(pageId+"_link").className = 'currentmenu';	
	
	if(pageId == "contact")
	{ 
		$('head_image_contact').show();
		document.getElementById('map_canvas').style.display = 'none';
		document.getElementById('routeBeschrijving').style.display = 'none';
		// showAddress($('toAddress').value);
	} 
}

var map;
var gdir;
var geocoder = null;
var addressMarker;

function initialize() {
  if (GBrowserIsCompatible()) { 
  	
	$('directions').innerHTML = '';
	$('head_image_contact').hide();
	document.getElementById('map_canvas').style.display = '';  
  
	map = new GMap2(document.getElementById("map_canvas"));
	gdir = new GDirections(map, document.getElementById("directions"));
	GEvent.addListener(gdir, "load", onGDirectionsLoad);
	GEvent.addListener(gdir, "error", handleErrors);
	setDirections();
  }
}

function setDirections() {
	
	var fromAddress = $('fromAddress').value + ', Nederland';
	var toAddress = $('toAddress').value;	
	var locale = 'nl';

	document.getElementById('map_canvas').style.display = '';	
	gdir.load("from: " + fromAddress + " to: " + toAddress, { "locale": locale });
}

function handleErrors(){
	
		document.getElementById('map_canvas').style.display = 'none';
		document.getElementById('routeBeschrijving').style.display = 'none';
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

function onGDirectionsLoad(){ 
  // Use this function to access information about the latest load()
  // results.
	document.getElementById('head_image_contact').style.display = 'none';
	document.getElementById('map_canvas').style.display = '';
	document.getElementById('routeBeschrijving').style.display = '';
	$('printImg').href = $('printText').href  = 'http://maps.google.nl/maps?f=d&saddr=' + $('fromAddress').value + '&daddr=' + $('toAddress').value + '&t=h&z=15&pw=2';
  // e.g.
  // document.getElementById("getStatus").innerHTML = gdir.getStatus().code;
  // and yada yada yada...
}

// adressie

function showAddress(address) {

  var address = $('toAddress').value;  
  document.getElementById('head_image_contact').style.display = 'none';
  document.getElementById('map_canvas').style.display = '';

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

