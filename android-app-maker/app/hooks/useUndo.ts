import { useState, useCallback } from 'react'

export function useUndo<T>(initialState: T) {
  const [state, setState] = useState(initialState)
  const [undoStack, setUndoStack] = useState<T[]>([])
  const [redoStack, setRedoStack] = useState<T[]>([])

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      const newUndoStack = undoStack.slice(0, -1)
      setUndoStack(newUndoStack)
      setRedoStack([state, ...redoStack])
      setState(previousState)
    }
  }, [state, undoStack, redoStack])

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0]
      const newRedoStack = redoStack.slice(1)
      setRedoStack(newRedoStack)
      setUndoStack([...undoStack, state])
      setState(nextState)
    }
  }, [state, undoStack, redoStack])

  const setStateWithHistory = useCallback((newState: T) => {
    setUndoStack([...undoStack, state])
    setRedoStack([])
    setState(newState)
  }, [state, undoStack])

  return {
    state,
    setState: setStateWithHistory,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  }
}
