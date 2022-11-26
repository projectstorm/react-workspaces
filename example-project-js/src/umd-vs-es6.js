/*
  Webpack will prioritise the "module" directive in the package.json (which is correct)
  but React Workspaces also provides a UMD module ("main" in the package.json). Below you will see this in action
  as we import from the different types
 */

// ES6 (uses the module directive)
import { Alignment } from '@projectstorm/react-workspaces-core';

// UMD
import * as storm_react_workspaces_1 from '@projectstorm/react-workspaces-core/dist/index.umd';

// old require syntax
const storm_react_workspaces_2 = require('@projectstorm/react-workspaces-core/dist/index.umd');

//compare all types will output 'top top top' in the console
console.log(Alignment.TOP, storm_react_workspaces_1.Alignment.TOP, storm_react_workspaces_2.Alignment.TOP);
