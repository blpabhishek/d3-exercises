var data = [20,30,40,60,20,70,10,20,90];
var randomNumberViz = function() {
	data.push(Math.floor(Math.random()*100));
	var container = d3.select('.container');
	var divs = container.selectAll('div').data(data);

	var numberScale = d3.scaleLinear()
		.domain([0,100])
		.range([10,1000]);

	var colorScale = d3.scaleLinear()
		.domain([0,100])
		.range(d3.schemeCategory20c);

	divs.enter()
		.append('div')
		.style('width',function(d) {return numberScale(d)+'px';})
		.style('height','25px')
		.style('margin','4px')
		.style('background-color',function(d,i){return colorScale(d);})
		.text(function(d){return d;});

	divs
		.style('width',function(d) {return numberScale(d)+'px';})
		.style('background-color',function(d,i){return colorScale(d);})
		.style('margin','3px')
		.text(function(d){return d;});

	divs.exit().remove();

	data.shift();
}

setInterval(function(){
	randomNumberViz();
},1000);