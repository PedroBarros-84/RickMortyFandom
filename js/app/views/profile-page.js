define( function() {

	let internals = {};
	let externals = {};

	internals.renderNav = function() {

		$("#nav").empty();

		var titleAndButtons = $('<div>').attr('class', 'tittleAndButtons');

		var title = $('<p>').text('RICK and MORTY').attr('class', 'header').attr('title', "Initial Page");
		title.click( function() {
			window.location.hash = '';
		});
		titleAndButtons.append(title);

        var previous = $('<button>').text('previous').attr('class', 'btn btn-secondary').attr('id', 'btnPrevious');
        var next = $('<button>').text('next').attr('class', 'btn btn-secondary').attr('id', 'btnNext');
        var buttonsDiv = $('<div>').append(previous).append(next);
        titleAndButtons.append(buttonsDiv);

		previous.click(function() {
			internals.fetchOther('https://rickandmortyapi.com/api/character/' + internals.previousCharacterId);
		});

		next.click(function() {
			internals.fetchOther('https://rickandmortyapi.com/api/character/' + internals.nextCharacterId);
		});

		var rick = $('<img>').attr('src', '/RickMortyFandom/resources/rick.png').attr('class', 'rick');
		$('#nav').append($('<div>').append(rick));
		$('#nav').append(titleAndButtons);
		var morty = $('<img>').attr('src', '/RickMortyFandom/resources/morty.png').attr('class', 'morty');
		$('#nav').append($('<div>').append(morty));
	}

	internals.populatePage = function(character) {

		var imageDiv = $('<div>').attr('class', 'profileImageDiv');
		imageDiv.append($('<img>').attr('src', character.image));

		var descriptionDiv = $('<div>').attr('class', 'characterDescriptionDiv');
		descriptionDiv.append($('<h1>').text(character.name));
		descriptionDiv.append($('<h5>').text('Gender: ' + character.gender));
		descriptionDiv.append($('<h5>').text('Species: ' + character.species));
		descriptionDiv.append($('<h5>').text('Status: ' + character.status));
		descriptionDiv.append($('<h5>').text('Location: ' + character.location.name));

		$('#profileDisplay').append(imageDiv).append(descriptionDiv);
	}

	externals.loadOtherProfile = function(character) {

		$('#profileDisplay').empty();

		internals.previousCharacterId = character.id - 1 <= 0 ? sessionStorage.totalNumCharacters : character.id - 1;
        internals.nextCharacterId = character.id + 1 > sessionStorage.totalNumCharacters ? 1 : character.id + 1;

		internals.populatePage(character);
	}

	externals.show = function(character, fetchOtherFunc) {

		$('#profileDisplay').empty();
		$('#charactersDisplay').empty();

        internals.renderNav();

		internals.fetchOther = fetchOtherFunc;
				
        internals.previousCharacterId = character.id - 1 <= 0 ? sessionStorage.totalNumCharacters : character.id - 1;
        internals.nextCharacterId = character.id + 1 > sessionStorage.totalNumCharacters ? 1 : character.id + 1;
		
		internals.populatePage(character);
	}

	return externals;
});