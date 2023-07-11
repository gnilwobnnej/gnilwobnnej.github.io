//url

let url = "/api/v1.0/countries/alldata";

/*
let dataPromise = d3.json(url)
console.log("Data Promise: ", dataPromise);
*/
country = [];
country_sorted = [];

function init (){
  // fetching data
  let dataPromise = d3.json(url).then(function(data) {
    //console.log(data);

    for (let i = 0; i<data.length;i++){
      test = data[i].country
      country.push(test)
    };


    country.sort();
    country.splice(0, country.length, ...country);
  

    let samples = data.samples;
    let metadata = data.metadata;
    console.log("COUNTRY SORTED", country);

    init_dropdown (country);

    console.log("Names: "+ country);
    console.log("Samples: " + samples);
    
    // plotBarChart(samples[0]);
    // plotBubbleChart(samples[0]);
     plotMetaData(metadata[0]);
    // fillGaugeChart(metadata[0]);
  });
}


//bar chart

function plotBarChart (samples){
    
    let numSamples = (samples.sample_values.slice(0,10));
    numSamples = numSamples.reverse();
    
    let axis = samples.otu_ids.slice(0,10).map(sample => `OTU ${sample}`);
    axis = axis.reverse();
 

    let labels =  (samples.otu_labels.slice(0,10));
    labels = labels.reverse();
    
    
    let trace = {
        x: numSamples,
        y: axis,
        text: labels,
        name: "OTU",
        type: "bar",
        orientation: "h"
   };
   
   // let is array
   let traceData = [trace];
   
   // layout
   let layout = {
     title: "<b>Top 10 OTUs</b>",
     margin: {
       l: 100,
       r: 100,
       t: 100,
       b: 100
     }
   };
   
   Plotly.newPlot("bar", traceData, layout);
}


//bubblebubble

function plotBubbleChart (samples){
            
    let numSamples = (samples.sample_values);    
    let axis = samples.otu_ids;        
    let labels =  (samples.otu_labels);     
    let trace = {
        x: axis,
        y: numSamples,
        text: labels,
        mode: "markers",
        marker:{
            size:numSamples,
            color:axis,
            colorscale:"Earth"
        }
      };
      
      // array
 
      let traceData = [trace];
      let layout = {
        hovermode: "closest",
        xaxis: {title: "<b>OTU ID</b>"}
      };
      
      Plotly.newPlot("bubble", traceData, layout);


}


function plotMetaData (metadata){

    let dataLabels = Object.keys(metadata);        
    let dataValues = Object.values(metadata);
    console.log("Labels " + dataLabels);
    console.log("values " + dataValues);
    d3.select("#sample-metadata").html("");
    for (let i=0;i<7;i++){
        console.log(dataLabels[i] + " : " + dataValues[i]);
        d3.select("#sample-metadata").append("h6").text(`${dataLabels[i]}  :  ${dataValues[i]}`);
    }
}

function init_dropdown (country){
  let dropdownMenu = d3.select("#selDataset");

  for (let i = 0; i<country.length;i++){
    dropdownMenu.append("option").text(country[i]).property("value", i);
  }
}


function optionChanged (){
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    let data = d3.json(url).then(function(data) {
      console.log(data);   
      let samples = data.samples;
      let metadata = data.metadata;
   

   
      plotBarChart(samples[dataset]);   
      plotBubbleChart(samples[dataset]);   
      plotMetaData(metadata[dataset]);
      fillGaugeChart (metadata[dataset]);   
   });
  }
  init();

  function fillGaugeChart(metadata){
    let dataLabels = Object.keys(metadata);
    let dataValues = Object.values(metadata);


    console.log("Labels " + dataLabels);
    console.log("values " + dataValues);  
          let layout = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };  
          Plotly.newPlot("gauge", [trace], layout)      
  };
