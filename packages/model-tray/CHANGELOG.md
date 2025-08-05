# @projectstorm/react-workspaces-model-tray

## 2.5.11

### Patch Changes

- d43f0cd: Bumped all dependencies
- Updated dependencies [d43f0cd]
  - @projectstorm/react-workspaces-model-floating-window@2.2.13
  - @projectstorm/react-workspaces-core@4.2.2

## 2.5.10

### Patch Changes

- Updated dependencies [40afac4]
  - @projectstorm/react-workspaces-core@4.2.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.12

## 2.5.9

### Patch Changes

- Updated dependencies [4ff721f]
  - @projectstorm/react-workspaces-core@4.2.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.11

## 2.5.8

### Patch Changes

- Updated dependencies [fbdb1d5]
  - @projectstorm/react-workspaces-core@4.1.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.10

## 2.5.7

### Patch Changes

- Updated dependencies [845b677]
  - @projectstorm/react-workspaces-core@4.1.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.9

## 2.5.6

### Patch Changes

- Updated dependencies [08103ef]
- Updated dependencies [5a976f8]
  - @projectstorm/react-workspaces-core@4.0.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.8

## 2.5.5

### Patch Changes

- 8273b13: - Fixed dragging panels sometimes causing a resize deadlock
  - Reworked the logic for computing initial sizes when there are muliple expanding panels in a group
  - Bumped all dependencies
- Updated dependencies [8273b13]
  - @projectstorm/react-workspaces-core@3.0.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.7

## 2.5.4

### Patch Changes

- Updated dependencies [0d850e7]
  - @projectstorm/react-workspaces-core@2.8.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.6

## 2.5.3

### Patch Changes

- 2362161: Added the ability to set the initial zIndex of the layer manager
- Updated dependencies [2362161]
  - @projectstorm/react-workspaces-core@2.8.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.5

## 2.5.2

### Patch Changes

- a4afcbe: more fixes to sizing and trays
- Updated dependencies [a4afcbe]
  - @projectstorm/react-workspaces-core@2.7.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.4

## 2.5.1

### Patch Changes

- e96fb83: small min-width fix for trays

## 2.5.0

### Minor Changes

- a32d183: add support for divider hover and active colors, and fix overflow scroll issues with expanded tray widgets

### Patch Changes

- Updated dependencies [a32d183]
  - @projectstorm/react-workspaces-core@2.7.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.3

## 2.4.2

### Patch Changes

- c7a4537: upgrade dependencies
- Updated dependencies [515640e]
- Updated dependencies [c7a4537]
  - @projectstorm/react-workspaces-core@2.6.0
  - @projectstorm/react-workspaces-model-floating-window@2.2.2

## 2.4.1

### Patch Changes

- Updated dependencies [eeab809]
  - @projectstorm/react-workspaces-core@2.5.1
  - @projectstorm/react-workspaces-model-floating-window@2.2.1

## 2.4.0

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
  - @projectstorm/react-workspaces-core@2.5.0

## 2.3.0

### Minor Changes

- 3945d18: - new method to waiting for initial rendering of any model
  - new parameter to immediately run DimensionContainer invalidation
  - fixed bug with determining if something left aligned by now checking parent container
  - useResizeObserver now invalidates its hooks based off the dimension container
  - trays now use their children and how they render to determine initial expand width
  - tray icons now set their positioning correctly on boot (immediately)

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0
  - @projectstorm/react-workspaces-model-floating-window@2.1.2

## 2.2.2

### Patch Changes

- 68938c1: Fixed issue with tray expanding and null pointers

## 2.2.1

### Patch Changes

- 2aa5082: - Trays now work with floating windows a lot better
  - Windows now correctly setup their children if passed via constructor
  - added close icon to default panel sub rendering
- Updated dependencies [2aa5082]
  - @projectstorm/react-workspaces-model-floating-window@2.1.1

## 2.2.0

### Minor Changes

- d01ffa3: - floating windows can now sub render title bars for their children
  - we now serialize the tray icon position

### Patch Changes

- Updated dependencies [d01ffa3]
  - @projectstorm/react-workspaces-model-floating-window@2.1.0

## 2.1.0

### Minor Changes

- c5f49ec: - Tray models can now set their icon bar alignment
  - New behavior for having trays listen to the root model to adjust the alignment automatically
  - changes to the relative positioning APIs to be more clear in terms of what they do, and how they should be used relative to other positions

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.6

## 2.0.6

### Patch Changes

- 444c988: Fix floating window positioning when tray was left aligned to the root workspace model

## 2.0.5

### Patch Changes

- fa6ae0f: - tray now works correctly when shrunk in an ExpandParentNode
  - deserialization of the ExpandParentNode doesnt force initial recomputation of children if they have widths and heights set already
- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1
  - @projectstorm/react-workspaces-model-floating-window@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [75365b9]
  - @projectstorm/react-workspaces-model-floating-window@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-core@2.2.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [136b0a6]
  - @projectstorm/react-workspaces-core@2.1.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.2

## 2.0.1

### Patch Changes

- 48951aa: Padding on the root widget will now work correctly with all descendant widgets
- be7d88c: - Added serialization to the various models
  - Improved the defaults of the transform zone functions
  - some consistency things
- Updated dependencies [48951aa]
- Updated dependencies [be7d88c]
  - @projectstorm/react-workspaces-core@2.0.1
  - @projectstorm/react-workspaces-model-floating-window@2.0.1

## 2.0.0

### Major Changes

- d3f7427: Version 2.0 release

### Patch Changes

- Updated dependencies [d3f7427]
  - @projectstorm/react-workspaces-core@2.0.0
  - @projectstorm/react-workspaces-model-floating-window@2.0.0
