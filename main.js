let interactiveChartView = null; // Global reference to the chart view
let interactiveChartView2 = null; // Global reference to the chart view

// Default initial colors for all genres
const initialEdmColor = "#4d78a7";  // Blue color for edm
const initialLatinColor = "#ff6347"; // Tomato color for latin
const initialPopColor = "#ff4500";  // Orange color for pop
const initialRnbColor = "#9ccdc9";  // Purple color for r&b
const initialRapColor = "#87be81";  // Green color for rap
const initialRockColor = "#f3da76"; // Red color for rock

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://raw.githubusercontent.com/thomasthomsen16/dataset-p2/refs/heads/main/30000_spotify_songs.csv')
        .then(response => response.text())
        .then(csvData => {
            const parsedData = parseCSV(csvData);
            const sampledData = getRandomSample(parsedData, 1000);

            // Render both charts (interactive & static)
            renderCharts(sampledData);
        })
        .catch(error => console.error("Error loading CSV data: ", error));
});

function renderCharts(sampledData) {
    renderInteractiveChart(sampledData, "interactive-chart");
    renderStaticChart(sampledData, "static-chart"); // Static chart does not change colors dynamically
    renderInteractiveChart2(sampledData, "interactive-chart2");
    renderStaticChart2(sampledData, "static-chart2"); // Static chart does not change colors dynamically
}

function renderStaticChart(sampledData, chartId) {
    const chartContainer = document.getElementById(chartId);
    chartContainer.innerHTML = ""; // Clear existing content

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 700,
        height: 600,
        data: { values: sampledData },
        mark: { type: "circle" },
        config: { background: "#ffffff80"},
        encoding: {
            x: { field: "danceability", type: "quantitative", scale: { domain: [0, 1] } },
            y: { field: "tempo", type: "quantitative", scale: { domain: [0, 220] } },
            color: {
                field: "playlist_genre",
                type: "nominal",
                scale: {
                    domain: ["edm", "latin", "pop", "r&b", "rap", "rock"], // List of all genres
                    range: [
                        initialEdmColor,  // Use the global color for edm
                        initialLatinColor,  // Use the global color for latin
                        initialPopColor,   // Use the global color for pop
                        initialRnbColor,   // Use the global color for r&b
                        initialRapColor,   // Use the global color for rap
                        initialRockColor   // Use the global color for rock
                    ]
                }
            }
        }
    };

    vegaEmbed(`#${chartId}`, spec);
}

function renderInteractiveChart(sampledData, chartId) {
    const chartContainer = document.getElementById(chartId);
    chartContainer.innerHTML = ""; // Clear existing content

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 700,
        height: 600,
        data: { values: sampledData },
        mark: { type: "circle", clip: "true" },
        encoding: {
            x: { field: "danceability", type: "quantitative", scale: { domain: { signal: "xDomain" } } },
            y: { field: "tempo", type: "quantitative", scale: { domain: { signal: "yDomain" } } },
            color: {
                field: "playlist_genre",
                type: "nominal",
                scale: {
                    domain: ["edm", "latin", "pop", "r&b", "rap", "rock"], // All genres now
                    range: [
                        { signal: "edmColorSignal" },   // Dynamic color for edm
                        { signal: "latinColorSignal" }, // Dynamic color for latin
                        { signal: "popColorSignal" },   // Dynamic color for pop
                        { signal: "rnbColorSignal" },   // Dynamic color for r&b
                        { signal: "rapColorSignal" },   // Dynamic color for rap
                        { signal: "rockColorSignal" },  // Dynamic color for rock
                    ]
                }
            }
        },
        params: [
            {
                name: "xDomain",
                value: [0, 1], // Initial range for the x-axis
            },
            {
                name: "yDomain",
                value: [0, 220], // Initial range for the y-axis
            },
            {
                name: "edmColorSignal",
                value: initialEdmColor,
                bind: { input: "color" }
            },
            {
                name: "latinColorSignal",
                value: initialLatinColor,
                bind: { input: "color" }
            },
            {
                name: "popColorSignal",
                value: initialPopColor,
                bind: { input: "color" }
            },
            {
                name: "rnbColorSignal",
                value: initialRnbColor,
                bind: { input: "color" }
            },
            {
                name: "rapColorSignal",
                value: initialRapColor,
                bind: { input: "color" }
            },
            {
                name: "rockColorSignal",
                value: initialRockColor,
                bind: { input: "color" }
            }
        ]
    };

    vegaEmbed(`#${chartId}`, spec).then(result => {
        interactiveChartView = result.view;
        console.log("Interactive chart rendered and view is initialized.");
    }).catch(error => {
        console.error("Error embedding the chart:", error);
    });
};

function renderStaticChart2(sampledData, chartId) {
    const chartContainer = document.getElementById(chartId);
    chartContainer.innerHTML = ""; // Clear existing content

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 700,
        height: 600,
        data: { values: sampledData },
        mark: { type: "circle" },
        config: { background: "#ffffff80" },
        encoding: {
            x: { field: "valence", type: "quantitative", scale: { domain: [0, 1] } },
            y: { field: "energy", type: "quantitative", scale: { domain: [0, 1] } },
            color: {
                field: "playlist_genre",
                type: "nominal",
                scale: {
                    domain: ["edm", "latin", "pop", "r&b", "rap", "rock"], // List of all genres
                    range: [
                        initialEdmColor,  // Use the global color for edm
                        initialLatinColor,  // Use the global color for latin
                        initialPopColor,   // Use the global color for pop
                        initialRnbColor,   // Use the global color for r&b
                        initialRapColor,   // Use the global color for rap
                        initialRockColor   // Use the global color for rock
                    ]
                }
            }
        }
    };

    vegaEmbed(`#${chartId}`, spec);
}

function renderInteractiveChart2(sampledData, chartId) {
    const chartContainer = document.getElementById(chartId);
    chartContainer.innerHTML = ""; // Clear existing content

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: 700,
        height: 600,
        data: { values: sampledData },
        mark: { type: "circle", clip: "true" },
        encoding: {
            x: { field: "valence", type: "quantitative", scale: { domain: { signal: "xDomain2" } } },
            y: { field: "energy", type: "quantitative", scale: { domain: { signal: "yDomain2" } } },
            color: {
                field: "playlist_genre",
                type: "nominal",
                scale: {
                    domain: ["edm", "latin", "pop", "r&b", "rap", "rock"], // All genres now
                    range: [
                        { signal: "edmColorSignal" },   // Dynamic color for edm
                        { signal: "latinColorSignal" }, // Dynamic color for latin
                        { signal: "popColorSignal" },   // Dynamic color for pop
                        { signal: "rnbColorSignal" },   // Dynamic color for r&b
                        { signal: "rapColorSignal" },   // Dynamic color for rap
                        { signal: "rockColorSignal" },  // Dynamic color for rock
                    ]
                }
            }
        },
        params: [
            {
                name: "xDomain2",
                value: [0, 1], // Initial range for the x-axis
            },
            {
                name: "yDomain2",
                value: [0, 1], // Initial range for the y-axis
            },
            {
                name: "edmColorSignal",
                value: initialEdmColor,
                bind: { input: "color" }
            },
            {
                name: "latinColorSignal",
                value: initialLatinColor,
                bind: { input: "color" }
            },
            {
                name: "popColorSignal",
                value: initialPopColor,
                bind: { input: "color" }
            },
            {
                name: "rnbColorSignal",
                value: initialRnbColor,
                bind: { input: "color" }
            },
            {
                name: "rapColorSignal",
                value: initialRapColor,
                bind: { input: "color" }
            },
            {
                name: "rockColorSignal",
                value: initialRockColor,
                bind: { input: "color" }
            }
        ]
    };

    vegaEmbed(`#${chartId}`, spec).then(result => {
        interactiveChartView2 = result.view;
        console.log("Interactive chart2 rendered and view is initialized.");
    }).catch(error => {
        console.error("Error embedding the char2:", error);
    });
};


// Function to update the chart color dynamically using Vega Signals
function updateChartColor(newColor, genre) {
    //Top chart
    if (interactiveChartView) {
        if (genre === "edm") {
            interactiveChartView.signal("edmColorSignal", newColor).runAsync();
            console.log("Updated edm genre color to:", newColor);
        } else if (genre === "latin") {
            interactiveChartView.signal("latinColorSignal", newColor).runAsync();
            console.log("Updated latin genre color to:", newColor);
        } else if (genre === "pop") {
            interactiveChartView.signal("popColorSignal", newColor).runAsync();
            console.log("Updated pop genre color to:", newColor);
        } else if (genre === "r&b") {
            interactiveChartView.signal("rnbColorSignal", newColor).runAsync();
            console.log("Updated r&b genre color to:", newColor);
        } else if (genre === "rap") {
            interactiveChartView.signal("rapColorSignal", newColor).runAsync();
            console.log("Updated rap genre color to:", newColor);
        } else if (genre === "rock") {
            interactiveChartView.signal("rockColorSignal", newColor).runAsync();
            console.log("Updated rock genre color to:", newColor);
        }
    } else {
        console.warn("Chart view not initialized yet.");
    }
    //Bottom chart
    if (interactiveChartView2) {
        if (genre === "edm") {
            interactiveChartView2.signal("edmColorSignal", newColor).runAsync();
            console.log("Updated edm genre color to:", newColor);
        } else if (genre === "latin") {
            interactiveChartView2.signal("latinColorSignal", newColor).runAsync();
            console.log("Updated latin genre color to:", newColor);
        } else if (genre === "pop") {
            interactiveChartView2.signal("popColorSignal", newColor).runAsync();
            console.log("Updated pop genre color to:", newColor);
        } else if (genre === "r&b") {
            interactiveChartView2.signal("rnbColorSignal", newColor).runAsync();
            console.log("Updated r&b genre color to:", newColor);
        } else if (genre === "rap") {
            interactiveChartView2.signal("rapColorSignal", newColor).runAsync();
            console.log("Updated rap genre color to:", newColor);
        } else if (genre === "rock") {
            interactiveChartView2.signal("rockColorSignal", newColor).runAsync();
            console.log("Updated rock genre color to:", newColor);
        }
    } else {
        console.warn("Chart view not initialized yet.");
    }
}

// Function to parse CSV data into an array of objects
function parseCSV(csvData) {
    const rows = csvData.split("\n").filter(row => row.trim() !== ""); // Remove empty rows
    const header = rows[0].split(",").map(column => column.trim()); // Trim headers

    return rows.slice(1).map(row => {
        const values = row.split(",");

        if (values.length !== header.length) {
            return null; // Skip rows with mismatched columns
        }

        let parsedRow = {};
        header.forEach((column, index) => {
            parsedRow[column] = values[index].trim();
        });

        // Convert danceability and tempo to numbers
        parsedRow.danceability = isNaN(parsedRow.danceability) ? null : parseFloat(parsedRow.danceability);
        parsedRow.tempo = isNaN(parsedRow.tempo) ? null : parseFloat(parsedRow.tempo);

        return parsedRow.danceability !== null && parsedRow.tempo !== null ? parsedRow : null;
    }).filter(row => row !== null);
}

// Function to get a random sample of data points
function getRandomSample(data, sampleSize) {
    const validData = data.filter(row => row.danceability !== null && row.tempo !== null);

    if (validData.length <= sampleSize) {
        return validData;
    }

    const sampledData = [];
    const seenIndexes = new Set();

    while (sampledData.length < sampleSize) {
        const randomIndex = Math.floor(Math.random() * validData.length);

        if (!seenIndexes.has(randomIndex)) {
            sampledData.push(validData[randomIndex]);
            seenIndexes.add(randomIndex);
        }
    }

    return sampledData;
}

//shift data up-down for top chart
document.getElementById("x-axis-min-up").addEventListener("click", () => {
    updateAxisRange("xMin", "increase");  // Increase xMin by 0.1
});

document.getElementById("x-axis-max-up").addEventListener("click", () => {
    updateAxisRange("xMax", "increase");  // Increase xMax by 0.1
});

document.getElementById("x-axis-min-down").addEventListener("click", () => {
    updateAxisRange("xMin", "decrease");  // Decrease xMin by 0.1
});

document.getElementById("x-axis-max-down").addEventListener("click", () => {
    updateAxisRange("xMax", "decrease");  // Decrease xMax by 0.1
});

document.getElementById("y-axis-min-up").addEventListener("click", () => {
    updateAxisRange("yMin", "increase");  // Increase yMin by 10
});

document.getElementById("y-axis-max-up").addEventListener("click", () => {
    updateAxisRange("yMax", "increase");  // Increase yMax by 10
});

document.getElementById("y-axis-min-down").addEventListener("click", () => {
    updateAxisRange("yMin", "decrease");  // Decrease yMin by 10
});

document.getElementById("y-axis-max-down").addEventListener("click", () => {
    updateAxisRange("yMax", "decrease");  // Decrease yMax by 10
});

//shift data up-down for bottom chart
document.getElementById("x-axis-min-up2").addEventListener("click", () => {
    updateAxisRange("xMin2", "increase");  // Increase xMin by 0.1
});

document.getElementById("x-axis-max-up2").addEventListener("click", () => {
    updateAxisRange("xMax2", "increase");  // Increase xMax by 0.1
});

document.getElementById("x-axis-min-down2").addEventListener("click", () => {
    updateAxisRange("xMin2", "decrease");  // Decrease xMin by 0.1
});

document.getElementById("x-axis-max-down2").addEventListener("click", () => {
    updateAxisRange("xMax2", "decrease");  // Decrease xMax by 0.1
});

document.getElementById("y-axis-min-up2").addEventListener("click", () => {
    updateAxisRange("yMin2", "increase");  // Increase yMin by 10
});

document.getElementById("y-axis-max-up2").addEventListener("click", () => {
    updateAxisRange("yMax2", "increase");  // Increase yMax by 10
});

document.getElementById("y-axis-min-down2").addEventListener("click", () => {
    updateAxisRange("yMin2", "decrease");  // Decrease yMin by 10
});

document.getElementById("y-axis-max-down2").addEventListener("click", () => {
    updateAxisRange("yMax2", "decrease");  // Decrease yMax by 10
});



function updateAxisRange(axis, operation) {

    //Top chart
    if (!interactiveChartView) {
        console.warn("Chart view is not initialized yet.");
        return;
    }

    // Update x-axis
    if (axis === "xMin" || axis === "xMax") {
        const xDomain = interactiveChartView.signal("xDomain");
        let newDomain = [...xDomain];

        if (axis === "xMin") {
            newDomain[0] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease xMin
        } else if (axis === "xMax") {
            newDomain[1] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease xMax
        }

        // Update the signal value for xDomain
        interactiveChartView.signal("xDomain", newDomain).runAsync();
        console.log(`Updated xDomain to: ${newDomain}`);

        // Update y-axis
    } else if (axis === "yMin" || axis === "yMax") {
        const yDomain = interactiveChartView.signal("yDomain");
        let newDomain = [...yDomain];

        if (axis === "yMin") {
            newDomain[0] += (operation === "increase" ? 10 : -10);  // Increase or decrease yMin
        } else if (axis === "yMax") {
            newDomain[1] += (operation === "increase" ? 10 : -10);  // Increase or decrease yMax
        }

        // Update the signal value for yDomain
        interactiveChartView.signal("yDomain", newDomain).runAsync();
        console.log(`Updated yDomain to: ${newDomain}`);
    };
    //Bottom chart
    if (!interactiveChartView2) {
        console.warn("Chart2 view is not initialized yet.");
        return;
    }

    // Update x-axis
    if (axis === "xMin2" || axis === "xMax2") {
        const xDomain2 = interactiveChartView2.signal("xDomain2");
        let newDomain2 = [...xDomain2];

        if (axis === "xMin2") {
            newDomain2[0] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease xMin
        } else if (axis === "xMax2") {
            newDomain2[1] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease xMax
        }

        // Update the signal value for xDomain
        interactiveChartView2.signal("xDomain2", newDomain2).runAsync();
        console.log(`Updated xDomain2 to: ${newDomain2}`);

        // Update y-axis
    } else if (axis === "yMin2" || axis === "yMax2") {
        const yDomain2 = interactiveChartView2.signal("yDomain2");
        let newDomain2 = [...yDomain2];

        if (axis === "yMin2") {
            newDomain2[0] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease yMin
        } else if (axis === "yMax2") {
            newDomain2[1] += (operation === "increase" ? 0.1 : -0.1);  // Increase or decrease yMax
        }

        // Update the signal value for yDomain
        interactiveChartView2.signal("yDomain2", newDomain2).runAsync();
        console.log(`Updated yDomain2 to: ${newDomain2}`);
    };


}