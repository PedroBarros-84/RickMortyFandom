define(['../services/movie-list-service', '../views/movie-list'], (service, view) => {

	let externals = {};

	externals.init = () => {

		view.show(service.getList());
		
	}

	return externals;

});