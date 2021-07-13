/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

let arrowDropdown = d3.select("#selDataset");

// arrowDropdown.on("change", function(){
// let newText = d3.event.target.value;
// console.log(newText);
// console.log(arrowDropdown.text())
    
// });
// Define function that will run on page load
function init() {

    // Read json data
    // Parse and filter data to get sample names 
    // Add dropdown option for each sample
    // data is an object with three arrays, names, metadat, and samples
    d3.json("samples.json").then(function(data) {
        console.log(data);
        // fetching first id from 'names' which is an array of items
        // console.log(data.names[0]);
        let firstId = data.names[0];
        console.log(firstId);
        
        data.names.forEach((name, i) => {
            let appendOption = arrowDropdown.append("option").text(name).attr('value', name);
        });
      
    });
    
    // Call functions below using the first sample to build metadata and initial plots
    buildMetadata();
    buildCharts();
}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    let demographicInfoBox = d3.select("#sample-metadata");
    // Read the json data
    // Parse and filter the data to get the sample's metadata
    // Specify the location of the metadata and update it
    d3.json("samples.json").then(function(data) {

       let metaData = data.metadata;
       //console.log(data.metadata[1]);
       console.log(metaData);
      
       // fitering first matching item from' metadata' which is again an object 
        filterData = metaData.filter(firstItem => firstItem.id == data.names[0])
        console.log(filterData)
        // assigning the first item in the object to a variable
        filterData = filterData[0]
        console.log(filterData.id)

        Object.entries(filterData).forEach(([key, value]) => {
            demographicInfoBox.append("h6").text(`${key} => ${value}`)
        });
    });


}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    let bubbleChart = d3.select("#bubble");

    // Read the json data

    d3.json("samples.json").then(function(data) {

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart
        let samplesData = data.samples;
        console.log(samplesData);
        // fitering first matching item from' metadata' which is again an object 
        filterData = samplesData.filter(firstItem => firstItem.id == data.names[0])
        console.log(filterData)
        // assigning the first item in the object to a variable
        filterData = filterData[0]
        console.log(filterData.id)
        Id = filterData.id
        otuIds = filterData.otu_ids
        sampleValues = filterData.sample_values
        otuLabels = filterData.otu_labels
        console.log(Id)
        console.log(otuIds)
        console.log(sampleValues)
        console.log(otuLabels)

        // Create bubble chart in correct location
        var trace1 = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            marker: {
              color: otuIds,
              opacity: [1, 0.8, 0.6, 0.4],
              size: sampleValues
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'otu_ids Vs. sample_values',
            showlegend: false,
            height: 500,
            width: 1300
          };
          
          Plotly.newPlot('bubble', data, layout);

        // Create bar chart in correct location
        // Slice the first ten names

        let otuIdsten = otuIds.slice(0, 10);
        console.log(otuIdsten)
        var trace1 = {
            x: sampleValues,
            y: otuIdsten,
           
            marker: {
                // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
            },
            type: 'bar',
            orientation:"h"

        };

        var data = [trace1];

        var layout = {
            title: 'Top Ten OTUs Found',
           
        };

        Plotly.newPlot('bar', data, layout);



    });
    
}


function optionChanged(sample){
    // The parameter being passed in this function is new sample id from dropdown menu
   console.log(sample)
    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();


