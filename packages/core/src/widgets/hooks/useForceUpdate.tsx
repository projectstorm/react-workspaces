import { useState } from 'react';
import * as _ from 'lodash';

export function useForceUpdate(debounce?: boolean) {
	const [value, setValue] = useState(0); // integer state
	return () => {
		if (debounce) {
			return _.debounce(() => {
				setValue((value) => value + 1);
			});
		}
		setValue((value) => value + 1);
	}; // update the state to force render
}
