import { TrayIconPosition, WorkspaceTrayModel } from './WorkspaceTrayModel';
import { Alignment } from '@projectstorm/react-workspaces-core';

/**
 * Updates the position of the icon bar position given the trays affinity to a side of the screen
 * @param model
 */
export const setupIconPositionBehavior = (model: WorkspaceTrayModel) => {
  return model.r_dimensions.position.registerListener({
    updated: () => {
      const parent = model.getRootModel();
      if (!parent) {
        return;
      }
      if (model.r_dimensions.isAligned(parent.r_dimensions, Alignment.LEFT)) {
        model.setIconPosition(TrayIconPosition.LEFT);
      } else {
        model.setIconPosition(TrayIconPosition.RIGHT);
      }
    }
  });
};
