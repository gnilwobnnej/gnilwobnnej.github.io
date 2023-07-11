//Get data endpoints
const apiCountries = ("http://localhost:8000/api/v1.0/countries");
const apiCountryMetaData = ("http://localhost:8000/api/v1.0/countrymetadata/");
const apiCountryAllData = ("/api/v1.0/countries/alldata")

//Fetch json data: add Countries to drop down list
d3.json(apiCountries).then(function(data) {
    let country_names = data;
    country_names.sort((a, b) => a - b);
    //console.log("Countries: ", country_names);

    //select dropdown menu
    const select = document.getElementById("selDataset");

    //Add the dropdown options
    for (let i = 0; i<country_names.length; i++) {
        let option = document.createElement("option");
        option.text = country_names[i];
        option.value = country_names[i];
        //console.log(option)
        select.appendChild(option);
    }

});

//Startup country
function init() {
    getData("Afghanistan");
}

// On change to the DOM , call getData()
d3.selectAll("#selDataset").on("change", function() {
    let subjectSelected = d3.select("#selDataset");
    let subject = subjectSelected.property("value")
    getData(subject)
    //console.log("SUBJECT:", subject)
});


function getData(subject) {

    //Fetch json data
    d3.json(apiCountryAllData).then(function(data) {
        filteredData = data.filter(function(d) {
            return d.country === subject;
        })

        console.log("FILTERED DATA", filteredData);
        let metaData = filteredData;
        
        //console.log(subject);
        //console.log(apiCountryMetaData);
        //console.log(apiCountryMetaData + subject);
        //console.log(metaData);

        //Capture metadata
        countryName = metaData[0].country;
        countryArea = metaData[0].area;
        countryCCA2 = metaData[0].cca2;
        countryCCA3 = metaData[0].cca3;
        countryGrowthRate = metaData[0].growthRate;
        countryDensity = metaData[0].density;
        countrypop1980 = metaData[0].pop1980;
        countrypop2000 = metaData[0].pop2000;
        countrypop2010 = metaData[0].pop2010;
        countrypop2022 = metaData[0].pop2022;
        countrypop2023 = metaData[0].pop2023;
        countrypop2030 = metaData[0].pop2030;
        countrypop2050 = metaData[0].pop2050;
    
        d3.select("#sample-metadata").text("Country: " + countryName);
        d3.select("#sample-metadata").append("p").text("Area: " + countryArea.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("CCA2: " + countryCCA2).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("CCA3: " + countryCCA3).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Growth Rate: " + countryGrowthRate).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Density: " + countryDensity.toFixed(2)).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 1980: " + countrypop1980.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2000: " + countrypop2000.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2010: " + countrypop2010.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2022: " + countrypop2022.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2023: " + countrypop2023.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2030: " + countrypop2030.toLocaleString()).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2050: " + countrypop2050.toLocaleString()).style("margin", "0");

        //Create Bar Chart (Population)
        countryPopValues = [];
        countryPopValues.push(countrypop1980, countrypop2000, countrypop2010, countrypop2022, countrypop2023,
            countrypop2030, countrypop2050);
        countryPopXLabels = ["1980", "2000", "2010", "2022", "2023", "2030", "2050"];

        //Trace Data for Bar Chart
        let trace = {
            x: countryPopXLabels,
            y: countryPopValues,
            type: "bar"
        };

        //Assign Data for Bar Chart
        let plotData = [trace];

        //Apply Layout to Bar Chart
        let layout = {
            title: countryName + " Population Growth: 1980 - 2050(Forecast)",
            height: 600,
            widht: 450,
            xaxis: {
                type: "category",
                title: "Year"
            },
            yaxis: {
                title: "Population"
            }
        };

        //Render the Chart
        Plotly.newPlot("bar", plotData, layout);

        //Create Line Graph (Population Growth Rate)
        growthRateValues = [];

        growthRate2023 = ((countrypop2023-countrypop2022)/countrypop2022).toFixed(4);
        growthRate2030 = ((countrypop2030-countrypop2022)/countrypop2022).toFixed(4);
        growthRate2050 = ((countrypop2050-countrypop2022)/countrypop2022).toFixed(4);

        growthRateValues = [growthRate2023, growthRate2030, growthRate2050];
        
        //console.log("GROWTH RATE", growthRateValues);

        growthRateXLabels = ["2023", "2030", "2050"];

        //Trace Data for Line Chart
        let lineTrace = {
            x: growthRateXLabels,
            y: growthRateValues,
            type: "line"
        }

        //Assign Data for Bar Chart
        let linePlotData = [lineTrace];

        //Apply Layout to Bar Chart
        let lineLayout = {
            title: countryName + " Growth Rate (from 2022)",
            height: 600,
            widht: 450,
            xaxis: {
                type: "category",
                title: "Year"
            },
            yaxis: {
                title: "% Population Difference from 2022"
            }
        };

        //Render the Chart
        Plotly.newPlot("line", linePlotData, lineLayout);
    });

}

init();
