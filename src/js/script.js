document.getElementById('username').addEventListener('input', function (e) {
    const value = e.target.value;
    // At least 1 capital letter, 1 special character, and at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (regex.test(value)) {
        e.target.style.border = '2px solid green';
    } else {
        e.target.style.border = '2px solid red';
    }
});

document.addEventListener('DOMContentLoaded', function () {
  var chartInitialized = false;
  var chartInstance = null;
  var months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  function getIncomeData() {
    return months.map(function(month) {
      var el = document.getElementById('income-' + month);
      return el && el.value ? parseFloat(el.value) : 0;
    });
  }

  function getExpenseData() {
    return months.map(function(month) {
      var el = document.getElementById('expenses-' + month);
      return el && el.value ? parseFloat(el.value) : 0;
    });
  }

  var chartsTab = document.getElementById('Charts-tab');
  chartsTab.addEventListener('shown.bs.tab', function () {
    var incomeData = getIncomeData();
    var expenseData = getExpenseData();

    if (!chartInitialized) {
      var ctx = document.getElementById('barChart').getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
      chartInitialized = true;
    } else {
      chartInstance.data.datasets[0].data = incomeData;
      chartInstance.data.datasets[1].data = expenseData;
      chartInstance.update();
    }
  });

  // Download button functionality
  var downloadBtn = document.getElementById('downloadChart');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var canvas = document.getElementById('barChart');
      var link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    });
  }
});
