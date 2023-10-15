document.addEventListener("DOMContentLoaded", function() {
    fetch("/api/data")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Group data by year
            const groupedData = data.reduce((acc, item) => {
                if (!acc[item.Year]) {
                    acc[item.Year] = {
                        "Forest area": item["Forest area"]
                    };
                }
                acc[item.Year][item["Energy Type"]] = item.Value;
                return acc;
            }, {});

            const labels = Object.keys(groupedData);
            const energyTypes = ["Other Renewables", "Solar", "Wind", "Hydro", "Forest area"];
            const colors = ['green', 'orange', 'blue', 'purple', 'brown'];

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