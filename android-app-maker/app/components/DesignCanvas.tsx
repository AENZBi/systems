import { useDrop } from 'react-dnd'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { DraggableComponent } from './DraggableComponent'

export function DesignCanvas({ components, setComponents, setSelectedComponent }) {
  const [, drop] = useDrop(() => ({
    accept: ['component', 'canvas-component'],
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + (delta?.x || 0))
      const top = Math.round(item.top + (delta?.y || 0))

      if (item.isNew) {
        const newComponent = { ...item, left, top, width: 100, height: 40, isNew: false }
        setComponents((prevComponents) => [...prevComponents, newComponent])
      } else {
        setComponents((prevComponents) =>
          prevComponents.map((c) =>
            c.id === item.id ? { ...c, left, top } : c
          )
        )
      }
    },
  }))

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Design Canvas</h2>
      </CardHeader>
      <CardContent>
        <div ref={drop} className="border-2 border-dashed border-gray-300 rounded h-[500px] relative">
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              component={component}
              setSelectedComponent={setSelectedComponent}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
