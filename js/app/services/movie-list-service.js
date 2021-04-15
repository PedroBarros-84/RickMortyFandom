define(() => {

	let internals = {};
	let externals = {};

	internals.movieList = ['Totoro', 'Ponyo', 'Nausicaa Valley of the Wind', 'Princess Mononoke'];

	externals.getList = () => {

		return internals.movieList;

	};

	return externals;

});