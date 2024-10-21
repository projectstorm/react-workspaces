import { ExpandNodeModel } from './ExpandNodeModel';
import { WorkspaceEngine } from '../../core/WorkspaceEngine';

export interface OverConstrainRecomputeBehaviorOptions {
  engine: WorkspaceEngine;
}

export const overConstrainRecomputeBehavior = (options: OverConstrainRecomputeBehaviorOptions) => {
  const { engine } = options;

  let l1: () => any;
  let l2 = engine.registerListener({
    layoutInvalidated: () => {
      l1?.();
      let listeners = engine.rootModel
        .flatten()
        .filter((m) => m instanceof ExpandNodeModel)
        .map((m: ExpandNodeModel) => {
          return m.registerListener({
            overConstrainedChanged: () => {
              if (m.r_overConstrained) {
                m.recomputeSizes();
              }
            }
          });
        });
      l1 = () => {
        listeners.forEach((l) => l());
      };
    }
  });

  return () => {
    l1?.();
    l2();
  };
};
