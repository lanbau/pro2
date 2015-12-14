
var margin1 = {top: 20, right: 20, bottom: 30, left: 40},
    width1 = 620 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width1], .1);

var y = d3.scale.linear()
    .range([height1, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg1 = d3.select("#barchart").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

d3.csv("csv/barchart.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis);

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height1 - y(d.frequency); });
});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}
