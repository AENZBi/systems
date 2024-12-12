'use client'

import { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ComponentLibrary } from './components/ComponentLibrary'
import { DesignCanvas } from './components/DesignCanvas'
import { AppPreview } from './components/AppPreview'
import { PropertyEditor } from './components/PropertyEditor'
import { CodeGenerator } from './components/CodeGenerator'
import { AppStructure } from './components/AppStructure'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUndo } from './hooks/useUndo'

export default function AndroidAppMaker() {
  const [screens, setScreens] = useState([{ id: 'main', name: 'Main Screen', components: [] }])
  const [currentScreenId, setCurrentScreenId] = useState('main')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [generatedCode, setGeneratedCode] = useState('')

  const { state: undoableScreens, setState: setUndoableScreens, undo, redo, canUndo, canRedo } = useUndo(screens)

  const currentScreen = undoableScreens.find(screen => screen.id === currentScreenId)

  const handleGenerate = useCallback(() => {
    const code = CodeGenerator.generateAppCode(undoableScreens)
    setGeneratedCode(code)
  }, [undoableScreens])

  const addScreen = useCallback(() => {
    const newScreenId = `screen_${Date.now()}`
    const newScreens = [...undoableScreens, { id: newScreenId, name: `Screen ${undoableScreens.length + 1}`, components: [] }]
    setUndoableScreens(newScreens)
    setCurrentScreenId(newScreenId)
  }, [undoableScreens, setUndoableScreens])

  const updateScreenComponents = useCallback((updatedComponents) => {
    setUndoableScreens(undoableScreens.map(screen => 
      screen.id === currentScreenId ? { ...screen, components: updatedComponents } : screen
    ))
  }, [currentScreenId, undoableScreens, setUndoableScreens])

  const handleScreenNameChange = useCallback((screenId, newName) => {
    setUndoableScreens(undoableScreens.map(screen => 
      screen.id === screenId ? { ...screen, name: newName } : screen
    ))
  }, [undoableScreens, setUndoableScreens])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Android No-Code App Maker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <ComponentLibrary />
            <AppStructure 
              screens={undoableScreens}
              currentScreenId={currentScreenId}
              setCurrentScreenId={setCurrentScreenId}
              onScreenNameChange={handleScreenNameChange}
            />
          </div>
          <div className="space-y-6">
            <div className="flex space-x-2 mb-4">
              {undoableScreens.map(screen => (
                <Button
                  key={screen.id}
                  variant={currentScreenId === screen.id ? "default" : "outline"}
                  onClick={() => setCurrentScreenId(screen.id)}
                >
                  {screen.name}
                </Button>
              ))}
              <Button onClick={addScreen}>+</Button>
            </div>
            <DesignCanvas 
              components={currentScreen.components} 
              setComponents={updateScreenComponents}
              setSelectedComponent={setSelectedComponent}
            />
            <div className="flex space-x-2">
              <Button onClick={undo} disabled={!canUndo}>Undo</Button>
              <Button onClick={redo} disabled={!canRedo}>Redo</Button>
              <Button onClick={handleGenerate} className="ml-auto">Generate App</Button>
            </div>
          </div>
          <div>
            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
                <AppPreview components={currentScreen.components} />
              </TabsContent>
              <TabsContent value="properties">
                <PropertyEditor 
                  component={selectedComponent} 
                  updateComponent={(updatedComponent) => {
                    updateScreenComponents(currentScreen.components.map(c => 
                      c.id === updatedComponent.id ? updatedComponent : c
                    ))
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {generatedCode && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Generated Code</h2>
            <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </DndProvider>
  )
}
