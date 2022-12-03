var select = document.getElementById("stats"); 

var options;

// Get column names from cfb.csv
d3.csv("data/cfb.csv").then(function (data) {
    options = Object.keys(data[0]);
    options.forEach((v) => {
        if(v != "Team" && v != "Year"){
            var opt = document.createElement("option");
            opt.value = v;
            opt.innerHTML = v;
            select.appendChild(opt);
        }
    });
});