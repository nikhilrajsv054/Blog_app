
import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
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
        x: e.clientX,
        y: e.clientY,
        width: 1, // Set a default width to avoid NaN
        height: 1, // Set a default height to avoid NaN
      };
      setShapes([...shapes, newShape]);
      setActiveShapeIndex(shapes.length);
    }
  };

  const handleShapeDragStart = (index, e) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();
    setDragStart({ x: e.evt.clientX, y: e.evt.clientY });
    setActiveShapeIndex(index);
  };

  const handleShapeDrag = (e) => {
    if (activeShapeIndex !== null && isDrawing) {
      const updatedShapes = shapes.map((shape, index) => {
        if (index === activeShapeIndex) {
          const offsetX = e.evt.clientX - dragStart.x;
          const offsetY = e.evt.clientY - dragStart.y;
          return {
            ...shape,
            width: Math.abs(offsetX) || 1, // Avoid NaN for width
            height: Math.abs(offsetY) || 1, // Avoid NaN for height
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
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleShapeDrag}
        onMouseUp={handleShapeDragEnd}
      >
        <Layer>
          {shapes.map((shape, index) =>
            shape.type === 'circle' ? (
              <Circle
                key={index}
                x={shape.x}
                y={shape.y}
                radius={Math.max(shape.width, shape.height) / 2}
                draggable
                onDragStart={(e) => handleShapeDragStart(index, e)}
                onDragEnd={handleShapeDragEnd}
              />
            ) : (
              <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                draggable
                onDragStart={(e) => handleShapeDragStart(index, e)}
                onDragEnd={handleShapeDragEnd}
              />
            )
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Shapes;


// EditPostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../store/Slices/postsSlice';
import styles from '../Styles/PostForm.module.css';

const EditPostForm = ({ post, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    dispatch(editPost({ ...post, content: editedContent }));
    onSave();
  };

  return (
    <div className={styles['post-form']}>
      <h2>Edit Post</h2>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        rows="4"
        cols="50"
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPostForm;
