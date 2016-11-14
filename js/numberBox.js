var number = [0,1,2,3,4,5,6,7,8,9,10];

var loadData = function() {
	var container = d3.select('.container');
	var divs = container.selectAll('div').data(number);

	var fontScale = d3.scaleLinear()
		.domain([0,10])
		.range(["italic bold 12px/30px Georgia, serif","italic bold 120px/180px Georgia, serif"])

	divs.enter()
		.append('div')
		.style('font',function(d){return fontScale(d);})
		.text(function(d){return d;});
}

window.onload = loadData;