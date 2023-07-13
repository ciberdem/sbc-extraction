function getDiscussionFromTextBox(){
	var discussionText = localStorage.getItem('storedDiscussion');
	console.log(discussionText);
	$("#divDiscussion").hide();
	$(".container-page").show();
	var messages = [];
	var structuredDiscussion = discussionText.split(/\n/);

	var discussionRepresent = new Message("0","Discussion","27/02/2012","06:45:00","","","","");
	messages.push(discussionRepresent);
	for(var i = 1 ; i < structuredDiscussion.length ; i++){
		var dividedMessage = structuredDiscussion[i].split(/\t/);
		var message = new Message(dividedMessage[0],dividedMessage[1],dividedMessage[2],dividedMessage[3].trim(),dividedMessage[4],dividedMessage[5],dividedMessage[6], verifyAddressee(dividedMessage[7]));
		messages.push(message);
	}
	return messages;
}

function verifyAddressee(addressee){
	if(addressee == ""){
		return "0";
	}
	return addressee;
}

function Message(id,sender,date,time,content,topic,position,addressee){
	this.id = id;
	this.sender = sender;
	this.date = date;
	this.time = time;
	this.content = content;
	this.topic = topic;
	this.position = position;
	this.addressee = addressee;
}