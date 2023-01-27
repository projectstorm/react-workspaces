# @projectstorm/react-workspaces-dropzone-plugin-tray

## 2.1.0

### Minor Changes

- a810a3e: - [Added] Factories now emit events when models are created
  - [changed] Factories now have a protected `_generateModel()` event which should be implemented instead of the `generateModel()` event
  - [Added] `setLocked()` method on the engine which prevents dragging across all `<Draggable>` widgets
  - [Added] `installEngineLockListener: boolean` to the tray factory options, which when enabled, will also prevent windows from being moved when locks are enabled
  - [maintenance] Bumped all package dependencies
  - [Added] `setupTrayWindowDragLockBehavior()` helper utility
  - [Added] `setDraggable()` method on floating windows allowing the window to control whether it can be moved or not.

### Patch Changes

- Updated dependencies [a810a3e]
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.2.0
  - @projectstorm/react-workspaces-model-tray@2.4.0
  - @projectstorm/react-workspaces-core@2.5.0

## 2.0.11

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0
  - @projectstorm/react-workspaces-model-tray@2.3.0
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.1.4

## 2.0.10

### Patch Changes

- Updated dependencies [68938c1]
  - @projectstorm/react-workspaces-model-tray@2.2.2

## 2.0.9

### Patch Changes

- Updated dependencies [2aa5082]
  - @projectstorm/react-workspaces-model-tray@2.2.1

## 2.0.8

### Patch Changes

- Updated dependencies [d01ffa3]
  - @projectstorm/react-workspaces-model-tray@2.2.0

## 2.0.7

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0
  - @projectstorm/react-workspaces-model-tray@2.1.0
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.1.3

## 2.0.6

### Patch Changes

- Updated dependencies [444c988]
  - @projectstorm/react-workspaces-model-tray@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1
  - @projectstorm/react-workspaces-model-tray@2.0.5
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.1.2

## 2.0.4

### Patch Changes

- @projectstorm/react-workspaces-model-tray@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-core@2.2.0
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.1.1
  - @projectstorm/react-workspaces-model-tray@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [136b0a6]
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.1.0
  - @projectstorm/react-workspaces-core@2.1.0
  - @projectstorm/react-workspaces-model-tray@2.0.2

## 2.0.1

### Patch Changes

- be7d88c: - Added serialization to the various models
  - Improved the defaults of the transform zone functions
  - some consistency things
- Updated dependencies [48951aa]
- Updated dependencies [be7d88c]
  - @projectstorm/react-workspaces-core@2.0.1
  - @projectstorm/react-workspaces-model-tray@2.0.1
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.0.1

## 2.0.0

### Major Changes

- d3f7427: Version 2.0 release

### Patch Changes

- Updated dependencies [d3f7427]
  - @projectstorm/react-workspaces-behavior-panel-dropzone@2.0.0
  - @projectstorm/react-workspaces-core@2.0.0
  - @projectstorm/react-workspaces-model-tray@2.0.0
