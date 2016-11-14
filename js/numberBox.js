var number = [0,1,2,3,4,5,6,7,8,9,10];

var loadData = function() {
	var container = d3.select('.container');
	var divs = container.selectAll('div').data(number);

	var fontScale = d3.scaleLinear()
		.domain([0,10])
		.range([12,120])

	var lineHeight = d3.scaleLinear()
		.domain([0,10])
		.range([30,180])

	divs.enter()
		.append('div')
		.style('font-size',function(d){return fontScale(d)+"px";})
		.style('line-height',function(d){return +lineHeight(d)+"px";})
		.style('border-style','groove')
		.style('border-width','thin')
		.text(function(d){return d;});
}

window.onload = loadData;