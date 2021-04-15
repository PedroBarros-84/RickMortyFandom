define(() => {

	let externals = {};

	// inject the list of movies into the html page :)
	externals.show = (movieList) => {

		let div = document.getElementById("main");
		let list = '';

		movieList.forEach( film => {

			list += '<p>' + film + '</p>';

		});

		div.innerHTML = list;

	}

	return externals;

});