document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/co2')
        .then(response => response.json())
        .then(data => {

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
                data, 
                "#chart-co2", 
                colorSchemeCO2, 
                "CO₂ emissions (metric tons)", 
                "Yearly CO₂ emissions in Norway", 
                'vertical-line-co2', 
                'shade-rect-co2',
                d3.format(".2s")
            );
        });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/temperature')
        .then(response => response.json())
        .then(data => {

            // Create temperature graph
            ChartUtils.createLineChart(
                data,
                "#chart-temp",
                null,
                "Temperature (°C)",
                "Yearly average temperature in Norway",
                'vertical-line-temp', 
                'shade-rect-temp',
                d3.format(".1f")
                );
        });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/energy')
        .then(response => response.json())
        .then(data => {

            const colorSchemeEnergy = {
                "Other Renewables": "red",
                "Solar": "yellow",
                "Wind": "gray",
                "Hydro": "blue",
            };

            // Create energy graph
            ChartUtils.createLineChart(
                data,
                "#chart-energy",
                colorSchemeEnergy,
                "Terrawatt",
                "Yearly renewable energy production in Norway",
                'vertical-line-energy', 
                'shade-rect-energy',
                d3.format(".0f")
                );
        });
});