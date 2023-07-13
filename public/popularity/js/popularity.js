function drawPopularity() {

  const discussionFromTextBox = getDiscussionFromTextBox();
  const objMessages = new ObjMessages(discussionFromTextBox);

  function ObjMessages(discussionsMessages) {
    this.messages = discussionsMessages;
  }

  const lastNodes = [];

  const allMessages = objMessages.messages;
  for (let l = 0; l < allMessages.length; l++) {
    allMessages[l].value = 0;
    if (allMessages[l].addressee != '') {
      for (let m = 0; m < allMessages.length; m++) {
        if (allMessages[l].addressee == allMessages[m].id) {
          allMessages[l].addressee = allMessages[m].sender;
        }
      }
    }
  }

  const participants = [];

  function Participant(name) {
    this.name = name;
    this.receivedMessages = [];
  }

  for (let i = 0; i < allMessages.length; i++) {
    if ((allMessages[i].addressee != undefined) && (allMessages[i].addressee != "")) {
      let participant = findParticipant(allMessages[i].addressee);
      if (participant == false) {
        participant = new Participant(allMessages[i].addressee);
        participant.receivedMessages.push(allMessages[i]);
        participants.push(participant);
      } else {
        participant.receivedMessages.push(allMessages[i]);
      }
    }
  }

  function findParticipant(name) {
    let participantExists = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].name == name) {
        participantExists = participants[i];
      }
    }
    return participantExists;
  }

  const enterParticipants = {
    "name": "objectParticipants",
    "children": []
  }

  for (let p = 0; p < participants.length; p++) {
    participants[p].size = participants[p].receivedMessages.length;
    enterParticipants.children.push(participants[p]);
  }

  const w = $('.visualisation').width() / 2;
  const h = w //$('.visualisation').height();

  const r = 960,
    format = d3.format(",d"),
    fill = d3.scale.category20c();

  const bubble = d3.layout.pack()
    .sort(function comparator(a, b) {
      return b.value - a.value;
    })
    .size([h, w]);

  const vis = d3.select("#visualisation").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "bubble");

  const node = vis.selectAll("g.node")
    .data(bubble.nodes(classes(enterParticipants))
      .filter(function (d) { return !d.children; }))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
    .attr("id", function (d) { return "circle-" + d.id; })
    .attr("r", function (d) { createPie(d); return d.r; })
    .attr("class", "normal")
    .style("fill", function (d) { return fill(d.packageName); });

  node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .text(function (d) { return d.className.substring(0, d.r / 3); });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    let nodeId = 0;
    const classes = [];

    function recurse(name, node) {
      if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
      else classes.push({ packageName: name, className: node.name, value: node.size, receivedMessages: node.receivedMessages, id: nodeId }); nodeId++;
    }

    recurse(null, root);
    return { children: classes };
  }

  $(".radio-perspective").click(function () {
    $(this).children('input').each(function () {
      if ($(this).attr('checked')) {
        const selectedRadioId = $(this).attr('id');
        const detailsArea = selectedRadioId.slice(6);
        $('.container-messages-details').hide();
        $('.title').hide();
        $('.messages-control').show();
        $('.title-' + detailsArea).show();
        $('.' + detailsArea).show();
      }
    });
  });

  $('circle').unbind('click').bind('click', function () {
    numberPass = 0;
    visitedElementsIds = [];
    const circleId = $(this).attr('id');
    const participant = this.__data__;
    $('.messages-control').hide();
    $('.title').remove();
    $('.container-messages-details').hide();
    $('.container-messages-details').children().remove();
    showMessagesReceived(participant.receivedMessages, participant);
    $(".ui-state-active").attr('aria-pressed', 'false');
    $(".ui-state-active").removeClass('ui-state-active');
    $(".radio-perspective").buttonset("enable");
    $('circle').each(function () {
      $(this).removeClass('selected');
      $(this).addClass('normal');
    });
    $(this).removeClass('normal');
    $(this).addClass('selected');
    $('text').each(function () {
      if ("node-" + this.__data__.index == circleId) {
        $(this).hide();
      }
    });
    $('#radio-messages-sent').attr('checked', true);
    $($('label')[0]).trigger('click');
    $('.radio-perspective').trigger('click');
  });

  function showMessagesReceived(messagesReceived, participant) {
    const addressee = participant.className;
    if (messagesReceived.length > 0) {
      const height = $('.container-messages').height();
      $('.messages-received').append('<div id=receiver class=message-details>' + addressee + ' | Manifestações recebidas = ' + messagesReceived.length + '</div>');

      for (let i = 0; i < messagesReceived.length; i++) {
        console.log(messagesReceived);

        const sender = messagesReceived[i].sender;
        const content = messagesReceived[i].content;
        const date = messagesReceived[i].date;
        const time = messagesReceived[i].time;
        const position = messagesReceived[i].position;
        let positionText = "neutro";
        if (position == "agree") {
          positionText = "apoio";
        }
        if (position == "disagree") {
          positionText = "oposição";
        }


        $('.messages-received').append('<div id=message-' + i + ' class=message-details>' +
          '<div id="container-sender" class="container-sender container-detail"><span id=sender-' + i + ' class="sender detail">Remetente: ' + sender + '</span></div>' +
          '<div id="container-date" class="container-date container-detail"><span id=date-' + i + ' class="date detail">Data: ' + date + ' - ' + time + '</span></div>' +
          '<div id="container-content" class="container-content container-detail"><span id=content-' + i + ' class="content detail">Conteúdo: ' + content + '</span></div>' +
          '<div id="container-position" class="container-position container-detail"><span id=position-' + i + ' class="position-' + position + ' detail">Posição: ' + positionText + '</span></div>' +
          '</div>');
      }
    }
  }

  //creating pies
  function createPie(d) {
    console.log(d);
    const pie = calculatePie(d);
    bakepie(pie.id, pie.data, d.x, d.y, d.r);
  }

  function bakepie(idPie, data, x, y, radius) {
    const color = ["#02d132", "#ff0000"];
    const classes = ["agree", "disagree"];
    const donut = d3.layout.pie().sort(null);
    const arc = d3.svg.arc().outerRadius(radius);
    console.log(radius);
    $('#node-' + idPie).attr('r', radius);

    const pie = d3.select('.bubble').insert("svg:g", "g")
      .attr("transform", "translate(" + x + "," + y + ")")
      .attr("id", 'pie-' + idPie)
      .attr("class", "pie");

    const arcs = pie.selectAll("path")
      .data(donut(data))
      .enter().append("svg:path")
      .attr("fill", function (d, i) {
        $(this).addClass(classes[i], true);
        return color[i];
      })
      .attr("d", arc);
    //console.log(arcs);
  }

  function calculatePiePolemic(pie) {
    const partialR = (pie.agree + pie.disagree / (allMessages.length - 1));
    const radius = ((partialR) * 3) + 5;
    pie.radius = radius;
    const agreePercentual = (pie.agree / (pie.agree + pie.disagree));
    const disagreePercentual = 1 - agreePercentual;
    const data = [agreePercentual, disagreePercentual];
    pie.data = data;
    return pie;
  }

  function calculatePie(participant) {
    let agree = 0;
    let disagree = 0;
    let neutral = 0;
    for (let i = 0; i < participant.receivedMessages.length; i++) {
      if (participant.receivedMessages[i].position == "agree") {
        agree++;
      }
      if (participant.receivedMessages[i].position == "disagree") {
        disagree++;
      }
      if (participant.receivedMessages[i].position == "neutral") {
        neutral++;
      }
    }
    let pie = new Pie(participant.id, agree, disagree, neutral);
    pie = calculatePiePolemic(pie);
    //console.log(pie);
    return pie;
  }

  function Pie(id, agree, disagree, neutral) {
    this.id = id;
    this.agree = agree;
    this.disagree = disagree;
    this.neutral = neutral;
  }

  $('circle').mouseover(function () {
    $("text").hide();
    $(this).siblings("text").show();
  });
}