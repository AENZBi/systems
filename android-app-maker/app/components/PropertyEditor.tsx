import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export function PropertyEditor({ component, updateComponent }) {
  if (!component) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Properties</h2>
        </CardHeader>
        <CardContent>
          <p>Select a component to edit its properties</p>
        </CardContent>
      </Card>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateComponent({ ...component, [name]: value })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Properties: {component.type}</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="left">Left</Label>
            <Input
              id="left"
              name="left"
              type="number"
              value={component.left}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="top">Top</Label>
            <Input
              id="top"
              name="top"
              type="number"
              value={component.top}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              name="width"
              type="number"
              value={component.width}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={component.height}
              onChange={handleChange}
            />
          </div>
          {component.type === 'Button' || component.type === 'TextView' ? (
            <div>
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                name="text"
                type="text"
                value={component.text || ''}
                onChange={handleChange}
              />
            </div>
          ) : null}
          {component.type === 'ImageView' ? (
            <div>
              <Label htmlFor="src">Image Source</Label>
              <Input
                id="src"
                name="src"
                type="text"
                value={component.src || ''}
                onChange={handleChange}
              />
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
