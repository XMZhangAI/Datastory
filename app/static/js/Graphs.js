document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/co2')
        .then(response => response.json())
        .then(data => {
            // Sort data by year
            data.sort((a, b) => a.Year - b.Year);

            const colorSchemeCO2 = {
                "Annual CO\u2082 emissions from other industry": "red",
                "Annual CO\u2082 emissions from flaring": "blue",
                "Annual CO\u2082 emissions from cement": "orange",
                "Annual CO\u2082 emissions from gas": "gray",
                "Annual CO\u2082 emissions from oil": "black",
                "Annual CO\u2082 emissions from coal": "brown",
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
            // Sort data by year
            data.sort((a, b) => a.Year - b.Year);

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