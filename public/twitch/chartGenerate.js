/*
 * <script type="text/javascript"  src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.bundle.min.js"></script>
 * <canvas id="myChart" width="400" height="400"></canvas>
 * PUT THIS HTML INTO WHERE WE WANT THE CHART TO BE
 */
function generateChart(words, freq, label) {
  const ctx = $("#myChart");
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: words,
      datasets: [{
        label: label,
        data: freq,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(40, 155, 76, 1)',
          'rgba(40, 23, 76, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
        animation: {
            duration: 0,
            animateRotate: false,
        },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });

  return myChart;
}
