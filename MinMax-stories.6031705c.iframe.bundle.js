"use strict";(self.webpackChunk_projectstorm_react_workspaces_demos=self.webpackChunk_projectstorm_react_workspaces_demos||[]).push([[545],{"./dist/stories/MinMax.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MinMax:()=>MinMax,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js"),_projectstorm_react_workspaces_core__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("../node_modules/.pnpm/typeface-open-sans@1.1.13/node_modules/typeface-open-sans/index.css"),__webpack_require__("../packages/core/dist/index.jsx")),_projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../packages/defaults/dist/index.jsx"),_projectstorm_react_workspaces_model_tabs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../packages/model-tabs/dist/index.jsx"),_helpers_tools__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./dist/stories/helpers/tools.js");const MinMax=function(args){const engine=(0,_helpers_tools__WEBPACK_IMPORTED_MODULE_5__.Kj)(args),[model]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((()=>{let model=new _projectstorm_react_workspaces_core__WEBPACK_IMPORTED_MODULE_2__.fK;model.setHorizontal(!0);const genNode2=()=>{const node=(0,_helpers_tools__WEBPACK_IMPORTED_MODULE_5__.jm)();return node.minimumSize.update({width:50}),node.maximumSize.update({width:250}),node};return model.addModel(genNode2()).addModel((new _projectstorm_react_workspaces_model_tabs__WEBPACK_IMPORTED_MODULE_4__.Gn).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 1")).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 2")).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 3"))).addModel((new _projectstorm_react_workspaces_model_tabs__WEBPACK_IMPORTED_MODULE_4__.Gn).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 4")).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 5")).addModel(new _projectstorm_react_workspaces_defaults__WEBPACK_IMPORTED_MODULE_3__.WQ("Tab 6"))).addModel(genNode2()),model}));return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_helpers_tools__WEBPACK_IMPORTED_MODULE_5__.bM,{model,engine})}.bind(void 0);MinMax.args=_helpers_tools__WEBPACK_IMPORTED_MODULE_5__.LX;const __WEBPACK_DEFAULT_EXPORT__={title:"Workspace",parameters:{layout:"fullscreen"}},__namedExportsOrder=["MinMax"];MinMax.parameters={...MinMax.parameters,docs:{...MinMax.parameters?.docs,source:{originalSource:"function (args) {\n  const engine = useEngine(args);\n  const [model] = useState(() => {\n    let model = new WorkspaceNodeModel();\n    model.setHorizontal(true);\n    const genNode2 = () => {\n      const node = genVerticalNode();\n      node.minimumSize.update({\n        width: 50\n      });\n      node.maximumSize.update({\n        width: 250\n      });\n      return node;\n    };\n    model\n    //left panel\n    .addModel(genNode2())\n    //tab panel\n    .addModel(new WorkspaceTabModel().addModel(new DefaultWorkspacePanelModel('Tab 1')).addModel(new DefaultWorkspacePanelModel('Tab 2')).addModel(new DefaultWorkspacePanelModel('Tab 3')))\n    //tab panel\n    .addModel(new WorkspaceTabModel().addModel(new DefaultWorkspacePanelModel('Tab 4')).addModel(new DefaultWorkspacePanelModel('Tab 5')).addModel(new DefaultWorkspacePanelModel('Tab 6'))).addModel(genNode2());\n    return model;\n  });\n  return React.createElement(CompInternal, {\n    model: model,\n    engine: engine\n  });\n}.bind(this)",...MinMax.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWluTWF4LXN0b3JpZXMuNWFlMmY3MWMuaWZyYW1lLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiK25DQVFPLE1BQU1BLE9BQVMsU0FBVUMsTUFDOUIsTUFBTUMsUUFBU0MsRUFBQUEsNENBQUFBLElBQVVGLE9BQ2xCRyxRQUFTQyxFQUFBQSxtQ0FBQUEsV0FBUyxLQUN2QixJQUFJRCxNQUFRLElBQUlFLGlFQUFBQSxHQUNoQkYsTUFBTUcsZUFBYyxHQUVwQixNQUFNQyxTQUFXQSxLQUNmLE1BQU1DLE1BQU9DLEVBQUFBLDRDQUFBQSxNQU9iLE9BTkFELEtBQUtFLFlBQVlDLE9BQU8sQ0FDdEJDLE1BQU8sS0FFVEosS0FBS0ssWUFBWUYsT0FBTyxDQUN0QkMsTUFBTyxNQUVGSixJQUFJLEVBeUJiLE9BdEJBTCxNQUdHVyxTQUFTUCxZQUdUTyxVQUNDLElBQUlDLHVFQUFBQSxJQUNERCxTQUFTLElBQUlFLHFFQUFBQSxHQUEyQixVQUN4Q0YsU0FBUyxJQUFJRSxxRUFBQUEsR0FBMkIsVUFDeENGLFNBQVMsSUFBSUUscUVBQUFBLEdBQTJCLFdBSTVDRixVQUNDLElBQUlDLHVFQUFBQSxJQUNERCxTQUFTLElBQUlFLHFFQUFBQSxHQUEyQixVQUN4Q0YsU0FBUyxJQUFJRSxxRUFBQUEsR0FBMkIsVUFDeENGLFNBQVMsSUFBSUUscUVBQUFBLEdBQTJCLFdBRzVDRixTQUFTUCxZQUNMSixLQUFLLElBRWQsT0FBT2MsbUNBQUFBLGNBQUNDLDRDQUFBQSxHQUFZLENBQUNmLE1BQWNGLFFBQ3JDLEVBQUVrQixVQUFLLEdBRVBwQixPQUFPQyxLQUFPb0IsNENBQUFBLEdBRWQsa0NBQ0VDLE1BQU8sWUFDUEMsV0FBWSxDQUNWQyxPQUFRLGVBRVhDLG9CQUFBLFdBQUF6QixPQUFBdUIsV0FBQSxJQUFBdkIsT0FBQXVCLFdBQUFHLEtBQUEsSUFBQTFCLE9BQUF1QixZQUFBRyxLQUFBQyxPQUFBLENBQUFDLGVBQUEseS9CQUFBNUIsT0FBQXVCLFlBQUFHLE1BQUFDLFMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AcHJvamVjdHN0b3JtL3JlYWN0LXdvcmtzcGFjZXMtZGVtb3MvLi9zdG9yaWVzL01pbk1heC5zdG9yaWVzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAndHlwZWZhY2Utb3Blbi1zYW5zJztcbmltcG9ydCB7IFdvcmtzcGFjZU5vZGVNb2RlbCB9IGZyb20gJ0Bwcm9qZWN0c3Rvcm0vcmVhY3Qtd29ya3NwYWNlcy1jb3JlJztcbmltcG9ydCB7IERlZmF1bHRXb3Jrc3BhY2VQYW5lbE1vZGVsIH0gZnJvbSAnQHByb2plY3RzdG9ybS9yZWFjdC13b3Jrc3BhY2VzLWRlZmF1bHRzJztcbmltcG9ydCB7IFdvcmtzcGFjZVRhYk1vZGVsIH0gZnJvbSAnQHByb2plY3RzdG9ybS9yZWFjdC13b3Jrc3BhY2VzLW1vZGVsLXRhYnMnO1xuaW1wb3J0IHsgQ29tcEludGVybmFsLCBnZW5WZXJ0aWNhbE5vZGUsIFNoYXJlZEFyZ3MsIHVzZUVuZ2luZSB9IGZyb20gJy4vaGVscGVycy90b29scyc7XG5cbmV4cG9ydCBjb25zdCBNaW5NYXggPSBmdW5jdGlvbiAoYXJncykge1xuICBjb25zdCBlbmdpbmUgPSB1c2VFbmdpbmUoYXJncyk7XG4gIGNvbnN0IFttb2RlbF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgbGV0IG1vZGVsID0gbmV3IFdvcmtzcGFjZU5vZGVNb2RlbCgpO1xuICAgIG1vZGVsLnNldEhvcml6b250YWwodHJ1ZSk7XG5cbiAgICBjb25zdCBnZW5Ob2RlMiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBnZW5WZXJ0aWNhbE5vZGUoKTtcbiAgICAgIG5vZGUubWluaW11bVNpemUudXBkYXRlKHtcbiAgICAgICAgd2lkdGg6IDUwXG4gICAgICB9KTtcbiAgICAgIG5vZGUubWF4aW11bVNpemUudXBkYXRlKHtcbiAgICAgICAgd2lkdGg6IDI1MFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgbW9kZWxcblxuICAgICAgLy9sZWZ0IHBhbmVsXG4gICAgICAuYWRkTW9kZWwoZ2VuTm9kZTIoKSlcblxuICAgICAgLy90YWIgcGFuZWxcbiAgICAgIC5hZGRNb2RlbChcbiAgICAgICAgbmV3IFdvcmtzcGFjZVRhYk1vZGVsKClcbiAgICAgICAgICAuYWRkTW9kZWwobmV3IERlZmF1bHRXb3Jrc3BhY2VQYW5lbE1vZGVsKCdUYWIgMScpKVxuICAgICAgICAgIC5hZGRNb2RlbChuZXcgRGVmYXVsdFdvcmtzcGFjZVBhbmVsTW9kZWwoJ1RhYiAyJykpXG4gICAgICAgICAgLmFkZE1vZGVsKG5ldyBEZWZhdWx0V29ya3NwYWNlUGFuZWxNb2RlbCgnVGFiIDMnKSlcbiAgICAgIClcblxuICAgICAgLy90YWIgcGFuZWxcbiAgICAgIC5hZGRNb2RlbChcbiAgICAgICAgbmV3IFdvcmtzcGFjZVRhYk1vZGVsKClcbiAgICAgICAgICAuYWRkTW9kZWwobmV3IERlZmF1bHRXb3Jrc3BhY2VQYW5lbE1vZGVsKCdUYWIgNCcpKVxuICAgICAgICAgIC5hZGRNb2RlbChuZXcgRGVmYXVsdFdvcmtzcGFjZVBhbmVsTW9kZWwoJ1RhYiA1JykpXG4gICAgICAgICAgLmFkZE1vZGVsKG5ldyBEZWZhdWx0V29ya3NwYWNlUGFuZWxNb2RlbCgnVGFiIDYnKSlcbiAgICAgIClcblxuICAgICAgLmFkZE1vZGVsKGdlbk5vZGUyKCkpO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfSk7XG4gIHJldHVybiA8Q29tcEludGVybmFsIG1vZGVsPXttb2RlbH0gZW5naW5lPXtlbmdpbmV9IC8+O1xufS5iaW5kKHRoaXMpO1xuXG5NaW5NYXguYXJncyA9IFNoYXJlZEFyZ3M7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdXb3Jrc3BhY2UnLFxuICBwYXJhbWV0ZXJzOiB7XG4gICAgbGF5b3V0OiAnZnVsbHNjcmVlbidcbiAgfVxufTtcbiJdLCJuYW1lcyI6WyJNaW5NYXgiLCJhcmdzIiwiZW5naW5lIiwidXNlRW5naW5lIiwibW9kZWwiLCJ1c2VTdGF0ZSIsIldvcmtzcGFjZU5vZGVNb2RlbCIsInNldEhvcml6b250YWwiLCJnZW5Ob2RlMiIsIm5vZGUiLCJnZW5WZXJ0aWNhbE5vZGUiLCJtaW5pbXVtU2l6ZSIsInVwZGF0ZSIsIndpZHRoIiwibWF4aW11bVNpemUiLCJhZGRNb2RlbCIsIldvcmtzcGFjZVRhYk1vZGVsIiwiRGVmYXVsdFdvcmtzcGFjZVBhbmVsTW9kZWwiLCJSZWFjdCIsIkNvbXBJbnRlcm5hbCIsImJpbmQiLCJTaGFyZWRBcmdzIiwidGl0bGUiLCJwYXJhbWV0ZXJzIiwibGF5b3V0IiwiX19uYW1lZEV4cG9ydHNPcmRlciIsImRvY3MiLCJzb3VyY2UiLCJvcmlnaW5hbFNvdXJjZSJdLCJzb3VyY2VSb290IjoiIn0=