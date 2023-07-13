function drawPolemicTree(){
	
	var discussionFromTextBox = getDiscussionFromTextBox();

	var totalData = new TotalData(discussionFromTextBox);

	function TotalData(discussionsMessages){
		this.messages = discussionsMessages;
	}

	var messagesCount = 0;
	
	function createTree(data){
		console.log(messagesCount);
		var w = $('.visualization').width();
		var h = $('.visualization').height();
		$('#svg-polemic-tree').remove();
		$('.container-message-details').remove();
		$('.container-messages').hide();
		var layoutRoot = d3.select(".visualization")
	    .append("svg:svg").attr("width", w).attr("height", h).attr("id", "svg-polemic-tree")
	    .append("svg:g")	    
		.attr("class", "container");
		var tree = d3.layout.tree()
	    .sort(function comparator(a, b) {
	    	var aPosition = 0;
	    	var bPosition = 0;
	    	var comparator = 0;
	    	if(a.position == "agree"){
	    		aPosition = 2;
	    	}
	    	if(b.position == "agree"){
	    		bPosition = 2;
	    	}	    	
	    	if(a.position == "neutral"){
	    		aPosition = 1;
	    	}
	    	if(b.position == "neutral"){
	    		bPosition = 1;
	    	}
	    	if((aPosition - bPosition) == 0){
	    		comparator = a.id - b.id;
	    	} else {
	    		comparator = aPosition - bPosition;
	    	}
	    	return comparator;
		})
	    .size([h,w-150])
	    .children(function(d)
	    {
	        return (!d.children || d.children.length === 0) ? null : d.children;
	    });
		
		var nodes = tree.nodes(data);
		
		for(var i = 0 ; i < nodes.length ; i++){
			nodes[i].y += 100;
		}
		
		prepareMessageDetails(nodes);
		
		var links = tree.links(nodes);		
		
		 // Edges between nodes as a <path class="link" />
		 var link = d3.svg.diagonal()
		     .projection(function(d)
		     {
		         return [d.y, d.x];
		     });
		
		 layoutRoot.selectAll("path.link")
		     .data(links)
		     .enter()
		     .append("svg:path")
		     .attr("class", "link")
		     .style("stroke", function(d){
		     	if(d.target.position == "agree"){
		     		return "green";
		     	}
		     	if(d.target.position == "disagree"){
		     		return "red";
		     	}
		     	return "gray";
		     })
		     .style("stroke-width", function(d){
		     	if(d.target.position == "agree"){
		     		return "2";
		     	}
		     	if(d.target.position == "disagree"){
		     		return "2";
		     	}
		     	return "1";
		     })
		     .style("opacity", function(d){
		     	if(d.source.id == 0){
		     		return 0;
		     	} else {
		     		return 1;
		     	}
		     })
		     .attr("id", function(d)
		     {
		     	var idLink = "link-"+d.target.id;
		     	return idLink;
		     })
		     .attr("d", link);
		
		
		 /*
		     Nodes as
		     <g class="node">
		         <circle class="node-dot" />
		         <text />
		     </g>
		  */
		 var nodeGroup = layoutRoot.selectAll("g.node")
		     .data(nodes)
		     .enter()
		     .append("svg:g")
		     .attr("class", "node")
		     .attr("transform", function(d)
		     {
		         return "translate(" + d.y + "," + d.x + ")";
		     });
		
		nodeGroup.append("svg:circle")
		     .attr("class", "node-dot")
		     .style("opacity", function(d){
		     	if(d.id == 0){
		     		return 0;
		     	} else {
		     		return 1;
		     	}
		     })
		     .attr("id", function(d)
		     {
		     	var idNode = "node-"+d.id;
		     	return idNode;
		     })
		     .attr("r", function(d)
		     {	     	
		     	return calculateCircleRadius(d);
		     });

		function calculateCircleRadius(message){
			console.log(message.children);
			console.log(totalData.messages.length);
			
     		var partialR = (message.children.length / (totalData.messages.length-1));
     		var radius = ((partialR)*100) + 5;
			return radius;
		}

	    nodeGroup.append("svg:text")
		     .attr("text-anchor", function(d)
		     {
		         return d.children ? "end" : "start";
		     })
		     .attr("dx", function(d)
		     {
		         var gap = 2 * 5;
		         return d.children ? -gap : gap;
		     })
		     .attr("dy", 3);
	     
	     $('text').hide();	     
	     setUpInteractions(layoutRoot);
	     return nodes;
	}
     
	function setUpInteractions(layoutRoot){
	     $("circle").mouseover(function() {
	     	var message = $(this);
			//message.siblings("text").append((message.attr('r')-5)+"%").show();
			var allCircle = layoutRoot.selectAll("circle");	 		
		 		allCircle.classed('not-selected',true);
		 		
		 	var circle = d3.select(this);
		 		circle.classed('not-selected', false);
		 		circle.classed('mouse-over', true);
			
		}).mouseout(function() {
			var message = $(this);
			message.siblings("text").empty();
			$(this).siblings("text").hide();
			var circle = d3.select(this);
		 		circle.classed('not-selected', true);
		 		circle.classed('mouse-over', false);
		});
		
		 $("circle").click(function() {
		 	var allCircle = layoutRoot.selectAll("circle");
		 		allCircle.classed('selected',false);
		 		allCircle.classed('not-selected',true);
		 		
		 		
		 	
		 	var circle = d3.select(this);
		 		circle.classed('not-selected', false);
		 		circle.classed('mouse-over', false);
		 		circle.classed('selected', true);
		 	
		 	var messageId = $(this).attr('id');
		 	$(".container-messages").show();
	     	$(".container-message-details").hide();     	
	     	$("#message-"+messageId).show();
		});
		
		$(".pie").live("click", function() {
			
			// resetting pies at each click first
			var allPies = d3.selectAll('.pie');
			allPies.each(function(d,i){
				$(this).children().attr('stroke','');
				if($(this).children().hasClass("selected")){
					$(this).children().removeClass("selected");				
				}
			});
			
			$('.pie').each(function(){
        		$(this).children('.agree').attr('fill',"#02d132");
				$(this).children('.disagree').attr('fill',"#ff0000");
      		});
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
			for(var k = 0 ; k < pie.childNodes.length ; k++){					
					if(pie.childNodes[k].__data__.startAngle == pie.childNodes[k].__data__.endAngle){
						$(pie.childNodes[k]).attr('stroke', '');
					}
				}
				
			$(this).children('.agree').attr('fill',"#009921");
			$(this).children('.disagree').attr('fill',"#c90202");
			$(this).children().addClass("selected");
			
		 	var pieId = $(this).attr('id');		 	
		 	var messageId = "node-" + pieId.slice(4);
		 	$(".container-messages").show();
	     	$(".container-message-details").hide();     	
	     	$("#message-"+messageId).show();
		});
		
		$(".pie").live("mouseover", function() {
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
				
			$(this).children('.agree').attr('fill',"#009921");
			$(this).children('.disagree').attr('fill',"#c90202");
		});
		
		$(".pie").live("mouseout", function() {
			
			// now set the selected pie with style
			var pie = d3.select(this).node();
			if($(this).children().hasClass("selected")){
				$(this).children('.agree').attr('fill',"#009921");
				$(this).children('.disagree').attr('fill',"#c90202");				
			} else {
				$(this).children('.agree').attr('fill',"#02d132");
				$(this).children('.disagree').attr('fill',"#ff0000");
			}
		});
	}
	
	function prepareMessageDetails(nodes){
		for(var i = 0 ; i < nodes.length ; i++){
			var messageId = nodes[i].id;
			messageId = "node-"+messageId;
			var messageSender = nodes[i].sender;
			var messageDate = nodes[i].date;
			var messageTime = nodes[i].time;
			var messageContent = nodes[i].content;
			var messagePosition = nodes[i].position;
			
			var teste = '<div id="message-'+messageId+'" class="container-message-details"></div>';
			$('.container-messages').append(teste);
			$('#message-'+messageId).append('<div id="sender-"'+messageId+'" class="message-details"> Remetente: "'+messageSender+'"</div>');
			$('#message-'+messageId).append('<div id="date-"'+messageId+'" class="message-details"> Data: "'+messageDate+'"</div>');
			$('#message-'+messageId).append('<div id="time-"'+messageId+'" class="message-details"> Hora: "'+messageTime+'"</div>');
			$('#message-'+messageId).append('<div id="content-"'+messageId+'" class="message-details"> Conteúdo: "'+messageContent+'"</div>');
			$('#message-'+messageId).append('<div id="position-"'+messageId+'" class="message-details"> Posição: "'+messagePosition+'"</div>');
		}
	}
var nowData = [];
var dataCollection = [];
var activeNodes = [];
	
$(".next-message").click(function() {					
	var nextNode = findNextNode(totalData, nowData);
	if (nextNode != false){
		insertNode(nextNode, nowData);
		var newObject = jQuery.extend(true, {}, nowData[0]);
		dataCollection.push(newObject);
		messagesCount++;
		updateMessagesCountDiv(messagesCount);
		var nodes = createTree(dataCollection[dataCollection.length-1]);
		calculateNodePolemic(nodes);
	}
	if(dataCollection.length == 1){
		$(".next-message").trigger('click');
	}
});

$(".previous-message").click(function() {
			
	console.log(activeNodes);
	if(dataCollection.length != 0) {
		dataCollection.pop();
		activeNodes.pop();					
	}
	nowData = [];
	for(var i = 0 ; i < activeNodes.length ; i++){												
		if (activeNodes.length > 0){
			insertNode(activeNodes[i], nowData);
		}
	}
	console.log(activeNodes);
	console.log(nowData);
	messagesCount--;
	updateMessagesCountDiv(messagesCount);
	var nodes = createTree(nowData[0]);
	calculateNodePolemic(nodes);
});	

$(".latest-message").click(function() {
	
	for(var i = 0 ; i < totalData.messages.length ; i++){
		var nextNode = findNextNode(totalData, nowData);
		if (nextNode != false){
			insertNode(nextNode, nowData);
			var newObject = jQuery.extend(true, {}, nowData[0]);
			dataCollection.push(newObject);			
		}
	}
	messagesCount = totalData.messages.length-1;
	updateMessagesCountDiv(messagesCount);
	var nodes = createTree(dataCollection[dataCollection.length-1]);
	calculateNodePolemic(nodes);			
});	

$(".first-message").click(function() {
	
	console.log(activeNodes);
	if(dataCollection.length != 0) {
		dataCollection = [];
		activeNodes = [];					
	}
	messagesCount = -1;
	updateMessagesCountDiv(messagesCount);
	nowData = [];
	$(".next-message").trigger('click');
});

function insertNode(node, nowData){
	if(node.addressee != ""){
		node.children = [];
		for(var i = 0 ; i < nowData.length ; i++){
			if (node.addressee == nowData[i].id){
				nowData[i].children.push(node);
				return nowData;
			} else if (nowData[i].children.length != 0){
				insertNode(node, nowData[i].children)
			}
		}
	} else {
		node.children = [];
		nowData.push(node);
		return nowData;
	}
}
	
function findNextNode(totalData, nowData){				
	if (activeNodes.length == 0){
		activeNodes.push(totalData.messages[0]);
		return activeNodes[0];
	}
	var nowNode = activeNodes[activeNodes.length-1];
	for(var i = 0 ; i < totalData.messages.length ; i++){
		if(nowNode == totalData.messages[i]){
			if(i < totalData.messages.length-1){
				activeNodes.push(totalData.messages[i+1]);
				return totalData.messages[i+1];
			} else {
				return false;
			}
		}
	}
}

function calculateNodePolemic(nodes){
	for (var j = 0 ; j < nodes.length ; j++){//percorre nós ativos pegando cada um
		var idPie = "pie-"+nodes[j].id;
		var relatedNodes = 0;
		var relatedNodesAgree = 0;
		var relatedNodesDisagree = 0;
		var relatedNodesNeutral = 0;
		for (var i = 0 ; i < nodes.length ; i++){//percorre novamente os nós ativos para contar a quantidade de nós filhos ativos
			if(nodes[i].addressee != ""){
				if(nodes[i].addressee == nodes[j].id){
					relatedNodes++;
					if(nodes[i].position == "agree"){
					relatedNodesAgree++;
					}
					if(nodes[i].position == "disagree"){
					relatedNodesDisagree++;
					}
					if(nodes[i].position == "neutral"){
					relatedNodesNeutral++;
					}
				}
			}
		}
		
 		var partialR = (relatedNodes / (nodes.length-1));
 		var radius = ((partialR)*100) + 5;
		var agreePercentual = (relatedNodesAgree / (relatedNodes-relatedNodesNeutral));
		var disagreePercentual = 1 - agreePercentual;
		var data = [agreePercentual,disagreePercentual];
		if ((relatedNodes-relatedNodesNeutral) > 0){
			updatePie(idPie, data, nodes[j].x, nodes[j].y, radius);
		}
	}
}
	
function bakepie(idPie, data, donut, arc, x, y, radius){
	var color = ["#02d132", "#ff0000"];
	var classes = ["agree", "disagree"];		
	
	var pie = d3.select(".container").append("svg:g")
	    .attr("transform", "translate(" + y + "," +x + ")")	    
	    .attr("id", idPie)
	    .attr("class", "pie");
	    //console.log(pie);
	    donut.startAngle(1.5);
	    donut.endAngle(7.8);

	var arcs = pie.selectAll("path")
	    .data(donut(data))
	  .enter().append("svg:path")
	    .attr("fill", function(d, i) {
	    	$(this).addClass(classes[i],true);
	    	return color[i]; })
	    .attr("d", arc);		    
	    //console.log(arcs);
}
    
function updatePie(idPie,data, x, y, radius){
	var donut = d3.layout.pie().sort(null);
	var arc = d3.svg.arc().outerRadius(radius);
	var pie = d3.select("."+idPie);
	if (pie[0][0] != null){
    	arcs = pie.selectAll("path");
		arcs = arcs.data(donut(data)); // update the data
		arcs.attr("d", arc); // redraw the arcs
	} else {
		bakepie(idPie, data, donut, arc, x, y, radius);
	}
}

var countdown;
var countdown_number;

function countdown_trigger() {
    if(countdown_number > 0) {
        countdown_number--;
    	$(".next-message").trigger('click');	        
        countdown = setTimeout(  
		    function() {  
		        countdown_trigger();  
		    },  
		    1000  
		);
    }
}

	function countdown_init() {
		countdown_number = totalData.messages.length;
	    countdown_trigger();
	}

	$(".play").click(function() {		
		if($($(this).children()[0]).hasClass('ui-icon-play')){
			countdown_init();
		} else {
			countdown_number = 0;
		}
	});

    $(".latest-message").trigger('click');

    function updateMessagesCountDiv(messagesCountNow){
    	$('.message-count').html(messagesCountNow);
    }
}

