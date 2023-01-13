---
'@projectstorm/react-workspaces-core': patch
'@projectstorm/react-workspaces-model-floating-window': patch
'@projectstorm/react-workspaces-model-tray': patch
---

- tray now works correctly when shrunk in an ExpandParentNode
- deserialization of the ExpandParentNode doesnt force initial recomputation of children if they have widths and heights set already
