# @projectstorm/react-workspaces-model-tray

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
