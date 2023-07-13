function getDiscussionFromTextBox() {
	let selectableTopics = [];
	const discussionText = localStorage.getItem('storedDiscussion');
	$("#divDiscussion").hide();
	$(".container-page").show();
	const messages = [];
	const structuredDiscussion = discussionText.split(/\n/);

	for (let i = 1; i < structuredDiscussion.length; i++) {
		const dividedMessage = structuredDiscussion[i].split(/\t/);
		const message = new Message(dividedMessage[0], dividedMessage[1], dividedMessage[2], dividedMessage[3].trim(), dividedMessage[4], dividedMessage[6], dividedMessage[7]);
		message.addTopics(dividedMessage[5]);
		selectableTopics = populateTopicsVector(message.topics, selectableTopics);
		messages.push(message);
	}
	populateSelectTopics(selectableTopics);
	return messages;
}



function Message(id, sender, date, time, content, position, addressee) {
	this.id = id;
	this.sender = sender;
	this.date = date;
	this.time = time;
	this.content = content;
	this.topics = [];
	this.addTopics = addTopics;
	this.position = position;
	this.addressee = addressee;

	function addTopics(topics) {
		const dividedTopics = topics.split(";");
		for (let i = 0; i < dividedTopics.length; i++) {
			this.topics.push(dividedTopics[i]);
		}
	}
}

function populateTopicsVector(messageTopics, selectableTopics) {
	for (let i = 0; i < messageTopics.length; i++) {
		const nowTopic = messageTopics[i];
		let topicExists = false;
		for (let j = 0; j < selectableTopics.length; j++) {
			if (nowTopic == selectableTopics[j]) {
				topicExists = true;
			}
		}
		if (topicExists == false) {
			selectableTopics.push(nowTopic);
		}
	}
	return selectableTopics;
}

function populateSelectTopics(selectableTopics) {
	for (let i = 0; i < selectableTopics.length; i++) {
		$(".select-topic").append("<option>" + selectableTopics[i] + "</option>")
	}
}