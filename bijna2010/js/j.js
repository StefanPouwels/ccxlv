
function ola()
{
	$('#cf').show('slide');
}

function olb()
{
	$('#of').show('slide');
}

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

$(document).ready(function() {

	/* right side animation */    
	$("#ucla").bind("click", function(e){
		$('#ucla').hide('slide',function(){
			$('#cf').show('slow',function(){
				$('#cb_step_1').show('slide',function(){
					$('#cb_step_2').show('slide',function(){
						$('#cb_step_3').show('slide',function(){
							$('#cb_step_4').show('slide',function(){
							});
						});
					});	
				});		
			});					
		});		
    });

    /* posting the form */
    $(".submitButton").bind("click", function(e){
    	
    	var url = '/signup';
	    var formData = $('#signupForm').serialize();
		
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			success: function(response,statusText){
			    //handleResponse(response,statusText);
				alert('posted and back');    
			}
		});
    
    	return false;    
    
    });
    
}); // END - READY
var leftAlreadyAnswered = false;
function leftYesNo(answer)
{	
	if(leftAlreadyAnswered==true)
	{
		if(answer=='ja'){$('#n').hide();$('#j').show();}
		if(answer=='nee'){$('#n').show();$('#j').hide();}
		return false;
	}
		
	$('#left_pics').hide('blind',{},1000,function(){
		$('#attend').val(answer);
		leftAlreadyAnswered = true;
		if(answer=='ja'){$('#n').hide();$('#j').show();}
		if(answer=='nee'){$('#n').show();$('#j').hide();}
		$('#signupFormDiv').show('slow',function(){				
		});					
	});	
}

var rightAlreadyAnswered = false;
function rightYesNo(answer)
{
	if(rightAlreadyAnswered==true)
	{
		if(answer=='ja'){$('#cb_n').hide();$('#cb_j').show();}
		if(answer=='nee'){$('#cb_n').show();$('#cb_j').hide();}
		return false;
	}	
		
	$('#cb_step_1').hide('blind',{},1000,function(){
		$('#cb_step_2').hide('blind',{},1000,function(){
			$('#cb_attend').val(answer);
			rightAlreadyAnswered = true;
			if(answer=='ja'){$('#cb_n').hide();$('#cb_j').show();}
			if(answer=='nee'){$('#cb_n').show();$('#cb_j').hide();}
			$('#cbSignupFormDiv').show('slow');
		});
	});
}
/*
$("#uc").click(function () { 
      $('#cb_step_1').show('slide',function(){
      	alert('ola');
      });
    });
*/