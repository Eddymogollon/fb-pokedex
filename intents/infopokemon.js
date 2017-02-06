const request = require('superagent');
const pokeData = require('./../lib/poke-data.js');

const getInfoPokemon = (entity) => {
  if (!entity) { return Promise.reject([toText('Is that a pokemon?')]); }
  if (entity.nonsense) { return Promise.reject([toText(`Sorry, didn't get that. Ask for help if you're confused!`)]); }
  if (entity.wrong) { return Promise.reject([toText(`The pokemon ${entity.raw} does not exist... You might have mispelled it.`)]); }

  return new Promise((resolve, reject) => {
    request.get('https://pokeapi.co/api/v2/pokemon/' + entity.raw)
    .end((err, res) => {
    	if (err) { 
      	return reject(err);
      }

      const json = res.body;

      request.get(json.species.url).end((err, response) => {
      	if (err) {
	     		return reject(err);
	    	}

	    	pokemonName = toCapitalize(json.name);

	    	const answer = [toText(`:mag_right: Looking for ${pokemonName}`)];

				function toCapitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  			const types = json.types.map(elem => toCapitalize(elem.type.name)).join(' / ');

  			const description = response.body.flavor_text_entries[1].flavor_text;
	    	answer.push(toText(`${pokemonName}: ${description}`));

  			answer.push(toText(`Type(s): ${types}`));
			  if (json.sprites.front_default) {
			  	answer.push(toImage(json.sprites.front_default));
			  }

			  const prompt = [
     			toButton('Info', `show me ${json.name}`),
    		  toButton('Random pokemon', `show me ${getRandomPokemon()}`),
   			];

   			answer.push(toButtons(`See more about ${pokemonName}!`, prompt));

			  resolve(answer);
    

      });

      //resolve(infoPokemonLayout(res.body));
    });
  });
};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

const toImage = (image) => { 
	return { type: 'image', content: image };
};

// Buttons
const toButtons = (title, buttons) => {
  return { type: 'buttons', content: buttons, title };
};
// Button
const toButton = (title, value) => { return { title, value }; };

const getRandomPokemon = () => {
  const randomPokemon = Math.floor(Math.random() * (pokeData.pokemons.length - 1));
  return pokeData.pokemons[randomPokemon];
};

module.exports = getInfoPokemon;