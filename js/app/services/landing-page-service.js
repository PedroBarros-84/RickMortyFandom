define( function() {

    let externals = {};

    externals.getList = function() {

        return fetch(arguments[0] || 'https://rickandmortyapi.com/api/character');
                    
    }

    externals.getSearch = function(search) {

        return fetch('https://rickandmortyapi.com/api/character/?name=' + search);

    }

    return externals;
});