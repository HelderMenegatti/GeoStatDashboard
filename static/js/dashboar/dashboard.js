let chartData = {};
let myChart;
let uf = null


function getData() {
    const accessToken = localStorage.getItem('accessToken')
    fetch('/api/states/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        chartData = data;
        renderChart(chartData, 'bar');

    }).catch(data => {
        if (data.message == 'data.map is not a function'){
            refreshToken()
        }
       
    });
}


function renderChart(data, graphType) {
    const states = data.map(state => state.name);
    const countiesCount = data.map(state => state.county_count);
    const type = graphType


    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: states,
            datasets: [{
                label: '# de Municípios',
                data: countiesCount,
                backgroundColor: '#047ee785',
                borderColor: '#047ee785',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },

            onClick: function(event, chartElement) {
            if (chartElement.length > 0) {
                const index = chartElement[0].index;
                const stateSelected = states[index];
                const countyObj = chartData.filter(
                    chartData => chartData.name === stateSelected
                );

                uf = countyObj[0].uf 

                loadData(1, uf)
                $('#m-tabel-counties').modal('toggle')
                
            }
        },

        }
    });
}


function updateChart() {
    const region = document.getElementById('regionSelect').value;
    const graphType = document.getElementById('graphType').value;
    if (region === 'all') {
        renderChart(chartData, graphType);
    } else {
        const filteredData = chartData.filter(state => state.region === region);
        renderChart(filteredData, graphType);
    }
}


if (userName && password) {
    getToken()
}else {
    getData()
}
