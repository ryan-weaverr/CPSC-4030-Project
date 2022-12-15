const margin = { top: 20, right: 30, bottom: 80, left: 100 },
  width = 500 - margin.left - margin.right,
  height = 1900 - margin.top - margin.bottom;

function changeBar(university, toggle) {
  if (toggle === "true") {
    d3.select("#" + university).attr("fill", "cyan");
  } else {
    d3.select("#" + university).attr("fill", "darkorchid");
  }
}

function updateBar() {
  d3.csv("data/cfb.csv").then(function (data) {
    var select = document.getElementById("yearSelect");

    var xGetter = document.getElementById("barXSelect");

    d3.selectAll("#barG").remove();

    var xAttr = xGetter.options[xGetter.selectedIndex].value;

    const svg = d3
      .select("#barGraph")
      .append("svg")
      .attr("id", "barG")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var university = svg
      .append("text")
      .attr("id", "topbartext")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-family", "sans-serif")
      .text("");
    var xLabel = svg
      .append("text")
      .attr("id", "topbartext")
      .attr("x", 0)
      .attr("y", 20)
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-family", "sans-serif")
      .text("");

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
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleBand()
      .range([50, height])
      .domain(
        data
          .filter((v) => {
            return v.Year === select.options[select.selectedIndex].value;
          })
          .map((d) => d.UniversityName)
      )
      .padding(0.1);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width * 0.6)
      .attr("y", height + 40)
      .text(xAttr);

    svg
      .selectAll("myRect")
      .data(
        data.filter((v) => {
          return v.Year === select.options[select.selectedIndex].value;
        })
      )
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.UniversityName))
      .attr("width", (d) => x(d[xAttr]))
      .attr("height", y.bandwidth())
      .attr("fill", "darkorchid")
      .attr("toggle", "false")
      .attr("id", (d) => d.UniversityName)
      .on("mouseover", function (d, x) {
        if (d3.select(this).attr("toggle") === "false") {
          d3.select(this)
            .attr("stroke-width", "1")
            .attr("stroke", "black")
            .attr("fill", "cyan");
        }
        university.text(x.UniversityName);
        xLabel.text(xAttr + ": " + x[xAttr]);
      })
      .on("mouseout", function (d) {
        if (d3.select(this).attr("toggle") === "false") {
          d3.select(this).attr("stroke-width", "0").attr("fill", "darkorchid");
        }
      })
      .on("click", function (d, i) {
        if (d3.select(this).attr("toggle") === "false") {
          d3.select(this)
            .attr("stroke-width", "1")
            .attr("fill", "blue")
            .attr("toggle", "true");
        } else {
          d3.select(this)
            .attr("stroke-width", "0")
            .attr("fill", "cyan")
            .attr("toggle", "false");
        }
        changePoint(i.UniversityName, d3.select(this).attr("toggle"));
      });
  });
}

updateBar();
