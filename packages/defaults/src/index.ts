import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faCube } from '@fortawesome/free-solid-svg-icons';

library.add(faCube, faCopy);

export * from './DefaultWorkspacePanelModel';
export * from './DefaultWorkspacePanelFactory';
export * from './DefaultTrayFactory';
