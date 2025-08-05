# @projectstorm/react-workspaces-behavior-panel-dropzone

## 2.3.12

### Patch Changes

- d43f0cd: Bumped all dependencies
- Updated dependencies [d43f0cd]
  - @projectstorm/react-workspaces-core@4.2.2

## 2.3.11

### Patch Changes

- Updated dependencies [40afac4]
  - @projectstorm/react-workspaces-core@4.2.1

## 2.3.10

### Patch Changes

- Updated dependencies [4ff721f]
  - @projectstorm/react-workspaces-core@4.2.0

## 2.3.9

### Patch Changes

- Updated dependencies [fbdb1d5]
  - @projectstorm/react-workspaces-core@4.1.1

## 2.3.8

### Patch Changes

- Updated dependencies [845b677]
  - @projectstorm/react-workspaces-core@4.1.0

## 2.3.7

### Patch Changes

- Updated dependencies [08103ef]
- Updated dependencies [5a976f8]
  - @projectstorm/react-workspaces-core@4.0.0

## 2.3.6

### Patch Changes

- 8273b13: - Fixed dragging panels sometimes causing a resize deadlock
  - Reworked the logic for computing initial sizes when there are muliple expanding panels in a group
  - Bumped all dependencies
- Updated dependencies [8273b13]
  - @projectstorm/react-workspaces-core@3.0.0

## 2.3.5

### Patch Changes

- Updated dependencies [0d850e7]
  - @projectstorm/react-workspaces-core@2.8.1

## 2.3.4

### Patch Changes

- 2362161: Added the ability to set the initial zIndex of the layer manager
- Updated dependencies [2362161]
  - @projectstorm/react-workspaces-core@2.8.0

## 2.3.3

### Patch Changes

- Updated dependencies [a4afcbe]
  - @projectstorm/react-workspaces-core@2.7.1

## 2.3.2

### Patch Changes

- Updated dependencies [a32d183]
  - @projectstorm/react-workspaces-core@2.7.0

## 2.3.1

### Patch Changes

- c7a4537: upgrade dependencies
- Updated dependencies [515640e]
- Updated dependencies [c7a4537]
  - @projectstorm/react-workspaces-core@2.6.0

## 2.3.0

### Minor Changes

- 710460c: Added more theme capability wrt the dropzones. There are more options, and themes are now sent to the transform buttons

## 2.2.1

### Patch Changes

- Updated dependencies [eeab809]
  - @projectstorm/react-workspaces-core@2.5.1

## 2.2.0

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
  - @projectstorm/react-workspaces-core@2.5.0

## 2.1.4

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0

## 2.1.3

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0

## 2.1.2

### Patch Changes

- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1

## 2.1.1

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-core@2.2.0

## 2.1.0

### Minor Changes

- 136b0a6: Theme support for all the internal widgets and behaviors

### Patch Changes

- Updated dependencies [136b0a6]
  - @projectstorm/react-workspaces-core@2.1.0

## 2.0.1

### Patch Changes

- be7d88c: - Added serialization to the various models
  - Improved the defaults of the transform zone functions
  - some consistency things
- Updated dependencies [48951aa]
- Updated dependencies [be7d88c]
  - @projectstorm/react-workspaces-core@2.0.1

## 2.0.0

### Major Changes

- d3f7427: Version 2.0 release

### Patch Changes

- Updated dependencies [d3f7427]
  - @projectstorm/react-workspaces-core@2.0.0
