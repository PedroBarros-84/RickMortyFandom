define( function() {

    let externals = {};

    externals.render = function() {

		var title = $('<p>').text('RICK and MORTY').attr('class', 'header').attr('title', "Initial Page");
		title.click(event => {
			window.location.hash = 'landingPage';
		});
		$("#nav").append(title);

		var searchBox = $('<input>').attr('type', 'text')
									.attr('id', 'searchBox')
									.attr('class', 'searchBox form-control')
									.attr('value', 'search for a character');
		$("#nav").append(searchBox);

		searchBox.click(event => {
			console.log(event);
			event.target.value = '';
		});

		searchBox.on('change', event => {
			alert($('#searchBox').val());
		});
	}

    return externals;
});