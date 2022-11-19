d3.csv("CO2_emission.csv").then(function (dataset){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var xAccessor = (d) => d.


    var svg = d3.select("#main-visualization")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")

})
