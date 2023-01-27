# @projectstorm/react-workspaces-core

## 2.5.0

### Minor Changes

- a810a3e: - [Added] Factories now emit events when models are created
  - [changed] Factories now have a protected `_generateModel()` event which should be implemented instead of the `generateModel()` event
  - [Added] `setLocked()` method on the engine which prevents dragging across all `<Draggable>` widgets
  - [Added] `installEngineLockListener: boolean` to the tray factory options, which when enabled, will also prevent windows from being moved when locks are enabled
  - [maintenance] Bumped all package dependencies
  - [Added] `setupTrayWindowDragLockBehavior()` helper utility
  - [Added] `setDraggable()` method on floating windows allowing the window to control whether it can be moved or not.

## 2.4.0

### Minor Changes

- 3945d18: - new method to waiting for initial rendering of any model
  - new parameter to immediately run DimensionContainer invalidation
  - fixed bug with determining if something left aligned by now checking parent container
  - useResizeObserver now invalidates its hooks based off the dimension container
  - trays now use their children and how they render to determine initial expand width
  - tray icons now set their positioning correctly on boot (immediately)

## 2.3.0

### Minor Changes

- c5f49ec: - Tray models can now set their icon bar alignment
  - New behavior for having trays listen to the root model to adjust the alignment automatically
  - changes to the relative positioning APIs to be more clear in terms of what they do, and how they should be used relative to other positions

## 2.2.1

### Patch Changes

- fa6ae0f: - tray now works correctly when shrunk in an ExpandParentNode
  - deserialization of the ExpandParentNode doesnt force initial recomputation of children if they have widths and heights set already

## 2.2.0

### Minor Changes

- 8b3f970: - Tab sub-rendering now gets an event object with access to the parent model
  - Fixes some React attribute warnings
  - New demo for switching models
  - Refactored some internal hooks around as some hooks were incorrectly being registered
  - Layers should be absolutely positioned lol

## 2.1.0

### Minor Changes

- 136b0a6: Theme support for all the internal widgets and behaviors

## 2.0.1

### Patch Changes

- 48951aa: Padding on the root widget will now work correctly with all descendant widgets
- be7d88c: - Added serialization to the various models
  - Improved the defaults of the transform zone functions
  - some consistency things

## 2.0.0

### Major Changes

- d3f7427: Version 2.0 release
