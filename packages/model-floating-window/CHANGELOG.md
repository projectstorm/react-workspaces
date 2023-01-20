# @projectstorm/react-workspaces-model-floating-window

## 2.1.2

### Patch Changes

- Updated dependencies [3945d18]
  - @projectstorm/react-workspaces-core@2.4.0

## 2.1.1

### Patch Changes

- 2aa5082: - Trays now work with floating windows a lot better
  - Windows now correctly setup their children if passed via constructor
  - added close icon to default panel sub rendering

## 2.1.0

### Minor Changes

- d01ffa3: - floating windows can now sub render title bars for their children
  - we now serialize the tray icon position

## 2.0.6

### Patch Changes

- Updated dependencies [c5f49ec]
  - @projectstorm/react-workspaces-core@2.3.0

## 2.0.5

### Patch Changes

- fa6ae0f: - tray now works correctly when shrunk in an ExpandParentNode
  - deserialization of the ExpandParentNode doesnt force initial recomputation of children if they have widths and heights set already
- Updated dependencies [fa6ae0f]
  - @projectstorm/react-workspaces-core@2.2.1

## 2.0.4

### Patch Changes

- 75365b9: Fixed an issues with deserialization of floating windows on the root model when the initial serialization payload was wrong (would effect legacy models prior to v2)

## 2.0.3

### Patch Changes

- Updated dependencies [8b3f970]
  - @projectstorm/react-workspaces-core@2.2.0

## 2.0.2

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
