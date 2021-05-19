function draw(data) {
    let maxPricePetrol = d3.max(data[0].values, d => d.price )
    let maxPriceDiesel = d3.max(data[1].values, d => d.price);
    let maxPrice = Math.max(maxPricePetrol, maxPriceDiesel);
    let minDate = d3.min(data[0].values, d => d.date );
    let maxDate = d3.max(data[0].values, d => d.date );
  
  
  // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, maxPrice])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
  
  // color palette
    var res = data.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#e41a1c','#377eb8'])
  
  
  // Draw the line
    svg.selectAll(".line")
        .data(data)
        .enter()
        .append("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d.key) })
          .attr("stroke-width", 1.5)
          .attr("d", function(d){
                return d3.line()
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.price); })
              (d.values)
          })
  
  // Draw text
  svg
  .append('line')
  .style('stroke', '#e41a1c')
  .style('stroke-width', 2)
  .attr('x1', 11)
  .attr('y1', height - 25)
  .attr('x2', 24)
  .attr('y2', height - 25);

svg
  .append('text')
  .text('Petrol')
  .attr('y', height - 20)
  .attr('x', 30)
  .attr('font-size', 15)
  .attr('font-family', 'monospace')
  .attr('fill', 'black');

svg
  .append('line')
  .style('stroke', '#377eb8')
  .style('stroke-width', 2)
  .attr('x1', 91)
  .attr('y1', height - 25)
  .attr('x2', 104)
  .attr('y2', height - 25);

svg
  .append('text')
  .text('Diesel')
  .attr('y', height - 20)
  .attr('x', 110)
  .attr('font-size', 15)
  .attr('font-family', 'monospace')
  .attr('fill', 'black');
  }