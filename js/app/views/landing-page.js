define( function() {

	let internals = {};
	let externals = {};

	internals.scrollHasBeenInit = false;

	internals.renderNav = function() {

		$("#nav").empty();

		var titleAndSearch = $('<div>').attr('class', 'tittleAndSearch');

		var title = $('<p>').text('RICK and MORTY').attr('class', 'header').attr('title', "Initial Page");
		title.click( function() { window.location.hash = ''; });
		titleAndSearch.append(title);

		var searchBox = $('<input>').attr('type', 'text')
									.attr('id', 'searchBox')
									.attr('class', 'searchBox form-control')
									.attr('value', 'search for a character')
									.attr('id', 'searchBox');
		titleAndSearch.append(searchBox);

		var rick = $('<img>').attr('src', 'https://pedrobarros-84.github.io/RickMortyFandom/resources/rick.png').attr('class', 'rick');
		$('#nav').append($('<div>').append(rick));
		$('#nav').append(titleAndSearch);
		var morty = $('<img>').attr('src', 'https://pedrobarros-84.github.io/RickMortyFandom/resources/morty.png').attr('class', 'morty');
		$('#nav').append($('<div>').append(morty));

		searchBox.click(event => {
			event.target.value = '';
		});

		searchBox.on('change', function() {
			var searchWord = $('#searchBox').val().trim();
			internals.fetchSearch(searchWord);
		});
	}

	internals.populatePage = function(arrayOfCharacters) {
		
		arrayOfCharacters.forEach(element => {
				
			var image = $('<img>').attr('src', element.image)
									.attr('title', element.name)
									.attr('data', element.id);

			image.click( function(event) {

				internals.loadCharacterProfile(event);
			})

			$('#charactersDisplay').append(image);
		});
	}

	internals.initScrollBottomDetect = function(fetchNextPageFunc) {
		
		$(window).scroll( function() {

			if($(window).scrollTop() + $(window).height() == $(document).height() 
					&& internals.nextPageUrl != null && window.location.hash === '#landingPage') {
				internals.fetchNextPage(internals.nextPageUrl);
			}
		});
	}

	externals.show = function(allCharacters, fetchNextPageFunc, fetchSearchFunc) {

		$('#profileDisplay').empty();
		$('#charactersDisplay').empty();

		// create info properties
		sessionStorage.totalNumCharacters = allCharacters.info.count;
		internals.totalPages = allCharacters.info.pages;
		internals.nextPageUrl = allCharacters.info.next;
		internals.previousPageUrl = allCharacters.info.prev;
		internals.charactersInitialList = allCharacters;

		internals.renderNav();

		internals.fetchSearch = fetchSearchFunc;
		internals.fetchNextPage = fetchNextPageFunc;

		if (!internals.scrollHasBeenInit) {
			internals.initScrollBottomDetect();
			internals.scrollHasBeenInit = true;
		}

		// Populate page with array elements
		internals.populatePage(allCharacters.results);
	}

	externals.appendMoreCharacters = function(moreCharacters) {

		internals.nextPageUrl = moreCharacters.info.next;
		internals.previousPageUrl = moreCharacters.info.prev;

		internals.populatePage(moreCharacters.results);
	}

	externals.loadSearchResults = function(searchResults) {

		if (searchResults.error) {
			return alert('No character matching that name');
		}

		$('#charactersDisplay').empty();

		internals.totalCount = searchResults.info.count;
		internals.totalPages = searchResults.info.pages;
		internals.nextPageUrl = searchResults.info.next;
		internals.previousPageUrl = searchResults.info.prev;

		internals.populatePage(searchResults.results);
	}

	internals.loadCharacterProfile = function(event) {

		sessionStorage.characterId = event.target.attributes.data.value;

		window.location.hash = 'profilePage';
	}

	return externals;

});
