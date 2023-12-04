let globalSlider;

function updateGlobalYearExtremes(data) {
    let years = data.map(item => item.Year);
    return {
        maxYear: Math.max(...years),
        minYear: Math.min(...years)
    };
}

function filterDataByYearRange(data, minYear, maxYear) {
    return data.filter(item => item.Year >= minYear && item.Year <= maxYear);
}

function initializeGlobalSlider(globalMinYear, globalMaxYear) {   

    globalSlider = d3.sliderHorizontal()
        .min(globalMinYear)
        .max(globalMaxYear)
        .step(1)
        .width(window.innerWidth - 850)
        .on('onchange', year => {
            ChartUtils.updateAllSliders(year);
        });

    d3.select("#global-slider")
        .append('g')
        .attr('transform', 'translate(50,50)')
        .call(globalSlider);
}

document.addEventListener("DOMContentLoaded", function() {
    Promise.all([
        fetch('/api/data/co2').then(response => response.json()),
        fetch('/api/data/temperature').then(response => response.json()),
        fetch('/api/data/energy').then(response => response.json())
    ])
    .then(([co2Data, tempData, energyData]) => {
        let minYears = [];
        let maxYears = [];

        [co2Data, tempData, energyData].forEach(dataset => {
            let extremes = updateGlobalYearExtremes(dataset);
            minYears.push(extremes.minYear);
            maxYears.push(extremes.maxYear);
        });

        let globalMinYear = Math.max(...minYears); // Max of [min year]
        let globalMaxYear = Math.min(...maxYears); // Min of [max year]

        // finding common min max values across the datasets
        updateGlobalYearExtremes(co2Data);
        updateGlobalYearExtremes(tempData);
        updateGlobalYearExtremes(energyData);

        // Filter data based on globalMinYear and globalMaxYear
        let filteredCO2Data = filterDataByYearRange(co2Data, globalMinYear, globalMaxYear);
        let filteredTempData = filterDataByYearRange(tempData, globalMinYear, globalMaxYear);
        let filteredEnergyData = filterDataByYearRange(energyData, globalMinYear, globalMaxYear);


        const colorSchemeCO2 = {
            "Other industry": "red",
            "Flaring": "blue",
            "Cement": "orange",
            "Gas": "gray",
            "Oil": "black",
            "Coal": "brown",
        };

        // Create CO2 graph
        ChartUtils.createLineChart(
            filteredCO2Data, 
            "#chart-co2", 
            colorSchemeCO2, 
            "CO₂ emissions (metric tons)", 
            "Yearly CO₂ emissions in Norway", 
            'vertical-line-co2', 
            'shade-rect-co2',
            d3.format(".2s")
        );


        // Create temperature graph
        ChartUtils.createLineChart(
            filteredTempData,
            "#chart-temp",
            null,
            "Temperature (°C)",
            "Yearly average temperature in Norway",
            'vertical-line-temp', 
            'shade-rect-temp',
            d3.format(".1f")
            );


        const colorSchemeEnergy = {
            "Other Renewables": "red",
            "Solar": "yellow",
            "Wind": "gray",
            "Hydro": "blue",
        };

        // Create energy graph
        ChartUtils.createLineChart(
            filteredEnergyData,
            "#chart-energy",
            colorSchemeEnergy,
            "Terrawatt",
            "Yearly renewable energy production in Norway",
            'vertical-line-energy', 
            'shade-rect-energy',
            d3.format(".0f")
            );
        
        // create global slider
        console.log("Global Min Year:", globalMinYear);
        console.log("Global Max Year:", globalMaxYear);
        initializeGlobalSlider(globalMinYear, globalMaxYear);
    });

});
