# @projectstorm/react-workspaces-defaults

## 2.3.9

### Patch Changes

- Updated dependencies [0d850e7]
  - @projectstorm/react-workspaces-model-tabs@2.3.3
  - @projectstorm/react-workspaces-core@2.8.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.6
  - @projectstorm/react-workspaces-model-tray@2.5.4

## 2.3.8

### Patch Changes

- Updated dependencies [43ca635]
  - @projectstorm/react-workspaces-model-tabs@2.3.2

## 2.3.7

### Patch Changes

- 2362161: Added the ability to set the initial zIndex of the layer manager
- Updated dependencies [2362161]
  - @projectstorm/react-workspaces-core@2.8.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.5
  - @projectstorm/react-workspaces-model-tabs@2.3.1
  - @projectstorm/react-workspaces-model-tray@2.5.3

## 2.3.6

### Patch Changes

- Updated dependencies [9acdc10]
  - @projectstorm/react-workspaces-model-tabs@2.3.0

## 2.3.5

### Patch Changes

- a4afcbe: more fixes to sizing and trays
- Updated dependencies [a4afcbe]
  - @projectstorm/react-workspaces-model-tray@2.5.2
  - @projectstorm/react-workspaces-core@2.7.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.4
  - @projectstorm/react-workspaces-model-tabs@2.2.4

## 2.3.4

### Patch Changes

- Updated dependencies [e96fb83]
  - @projectstorm/react-workspaces-model-tray@2.5.1

## 2.3.3

### Patch Changes

- Updated dependencies [a32d183]
  - @projectstorm/react-workspaces-model-tray@2.5.0
  - @projectstorm/react-workspaces-core@2.7.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.3
  - @projectstorm/react-workspaces-model-tabs@2.2.3

## 2.3.2

### Patch Changes

- c7a4537: upgrade dependencies
- Updated dependencies [515640e]
- Updated dependencies [c7a4537]
  - @projectstorm/react-workspaces-core@2.6.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.2
  - @projectstorm/react-workspaces-model-tabs@2.2.2
  - @projectstorm/react-workspaces-model-tray@2.4.2

## 2.3.1

### Patch Changes

- eeab809: Fixed a rare case where turning panels into a tray and then dragging them out again, would cause state issues
- Updated dependencies [eeab809]
  - @projectstorm/react-workspaces-core@2.5.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.1
  - @projectstorm/react-workspaces-model-tabs@2.2.1
  - @projectstorm/react-workspaces-model-tray@2.4.1

## 2.3.0

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
  - @projectstorm/react-workspaces-model-floating-window@2.2.0
  - @projectstorm/react-workspaces-model-tabs@2.2.0
  - @projectstorm/react-workspaces-model-tray@2.4.0
  - @projectstorm/react-workspaces-core@2.5.0

## 2.2.3

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0
  - @projectstorm/react-workspaces-model-tray@2.3.0
  - @projectstorm/react-workspaces-model-floating-window@2.1.2
  - @projectstorm/react-workspaces-model-tabs@2.1.3

## 2.2.2

### Patch Changes

- Updated dependencies [68938c1]
  - @projectstorm/react-workspaces-model-tray@2.2.2

## 2.2.1

### Patch Changes

- 2aa5082: - Trays now work with floating windows a lot better
  - Windows now correctly setup their children if passed via constructor
  - added close icon to default panel sub rendering
- Updated dependencies [2aa5082]
  - @projectstorm/react-workspaces-model-floating-window@2.1.1
  - @projectstorm/react-workspaces-model-tray@2.2.1

## 2.2.0

### Minor Changes

- d01ffa3: - floating windows can now sub render title bars for their children
  - we now serialize the tray icon position

### Patch Changes

- Updated dependencies [d01ffa3]
  - @projectstorm/react-workspaces-model-floating-window@2.1.0
  - @projectstorm/react-workspaces-model-tray@2.2.0

## 2.1.4

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0
  - @projectstorm/react-workspaces-model-tray@2.1.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.6
  - @projectstorm/react-workspaces-model-tabs@2.1.2

## 2.1.3

### Patch Changes

- Updated dependencies [444c988]
  - @projectstorm/react-workspaces-model-tray@2.0.6

## 2.1.2

### Patch Changes

- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1
  - @projectstorm/react-workspaces-model-floating-window@2.0.5
  - @projectstorm/react-workspaces-model-tray@2.0.5
  - @projectstorm/react-workspaces-model-tabs@2.1.1

## 2.1.1

### Patch Changes

- Updated dependencies [75365b9]
  - @projectstorm/react-workspaces-model-floating-window@2.0.4
  - @projectstorm/react-workspaces-model-tray@2.0.4

## 2.1.0

### Minor Changes

- 8b3f970: - Tab sub-rendering now gets an event object with access to the parent model
  - Fixes some React attribute warnings
  - New demo for switching models
  - Refactored some internal hooks around as some hooks were incorrectly being registered
  - Layers should be absolutely positioned lol

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-core@2.2.0
  - @projectstorm/react-workspaces-model-tabs@2.1.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.3
  - @projectstorm/react-workspaces-model-tray@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [136b0a6]
  - @projectstorm/react-workspaces-core@2.1.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.2
  - @projectstorm/react-workspaces-model-tabs@2.0.2
  - @projectstorm/react-workspaces-model-tray@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [48951aa]
- Updated dependencies [be7d88c]
  - @projectstorm/react-workspaces-core@2.0.1
  - @projectstorm/react-workspaces-model-tray@2.0.1
  - @projectstorm/react-workspaces-model-floating-window@2.0.1
  - @projectstorm/react-workspaces-model-tabs@2.0.1

## 2.0.0

### Major Changes

- d3f7427: Version 2.0 release

### Patch Changes

- Updated dependencies [d3f7427]
  - @projectstorm/react-workspaces-core@2.0.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.0
  - @projectstorm/react-workspaces-model-tabs@2.0.0
  - @projectstorm/react-workspaces-model-tray@2.0.0
