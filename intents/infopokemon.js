const request = require('superagent');

const getInfoPokemon = (entity) => {
  if (!entity) { return Promise.reject([toText('Which pokemon?')]); }
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
	     		console.error(err);
	    	}

	    	const answer = [toText(`:mag_right: Looking for ${json.name}`)];

				function toCapitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

  			const types = json.types.map(elem => toCapitalize(elem.type.name)).join(' / ');

  			const description = response.body.flavor_text_entries[1].flavor_text;
	    	answer.push(toText(description));

  			answer.push(toText(`Type(s): ${types}`));
			  if (json.sprites.front_default) {
			  	answer.push(toImage(json.sprites.front_default));
			  }

			  resolve(answer);
    

      });

      //resolve(infoPokemonLayout(res.body));
    });
  });
};


//const infoPokemonLayout = (json) => {

  // const answer = [toText(`:mag_right: Looking for ${json.name}`)];

  // const types = json.types.map(elem => elem.type.name).join(' / ');
  // answer.push(toText(`Type(s): ${types}`));
  // if (json.sprites.front_default) {
  // 	answer.push(toImage(json.sprites.front_default));
  // }
  // return answer;
//};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

const toImage = (image) => { 
	return { type: 'image', content: image };
};

module.exports = getInfoPokemon;