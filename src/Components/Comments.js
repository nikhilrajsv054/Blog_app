import React, { useState } from 'react';
import './App.css';

const Shapes = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [activeShapeIndex, setActiveShapeIndex] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleShapeSelection = (shape) => {
    setSelectedShape(shape);
  };

  const handleCanvasMouseDown = (e) => {
    if (selectedShape) {
      setIsDrawing(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      const newShape = {
        type: selectedShape,
        top: e.clientY,
        left: e.clientX,
        width: 0,
        height: 0,
      };
      setShapes([...shapes, newShape]);
      setActiveShapeIndex(shapes.length);
    }
  };

  const handleShapeDragStart = (index, e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setDragStart({ x: e.clientX, y: e.clientY });
    setActiveShapeIndex(index);
  };

  const handleShapeDrag = (e) => {
    if (activeShapeIndex !== null && isDrawing) {
      const updatedShapes = shapes.map((shape, index) => {
        if (index === activeShapeIndex) {
          const offsetX = e.clientX - dragStart.x;
          const offsetY = e.clientY - dragStart.y;
          return {
            ...shape,
            width: Math.abs(offsetX),
            height: Math.abs(offsetY),
          };
        }
        return shape;
      });
      setShapes(updatedShapes);
    }
  };
  

  const handleShapeDragEnd = () => {
    setIsDrawing(false);
    setActiveShapeIndex(null);
  };

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => handleShapeSelection('circle')}>Circle</button>
        <button onClick={() => handleShapeSelection('rectangle')}>Rectangle</button>
      </nav>
      <div
        className="canvas"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleShapeDrag}
        onMouseUp={handleShapeDragEnd}
      >
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={`shape ${shape.type}`}
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.width,
              height: shape.height,
            }}
            onMouseDown={(e) => handleShapeDragStart(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default Shapes;

.navbar {
  padding: 10px;
  background-color: #f0f0f0;
}

.navbar button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

.canvas {
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  overflow: hidden;
  cursor: crosshair; /* Add this line to set the default cursor to crosshair */
}

.shape {
  position: absolute;
  cursor: pointer;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: black solid;
}

.rectangle {
  width: 100px;
  height: 60px;
  /* background-color: blue; */
  border: black solid;
}

