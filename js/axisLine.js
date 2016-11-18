var width = 700;
var height = 800;
var margin = 30;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
var draw = function() {
	var linePoints = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];
	var data = d3.range(10);
	var container = d3.select('.container');

	var svg = container.append('svg')
		.attr('width',width)
		.attr('height',height);

	var XScale = d3.scaleLinear()
		.domain([0,1])
		.range([0,innerWidth])

	var YScale = d3.scaleLinear()
		.domain([0,1])
		.range([innerHeight,0])

	var xAxis = d3.axisBottom(XScale);
    var yAxis = d3.axisLeft(YScale);

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, innerHeight+margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

	var line = d3.line()
    	.x(function(d) { return XScale(d.x/10);})
    	.y(function(d) { return YScale(d.y/10);});

    var sinX = d3.line()
    	.x(function(d){return XScale(d/10);})
    	.y(function(d){return YScale((Math.sin(d)/10)+0.5);});

    var lineGroup =svg.append('g')
        .classed('lineGroup', true)
        .attr('transform', translate(margin, margin));

    var path = lineGroup.append('path');

    path.datum(linePoints)
	    .attr('d', line)
	    .classed('line',true);

	var sinPath = lineGroup.append('path');

    sinPath.datum(data)
	    .attr('d', sinX)
	    .classed('sinX',true);

	var circle = lineGroup.selectAll('.line circle').data(linePoints);
	circle.enter()
		.append('circle')
		.attr('cx',function(d) { return XScale(d.x/10);})
    	.attr('cy',function(d) { return YScale(d.y/10);});

    circle = lineGroup.selectAll('.sinX circle').data(data);
	circle.enter()
		.append('circle')
		.attr('cx',function(d) { return XScale(d/10);})
    	.attr('cy',function(d) { return YScale((Math.sin(d)/10)+0.5);});
}

window.onload = draw;