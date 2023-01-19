import { library } from '@fortawesome/fontawesome-svg-core';
import { faCube, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faCube, faTimes);

export * from './tray/DefaultTrayFactory';

export * from './panel/DefaultWorkspacePanelModel';
export * from './panel/DefaultWorkspacePanelFactory';

export * from './window/DefaultWindowModelFactory';

export * from './DefaultSubComponentRenderer';
