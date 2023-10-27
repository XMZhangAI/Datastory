// Global variables - needed by both functions
//let x, margin;

// I GraphTemp.js
let GraphTemp = {
    x: null,
    margin: null,
    // ... andre variabler og funksjoner
};

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
        .attr('x1', GraphTemp.x(val))
        .attr('x2', GraphTemp.x(val));

        d3.select('#shade-rect')
        .attr('width', GraphTemp.x(val) - GraphTemp.margin.left);

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
    GraphTemp.margin = {top: 20, right: 30, bottom: 30, left: 40};

    const width = 500 - GraphTemp.margin.left - GraphTemp.margin.right,
        height = 500 - GraphTemp.margin.top - GraphTemp.margin.bottom;
         
    GraphTemp.x = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([GraphTemp.margin.left, width - GraphTemp.margin.right]);


    const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.Temperature), d3.max(data, d => d.Temperature)]) 
    .nice()
    .range([height - GraphTemp.margin.bottom, GraphTemp.margin.top]); 

    const xAxis = g => g
        .attr("transform", `translate(0,${height - GraphTemp.margin.bottom})`)  // Endret margin til GraphTemp.margin
        .call(d3.axisBottom(GraphTemp.x).ticks(width / 80).tickFormat(d3.format("d")).tickSizeOuter(0));  // Endret x til GraphTemp.x


    const yAxis = g => g
        .attr("transform", `translate(${GraphTemp.margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());

    const line = d3.line()
    .defined(d => !isNaN(d.Temperature)) 
    .x(d => GraphTemp.x(d.Year))
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
        .attr('x1', GraphTemp.margin.left)
        .attr('y1', GraphTemp.margin.top)
        .attr('x2', GraphTemp.margin.left)
        .attr('y2', height - GraphTemp.margin.bottom)
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

        svg.append('rect')
        .attr('id', 'shade-rect')
        .attr('x', GraphTemp.margin.left)
        .attr('y', GraphTemp.margin.top)
        .attr('width', 0)
        .attr('height', height - GraphTemp.margin.top - GraphTemp.margin.bottom)
        .attr('fill', 'rgba(0, 0, 0, 0.1)');  // Change color and opacity

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", GraphTemp.margin.left - 40)  // adjust this value to place text
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Temperature (°C)");

    svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", GraphTemp.margin.top - 5)  // adjust this value to place text
    .text("Yearly average temperature in Norway");

    // slider
    let slider = d3.sliderHorizontal()
        .min(d3.min(data, d => d.Year))
        .max(d3.max(data, d => d.Year))
        .step(1)
        .width(width - GraphTemp.margin.left - GraphTemp.margin.right)
        .tickFormat(d3.format('d'))
        .ticks(10)
        .default(d3.min(data, d => d.Year))
        .on('onchange', val => { 
            updateCanvas(val, data, maxValue, minValue);  // Data is passed as an argument to updateCanvas
        });

    let gSlider = d3.select('#chart')
    .append('g')
    .attr('transform', `translate(${GraphTemp.margin.left},${y(-1) + 20})`); // adjust this value to place slider
    
    gSlider.call(slider);

}