import * as React from 'react';
import { storiesOf } from '@storybook/react';
import host = require('storybook-host');
import { Demo1 } from './Demo1';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

storiesOf('Workspaces', module)
	.addDecorator(
		host.host({
			height: '100%',
			width: '100%'
		})
	)
	.add('Workspace', () => {
		return <Demo1 />;
	});
