// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#main_visualization")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv(
  "region.csv",

  // Now I can use this dataset:
  function (data) {
    console.log(data.NorthAmerica);
    console.log(data.Year);

    var yAccessor = (d) => d.NorthAmerica;
    var xAccessor = (d) => d.Year;

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.Year);
          })
          .y(function (d) {
            return y(d.NorthAmerica);
          })
      );
  }
);
