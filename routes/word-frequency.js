const fs = require('fs');
const sw = require('stopword');
const d3 = require('d3');

let wordFreq = {};
// read text data file (will be sessionStorage IRL)
// so will be reading it in differently... and it might be in a
// different form...
fs.readFile('./unicorns2.txt', 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   }

  //convert data to string
  let str = data.toString();
  //strip punctuation
  let newStr = str.replace(/[&\/\\,+\(\)$~%\.!^'"\;:*?\[\]<>{}-]/g, '');
  //remove stopwords
  const arr = sw.removeStopwords(newStr.split(' '));

  //data is in an arr, so...
  //but wtf to do with this?
  ///////////////////////////////////////////
  var wordCount = d3.nest()
    .key(function(d) { return d.description; })
    .rollup(function(v) { return v.length; })
    .entries(descObjects);

  wordCount.sort(function(a,b) {
    return b.values - a.values;
  });
  var tags = [];
  wordCount.forEach(function(d) {
    tags.push([d.key,parseInt(d.values)]);
  });
  tags = tags.slice(0,250);
  //////////////////////////////////////////
  var wstream = fs.createWriteStream('data2.csv');

  // for (var i = 0; i < arr.length; i++) {
  //   wstream.write(arr[i]);
  //   wstream.write(',\n');
  // }
  // wstream.end();
  //get word frequencies
  for (var i = 0; i < arr.length; i++) {

    let temp = arr[i].toLowerCase();
    // if word is in wordFreq, add one
    // else, set wordFreq[word] value to 1
    if (wordFreq[temp]) {
      wordFreq[temp] += 1;
    } else {
      wordFreq[temp] =  1;
    }
  }

  // sort word frequencies highest to lowest
  var sortable = [];
  for (var word in wordFreq) {
    sortable.push([word, wordFreq[word]])
  }
  sortable.sort(function(a, b) {
    return a[1] - b[1]
  });
  // log the sorted list, reversed
  // will be the input for the d3 graphs
  console.log(sortable.reverse());

  for (var i = 0; i < sortable.length; i++) {
    wstream.write(sortable[i]);
    wstream.write('\t');
  }
  wstream.end();



});
