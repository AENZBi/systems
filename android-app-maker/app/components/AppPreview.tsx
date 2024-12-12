import { Card, CardHeader, CardContent } from '@/components/ui/card'

export function AppPreview({ components }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">App Preview</h2>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-800 w-64 h-[500px] mx-auto rounded-xl p-4 relative">
          {components.map((component) => (
            <div
              key={component.id}
              style={{
                position: 'absolute',
                left: component.left,
                top: component.top,
                width: component.width,
                height: component.height,
              }}
              className="bg-white text-black overflow-hidden"
            >
              {component.type === 'Button' && (
                <button className="w-full h-full bg-blue-500 text-white">
                  {component.text || 'Button'}
                </button>
              )}
              {component.type === 'TextView' && (
                <p>{component.text || 'Text View'}</p>
              )}
              {component.type === 'ImageView' && (
                <img
                  src={component.src || '/placeholder.svg'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
              {component.type === 'EditText' && (
                <input
                  type="text"
                  placeholder="Edit Text"
                  className="w-full h-full border p-1"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
