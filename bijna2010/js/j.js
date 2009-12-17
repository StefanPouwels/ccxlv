
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
    	
    	var submittedForm = $(this).attr('id');
    	
    	if(validateForm(submittedForm)==false)
    		return false;
    	
    	var url = '/signup';
	    var formData = $('#'+submittedForm+'SignupForm').serialize();
		
		$.ajax({
			type: "POST",
			url: url,
			data: formData,
			success: function(response,statusText){
			    //handleResponse(response,statusText);
			    if(submittedForm=='left')
			    {
					$('#'+submittedForm+'BenJeErbij').hide('blind',function(){
						$('#'+submittedForm+'SignupFormDiv').hide('blind',function(){
							// left_ja_activity en left_nee_activity
							$('#'+submittedForm+'_'+$('#'+submittedForm+'_attend').val()+'_activity').show();
							$('#'+submittedForm+'ResultPage').show('slide');
						});
					});
			    }
			    if(submittedForm=='right')
			    {
					$('#'+submittedForm+'BenJeErbij').hide('blind',function(){
						$('#'+submittedForm+'SignupFormDiv').hide('blind',function(){
							// left_ja_activity en left_nee_activity
							$('#'+submittedForm+'_'+$('#'+submittedForm+'_attend').val()+'_activity').show();
							$('#'+submittedForm+'ResultPage').show('slide');
						});
					});
			    }
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
		$('#left_attend').val(answer);
		if(answer=='ja'){$('#n').hide();$('#j').show();}
		if(answer=='nee'){$('#n').show();$('#j').hide();}
		return false;
	}
		
	$('#left_pics').hide('blind',{},1000,function(){
		$('#left_attend').val(answer);
		leftAlreadyAnswered = true;
		if(answer=='ja'){$('#n').hide();$('#j').show();}
		if(answer=='nee'){$('#n').show();$('#j').hide();}
		$('#leftSignupFormDiv').show('slow',function(){				
		});					
	});	
}

var rightAlreadyAnswered = false;
function rightYesNo(answer)
{
	if(rightAlreadyAnswered==true)
	{
		$('#right_attend').val(answer);
		if(answer=='ja'){$('#cb_n').hide();$('#cb_j').show();$('#extraquestions').show();}
		if(answer=='nee'){$('#cb_n').show();$('#cb_j').hide();$('#extraquestions').hide();}
		return false;
	}	
		
	$('#moreinfotext').hide('blind',{},1000,function(){
		$('#right_attend').val(answer);
		rightAlreadyAnswered = true;
		if(answer=='ja'){$('#cb_n').hide();$('#cb_j').show();$('#extraquestions').show();}
		if(answer=='nee'){$('#cb_n').show();$('#cb_j').hide();$('#extraquestions').hide();}
		$('#rightSignupFormDiv').show('slow');		
	});
}

function validateForm(formToValidate)
{	
	if(formToValidate=='left') var formFields = [formToValidate+'_name',formToValidate+'_email'];
	if(formToValidate=='right') var formFields = [formToValidate+'_name',formToValidate+'_email'];
	
	$('#'+formToValidate+'_feedback').hide();
	var warnings = 0;
	jQuery.each(formFields, function(index, field) {
		if($('#'+field).val() == "" || $('#'+field).val() == null)
		{
			warnings ++;
			$('#l_'+field).addClass("error");
		}
		else
			$('#l_'+field).removeClass("error");
			
	});
	
	// checking radios
	if(formToValidate=='right' && $('#right_attend').val() == 'ja')
	{
		formFields = ['right_auto','right_mp3','right_dinner'];
		var right_auto_filled = false;
		var right_mp3_filled = false;
		var right_diner_filled = false;
		
		$("input[type=radio]").each(function () {
			if($(this).attr('id') == 'right_auto' && $(this).attr('checked')) {right_auto_filled = true;}
			if($(this).attr('id') == 'right_mp3' && $(this).attr('checked')) {right_mp3_filled = true;}
			if($(this).attr('id') == 'right_diner' && $(this).attr('checked')) {right_diner_filled = true;}
		});
		
		if(!right_auto_filled){$('#l_right_auto').addClass("error");}
		if(!right_mp3_filled){$('#l_right_mp3').addClass("error");}
		if(!right_diner_filled){$('#l_right_diner').addClass("error");}		
		
	}
	
	if(warnings > 0)
	{				
		$('#'+formToValidate+'_feedback').html('Niet alle verplichte velden, in het rood, zijn ingevuld.');	
		$('#'+formToValidate+'_feedback').show('blind');	
		return false;
	}

	return true;
}

function meerWeten()
{
	$('#cb_step_1').hide('blind',function(){
		$('#cb_step_2').hide('blind',function(){
			$('#meerweten').hide('slide', function(e){
					$('#moreinfo').show('slide',function(){
					})
			});
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