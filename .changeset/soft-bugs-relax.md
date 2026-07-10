---
'@projectstorm/react-workspaces-core': patch
'@projectstorm/react-workspaces-model-floating-window': patch
'@projectstorm/react-workspaces-model-tray': patch
---

Move the content of floating tray windows, rather than the window shell, when dropping them into another collection. Release tray ownership first to prevent stale layout state during tray-to-tab drops.
