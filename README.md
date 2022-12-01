# STORM React Workspaces

[![Join the chat at https://gitter.im/projectstorm/react-workspaces](https://badges.gitter.im/projectstorm/react-workspaces.svg)](https://gitter.im/projectstorm/react-workspaces?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://img.shields.io/npm/v/@projectstorm/react-workspaces-core.svg)](https://npmjs.org/package/@projectstorm/react-workspaces-core)
[![NPM](https://img.shields.io/npm/dt/@projectstorm/react-workspaces-core.svg)](https://npmjs.org/package/@projectstorm/react-workspaces-core)
[![Build](https://github.com/projectstorm/react-workspaces/actions/workflows/test.yml/badge.svg)](https://github.com/projectstorm/react-workspaces/actions/workflows/test.yml)

__DEMO__: http://projectstorm.cloud/react-workspaces

A React library which provides a complete workspace management system to power ambitious web apps.

## Features

* Pluggable model and behavior system, implemented as a monorepo with separate npm packages
* Fully native drag and drop (even across multiple browser windows)
* Resizable everything, including split panels and floating windows
* Drop-zones which transform panels into other models (such as trays and tabs)
* Useful (and customizable) models out of the box (tab groups, tray groups, floating windows)
* Performant rendering system, only re-render what is actively changing (on-top of what the React fibre engine already provides)
* Tree based, event driven models (all changes to the model can be observed with listeners)
* Layer based, with all interaction controls such as resize dividers and controls implemented as top-level layers
* Complete debug system, to draw all hidden controls and show reported panel sizes
* Written in TS with exported types in published packages

---

![Demo1](./images/screenshot1.png)

![Demo1](./images/animated1.gif)

## Usage

* Take a look at the demos URL as well as the demo folder (docs will follow soon)
* There is also an example project folder, which shows bare-bones (native JS) of the library
