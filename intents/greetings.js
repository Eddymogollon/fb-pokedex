const random = array => { return array[Math.floor(Math.random() * array.length)]; };

var saidHi = false;

const getGreetings = (entity) => {
  const answers = [
    `Hello!`,
    `Yo ;)`,
    `Hey, nice to see you.`,
    `Hola!`,
    `Hi, how can I help you?`,
    `Hey!!`,
  ];
  
  let response = [toText(random(answers))];
  if (!saidHi) {
    response.push(toText(`I’m Pokébot, your own Pokédex! You can ask me anything about any Pokémon:\n
-Infos`));
    saidHi = true;
  }

  return Promise.resolve(response);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};



module.exports = getGreetings;

	