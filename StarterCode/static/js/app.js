/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

let selectDropdown = d3.select("#selDataset");


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
            let appendOption = selectDropdown.append("option").attr('value', i).text(name);
        });
      
    });
    

    // Call functions below using the first sample to build metadata and initial plots

}

// Define a function that will create metadata for given sample
function buildMetadata() {
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

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}


function optionChanged(sample){
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
buildMetadata();

