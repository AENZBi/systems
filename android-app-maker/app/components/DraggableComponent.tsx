import { useDrag } from 'react-dnd'

export function DraggableComponent({ component, setSelectedComponent }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-component',
    item: { ...component, isNew: false },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: component.left,
        top: component.top,
        width: component.width,
        height: component.height,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="border border-gray-400 bg-white p-2 cursor-move"
      onClick={() => setSelectedComponent(component)}
    >
      {component.type}
    </div>
  )
}
