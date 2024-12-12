import { useDrag } from 'react-dnd'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BoxIcon as ButtonIcon, Type, Image, Edit, CheckSquare, Radio, Loader, List } from 'lucide-react'

const componentTypes = [
  { type: 'Button', icon: ButtonIcon },
  { type: 'TextView', icon: Type },
  { type: 'ImageView', icon: Image },
  { type: 'EditText', icon: Edit },
  { type: 'CheckBox', icon: CheckSquare },
  { type: 'RadioButton', icon: Radio },
  { type: 'ProgressBar', icon: Loader },
  { type: 'ListView', icon: List },
]

export function ComponentLibrary() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Component Library</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {componentTypes.map((component) => (
            <DraggableComponent key={component.type} {...component} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function DraggableComponent({ type, icon: Icon }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type, id: Date.now() },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 mb-2 bg-gray-100 rounded cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="mr-2" size={18} />
      {type}
    </div>
  )
}
