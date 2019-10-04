var width = 1060,
    height = 600;   

var projection = d3.geo.albers()
    .center([0, 18.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1000)
    .translate([width / 4, height / 4]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#mapone").append("svg")
    .attr("width", width)
    .attr("height", height);  

d3.json("/ahs/africa.json", function(error, africa) {
  var subunits = topojson.feature(africa, africa.objects.subunits),
    places = topojson.feature(africa, africa.objects.places);

  svg.selectAll(".subunit")
      .data(topojson.feature(africa, africa.objects.subunits).features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.properties.SOV_A3; })
      .attr("d", path).on("mousemove",
  function(d){
    cla = d3.select(this).attr('class');
    sublabel = '#' + cla.replace("subunit", "").replace(/\s/g,'');
    d3.select(this).style("fill",
    "#333"),
    d3.select(sublabel).style("fill",
    "#fff"), 
    d3.select("#country-name").text(function(){
      return d.properties.SOVEREIGNT.toUpperCase()
      }),
    d3.select("#comacico-count").text(function(){
      return "COMACICO-owned theaters in 1975: " + d.properties.COMACICO
      }),
     d3.select("#secma-count").text(function(){
      return "SECMA-owned theaters in 1975: " + d.properties.SECMA
      }),
    d3.select("#cna-count").text(function(){
      return "CNA Showings recorded on Twitter: " + d.properties.CNA
      })
  }).on("mouseout",
  function(){
    d3.select(this).style("fill", "#D3D3D3" ),
    d3.select(sublabel).style("fill",
    "#000"),
    d3.select("#country-name").text(function(){
      return 
      }),
    d3.select("#comacico-count").text(function(){
      return 
      }),
    d3.select("#secma-count").text(function(){
      return 
      }),
    d3.select("#cna-count").text(function(){
      return 
      })
  });

svg.selectAll(".subunit-label")
      .data(subunits.features)
    .enter().append("text")
      .attr("class", function(d) { return "subunit-label " + d.properties.SOVEREIGNT; })
      .attr("id", function(d) { return d.properties.SOV_A3; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.SOVEREIGNT; });

/**
svg.append("path")
      .datum(places)
      .attr("d", path)
      .attr("class", "place");

  svg.selectAll(".place-label")
      .data(places.features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
      .text(function(d) { return d.properties.NAME; })
 **/

d3.json("/ahs/comacico.json", function(error, comacico) {
  svg.append("g")
    .selectAll("path")
    .data( comacico.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#A3A3CB" )
    .attr( "stroke", "#19197F" )
    .attr("opacity", "0")
    .attr("class", "comacico")
    .attr( "d", path );

// Add comacico title
svg.append("text")
  .attr("x", width - 550)             
  .attr("y", height - 90)    
  .attr("class", "legend-title")
  .style("fill", "#A3A3CB")
  .style( "stroke", "#19197F" )         
  .on("click", function(){
    // Determine if current line is visible
    var active   = comacico.active ? false : true,
      newOpacity = active ? 1 : 0;
    // Hide or show the elements
    d3.selectAll(".comacico").style("opacity", newOpacity);
    // Update whether or not the elements are active
    comacico.active = active;
  })
  .text("COMACICO");
});   

d3.json("/ahs/secma.json", function(error, secma) {
  svg.append("g")
    .selectAll("path")
    .data( secma.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#007300" )
    .attr( "stroke", "#000B00" )
    .attr("opacity", "0")
    .attr("class", "secma")
    .attr( "d", path );

// Add secma title
svg.append("text")
  .attr("x", width - 550)             
  .attr("y", height - 60)    
  .attr("class", "legend-title")
  .style("fill", "#007300") 
  .style( "stroke", "#000B00" )     
  .on("click", function(){
    // Determine if current line is visible
    var active   = secma.active ? false : true,
      newOpacity = active ? 1 : 0;
    // Hide or show the elements
    d3.selectAll(".secma").style("opacity", newOpacity);
    // Update whether or not the elements are active
    secma.active = active;
  })
  .text("SECMA");
});   

d3.json("/ahs/cna.json", function(error, cna) {
  svg.append("g")
    .selectAll("path")
    .data( cna.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ffa" )
    .attr( "stroke", "#332" )
    .attr("opacity", "0")
    .attr("class", "cna")
    .attr( "d", path );

// Add cna title
svg.append("text")
  .attr("x", width - 550)             
  .attr("y", height - 30)    
  .attr("class", "legend-title")
  .style("fill", "#ffa") 
  .style( "stroke", "#332" )        
  .on("click", function(){
    // Determine if current line is visible
    var active   = cna.active ? false : true,
      newOpacity = active ? 1 : 0;
    // Hide or show the elements
    d3.selectAll(".cna").style("opacity", newOpacity);
    // Update whether or not the elements are active
    cna.active = active;
  })
  .text("CNA");    
});   

}); 