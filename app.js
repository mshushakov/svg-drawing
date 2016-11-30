var svg = document.querySelector('svg');
var stage = new SVGStage(svg);
var elem, point, dragging = false;
var delta = { x: 0, y: 0};

var colorClass = document.querySelector('.colors .selected').classList[0];


document.querySelector('.colors').addEventListener('click', function(e) {
	if (e.target.tagName === 'LI') {
		var prev = e.target.parentNode.querySelector('.selected'),
			next = e.target,
			focused = document.querySelector('circle.focused');
		
		prev.classList.remove('selected');
		next.classList.add('selected');
		colorClass = next.classList[0];
	}
});

svg.addEventListener('mousedown', function(e) {
	stage.shapes.forEach(shape => shape.classList.remove('focused'));
	
	if (e.target.tagName === 'circle' && !e.shiftKey) {
		elem = e.target;
		dragging = true;
		delta = { 
			x: e.clientX - elem.getAttribute("cx"),
			y: e.clientY - elem.getAttribute("cy")
		}
		elem.classList.add('focused');
	}
	if (e.target.tagName === 'circle' && e.altKey) {
		stage.remove(elem);
	}
	else if (e.shiftKey) {
		point = { x: stage.localX(e.clientX), y: stage.localY(e.clientY) };
		if (document.querySelector('circle.focused')) document.querySelector('circle.focused').classList.remove('focused');
		elem = SVGShapes.createCircle({ x: point.x, y: point.y, r: 5 });
		elem.classList.add(colorClass);
		stage.add(elem);
	}
	console.log(e);
});

svg.addEventListener('mousemove', function(e) {
	if (elem && !dragging) {
		var dx = point.x - e.clientX - 5;
		var dy = point.y - e.clientY - 5;
		var r = Math.abs(Math.sqrt(dx * dx + dy * dy));
		elem.setAttribute("r", r);
	}

	if (elem && dragging) {
		elem.setAttribute("cx", e.clientX - delta.x);
		elem.setAttribute("cy", e.clientY - delta.y);
	}
});

svg.addEventListener('mouseup', function(e) {
	elem = null;
	dragging = false;
});