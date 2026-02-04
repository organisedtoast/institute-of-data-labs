function analyzesentiment(text) {
  let Sentiment = require('sentiment');
  let sentiment = new Sentiment();
  let result = sentiment.analyze(text);
  console.log(result);
  return result;
}

console.log(analyzesentiment('I love programming. I love bugs.'));
console.log(analyzesentiment('I hate programming. I hate bugs.'));