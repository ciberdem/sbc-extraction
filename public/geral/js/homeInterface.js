/**
 * @author Rafael
 * @descrição: Este arquivo .js é arquivo que contém alterações de interface
 */

$(document).ready(function () {
	var parkingDiscussion;
	var groupDiscussion;
	var courseDiscussion;
	$('.import-discussion').click(function () {
		$("#divDiscussion").css("display", "block");
		$("#standard-discussions").css("display", "block");
	});

	$('.import-discussion').click(function () {
		$('.arrow').show();
		$('.images').show();
	});

	$('#image-babblers').click(function () {
		localStorage.setItem('storedDiscussion', $('#textDiscussion').val());
		location.href = 'babblers/index.html';
		$('.arrow').hide();
		$('.images').hide();
	});

	$('#image-popularity').click(function () {
		localStorage.setItem('storedDiscussion', $('#textDiscussion').val());
		location.href = 'popularity/index.html';
		$('.arrow').hide();
		$('.images').hide();
	});

	$('#image-alliance').click(function () {
		localStorage.setItem('storedDiscussion', $('#textDiscussion').val());
		location.href = 'allianceNetwork/index.html';
		$('.arrow').hide();
		$('.images').hide();
	});

	$('#image-polemic').click(function () {
		localStorage.setItem('storedDiscussion', $('#textDiscussion').val());
		location.href = 'polemicTree/index.html';
		$('.arrow').hide();
		$('.images').hide();
	});

	var menuItem = localStorage.getItem('menuItem');
	if (menuItem == '#home') {
		$('.home').trigger('click');
	} else if (menuItem == '#about') {
		$('.about').trigger('click');
	} else if (menuItem == '#tutorial') {
		$('.tutorial').trigger('click');
	} else if (menuItem == '#import-discussion') {
		$('.import-discussion').trigger('click');
	} else if (menuItem == '#contact') {
		$('.contact').trigger('click');
	}
	parkingDiscussion = populateStandardDiscussions("discussion-parking");
	$('#textDiscussion').html(parkingDiscussion);
});
