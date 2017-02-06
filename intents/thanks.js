const random = array => { return array[Math.floor(Math.random() * array.length)]; };
const getThanks = (entity) => {
  const answers = [
    `You're welcome!`,
    `No problem! ;)`,
    `No problemo.`,
    `Don't mention it!`,
    `No sweat`,
    `It's all gravy`,
  ];
  
  return Promise.resolve([toText(random(answers))]);

};

const toText = (message) => { 
	return { type: 'text', content: message }; 
};

module.exports = getThanks;

	