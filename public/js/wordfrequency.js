const fs = require('fs');
const sw = require('stopword');
const d3 = require('d3');

function wordfrequency(obj) {
    let wordFreq = {};
    let sortable = [];

    //convert data to string
    let str = obj.toString();
    //strip punctuation
    let newStr = str.replace(/[&\/\\,+\(\)$~%\.!^'"\;:*?\[\]<>{}-…]/g, '');
    //remove stopwords
    const arr = sw.removeStopwords(newStr.split(' '));

    //get word frequencies
    for (var i = 0; i < arr.length; i++) {

        let temp = arr[i].toLowerCase();
        // if word is in wordFreq, add one
        // else, set wordFreq[word] value to 1
        if (wordFreq[temp]) {
            wordFreq[temp] += 1;
        } else {
            wordFreq[temp] = 1;
        }
    }

    // sort word frequencies highest to lowest
    for (var word in wordFreq) {
        sortable.push([word, wordFreq[word]])
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1]
    });
    // log the sorted list, reversed
    // will be the input for the d3 graphs
    //console.log(sortable);

    return sortable;
};

module.exports = {
    wordfrequency: wordfrequency
};
