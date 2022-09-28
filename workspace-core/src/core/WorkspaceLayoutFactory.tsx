import * as React from 'react';
import { GenerateEvent, WorkspaceFactory } from './WorkspaceFactory';
import { WorkspaceCollectionModel } from '../core-models/WorkspaceCollectionModel';

export abstract class WorkspaceLayoutFactory<
	T extends WorkspaceCollectionModel = WorkspaceCollectionModel
> extends WorkspaceFactory<T> {
	abstract generateLayout(event: GenerateEvent<T>): JSX.Element;
}
