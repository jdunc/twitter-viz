// Garland Word
// A garland word is one that starts and ends with the same N letters in the same order, for some N greater than 0, but less than the length of the word. I'll call the maximum N for which this works the garland word's degree. For instance, "onion" is a garland word of degree 2, because its first 2 letters "on" are the same as its last 2 letters. The name "garland word" comes from the fact that you can make chains of the word in this manner:
//
// onionionionionionionionionionion...
//
// Write a function garland that, given a lowercase word, returns the degree of the word if it's a garland word, and 0 otherwise.
//
// Samples
//
// console.log(garland('programmer')); //0
// console.log(garland('ceramic')); //1
// garland('alfalfa'); //4
// console.log(garland('alfalfa')); //4
// console.log(garland('hotshots')); //4
// garland('abracadabra'); //4
// garland('couscous'); //4
// garland('aa'); //4


// check if first and last letter are the same(indexes of 0 and word.length)
// var ceramic =
// console.log(garland('ceramic'));

// first split the word in half
// if odd => check if middle letter === first letter === last letter
// if even check if 1 st letter === 1 st letter after half aka word.length / 2 + 1



// function garland(word) {
//     var match = word.match(/^(.+).*(\1)$/);
//     console.log('match', match, match[1].length);
// }

function garland(word) {
    var count = 0;
    for (var i = 0; i < word.length; i++) {
        if (word.substr(0, i) === word.substr(-i)) {
            count = i;
        }
    }
    console.log(word, count);
}

garland('programmer'); //0
garland('ceramic'); //1
garland('onion'); //2
garland('alfalfa'); //4
garland('hotshots'); //4
garland('abracadabra'); //4
garland('couscous'); //4







// function palindrome(word) {
//     garlandCount = 0;
//     checkCount = 0;
//     checking = true;
//     while (checking && (checkCount < word.length - checkCount)) {
//         console.log('entered while');
//         var secondLetterIndex = word.length - checkCount - 1
//         console.log(word[checkCount], word[secondLetterIndex]);
//         if (word[checkCount] === word[secondLetterIndex]) {
//             garlandCount++;
//             checkCount++;
//         } else {
//             checking = false;
//         }
//     }
//     return garlandCount;
// };
// }
