const natural = require('natural');
const TfIdf = natural.TfIdf;
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

function extractKeywords(text) {
  const tfidf = new TfIdf();
  tfidf.addDocument(text);
  const terms = tfidf.listTerms(0).slice(0, 10).map(item => item.term);
  return terms;
}

function getSentiment(text) {
  const result = sentiment.analyze(text);
  if (result.score > 1) return 'positive';
  if (result.score < -1) return 'negative';
  return 'neutral';
}

function textToVector(text, keywordBank) {
  const tfidf = new TfIdf();
  
  // Add the blog's text to the model first. This is our document of interest.
  tfidf.addDocument(text);
  
  // To create a vector based on the keywordBank, we need to ensure the TF-IDF
  // model has processed these words. A common way is to add each keyword as a
  // "document" so they are part of the vocabulary.
  keywordBank.forEach(keyword => {
    tfidf.addDocument(keyword);
  });

  // Now, calculate the TF-IDF score for each keyword against our main document (index 0).
  // If a keyword from the bank is not in the main text, its TF-IDF will be 0.
  const vector = keywordBank.map(keyword => {
    const score = tfidf.tfidf(keyword, 0);
    return isNaN(score) ? 0 : score; // Ensure no NaN values are returned
  });

  return vector;
}

module.exports = { extractKeywords, getSentiment, textToVector };
