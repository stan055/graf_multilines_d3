
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 60},
    width = self.innerWidth - margin.left - margin.right - 10,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// read data
const reader = new FileReader();

function read(input) {
	const csv = input.files[0];
	reader.readAsText(csv);
}

reader.onload = function (e) {
    var petrol = parseData(e.target.result, 'Petrol (USD)');
    var diesel = parseData(e.target.result, 'Diesel (USD)');

    let data = [ { key: 'petrol', values: petrol }, { key: 'diesel', values: diesel } ];
    draw(data);
}

function parseData(text, target) {
  return d3.csvParse(text, function(d) { 
    if (d.Date && +d[target]) 
    return {
        date: new Date(d.Date),
        price: +d[target]
    }
  })
}
