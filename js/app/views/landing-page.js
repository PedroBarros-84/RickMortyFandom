define( function() {

	let internals = {};
	let externals = {};

	internals.renderNav = function() {

		$("#nav").empty();

		var titleAndSearch = $('<div>').attr('class', 'tittleAndSearch');

		var title = $('<p>').text('RICK and MORTY').attr('class', 'header').attr('title', "Initial Page");
		title.click(event => {
			window.location.hash = '';
		});
		titleAndSearch.append(title);

		var searchBox = $('<input>').attr('type', 'text')
									.attr('id', 'searchBox')
									.attr('class', 'searchBox form-control')
									.attr('value', 'search for a character');
		titleAndSearch.append(searchBox);

		var rick = $('<img>').attr('src', '../resources/rick.png').attr('class', 'rick');
		$('#nav').append($('<div>').append(rick));
		$('#nav').append(titleAndSearch);
		var morty = $('<img>').attr('src', '../resources/morty.png').attr('class', 'morty');
		$('#nav').append($('<div>').append(morty));

		searchBox.click(event => {
			console.log(event);
			event.target.value = '';
		});

		searchBox.on('change', event => {
			var searchWord = $('#searchBox').val().trim();
			internals.fetchSearch(searchWord);
		});
	}

	internals.populatePage = function(arrayOfCharacters) {
		
		arrayOfCharacters.forEach(element => {
				
			console.log(element)

			var image = $('<img>').attr('src', element.image)
									.attr('title', element.name)
									.attr('data', element.id);

			image.click( function(event) {

				internals.loadCharacterProfile(event);

			})

			$('#charactersDisplay').append(image);

		});
	}

	internals.initScrollBottomDetect = function() {
		
		$(window).scroll( function(event) {

			if($(window).scrollTop() + $(window).height() == $(document).height() 
					&& internals.nextPageUrl != null && window.location.hash === '#landingPage') {
				internals.fetchNextPage(internals.nextPageUrl);
			}
	
		});
	}

	externals.show = function(allCharacters, fetchNextPageFunc) {

		$('#profileDisplay').empty();
		$('#charactersDisplay').empty();

		console.log('allCharacters object', allCharacters);

		// create info properties
		sessionStorage.totalNumCharacters = allCharacters.info.count;
		internals.totalPages = allCharacters.info.pages;
		internals.nextPageUrl = allCharacters.info.next;
		internals.previousPageUrl = allCharacters.info.prev;

		// view gets controllers functions to retrive next character block & search
		internals.fetchNextPage = fetchNextPageFunc;

		internals.renderNav();

		// Populate page with array elements
		internals.populatePage(allCharacters.results);

		internals.initScrollBottomDetect();

		console.log("landing show function has run");
		console.log('internals', internals);

	}

	externals.appendMoreCharacters = function(moreCharacters) {

		console.log(moreCharacters);

		internals.nextPageUrl = moreCharacters.info.next;
		internals.previousPageUrl = moreCharacters.info.prev;

		internals.populatePage(moreCharacters.results);

	}

	externals.loadSearchResults = function(searchResults) {

		console.log(searchResults);

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
