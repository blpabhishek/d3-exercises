var drawShapes = function() {
	var width = 150;
	var container = d3.select('.container');

	var gemotricShapes = [{name:'line',x1:100,y1:0,x2:0,y2:100},
				{name:'circle',cx:50,cy:50,r:50},
				{name:'rect',x:0,y:0,r:50,width:100,height:100,rx:5,ry:5},
				{name:'polygon',points:'50,0 0,100 100,100'},
				];

	var svg = container.append('svg')
		.attr('width',600)
		.attr('height',200);

	gemotricShapes.forEach(function(shape,index){
		var group = svg.append('g')
			.attr('transform','translate('+index * width +')');

		var shap = group.append(shape.name)
			.classed(shape.name,true);

		for(a in shape) 
			shap.attr(a,shape[a]);
		
	});
}

window.onload = drawShapes;