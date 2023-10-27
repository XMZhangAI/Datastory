// Wrapping the entire code in an IIFE to avoid global pollution
(function() {
    // Defining a namespaced object to hold everything related to GraphCo2
    const GraphCo2 = {
        x: null,
        margin: null,

        // Function to update canvas
        updateCanvas: function(val, data, maxValue, minValue, svgId) {
            // Get the SVG element
            let svg = d3.select(svgId);

            // Find the datapoint that matches with slider
            const matchingDataPoint = data.find(d => d.Year === val);

            if (matchingDataPoint) {
                // Logging the values to the console
                console.log("Year: ", matchingDataPoint.Year);
                console.log("Max Value: ", maxValue);
                console.log("Min Value: ", minValue);

                Object.keys(matchingDataPoint).forEach(key => {
                    if (key !== 'Year') {
                        console.log(`${key}: `, matchingDataPoint[key]);
                    }
                });

                // Calculate the new x position for the vertical line based on the slider value
                let newX = this.x(val);

                // Update the x1 and x2 attributes of the vertical line
                svg.select('#vertical-line-co2')
                    .attr('x1', newX)
                    .attr('x2', newX);

                // Update the width and x attributes of the shaded rectangle
                svg.select('#shade-rect-co2')
                    .attr('width', newX - this.margin.left)
                    .attr('x', this.margin.left);

            } else {
                console.log("No data found for year: ", val);
            }
        },

        // Function to get color based on key
        colorFor: function(key) {
            const colorScheme = {
                "Annual CO₂ emissions from other industry": "steelblue",
                "Annual CO₂ emissions from flaring": "red",
                "Annual CO₂ emissions from cement": "green",
                "Annual CO₂ emissions from gas": "purple",
                "Annual CO₂ emissions from oil": "orange",
                "Annual CO₂ emissions from coal": "pink"
            };
            return colorScheme[key] || "black";
        },

        // Function to create line chart
        createLineChart: function(data, svgId) {
            // Maximum value for normalization
            const allValues = data.flatMap(d => Object.values(d).filter(val => !isNaN(val)));
            const minValue = Math.min(...allValues);
            const maxValue = Math.max(...allValues);

            console.log("Min Value: ", minValue);
            console.log("Max Value: ", maxValue);


            // Updating the global vars x and margin
            this.margin = {top: 20, right: 30, bottom: 30, left: 60};

            const width = 500 - this.margin.left - this.margin.right,
                height = 500 - this.margin.top - this.margin.bottom;
            
            this.x = d3.scaleLinear()
                .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
                .range([this.margin.left, width - this.margin.right]);
            
            const y = d3.scaleLinear()
                .domain([minValue, maxValue]) 
                .nice()
                .range([height - this.margin.bottom, this.margin.top]);

            const yAxis = g => g
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y).tickFormat(d3.format(".2s")))
            .call(g => g.select(".domain").remove());
            
        
            let svg = d3.select(svgId);

            Object.keys(data[0]).forEach(key => {
                if (key !== 'Year') {
                    const line = d3.line()
                        .defined(d => !isNaN(d[key]))
                        .x(d => this.x(d.Year))
                        .y(d => y(d[key]));
                    
                    svg.append("path")
                        .datum(data)
                        .attr("fill", "none")
                        .attr("stroke", this.colorFor(key))  // Function to fetch color based on key
                        .attr("stroke-width", 1.5)
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("d", line);
                }
            });

            svg.append("g")
                .call(yAxis);

            // Initial setup for vertical line and shaded rectangle
            svg.append('line')
                .attr('id', 'vertical-line-co2')
                .attr('x1', this.margin.left)
                .attr('y1', this.margin.top)
                .attr('x2', this.margin.left)
                .attr('y2', height - this.margin.bottom)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);

            svg.append('rect')
                .attr('id', 'shade-rect-co2')
                .attr('x', this.margin.left)
                .attr('y', this.margin.top)
                .attr('width', 0)
                .attr('height', height - this.margin.top - this.margin.bottom)
                .attr('fill', 'rgba(0, 0, 0, 0.1)');  // Change color and opacity

            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width / 2);

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "middle")
                .attr("y", this.margin.left - 50)  // Adjust this value to place text
                .attr("x", -height / 2)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("CO₂ emissions (metric tons)");  // Updated text

            svg.append("text")
                .attr("class", "title")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", this.margin.top - 5)  // Adjust this value to place text
                .text("Yearly CO₂ emissions in Norway");  // Updated text

            // Slider
            let slider = d3.sliderHorizontal()
                .min(d3.min(data, d => d.Year))
                .max(d3.max(data, d => d.Year))
                .step(1)
                .width(width - this.margin.left - this.margin.right)
                .tickFormat(d3.format('d'))
                .ticks(10)
                .default(d3.min(data, d => d.Year))
                .on('onchange', val => { 
                    this.updateCanvas(val, data, maxValue, minValue, svgId);  // Data is passed as an argument to updateCanvas
                });

            let gSlider = d3.select(svgId)
                .append('g')
                .attr('transform', `translate(${this.margin.left},${y(-1) + 20})`); // Adjust this value to place slider

            gSlider.call(slider);

        }
    };

    document.addEventListener("DOMContentLoaded", function() {
        fetch('/api/data/co2')
            .then(response => response.json())
            .then(data => {
                // Sort data by year
                data.sort((a, b) => a.Year - b.Year);

                console.log(data);  // Log sorted data to console
                GraphCo2.createLineChart(data, "#chart-co2");
            });
    });

})();
