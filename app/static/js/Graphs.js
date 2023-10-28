document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data/co2')
        .then(response => response.json())
        .then(data => {
            // Sort data by year
            data.sort((a, b) => a.Year - b.Year);

            // Create CO2 graph
            ChartUtils.createLineChart(
                data, 
                "#chart-co2", 
                null, 
                "CO₂ emissions (metric tons)", 
                "Yearly CO₂ emissions in Norway", 
                ChartUtils.colorFunc, 
                'vertical-line-co2', 
                'shade-rect-co2'
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
                ChartUtils.colorFunc,
                'vertical-line-temp', 
                'shade-rect-temp'
                );
        });
});