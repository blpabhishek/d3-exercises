var width = 700;
var height = 800;
var margin = 30;
var innerWidth = width - (2 * margin);
var innerHeight = height - (2 * margin);

var data = [9,10,4,2,5,6,4,8,7,3];
var XScale,YScale,colorScale;

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

var drawChart = function() {
	var svg = createSvg();
	var range = d3.extent(data);

	XScale = d3.scaleLinear()
		.domain([0,data.length])
		.range([0,innerWidth])

	XScale = d3.scaleBand()
		.domain(data)
		.range([0,innerWidth])
		.paddingInner([0.4])
		.paddingOuter([0.5]);

	YScale = d3.scaleLinear()
		.domain([0,d3.sum(data)])
		.range([innerHeight,0]);

	var xAxis = d3.axisBottom(XScale).tickFormat(function(d,i){return i+1});
    var yAxis = d3.axisLeft(YScale);

    svg.append('g')
        .call(xAxis)
        .classed('xAxis', true)
        .attr('transform', translate(margin, innerHeight+margin));

    svg.append('g')
        .call(yAxis)
        .classed('yAxis', true)
        .attr('transform', translate(margin, margin));

    var dataGroup = svg.append('g')
        .classed('data', true)
        .attr('transform', translate(margin, margin)) 

    var bars = dataGroup.selectAll('rect').data(data);

	bars.enter().append("rect")
      .attr("x", function(d,index) { return XScale(d);})
      .attr("y", function(d) { return YScale(d);})
      .attr("height", function(d) { return innerHeight - YScale(d); })
      .attr("width", XScale.bandwidth())

    bars.exit().remove();

   addButtons();
}

var click = function(value,group){
	var response;
	if(value=='quantile')
		response = prompt('Enter the quantile range 0-1','0');
	
	var lineData = d3[value](data,response);
	var linePoint = lineData.map ? lineData.map((d)=>YScale(d)):[YScale(lineData)];

	var line = group.selectAll('line').data(linePoint);

	line.enter().append('line')
		.attr('x1',0)
		.attr('y1',function(d){return d;})
		.attr('x2',width)
		.attr('y2',function(d){return d;})
		.classed('indicator',true)
		.attr('stroke',colorScale(value))

	line
		.attr('y1',function(d){return d;})
		.attr('y2',function(d){return d;})
		.attr('stroke',colorScale(value))

	line.exit().remove();
}

var addButtons = function(){
	var functions = ['min', 'max', 'extent', 'sum', 'mean', 'median', 'quantile', 'variance', 'deviation'];
	colorScale = d3.scaleOrdinal()
		.domain(functions)
		.range(d3.schemeCategory10);

	var container = d3.select('.container');

	var div = container.append('div').text('Functions:');

	var buttons = div.selectAll('button').data(functions);

	var group = d3.selectAll('.data');

	buttons	
		.enter()
		.append('button')
		.style('background-color',function(d){return colorScale(d);})
		.text(function(d){return d;})
		.on('click',function(value){ 
			click(value,group);
		});
}

window.onload = drawChart;