define(() => {

	let internals = {};
	let externals = {};


	internals.populatePage = function(arrayOfCharacters) {
		
		arrayOfCharacters.forEach(element => {
				
			console.log(element)

			var image = $('<img>').attr('src', element.image)
									.attr('title', element.name);

			$('#allDisplay').append(image);

		});
	}

	internals.renderNav = function() {

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

	
		/* var testLoadButton = $('<button>').text('load more').attr('id', 'loadMoreButton');
		testLoadButton.click(event => {
			internals.fetchNextPage(internals.nextPageUrl);

		});
		$("#nav").append(testLoadButton); */
	}

	internals.initScrollBottomDetect = function() {
		
		$(window).scroll( function(event) {

			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				internals.fetchNextPage(internals.nextPageUrl);
			}
	
		});
	}


	externals.show = (allCharacters, fetchNextPage) => {

		console.log('allCharacters object', allCharacters);

		// create info properties
		internals.totalCharacters = allCharacters.info.count;
		internals.totalPages = allCharacters.info.pages;
		internals.nextPageUrl = allCharacters.info.next;
		internals.previousPageUrl = allCharacters.info.prev;

		// view gets controllers function to retrive next character block
		internals.fetchNextPage = fetchNextPage;

		internals.renderNav();

		// Populate page with array elements
		internals.populatePage(allCharacters.results);

		internals.initScrollBottomDetect();

	}

	externals.appendMoreCharacters = (moreCharacters) => {

		internals.nextPageUrl = moreCharacters.info.next;
		internals.previousPageUrl = moreCharacters.info.prev;

		internals.populatePage(moreCharacters.results);

	}





	return externals;

});
