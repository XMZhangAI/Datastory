// Global variables - needed by both functions
// let x, margin;

// I GraphCo2.js
let GraphCo2 = {
    x: null,
    margin: null,
    // ... andre variabler og funksjoner
};

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/co2')  
        .then(response => response.json())
        .then(data => {
            console.log(data);  // log data to console
            createLineChart(data, "#chart-co2");
        });
});

function updateCanvas(val, data, maxValue, minValue, svgId) {
    // ... rest of the code remains unchanged
    
}

function createLineChart(data, svgId) {
    // max value for normalization
    const maxValue = d3.max(data, d => d["Annual CO₂ emissions from gas"]);
    const minValue = d3.min(data, d => d["Annual CO₂ emissions from gas"]);

    // Update the global vars x and margin
    margin = {top: 20, right: 30, bottom: 30, left: 40};

    const width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
         
    x = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
    .domain([d3.min(data, d => d["Annual CO₂ emissions from gas"]), d3.max(data, d => d["Annual CO₂ emissions from gas"])]) 
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
    .defined(d => !isNaN(d["Annual CO₂ emissions from gas"])) 
    .x(d => x(d.Year))
    .y(d => y(d["Annual CO₂ emissions from gas"])); 

    let svg = d3.select(svgId);

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
    .text("CO₂ emissions (metric tons)");  // updated text

    svg.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", margin.top - 5)  // adjust this value to place text
    .text("Yearly CO₂ emissions in Norway");  // updated text

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
        updateCanvas(val, data, maxValue, minValue, svgId);  // Data is passed as an argument to updateCanvas
    });

    let gSlider = d3.select(svgId)
    .append('g')
    .attr('transform', `translate(${margin.left},${y(-1) + 20})`); // adjust this value to place slider

    gSlider.call(slider);

}
