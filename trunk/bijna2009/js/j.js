
function checkForm()
{
	// name, email, attend, voornemen2009, trickquestion
	if($('name').value == '' || $('email').value == '' || $('voornemen2009').value == '' || $('trickquestion').value == '')
	{
		$('formFeedback').style.display = '';
		$('formFeedback').innerHTML = 'Alle velden met een * zijn verplicht. Vul de ontbrekende gegevens in aub.';
		return false;
	}
	
	$('nee').style.display='none';
	$('disclaimer').style.display='';	
	
	return true;	
}