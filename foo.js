var data = [20,30,40,60,20,70,10,20,90];
var fun = function() {
	data.push(Math.floor(Math.random()*100));
	var body = d3.select('body');
	var divs = body.selectAll('div').data(data);

	var colors = d3.schemeCategory20c.slice(0,4);

	divs.enter()
		.append('div')
		.style('width',function(d) {return (10*d)+'px';})
		.style('height','25px')
		.style('background-color',function(d,i){return colors[d.toString()[0]%4];})
		.text(function(d){return d;});

	divs
		.style('width',function(d) {return (10*d)+'px';})
		.style('background-color',function(d,i){return colors[d.toString()[0]%4];})
		.text(function(d){return d;});

	divs.exit().remove();

	data.shift();
}

setInterval(function(){
	fun();
},1000);