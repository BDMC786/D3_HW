// @TODO: YOUR CODE HERE!


  // d3.csv("assets/data/data.csv", function(error, theData) {
  //   if (error) return console.warn(error);
  //   console.log(theData)
  // }
  // );
  // loads ok, load data for the append loop



  // Define SVG area dimensions
var svgWidth = 1000;//960
var svgHeight = 600;//660

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//ok to here, fix change loading method
// try other load/loop method
d3.csv("assets/data/data.csv").then(function(theData) {

theData.forEach(function(data){
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
}
);



// Configure a linear scale with a range between the chartHeight and 0
var xScale = d3.scaleLinear()
.domain([8.5, d3.max(theData, d => d.poverty) +1])
.range([0, chartWidth]);

// Configure a linear scale with a range between the chartHeight and 0
var yScale = d3.scaleLinear()
.domain([2, d3.max(theData, d => d.healthcare)+1])
.range([chartHeight, 0]);

var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);
chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);    

    // append circles to data points
    var circlesGroup = chartGroup.selectAll("circle")
    .data(theData)
    .enter()
    .append("circle")
    
    .attr("class", "stateCircle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "14")
    .attr("fill", "blue")
    .attr("opacity", ".8");

    var labels = chartGroup.selectAll()
    .data(theData)
    .enter()
    .append("text")
    .text(data => data.abbr)
    .attr("class", "stateText")
    .attr("x", data => xScale(data.poverty))
    .attr("y", data => yScale(data.healthcare)+5);

    chartGroup.append("text")
    .attr("transform", `translate(${svgWidth/2}, 525)`)
    .style("text-anchor", "middle")
    .text("In Poverty (%)")
    .attr("class", "aText")

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",0 -50)
    .attr("x", 0 - (svgHeight / 2))
    .attr("class", "aText")
    .text("Lacks Healthcare (%)");

});

