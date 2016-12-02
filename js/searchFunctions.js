var width = 700;
var height = 800;
var margin = 30;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var createSvg = function(){
	var container = d3.select('.container');
	var svg = container.append('svg')
		.attr('width',width)
		.attr('height',height);
	return svg;
}

var draw = function() {
	var svg = createSvg();
}


window.onload = draw;