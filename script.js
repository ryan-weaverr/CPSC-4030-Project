//Read the data
d3.csv("data/region.csv").then(function (data) {
  var strokeWidth = 3;
  var mouseWidth = 5;

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#line")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var yAccessor = (d) => d.NorthAmerica;
  var xAccessor = (d) => d.Year;

  // Add X axis
  var x = d3.scaleLinear().domain(d3.extent(data, xAccessor)).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 450]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));


  function hideSVG(id) {
    var style = document.getElementById(id).style.display;
    if(style === "none")
      document.getElementById(id).style.display = "block";
    else
      document.getElementById(id).style.display = "none";
    //or to hide the all svg
    //document.getElementById("mySvg").style.display = "none";
  }


  // Add the line
  var NorthAmerica = svg
    
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("id", "NorthAmerica")
    .attr("stroke", "steelblue")
    .attr("stroke-width", strokeWidth)
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
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var Europe = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.EuropeCentralAsia);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var LatinAmerica = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.LatinAmericaCaribbean);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var MiddleEast = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.MiddleEastNorthAfrica);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var SouthAsia = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.SouthAsia);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var SubSaharanAfrica = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.SubSaharanAfrica);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });
  var EastAsia = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", strokeWidth)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.Year);
        })
        .y(function (d) {
          return y(d.EastAsiaPacific);
        })
    )
    .on("mouseover", function (d, i) {
      d3.select(this).attr("stroke-width", mouseWidth);
    })
    .on("mouseout", function (d, i) {
      d3.select(this).attr("stroke-width", strokeWidth);
    });

    

    d3.select("#NorthAmericaa").on('click', function(){
      
      if(d3.select("#NorthAmerica").style("opacity")==1)
      {
        d3.select("#NorthAmerica").style("opacity",0)
      }
      else{
        d3.select("#NorthAmerica").style("opacity",1)
      }
    })

});
