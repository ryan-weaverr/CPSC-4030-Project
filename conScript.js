//window.onload = updateImage;

//Read the data
d3.csv("data/cfb.csv").then(function (data) {
    var button = document.getElementById("render");
  
    function update() {
      d3.selectAll("svg").remove();

      // Get team from dropdown
      var selectedTeam = document.getElementById("teams").value;

      // Get stat from dropdown
      var selectedStat = document.getElementById("stats").value;
  
      const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  
      // append the svg object to the body of the page
      const svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Add X axis
      const x = d3.scaleLinear().domain([2012, 2021]).range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Get the max value of the selected stat
      var max = d3.max(data, function (d) {
        return +d[selectedStat];
      });
  
      // Add Y axis
      const y = d3.scaleLinear().domain([0, max]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));
  
      svg
        .append("g")
        .selectAll("dot")
        .data(
          data.filter((v) => {
            console.log(v.Team === selectedTeam);
            return v.Team === selectedTeam;
          })
        )
        .join(
          function (enter) {
            return enter.append("circle");
          },
          function (exit) {
            return exit
              .transition()
              .duration(5)
              .attr("r", 0)
              .style("opacity", 0)
              .attr("cx", 1000)
              .on("end", function () {
                d3.select().remove();
              });
          }
        )
        .attr("cx", function (d) {
          return x(d.Year);
        })
        .attr("cy", function (d) {
            // Get selected stat
            return y(d[selectedStat]);
        })
        .attr("r", 1.5)
        .style("fill", "#4080FF");

      // Draw line
      svg
        .append("path")
        .datum(
          data.filter((v) => {
            return v.Team === selectedTeam;
          }
        ))
        .attr("fill", "none")
        .attr("stroke", "#4080FF")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.Year);
            })
          .y(function (d) {
            return y(d[selectedStat]);
          })
        );
    }
    update();
    button.addEventListener("click", update);
  });