const random = array => { return array[Math.floor(Math.random() * array.length)]; };
const getFeelings = (entity) => {
  const answers = [
    `Better than ever!`,
    `For being a bot, pretty well, ya know!`,
    `One word: LEGEND-wait-for-it-DARY!`,
    `Great!!`,
    `Awesome!`,
    `Not bad!`,
  ];
  
  return Promise.resolve([toText(random(answers))]);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

module.exports = getFeelings;

	