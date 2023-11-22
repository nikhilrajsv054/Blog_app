import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const Rectangle = () => {
  const stageRef = useRef();
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (!isDrawing) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setStartPosition({ x, y });
      setIsDrawing(true);
      setRectangles([
        ...rectangles,
        {
          x,
          y,
          width: 0,
          height: 0,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { x, y } = e.target.getStage().getPointerPosition();
    const updatedRectangles = rectangles.slice();
    const lastIndex = updatedRectangles.length - 1;
    updatedRectangles[lastIndex] = {
      ...updatedRectangles[lastIndex],
      width: x - startPosition.x,
      height: y - startPosition.y,
    };
    setRectangles(updatedRectangles);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCreateRectangles = () => {
    setIsDrawing(true);
  };

  return (
    <div>
      <button onClick={handleCreateRectangles}>Create Rectangle</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        style={{ cursor: isDrawing ? 'crosshair' : 'default' }}
      >
        <Layer>
          {rectangles.map((rect, index) => (
            <Rect
              key={index}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              stroke="black"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Rectangle;


