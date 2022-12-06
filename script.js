//window.onload = updateImage;

//Read the data
d3.csv("data/cfb.csv").then(function (data) {
  // set the dimensions and margins of the graph

  // Add dots
  var button = document.getElementById("update");
  var select = document.getElementById("yearSelect");

  var xGetter = document.getElementById("xSelect");
  var yGetter = document.getElementById("ySelect");

  function update() {
    d3.selectAll("svg").remove();

    var xAttr = xGetter.options[xGetter.selectedIndex].value;
    var yAttr = yGetter.options[yGetter.selectedIndex].value;

    console.log(xAttr, yAttr);

    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#line")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data.map(function (d) {
            return d[xAttr];
          }),
          (s) => +s
        ),
      ])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data.map(function (d) {
            return d[yAttr];
          }),
          (s) => +s
        ),
      ])
      .range([height, 0]);
    //svg.append("g").call(d3.axisLeft(y));

    var yAxis = d3.axisLeft(y);

    //yAxis;

    var changing_axis = svg
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")")
      .call(yAxis);

    // changing_axis
    //   .transition()
    //   .attr("transform", "translate(" + 0 + "," + 0 + ")")
    //   .call(yAxis);
    svg
      .append("g")
      .selectAll("dot")
      .data(
        data.filter((v) => {
          return v.Year === select.options[select.selectedIndex].value;
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
        return x(d[xAttr]);
      })
      .attr("cy", function (d) {
        return y(d[yAttr]);
      })
      .attr("r", 1.5)
      .style("fill", "#4080FF");
  }
  update();
  button.addEventListener("click", update);

  function toggle(buttonID, id) {
    d3.select(buttonID).on("click", function () {
      if (d3.select(id).style("opacity") == 1) {
        d3.select(id).style("opacity", 0);
      } else {
        d3.select(id).style("opacity", 1);
      }
    });
  }
});
