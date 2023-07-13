function callInterfaceActions(){
	$(document).ready(function() {
		$('.group-visualisations').show();
		$( "#beginning" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-start"
			}
		});
		$( "#rewind" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-prev"
			}
		});
		$( "#play" ).button({
			text: false,
			icons: {
				primary: "ui-icon-play"
			}
		})
		.click(function() {
			var options;
			if ( $( this ).text() === "play" ) {
				options = {
					label: "pause",
					icons: {
						primary: "ui-icon-pause"
					}
				};
			} else {
				options = {
					label: "play",
					icons: {
						primary: "ui-icon-play"
					}
				};
			}
			$( this ).button( "option", options );
		});
		$( "#stop" ).button({
			text: false,
			icons: {
				primary: "ui-icon-stop"
			}
		})
		.click(function() {
			$( "#play" ).button( "option", {
				label: "play",
				icons: {
					primary: "ui-icon-play"
				}
			});
		});
		$( "#forward" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-next"
			}
		});
		$( "#end" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-end"
			}
		});
		$( "#shuffle" ).button();
		$( "#repeat" ).buttonset();
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

	drawPolemicTree();
}