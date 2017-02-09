(function() {
    $(document).ready(function() {
        let words = [];
        let freq = [];
        $("#twit-search-btn").on('click', (e) => {
            e.preventDefault();
            console.log("you clicked! yaaaaaaaay");
            $.ajax({ //TO DO: connect to search button
                url: `./getTweets/puppy`, //connect to search term $("#twit-search-btn")
            }).done(function(results) {
                for (let i = 0; i < 10; i++) {
                    words.push(results.text[i][0]);
                    freq.push(results.text[i][1]);
                }
            });
            let ctx = document.getElementById("myChart");
            // let words = ["alternate", "unicorns", "flying", "pink", "trump", "full", "house", "glittery"];
            // let freq = [6671, 5824, 3645, 3389, 3372, 3359, 3356, 3355];
            let myChart = new Chart(ctx, {
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
            });
        });
    })
})()
