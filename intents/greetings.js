const random = array => { return array[Math.floor(Math.random() * array.length)]; };
const getGreetings = (entity) => {
  const answers = [
    `Hello!`,
    `Yo ;)`,
    `Hey, nice to see you.`,
    `Hola!`,
    `Hi, how can I help you?`,
    `Hey, what do you need?`,
  ];
  
  return Promise.resolve([toText(random(answers))]);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

module.exports = getGreetings;

	