// Get options from team column of cfb.csv
d3.csv("data/cfb.csv").then(function (data) 
{
    var select = document.getElementById("teams");
    var options = [];
    data.forEach((v) => 
    {
        if (!options.includes(v.UniversityName)) 
        {
            options.push(v.UniversityName);
            var opt = document.createElement("option");
            opt.value = v.UniversityName;
            opt.innerHTML = v.UniversityName;
            select.appendChild(opt);
        }
    });
});