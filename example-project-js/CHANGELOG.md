# @projectstorm/react-workspaces-demo

## 2.1.13

### Patch Changes

- d43f0cd: Bumped all dependencies
- Updated dependencies [d43f0cd]
  - @projectstorm/react-workspaces-behavior-resize@2.3.10
  - @projectstorm/react-workspaces-core@4.2.2

## 2.1.12

### Patch Changes

- Updated dependencies [40afac4]
  - @projectstorm/react-workspaces-core@4.2.1
  - @projectstorm/react-workspaces-behavior-resize@2.3.9

## 2.1.11

### Patch Changes

- Updated dependencies [4ff721f]
  - @projectstorm/react-workspaces-core@4.2.0
  - @projectstorm/react-workspaces-behavior-resize@2.3.8

## 2.1.10

### Patch Changes

- Updated dependencies [fbdb1d5]
  - @projectstorm/react-workspaces-core@4.1.1
  - @projectstorm/react-workspaces-behavior-resize@2.3.7

## 2.1.9

### Patch Changes

- Updated dependencies [845b677]
  - @projectstorm/react-workspaces-core@4.1.0
  - @projectstorm/react-workspaces-behavior-resize@2.3.6

## 2.1.8

### Patch Changes

- Updated dependencies [08103ef]
- Updated dependencies [5a976f8]
  - @projectstorm/react-workspaces-core@4.0.0
  - @projectstorm/react-workspaces-behavior-resize@2.3.5

## 2.1.7

### Patch Changes

- 8273b13: - Fixed dragging panels sometimes causing a resize deadlock
  - Reworked the logic for computing initial sizes when there are muliple expanding panels in a group
  - Bumped all dependencies
- Updated dependencies [8273b13]
  - @projectstorm/react-workspaces-core@3.0.0
  - @projectstorm/react-workspaces-behavior-resize@2.3.4

## 2.1.6

### Patch Changes

- Updated dependencies [0d850e7]
  - @projectstorm/react-workspaces-core@2.8.1
  - @projectstorm/react-workspaces-behavior-resize@2.3.3

## 2.1.5

### Patch Changes

- 2362161: Added the ability to set the initial zIndex of the layer manager
- Updated dependencies [2362161]
  - @projectstorm/react-workspaces-core@2.8.0
  - @projectstorm/react-workspaces-behavior-resize@2.3.2

## 2.1.4

### Patch Changes

- Updated dependencies [a4afcbe]
  - @projectstorm/react-workspaces-core@2.7.1
  - @projectstorm/react-workspaces-behavior-resize@2.3.1

## 2.1.3

### Patch Changes

- Updated dependencies [a32d183]
  - @projectstorm/react-workspaces-behavior-resize@2.3.0
  - @projectstorm/react-workspaces-core@2.7.0

## 2.1.2

### Patch Changes

- c7a4537: upgrade dependencies
- Updated dependencies [515640e]
- Updated dependencies [c7a4537]
  - @projectstorm/react-workspaces-core@2.6.0
  - @projectstorm/react-workspaces-behavior-resize@2.2.2

## 2.1.1

### Patch Changes

- Updated dependencies [eeab809]
  - @projectstorm/react-workspaces-core@2.5.1
  - @projectstorm/react-workspaces-behavior-resize@2.2.1

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
  - @projectstorm/react-workspaces-behavior-resize@2.2.0
  - @projectstorm/react-workspaces-core@2.5.0

## 2.0.6

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0
  - @projectstorm/react-workspaces-behavior-resize@2.1.3

## 2.0.5

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0
  - @projectstorm/react-workspaces-behavior-resize@2.1.2

## 2.0.4

### Patch Changes

- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1
  - @projectstorm/react-workspaces-behavior-resize@2.1.1

## 2.0.3

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-behavior-resize@2.1.0
  - @projectstorm/react-workspaces-core@2.2.0

## 2.0.2

### Patch Changes

- Updated dependencies [136b0a6]
  - @projectstorm/react-workspaces-core@2.1.0
  - @projectstorm/react-workspaces-behavior-resize@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [48951aa]
- Updated dependencies [be7d88c]
  - @projectstorm/react-workspaces-core@2.0.1
  - @projectstorm/react-workspaces-behavior-resize@2.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [d3f7427]
  - @projectstorm/react-workspaces-behavior-resize@2.0.0
  - @projectstorm/react-workspaces-core@2.0.0
