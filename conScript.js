var strokeWidth = 3;
var mouseWidth = 5;

//Read the data
d3.csv("data/cfb.csv").then(function (data) {
    var button = document.getElementById("render");
  
    function update() {
      d3.selectAll("svg").remove();

      // Get teams array from multiple dropdown
      var selectedTeams = document.getElementById("teams");

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

      // Get lowest year that selected teams played
      var minYear = d3.min(data, function (d) {
        if (selectedTeams.value.includes(d.Team)) {
          return d.Year;
        }
      });

      // Get highest year that selected teams played
      var maxYear = d3.max(data, function (d) {
        if (selectedTeams.value.includes(d.Team)) {
          return d.Year;
        }
      });

      // Add X axis
      const x = d3.scaleLinear().domain([minYear, maxYear]).range([0, width]);
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

      // Add axis labels
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Year");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height / 2)
        .text(selectedStat);

      // Draw a line for each team in selectedTeams
      for (var i = 0; i < selectedTeams.length; i++) {
        if (selectedTeams[i].selected) {
          // Get a random color
          var color = d3
            .scaleOrdinal()
            .domain([0, 1])
            .range([d3.schemeSet2[Math.floor(Math.random() * 8)]]);

          var team = selectedTeams[i].value;
          var teamData = data.filter(function (d) {
            return d.Team == team;
          });
          svg
            .append("path")
            .datum(teamData)
            .attr("fill", "none")
            .attr("stroke", color)
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
            )
            
            // Add dynamically placed legend
            var legend = svg
              .append("g")
              .attr("transform", `translate(${width - 100}, ${i * 20})`);
            legend
              .append("rect")
              .attr("width", 10)
              .attr("height", 10)
              .attr("fill", color);
            legend
              .append("text")
              .attr("x", 12)
              .attr("y", 10)
              .text(team)
              .attr("text-anchor", "start")
              .style("alignment-baseline", "middle");
              
        }
      }

      svg
        .append("path")
        .datum(
          data.filter((v) => {
            return v.Team === selectedTeams;
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
          }))
    }
    update();
    button.addEventListener("click", update);
  });