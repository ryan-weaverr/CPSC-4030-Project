const margin = {top: 20, right: 30, bottom: 80, left: 160},
    width = 500 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;


const svg = d3.select("#line")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/cfb13.csv").then(function(data) 
{

  const x = d3.scaleLinear()
    .domain([0, 15])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  
  const y = d3.scaleBand()
    .range([ 0, height])
    .domain(data.map(d => d.Team))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width * 0.6)
    .attr("y", height + 40)
    .text("Season Wins");

  
  svg.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.Team))
    .attr("width", d => x(d.Win))
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")
})


