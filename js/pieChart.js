var width = 700;
var height = 800;
var data = [1, 1, 2, 2, 1, 2, 1] ;
var draw = function() {
	var container = d3.select('.container');

	var g = container.append('svg')
		.attr('width',width)
		.attr('height',height)
		.append('g')
		.attr('transform','translate(300,300)');

	var colorScale = d3.scaleOrdinal()
		.domain([0,10])
		.range(d3.schemeCategory20);

	var arc = d3.arc()             
        .outerRadius(200)
        .innerRadius(0);

	var pie = d3.pie()
	.value(function(d){return d;})

	g.selectAll('path').data(pie(data))
		.enter()
		.append('path')
		.attr('d',arc)
		.attr('fill',function(d,i){return colorScale(i);})			
}

window.onload = draw;