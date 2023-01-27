---
'@projectstorm/react-workspaces-behavior-divider-dropzone': minor
'@projectstorm/react-workspaces-behavior-panel-dropzone': minor
'@projectstorm/react-workspaces-model-floating-window': minor
'@projectstorm/react-workspaces-dropzone-plugin-tabs': minor
'@projectstorm/react-workspaces-dropzone-plugin-tray': minor
'@projectstorm/react-workspaces-behavior-resize': minor
'@projectstorm/react-workspaces-model-tabs': minor
'@projectstorm/react-workspaces-model-tray': minor
'@projectstorm/react-workspaces-demo': minor
'@projectstorm/react-workspaces-defaults': minor
'@projectstorm/react-workspaces-core': minor
---

- [Added] Factories now emit events when models are created
- [changed] Factories now have a protected `_generateModel()` event which should be implemented instead of the `generateModel()` event
- [Added] `setLocked()` method on the engine which prevents dragging across all `<Draggable>` widgets
- [Added] `installEngineLockListener: boolean` to the tray factory options, which when enabled, will also prevent windows from being moved when locks are enabled
- [maintenance] Bumped all package dependencies
- [Added] `setupTrayWindowDragLockBehavior()` helper utility
- [Added] `setDraggable()` method on floating windows allowing the window to control whether it can be moved or not.
