$(document).ready(function() {
    console.log('READY!');
    $("#twit-search-btn").on('click', (e) => {
        e.preventDefault();
        let words = [];
        let freq = [];
        let searchterm = $("#twit-search-term").val();
        $.ajax({ //TO DO: connect to search button
            url: '/getTweets/' + searchterm,
        }).done(function(results) {
            $('#twitterImages').empty();
            $('#twitterImages2').empty();
            for (let i = 0; i < 10; i++) {
                words.push(results.text[i][0]);
                freq.push(results.text[i][1]);
            }
            //add images to page
            //this loop and the animations after the graph are what add and animate the images
            for (let i = 0; i < results.images.length; i++) {
                $('#twitterImages').append(`<div style="width:33%; height: 300px; overflow:hidden; background-image: url(${results.images[i]}); background-size: cover; float:left"></div>`)
                $('#twitterImages2').append(`<div style="width:33%; height: 300px; overflow:hidden; background-image: url(${results.images[i]}); background-size: cover; float:left"></div>`)
                    // <img src="" style="height:300px; width:auto;">
            }
            document.getElementById("twitterChart").innerHTML = '&nbsp;';
            document.getElementById("twitterChart").innerHTML = '<canvas id="twitterChart"></canvas>';
            var resetCanvas = function() {
                $('#twitterChart').remove(); // this is my <canvas> element
                $('#chartcont').append('<canvas id="twitterChart"><canvas>');
                var canvas = document.querySelector('#twitterChart');
                ctx = canvas.getContext('2d');
                ctx.canvas.width = $('#twitterChart').width(); // resize to parent width
                ctx.canvas.height = $('#twitterChart').height(); // resize to parent height
                var x = canvas.width / 2;
                var y = canvas.height / 2;
                ctx.font = '10pt Verdana';
                ctx.textAlign = 'center';
                ctx.fillText('This text is centered on the canvas', x, y);
            };
            resetCanvas();
            var ctx = document.getElementById("twitterChart");
            $('.chartjs-hidden-iframe').remove();
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
            setTimeout(animateUp2, 9000);
            $('#twitterImages').animate({
                top: -$('#twitterImages').height()
            }, 10000, 'linear', function() {
                $("#twitterImages").css({
                    top: '0px',
                    "z-index": 3
                });
            }); //end of first animation
            function animateUp2() {
                setTimeout(animateUp, 9000);
                $('#twitterImages2').animate({
                    top: -$('#twitterImages2').height()
                }, 10000, 'linear', function() {
                    $("#twitterImages").css({
                        top: '0px',
                        "z-index": 4
                    });
                    $("#twitterImages2").css({
                        top: '0px',
                        "z-index": 3
                    });

                }); //end of animateUp2
            }

            function animateUp() {
                setTimeout(animateUp2, 9000);
                $('#twitterImages').animate({
                    top: -$('#twitterImages').height()
                }, 10000, 'linear', function() {
                    $("#twitterImages").css({
                        top: '0px',
                        "z-index": 3
                    });
                    $("#twitterImages2").css({
                        top: '0px',
                        "z-index": 4
                    });
                }); //end of animateUp2
            }

        }); //end of .done

    });
})
