greenlight analytics
====================

This site is about calculating analytics on the basis of data.

map example
===========

var dd = Greenlight.Packages.Analytics.Data;

var width = 520,
    height = 300,
    centered;

var projection = d3.geo.albersUsa()
    .scale(500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);
 
var svg = d3.select("#visualization-container").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

d3.json("/us.json", function(error, us) {
  g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked);

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);

    
     g.selectAll("circle")
        .data(dd)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
        	var splits = (""+d.loc).split(",");
            var lon = splits[0];
            var lat = splits[1];
            return projection([lon, lat])[0];
        })
        .attr("cy", function(d) {
            var splits = (""+d.loc).split(",");
            var lon = splits[0];
            var lat = splits[1];

            return projection([lon, lat])[1];
        })
        .attr("r", function(d)
{
	return d.pop / 10000.0;
})
        .style("fill", "green")
        .style("opacity", 0.75);
    
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

















