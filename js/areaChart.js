//Eq y = 3sin(x)+5 , x:0 to 10

var width = 700;
var height = 700;
var margin = 40;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var dataPoints = d3.range(10);
var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var formula = function(x) {
    return (3 * Math.sin(x)) + 5;
}

var draw = function() {
    var dataPoints = d3.range(11);
    var container = d3.select('.container');
    container.append('h3').text('y = 3sin(x)+5 , x:0 to 10');
    var select = container.select('select');

    var svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    var XScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, innerWidth])

    var YScale = d3.scaleLinear()
        .domain([0, 10])
        .range([innerHeight, 0])

    var xAxis = d3.axisBottom(XScale).tickFormat(function(d){return d3.format(".1f")(d/10)});
    var yAxis = d3.axisLeft(YScale).tickFormat(function(d){return d3.format(".1f")(d/10)});

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, innerHeight + margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

    var area = d3.area()
        .x(function(d) {
            return XScale(d); })
        .y0(innerHeight)
        .y1(function(d) {
            return YScale(formula(d)) });

    var line = d3.line()
    	.x(function(d) { return XScale(d);})
    	.y(function(d) { return YScale(formula(d));});

    var lineGroup = svg.append('g')
        .classed('lineGroup', true)
        .attr('transform', translate(margin, margin));

    var path = lineGroup.append('path');

    path.datum(dataPoints)
        .attr('d', area)
        .classed('area', true);

    var linePath = lineGroup.append('path');
    linePath.datum(dataPoints).attr('d',line).classed('line', true);

    lineGroup.selectAll('circle')
		.data(dataPoints)
		.enter().append('circle')
		.classed('circle', true)
		.attr('cx',function(d) { return XScale(d);})
		.attr('cy',function(d) { return YScale(formula(d));});

	var select  = container.select('select');
	    
	select.on('change', function() {
		var curve = d3.select(this).property('value');
		line.curve(d3[curve]);
		linePath.attr('d',line);
		area.curve(d3[curve]);
		path.attr('d',area);
	});

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
