$(document).ready(function() {
    console.log('READY!');
    $("#twit-search-btn").on('click', (e) => {
        e.preventDefault();
        // can we clear the chart?
        let words = [];
        let freq = [];
        let searchterm = $("#twit-search-term").val();
        $.ajax({ //TO DO: connect to search button
            url: '/getTweets/' + searchterm,
        }).done(function(results) {
            for (let i = 0; i < 10; i++) {
                words.push(results.text[i][0]);
                freq.push(results.text[i][1]);
            }
            console.log("these are the words", words, freq);
        });

        var ctx = document.getElementById("twitterChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: words,
                datasets: [{
                    label: 'Most Common Words',
                    data: freq,
                    backgroundColor: [
                        'rgba(208, 25, 25, 0.7)',
                        'rgba(13, 17, 246, 0.7)',
                        'rgba(246, 239, 28, 0.7)',
                        'rgba(28, 182, 11, 0.7)',
                        'rgba(99, 6, 238, 0.7)',
                        'rgba(238, 145, 6, 0.7)',
                        'rgba(194, 251, 156, .7)',
                        'rgba(6, 238, 234, .7)',
                        'rgba(238, 6, 238, .7)',
                        'rgba(45, 69, 102, 1)'
                    ],
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }); // end new chart

    });
})
