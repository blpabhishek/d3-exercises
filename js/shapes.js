var drawShapes = function() {
	var container = d3.select('.container');

	var svg = container.append('svg');
		svg.attr('width',600)
			.attr('height',200);

	var g = svg.append('g');

	var line = g.append('line');
		line.attr('x1',100)
			.attr('y1',0)
			.attr('x2',0)
			.attr('y2',100)
			.classed('line',true);

	var cg = svg.append('g');

	cg.attr('transform','translate(150)')

	var circle = cg.append('circle');
		circle.attr('cx',50)
			.attr('cy',50)
			.attr('r',50)
			.classed('circle',true);

	var rg = svg.append('g');

	rg.attr('transform','translate(300)')

	var rect = rg.append('rect');
		rect.attr('x',0)
		.attr('y',0)
		.attr('rx',5)
		.attr('ry',5)
		.attr('width',100)
		.attr('height',100)
		.classed('rect',true);

	var tg = svg.append('g');

	tg.attr('transform','translate(450)')

	var rect = tg.append('polygon');
		rect.attr('points','50,0 0,100 100,100 50,0')
		.classed('polygon',true)
}

window.onload = drawShapes;