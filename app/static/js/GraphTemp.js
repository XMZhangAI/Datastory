// Global variables - needed by both functions
let x, margin;


document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/temperature')  
        .then(response => response.json())
        .then(data => {
            console.log(data);  // log data to console
            createLineChart(data);
        });
});


function updateCanvas(val, data, maxValue, minValue) {
    // Find datapoint that matches with slider
    const matchingDataPoint = data.find(d => d.Year === val);

    if (matchingDataPoint) {
        // Min-Max normaliszing because of negative values
        const normalizedTemperature = (matchingDataPoint.Temperature - minValue) / (maxValue - minValue);

        // Log info to console
        console.log("Year: ", matchingDataPoint.Year);
        console.log("Temperature: ", matchingDataPoint.Temperature);
        console.log("Normalized Temperature: ", normalizedTemperature);
        console.log("Max Temperature: ", maxValue);
        console.log("Min Temperature: ", minValue);

        // Update vertical line and rectangle
        d3.select('#vertical-line')
            .attr('x1', x(val))
            .attr('x2', x(val));

        d3.select('#shade-rect')
            .attr('width', x(val) - margin.left);
    } else {
        console.log("No data found for year: ", val);
    }

    // TO DO: put logic here to send information to canvas
}

function createLineChart(data) {
    // max value temp for normalization
    const maxValue = d3.max(data, d => d.Temperature);
    const minValue = d3.min(data, d => d.Temperature);

    // Update the global vars x and margin
    margin = {top: 20, right: 30, bottom: 30, left: 40};

    const width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
         
    x = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([margin.left, width - margin.right]);


    const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.Temperature), d3.max(data, d => d.Temperature)]) 
    .nice()
    .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.format("d")).tickSizeOuter(0));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());

    const line = d3.line()
    .defined(d => !isNaN(d.Temperature)) 
    .x(d => x(d.Year))
    .y(d => y(d.Temperature)); 

    const svg = d3.select("#chart");

    svg.append("g")
        .call(yAxis);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

    // Initial setup for vertical line and shaded rectangle
    svg.append('line')
        .attr('id', 'vertical-line')
        .attr('x1', margin.left)
        .attr('y1', margin.top)
        .attr('x2', margin.left)
        .attr('y2', height - margin.bottom)
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

        svg.append('rect')
        .attr('id', 'shade-rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', 0)
        .attr('height', height - margin.top - margin.bottom)
        .attr('fill', 'rgba(0, 0, 0, 0.1)');  // Change color and opacity

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", margin.left - 40)  // adjust this value to place text
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Temperature (°C)");

    svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", margin.top - 5)  // adjust this value to place text
    .text("Yearly average temperature in Norway");

    // slider
    let slider = d3.sliderHorizontal()
        .min(d3.min(data, d => d.Year))
        .max(d3.max(data, d => d.Year))
        .step(1)
        .width(width - margin.left - margin.right)
        .tickFormat(d3.format('d'))
        .ticks(10)
        .default(d3.min(data, d => d.Year))
        .on('onchange', val => { 
            updateCanvas(val, data, maxValue, minValue);  // Data is passed as an argument to updateCanvas
        });

    let gSlider = d3.select('#chart')
    .append('g')
    .attr('transform', `translate(${margin.left},${y(-1) + 20})`); // adjust this value to place slider
    
    gSlider.call(slider);

}