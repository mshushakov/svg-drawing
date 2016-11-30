//
// Simple Library for creating figures on SVG
// Version: 1.0

class SVGShapes {
    static createCircle({ x, y, r }) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", x || 0);
        circle.setAttribute("cy", y || 0);
        circle.setAttribute("r", r);

        return circle;
    }

    static createPolyline({ points}) {
        if (points.length < 2) throw new ReferenceError('Should be at least 2 points for Polyline');

        var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute("points", points.map((point) => point.join(' ')).join(','));

        return polyline;
    }

    static createPolygon({ points }) {
        if (points.length < 3) throw new ReferenceError('Should be at least 3 points for Polygon');

        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute("points", points.map((point) => point.join(' ')).join(','));

        return polygon;
    }

    static createParallelogram({ points }) {
        if (points.length !== 3) throw new ReferenceError('Should be 3 points for Parallelogram');

        points.push([
            points[0][0] + (points[2][0] - points[1][0]),
            points[0][1] + (points[2][1] - points[1][1]),
        ]);

        return this.createPolygon( { points: points } );
    }

    static createGroup([...elements]) {
        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        elements.forEach((element) => {
            group.appendChild(element);
        });

        return group;
    }
};

class SVGStage {
    constructor(svg) {
        this.svg = svg;
        this.shapes = new Map();
    }

    add(shape) {
        this.shapes.set(shape, shape);
        this.svg.appendChild(shape);
    }

    remove(shape) {
        this.shapes.delete(shape);
        this.svg.removeChild(shape);;
    }

    localX(globalX) { 
        return globalX - this.svg.getBoundingClientRect().x;
    }

    localY(globalY) { 
        return globalY - this.svg.getBoundingClientRect().y;
    }

    /*get items = function* () {

    }*/
}