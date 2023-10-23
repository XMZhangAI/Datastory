document.addEventListener("DOMContentLoaded", function() {
    const startYear = 1960;  // set start year
    fetch("/api/data")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Filter data by start year
            const filteredData = data.filter(item => item.Year >= startYear);

            // Group data by year (because of melt function in data wrangling - pd_modern-renewable-energy-consumption)
            const groupedData = filteredData.reduce((acc, item) => {
                if (!acc[item.Year]) {
                    acc[item.Year] = {};
                }
                acc[item.Year][item["Energy Type"]] = item.Value;
                // rest of data
                acc[item.Year]["Annual CO\u2082 emissions"] = item["Annual CO\u2082 emissions"];
                acc[item.Year]["Forest area"] = item["Forest area"];
                acc[item.Year]["Normalized Temperature"] = item["Normalized Temperature"]
                return acc;
            }, {});

            const labels = Object.keys(groupedData);
            const energyTypes = ["Other Renewables", "Solar", "Wind", "Hydro", "Forest area", "Annual CO\u2082 emissions", "Normalized Temperature"];
            const colors = ['green', 'orange', 'blue', 'purple', 'brown', 'black', 'red'];

            const datasets = energyTypes.map((type, index) => {
                return {
                    label: type,
                    data: labels.map(year => groupedData[year][type] || 0),
                    borderColor: colors[index],
                    fill: false
                }
            });

            // Create the chart
            const ctx = document.getElementById('energyChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const chartCanvas = document.getElementById('energyChart');
            const sliderCanvas = document.getElementById('slider');
            
            // Set the slider canvas width to match the chart canvas width
            sliderCanvas.width = chartCanvas.offsetWidth;
            sliderCanvas.height = 30;

            const sliderCtx = sliderCanvas.getContext('2d');
            let isDragging = false;
        
            // Draw initial line
            sliderCtx.beginPath();
            sliderCtx.moveTo(0, 15);
            sliderCtx.lineTo(sliderCanvas.width, 15);
            sliderCtx.stroke();
        
            // Add event listeners for drag functionality
            sliderCanvas.addEventListener('mousedown', function() {
                isDragging = true;
            });
        
            sliderCanvas.addEventListener('mouseup', function() {
                isDragging = false;
            });
        
            sliderCanvas.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    // Get mouse position
                    const rect = sliderCanvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
        
                    // Clear canvas and redraw line
                    sliderCtx.clearRect(0, 0, sliderCanvas.width, sliderCanvas.height);
                    sliderCtx.beginPath();
                    sliderCtx.moveTo(x, 15);
                    sliderCtx.lineTo(sliderCanvas.width, 15);
                    sliderCtx.stroke();
        
                    // Send data to left canvas
                    updateLeftCanvas(x / sliderCanvas.width);
                }
            });
        })
        .catch(error => console.error("Error fetching data: ", error));
});


let ratio = 0;

function updateLeftCanvas(newRatio) {
    // Update the global ratio variable
    ratio = newRatio;
}

// p5.js sketch
function setup() {
    createCanvas(400, 400).parent('leftCanvasContainer');
}

function draw() {
    console.log("Drawing with ratio:", ratio);
    background(200);
    fill(150);
    rect(0, 0, width * ratio, height);
}