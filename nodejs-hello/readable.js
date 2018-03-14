const stream = require('stream');

let Feed = function(channel) {
  let readable = new stream.Readable({});
  let news = [
    "Big Win!",
    "Stocks Down!",
    "Actor Sad!"
  ];
  readable._read = () => {
    if(news.length) {
      return readable.push(news.shift() + "\n");
    } 
    readable.push(null);
  };
  return readable;
};


feed.on('readable', () => {
  let character;
  while(character = feed.read(1)) {
    console.log(character.toString());
  } 
});