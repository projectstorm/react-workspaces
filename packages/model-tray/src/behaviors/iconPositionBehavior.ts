import { TrayIconPosition, WorkspaceTrayModel } from '../WorkspaceTrayModel';
import { Alignment } from '@projectstorm/react-workspaces-core';

/**
 * Updates the position of the icon bar position given the trays affinity to a side of the screen
 * @param model
 */
export const setupIconPositionBehavior = (model: WorkspaceTrayModel) => {
  const setupPositioning = () => {
    const parent = model.getRootModel();
    if (parent.r_dimensions.size.width === 0) {
      return;
    }
    if (model.r_dimensions.isAligned(parent.r_dimensions, Alignment.LEFT)) {
      model.setIconPosition(TrayIconPosition.LEFT);
    } else {
      model.setIconPosition(TrayIconPosition.RIGHT);
    }
  };
  model.waitForInitialRenderedSize().then((dims) => {
    const parent = model.getRootModel();
    parent.r_dimensions.invalidate(true);
    setupPositioning();
  });
  model.r_dimensions.registerListener({
    updated: () => {
      setupPositioning();
    }
  });
};
