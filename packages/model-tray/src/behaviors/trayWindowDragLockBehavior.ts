import { WorkspaceTrayModel } from '../WorkspaceTrayModel';
import { WorkspaceEngine } from '@projectstorm/react-workspaces-core';

/**
 * Updates the draggability of tray windows dynamically based on the engine lock being updated
 */
export const setupTrayWindowDragLockBehavior = (model: WorkspaceTrayModel, engine: WorkspaceEngine) => {
  model.floatingWindow.setDraggable(!engine.locked);
  return engine.registerListener({
    lockUpdated: () => {
      model.floatingWindow.setDraggable(!engine.locked);
    }
  });
};
