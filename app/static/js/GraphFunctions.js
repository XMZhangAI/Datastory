const ChartUtils = {
    margin: {top: 20, right: 30, bottom: 30, left: 60},

    // individual sliders storage
    sliders: [],

    
    updateAllSliders: function (year) {
        this.sliders.forEach(slider => {
            if (slider.silentValue) {
                slider.silentValue(year);
            }
        });
    },

    colorFunc: function(key, colorScheme) {
        if (colorScheme === null) {
            return 'black';
        }
        return colorScheme[key] || 'black';  // Default color is black
    },


    sendToP5: function(dataDict) {
        // check if P5-sketch has a function named 'updateCircles'
        if (typeof window.updateCanvas === 'function') {
            window.updateCanvas(dataDict);
        }
    },
    

    updateCanvas: function(val, data, maxValue, minValue, svgId, x, verticalLineId, shadeRectId) {
        // Get the SVG element
        let svg = d3.select(svgId);

        // Find the datapoint that matches with slider
        const matchingDataPoint = data.find(d => d.Year === val);

        if (matchingDataPoint) {
            // Create a dictionary to hold the data
            let dataDict = {
                Year: matchingDataPoint.Year,
            };

            // Populate the dictionary with key-value pairs from matchingDataPoint
            Object.keys(matchingDataPoint).forEach(key => {
                if (key !== 'Year') {
                    dataDict[key] = matchingDataPoint[key];
                }
            });

            // Now dataDict holds all the necessary information
            console.log(dataDict);

            // sending info to canvas
            this.sendToP5(dataDict);

            // Calculate the new x position for the vertical line based on the slider value
            let newX = x(val);

            // Update the x1 and x2 attributes of the vertical line
            svg.select(`#${verticalLineId}`)
                .attr('x1', newX)
                .attr('x2', newX);

            // Update the width and x attributes of the shaded rectangle
            svg.select(`#${shadeRectId}`)
                .attr('width', newX - this.margin.left)
                .attr('x', this.margin.left);

        } else {
            console.log("No data found for year: ", val);
        }
    },

    createLineChart: function(data, svgId, colorScheme, yAxisLabel, titleText, verticalLineId, shadeRectId, ytickFormat) {
        console.log(data);
        // Maximum value for normalization
        const allValues = data.flatMap(d => 
            Object.entries(d)
            .filter(([key, value]) => key !== 'Year' && !isNaN(value))
            .map(([key, value]) => value)
        );
        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);

        console.log("Min Value: ", minValue);
        console.log("Max Value: ", maxValue);

        // Updating the global vars x and margin
        this.margin = {top: 20, right: 30, bottom: 30, left: 60};

        let svg = d3.select(svgId);
        const fullWidth = svg.node().getBoundingClientRect().width;
        const fullHeight = svg.node().getBoundingClientRect().height;

        const width = fullWidth - this.margin.left - this.margin.right;
        const height = fullHeight - this.margin.top - this.margin.bottom;

        console.log("Width: ", width);
        console.log("Height: ", height);
    
        let x = d3.scaleLinear()
            .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
            .range([this.margin.left, fullWidth - this.margin.right]);
        
        const y = d3.scaleLinear()
            .domain([minValue, maxValue]) 
            .nice()
            .range([height - this.margin.bottom, this.margin.top]);

        const yAxis = g => g
        .attr("transform", `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(ytickFormat))
        .call(g => g.select(".domain").remove());


        Object.keys(data[0]).forEach(key => {
            if (key !== 'Year') {
                const line = d3.line()
                    .defined(d => !isNaN(d[key]))
                    .x(d => x(d.Year))
                    .y(d => y(d[key]));
                
                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", this.colorFunc(key, colorScheme))  // Function to fetch color based on key
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
            .attr('id', verticalLineId)
            .attr('x1', this.margin.left)
            .attr('y1', this.margin.top)
            .attr('x2', this.margin.left)
            .attr('y2', height - this.margin.bottom)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        svg.append('rect')
            .attr('id', shadeRectId)
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
            .text(yAxisLabel);  // Updated text

        svg.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("x", fullWidth / 2)
            .attr("y", this.margin.top - 5)  // Adjust this value to place text
            .text(titleText);  // Updated text

        // Slider
        let slider = d3.sliderHorizontal()
            .min(d3.min(data, d => d.Year))
            .max(d3.max(data, d => d.Year))
            .step(1)
            .width(width)
            .tickFormat(d3.format('d'))
            .ticks(10)
            .default(d3.min(data, d => d.Year))
            .on('onchange', val => { 
                this.updateCanvas(val, data, maxValue, minValue, svgId, x, verticalLineId, shadeRectId);  // Data is passed as an argument to updateCanvas
            });

        let gSlider = d3.select(svgId)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${height - this.margin.bottom + 10})`); // adjusting 10 pixels down


        gSlider.call(slider);

        slider.silentValue = function(value) {
            if (typeof value !== 'undefined') {
                this.value(value, false);
            }
            return this.value();
        };

        this.sliders.push(slider); // store slider

        console.log(y.domain(), y.range());

        return x;
    }
};