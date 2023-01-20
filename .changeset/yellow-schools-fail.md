---
'@projectstorm/react-workspaces-core': minor
'@projectstorm/react-workspaces-model-tray': minor
---

- new method to waiting for initial rendering of any model
- new parameter to immediately run DimensionContainer invalidation
- fixed bug with determining if something left aligned by now checking parent container
- useResizeObserver now invalidates its hooks based off the dimension container
- trays now use their children and how they render to determine initial expand width
- tray icons now set their positioning correctly on boot (immediately)
