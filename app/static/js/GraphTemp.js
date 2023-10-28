// Wrapping the entire code in an IIFE to avoid global pollution
(function() {
    // Defining a namespaced object to hold everything related to GraphTemp
    const GraphTemp = {
        x: null,
        margin: null,
        // Function to update canvas
        updateCanvas: function updateCanvas(val, data, maxValue, minValue) {
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
                d3.select('#vertical-line-temp')
                    .attr('x1', this.x(val))
                    .attr('x2', this.x(val));
        
                d3.select('#shade-rect-temp')
                    .attr('width', this.x(val) - this.margin.left);
            } else {
                console.log("No data found for year: ", val);
            }
        
            // TO DO: put logic here to send information to canvas
        },

        // Function to create line chart
        createLineChart: function(data, svgId) {
            // Maximum and minimum values for normalization
            const maxValue = d3.max(data, d => d.Temperature);
            const minValue = d3.min(data, d => d.Temperature);

            console.log("Max Temperature: ", maxValue);
            console.log("Min Temperature: ", minValue);

            // Updating the global vars x and margin
            this.margin = {top: 20, right: 30, bottom: 30, left: 60};

            let svg = d3.select(svgId);
            const fullWidth = svg.node().getBoundingClientRect().width;
            const fullHeight = svg.node().getBoundingClientRect().height;

            const width = fullWidth - this.margin.left - this.margin.right;
            const height = fullHeight - this.margin.top - this.margin.bottom;

            console.log("Width temp: ", width);
            console.log("Height temp: ", height);

            this.x = d3.scaleLinear()
                .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
                .range([this.margin.left, fullWidth - this.margin.right]); 

            const y = d3.scaleLinear()
                .domain([minValue, maxValue]) 
                .nice()
                .range([height - this.margin.bottom, this.margin.top]);

            const yAxis = g => g
                .attr("transform", `translate(${this.margin.left},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove());

            const line = d3.line()
                .defined(d => !isNaN(d.Temperature)) 
                .x(d => this.x(d.Year))
                .y(d => y(d.Temperature)); 


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
                .attr('id', 'vertical-line-temp')
                .attr('x1', GraphTemp.margin.left)
                .attr('y1', GraphTemp.margin.top)
                .attr('x2', GraphTemp.margin.left)
                .attr('y2', height - GraphTemp.margin.bottom)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);

            svg.append('rect')
                .attr('id', 'shade-rect-temp')
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
                .attr("y", GraphTemp.margin.left - 50)  // adjust this value to place text
                .attr("x", -height / 2)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("Temperature (°C)");

            svg.append("text")
                .attr("class", "title")
                .attr("text-anchor", "middle")
                .attr("x", fullWidth / 2)
                .attr("y", GraphTemp.margin.top - 5)  // adjust this value to place text
                .text("Yearly average temperature in Norway");

            // slider
            let slider = d3.sliderHorizontal()
                .min(d3.min(data, d => d.Year))
                .max(d3.max(data, d => d.Year))
                .step(1)
                .width(width)
                .tickFormat(d3.format('d'))
                .ticks(10)
                .default(d3.min(data, d => d.Year))
                .on('onchange', val => { 
                    GraphTemp.updateCanvas(val, data, maxValue, minValue, svgId);  // Data is passed as an argument to updateCanvas
                });

            let gSlider = d3.select(svgId)  // Adjusted to select svgId instead of '#chart'
                .append('g')
                .attr('id', 'slider-temp')  // give id to group element
                .attr('transform', `translate(${GraphTemp.margin.left},${y(-1) + 20})`); // adjust this value to place slider
            
            gSlider.call(slider);


        }
    };

    document.addEventListener("DOMContentLoaded", function() {
        fetch('/api/data/temperature')
            .then(response => response.json())
            .then(data => {
                // Sort data by year
                data.sort((a, b) => a.Year - b.Year);

                console.log(data);  // Log sorted data to console
                GraphTemp.createLineChart(data, "#chart-temp");  // Updated SVG ID to #chart-temp
            });
    });

})();
