// const natural = require('natural');
// const TfIdf = natural.TfIdf;
// const Sentiment = require('sentiment');

// const sentiment = new Sentiment();

// function extractKeywords(text) {
//   const tfidf = new TfIdf();
//   tfidf.addDocument(text);
//   const terms = tfidf.listTerms(0).slice(0, 10).map(item => item.term);
//   return terms;
// }

// function getSentiment(text) {
//   const result = sentiment.analyze(text);
//   if (result.score > 1) return 'positive';
//   if (result.score < -1) return 'negative';
//   return 'neutral';
// }

// function textToVector(text, keywordBank) {
//   const tfidf = new TfIdf();
//   tfidf.addDocument(text);
//   return keywordBank.map(keyword => tfidf.tfidf(keyword, 0));
// }

// module.exports = { extractKeywords, getSentiment, textToVector };
