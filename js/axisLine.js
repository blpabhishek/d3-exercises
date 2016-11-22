var width = 700;
var height = 800;
var margin = 30;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var linePoints = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];
	var range = 10;
	var data = d3.range(range);

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var draw = function() {
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

    var line = d3.line()
    	.x(function(d) { return XScale(d.x/range);})
    	.y(function(d) { return YScale(d.y/range);})

	var sinLine = d3.line()
	.x(function(d){return XScale(d/range);})
	.y(function(d){return YScale((Math.sin(d)/range)+0.5);})

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, innerHeight+margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

    var lineGroup =svg.append('g')
        .classed('lineGroup', true)
        .attr('transform', translate(margin, margin));

    var path = lineGroup.append('path');

    path.datum(linePoints)
	    .attr('d', line)
	    .classed('line',true);

	var sinPath = lineGroup.append('path');

    sinPath.datum(data)
	    .attr('d', sinLine)
	    .classed('sinLine',true);

	var select  = container.select('select');
	    
	select.on('change', function() {
		var curve = d3.select(this).property('value');
		line.curve(d3[curve]);
		sinLine.curve(d3[curve]);	
		path.attr('d',line);
		sinPath.attr('d',sinLine);
	});

	var circle = lineGroup.selectAll('.line circle').data(linePoints);
	circle.enter()
		.append('circle')
		.attr('cx',function(d) { return XScale(d.x/range);})
    	.attr('cy',function(d) { return YScale(d.y/range);});

    circle = lineGroup.selectAll('.sinLine circle').data(data);
	circle.enter()
		.append('circle')
		.attr('cx',function(d) { return XScale(d/range);})
    	.attr('cy',function(d) { return YScale((Math.sin(d)/range)+0.5);});
}

var loadAllEffects = function(){
	var curves = Object.keys(d3).filter((e)=>e.match('curve'));

	var container = d3.select('.container');
	var div = container.append('div');
	var select  = div.append('select');
	select.classed('drop-down',true)
	select.selectAll('option').data(curves)
		.enter()
		.append('option')
		.attr('value',function(d){return d;})
		.text(function(d){return d;})

	draw();
}

window.onload = loadAllEffects;