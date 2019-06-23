import * as React from "react";
import { storiesOf } from "@storybook/react";
import host = require('storybook-host');
import {Demo1} from "./Demo1";

require("./test.scss");
require("../node_modules/font-awesome/scss/font-awesome.scss");

storiesOf("Workspaces", module)
	.addDecorator(host.host({
		height: '100%',
		width: '100%',
	}))
	.add("Workspace", () => {
		return <Demo1 />
	});
