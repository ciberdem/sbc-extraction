function callInterfaceActions(){
	$(document).ready(function() {
		$('.group-visualisations').show();
	});
	
	$( ".radio-perspective" ).buttonset();
	$(".radio-perspective").buttonset("disable") ;
	$(".up").button();
	$(".down").button();

  $('.about').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html';
  });

  $('.tutorial').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html';
  });

  $('.import-discussion').click(function(){    
    localStorage.setItem('menuItem',$(this).find('a').attr('href'));
    location.href = '../index.html#import-discussion';
  });

  $('.group-visualisations').click(function(){
    if($(this).attr('id') == 'visualisations-babblers'){
      location.href = '../babblers/index.html';
    }
    if($(this).attr('id') == 'visualisations-popularity'){
      location.href = '../popularity/index.html';
    }
    if($(this).attr('id') == 'visualisations-alliance'){
      location.href = '../allianceNetwork/index.html';
    }
    if($(this).attr('id') == 'visualisations-polemic'){
      location.href = '../polemicTree/index.html';
    }
  });

	drawPopularity();
		$(".radio-perspective").buttonset("disable") ;		
}