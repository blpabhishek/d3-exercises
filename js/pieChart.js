var width = 600;
var height = 500;
var data = [1, 1, 2, 2, 1, 2, 1] ;


var draw = function(option) {
	var container = d3.select('.container');

	var g = container.append('svg')
		.attr('width',width)
		.attr('height',height)
		.append('g')
		.attr('transform','translate(300,150)');

	var colorScale = d3.scaleOrdinal()
		.domain([0,10])
		.range(d3.schemeCategory20);

	var arc = d3.arc()             
        .outerRadius(option.outerRadius)
        .innerRadius(option.innerRadius);

	var pie = d3.pie()
	.value(function(d){return d;})
	.startAngle(option.startAngle)
	.endAngle(option.endAngle);

	g.selectAll('path').data(pie(data))
		.enter()
		.append('path')
		.attr('d',arc)
		.attr('fill',function(d,i){return colorScale(i);});
}

var toRadian = function(d){
	return d*(Math.PI/180);
}

var loadStyles = function(){
	var range = [{innerRadius:0,outerRadius:150,startAngle:toRadian(0),endAngle:toRadian(360)},
				{innerRadius:75,outerRadius:150,startAngle:toRadian(0),endAngle:toRadian(180)},	
				{innerRadius:0,outerRadius:150,startAngle:toRadian(180),endAngle:toRadian(360)},
				{innerRadius:75,outerRadius:150,startAngle:toRadian(0),endAngle:toRadian(360)}];

	range.forEach(draw);
}

window.onload = loadStyles;