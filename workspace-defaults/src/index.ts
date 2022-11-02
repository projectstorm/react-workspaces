import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faCube } from '@fortawesome/free-solid-svg-icons';

library.add(faCube, faCopy);

export * from './DefaultTrayFactory';
export * from './DefaultWorkspacePanelFactory';
export * from './DefaultWorkspacePanelModel';

export * from './widgets/DefaultPanelContentWidget';
export * from './widgets/DefaultPanelMicroButtonWidget';
export * from './widgets/DefaultPanelTabWidget';
export * from './widgets/DefaultPanelTabWidget';

export * from './layers/dropzone/DropZoneLayer';

export * from './behavior/draggingItemBehavior';
