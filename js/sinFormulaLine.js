//Eq y = (sin(3x)+1)/2 for x: 0 to 9

var width = 700;
var height = 700;
var margin = 40;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var dataPoints = d3.range(10);
var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var formula = function(x){
	return ((Math.sin(3*x)+1)/2).toFixed(2);
}

var draw = function() {
	var container = d3.select('.container');
	container.append('h3').text('y = (sin(3x)+1)/2 for x: 0 to 9');
	var select  = container.select('select');

	var svg = container.append('svg')
		.attr('width',width)
		.attr('height',height);

	var XScale = d3.scaleLinear()
		.domain([0,10])
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
    	.x(function(d) { return XScale(d);})
    	.y(function(d) { return YScale(formula(d));});

    var lineGroup =svg.append('g')
        .classed('lineGroup', true)
        .attr('transform', translate(margin, margin));

    var path = lineGroup.append('path');

    path.datum(dataPoints)
	    .attr('d', line)
	    .classed('sinLine',true);

	var circle = lineGroup.selectAll('.line circle').data(dataPoints);
	circle.enter()
		.append('circle')
		.attr('cx',function(d) { return XScale(d);})
    	.attr('cy',function(d) { return YScale(formula(d))});

    select.on('change', function() {

    	var curveScale  = d3.scaleLinear()
    			.domain([0,1])
    			.range([-2.3,1]);
		var curve = d3.select(this).property('value');
		console.log(curveScale(curve),curve);
		line.curve(d3.curveCardinal.tension(curveScale(curve)))
		path.attr('d',line);
	});

}

var createSelect = function(){
	var range = d3.range(0,1.2,0.2);
	var format = d3.format('.1f');

	var container = d3.select('.container');
	var div = container.append('div');
	var select  = div.append('select');
	select.classed('drop-down',true)
	select.selectAll('option').data(range)
		.enter()
		.append('option')
		.attr('value',function(d){return d;})
		.text(function(d){return format(d);});

	draw();
}

window.onload = createSelect;