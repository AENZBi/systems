import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, ChevronDown } from 'lucide-react'

export function AppStructure({ screens, currentScreenId, setCurrentScreenId, onScreenNameChange }) {
  const [expandedScreens, setExpandedScreens] = useState<string[]>([])

  const toggleScreenExpansion = (screenId: string) => {
    setExpandedScreens(prev => 
      prev.includes(screenId) 
        ? prev.filter(id => id !== screenId)
        : [...prev, screenId]
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">App Structure</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {screens.map(screen => (
            <li key={screen.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleScreenExpansion(screen.id)}
                >
                  {expandedScreens.includes(screen.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </Button>
                <Input
                  value={screen.name}
                  onChange={(e) => onScreenNameChange(screen.id, e.target.value)}
                  className="flex-grow"
                />
                <Button
                  variant={currentScreenId === screen.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentScreenId(screen.id)}
                >
                  Edit
                </Button>
              </div>
              {expandedScreens.includes(screen.id) && (
                <ul className="pl-6 space-y-1">
                  {screen.components.map(component => (
                    <li key={component.id} className="text-sm">
                      {component.type}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
