var month = '*'; // 1 through 12 or '*' within the next month, '0' for the current month
var day = '1';   // day of month or + day offset
var dow = 0;     // day of week sun=1 sat=7 or 0 for whatever day it falls on
var hour = 14;    // 0 through 23 for the hour of the day
var tz = 10;     // offset in hours from UTC to your timezone
var lab = 'cd';  // id of the entry on the page where the counter is to be inserted

function start() {displayCountdown(setCountdown(month,day,hour,tz),lab);}
loaded(lab,start);

// Countdown Javascript
// copyright 20th April 2005, 17th November 2006 by Stephen Chapman
// permission to use this Javascript on your web page is granted
// provided that all of the code in this script (including these
// comments) is used without any alteration
// you may change the start function if required
var pageLoaded = 0; window.onload = function() {pageLoaded = 1;}
function loaded(i,f) {
	if (document.getElementById && document.getElementById(i) != null) f(); else if (!pageLoaded) setTimeout('loaded(\''+i+'\','+f+')',100);
}
function setCountdown(month,day,hour,tz) 
{
	var m = month; if (month=='*') m = 0;
  	var c = setC(m,day,hour,tz);
   	if (month == '*' && c < 0)  c = setC('*',day,hour,tz);
    return c;
} 

function setC(month,day,hour,tz) 
{
	var toDate = new Date();
    if (day.substr(0,1) == '+') 
    {
    	var day1 = parseInt(day.substr(1));
    	toDate.setDate(toDate.getDate()+day1);
    } 
    else 
    {
    	toDate.setDate(day);
    }
    if (month == '*')
    	toDate.setMonth(toDate.getMonth() + 1);
    else if (month > 0) 
    {
    	if (month <= toDate.getMonth())toDate.setFullYear(toDate.getFullYear() + 1);toDate.setMonth(month-1);}
		if (dow >0) toDate.setDate(toDate.getDate()+(dow-1-toDate.getDay())%7);
		toDate.setHours(hour);toDate.setMinutes(0-(tz*60));toDate.setSeconds(0);
		var fromDate = new Date();fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
		var diffDate = new Date(0);diffDate.setMilliseconds(toDate - fromDate);
		return Math.floor(diffDate.valueOf()/1000);
	}

function displayCountdown(countdn,cd) 
{
	if (countdn < 0) document.getElementById(cd).innerHTML = "Happy 2009!"; 
	else {var secs = countdn % 60; 
	if (secs < 10) secs = ''+secs;
	var countdn1 = (countdn - secs) / 60;
	var mins = countdn1 % 60; 
	if (mins < 10) mins = ''+mins;countdn1 = (countdn1 - mins) / 60;
	var hours = countdn1 % 24;
	var days = (countdn1 - hours) / 24;
	
	var daytext = (days>1) ? 	' dagen, ' : ' dag, ';	
	var hourtext = (hours>1) ? 	' uren, ' : ' uur, ';
	var mintext = (mins>1) ? 	' minuten en ' : ' minuut en ';
	var sectext = (secs>1) ? 	' seconden ' : ' seconde ';
	
	
	$('cd').innerHTML = 'Nog ' + days + daytext + hours + hourtext + mins + mintext + secs + sectext;
	setTimeout('displayCountdown('+(countdn-1)+',\''+cd+'\');',999);}
}