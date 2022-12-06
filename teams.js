// Get options from team column of cfb.csv
d3.csv("data/cfb.csv").then(function (data) {
    var select = document.getElementById("teams");
    var options = [];
    data.forEach((v) => {
        if (!options.includes(v.Team)) {
            options.push(v.Team);
            var opt = document.createElement("option");
            opt.value = v.Team;
            opt.innerHTML = v.Team;
            select.appendChild(opt);
        }
    });
});