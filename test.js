const margin = {top: 20, right: 30, bottom: 80, left: 160},
    width = 500 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);



// Initialize the X axis
//const x = d3.scaleBand()
//  .range([0, width])
//  .padding(0.2);
//const xAxis = svg.append("g")
//  .attr("transform", `translate(0,${height})`);

// Initialize the Y axis
//const y = d3.scaleLinear()
//  .range([height, 0]);
//const yAxis = svg.append("g")
//  .attr("class", "myYaxis");


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("cfbwins.csv").then(function(data) 
  {
    // Add X axis
var x = d3.scaleLinear()
.domain([0, 15])
.range([ 0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
.range([ 0, height ])
.domain(data.map(function(d) {return d.Team;}))
.padding(.1);
svg.append("g")
.call(d3.axisLeft(y))







    //X axis
    //x.domain([0, d3.max(data, d => +d[selectedVar]) ]);
    //xAxis.transition().duration(1000).call(d3.axisBottom(x));

    //Add Y axis
    //y.domain(data.map(d => d.Team));
    //yAxis.transition().duration(1000).call(d3.axisLeft(y));

    //variable u: map data to existing bars
    const u = svg.selectAll("rect")
      .data(data)

    // update bars
    u.join("rect")
      .transition()
      .duration(1000)
        .attr("x", x(0))
        .attr("y", function(d) {return y(d.Team); })
        .attr("width", function(d) {return x(d.selectedVar); })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")
  })

}

// Initialize plot
update('2013')
