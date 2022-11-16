import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faCube } from '@fortawesome/free-solid-svg-icons';

library.add(faCube, faCopy);

export * from './tray/DefaultTrayFactory';

export * from './panel/DefaultWorkspacePanelModel';
export * from './panel/DefaultWorkspacePanelFactory';

export * from './window/DefaultWindowModelFactory';

export * from './DefaultSubComponentRenderer';
