
function initialize() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map_canvas"));   
    var geocoder = new GClientGeocoder();
    
    map.setCenter(new GLatLng(51.435591, 5.469325), 15);    
    //map.openInfoWindow(map.getCenter(),document.createTextNode("Zuidvast"));
  }
}


function goToPage(pageId)
{
	var pages = Array('home','contact','over_ons','site_map','extra');
	for(i=0;i<pages.length;i++)
	{
		$(pages[i]).style.display = 'none';
		$(pages[i]+"_link").className = 'under';		
	}
	
	$(pageId).style.display = '';
	$(pageId+"_link").className = 'currentmenu';	
	
	if(pageId == "contact")
	{ 
		//initialize();
		showAddress('Willem de Zwijgerstraat 57, eindhoven, netherlands');
	} 
}

function showAddress(address) {

var map = new GMap2(document.getElementById("map_canvas"));
var geocoder = new GClientGeocoder();

  if (geocoder) {
    geocoder.getLatLng(
      address,
      function(point) {
        if (!point) {
          alert(address + " not found");
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
