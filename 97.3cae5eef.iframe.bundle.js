"use strict";(self.webpackChunk_projectstorm_react_workspaces_demos=self.webpackChunk_projectstorm_react_workspaces_demos||[]).push([[97],{"../node_modules/.pnpm/@storybook+react-dom-shim@8.4.5_react-dom@18.3.1_react@18.3.1__react@18.3.1_storybook@8.4.5_prettier@3.4.1_/node_modules/@storybook/react-dom-shim/dist/react-18.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{renderElement:()=>renderElement,unmountElement:()=>unmountElement});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js"),react_dom_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js"),nodes=new Map;var WithCallback=({callback,children})=>{let once=react__WEBPACK_IMPORTED_MODULE_0__.useRef();return react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect((()=>{once.current!==callback&&(once.current=callback,callback())}),[callback]),children};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let resolve=null,reject=null;return{promise:new Promise(((res,rej)=>{resolve=res,reject=rej})),resolve,reject}});var renderElement=async(node,el,rootOptions)=>{let root=await getReactRoot(el,rootOptions);if(function getIsReactActEnvironment(){return globalThis.IS_REACT_ACT_ENVIRONMENT}())return void root.render(node);let{promise,resolve}=Promise.withResolvers();return root.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(WithCallback,{callback:resolve},node)),promise},unmountElement=(el,shouldUseNewRootApi)=>{let root=nodes.get(el);root&&(root.unmount(),nodes.delete(el))},getReactRoot=async(el,rootOptions)=>{let root=nodes.get(el);return root||(root=react_dom_client__WEBPACK_IMPORTED_MODULE_1__.H(el,rootOptions),nodes.set(el,root)),root}},"../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js":(__unused_webpack_module,exports,__webpack_require__)=>{var m=__webpack_require__("../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js");exports.H=m.createRoot,m.hydrateRoot}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTcuNGY4ZTMwZmQuaWZyYW1lLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoia3hCQUdJQSxNQUFNLElBQUlDLElBQW1GLElBQUlDLGFBQWEsRUFBRUMsU0FBU0MsYUFBYSxJQUFJQyxLQUFLLDRDQUFlLE9BQU8sb0RBQXNCLEtBQUtBLEtBQUtDLFVBQVVILFdBQVdFLEtBQUtDLFFBQVFILFNBQVNBLFdBQVcsR0FBRyxDQUFDQSxXQUFXQyxpQkFBaUJHLFFBQVFDLGNBQWMsTUFBTUQsUUFBUUMsY0FBYyxLQUFLLElBQUlDLFFBQVEsS0FBS0MsT0FBTyxLQUFLLE1BQU8sQ0FBQ0MsUUFBUSxJQUFJSixTQUFRLENBQUNLLElBQUlDLE9BQU9KLFFBQVFHLElBQUlGLE9BQU9HLEdBQUcsSUFBSUosUUFBUUMsT0FBTSxHQUFJLElBQUlJLGNBQWNDLE1BQU1DLEtBQUtDLEdBQUdDLGVBQWUsSUFBSUMsV0FBV0MsYUFBYUgsR0FBR0MsYUFBYSxHQUFoaEIsU0FBU0csMkJBQTJCLE9BQU9DLFdBQVdDLHdCQUF3QixDQUFxY0YsR0FBOEMsWUFBbEJGLEtBQUtLLE9BQU9SLE1BQWEsSUFBRyxRQUFRLFNBQVVULFFBQVFDLGdCQUFnQixPQUFPVyxLQUFLSyxPQUFPLGlEQUFvQnRCLGFBQWEsQ0FBQ0MsU0FBU00sU0FBU08sT0FBT0wsU0FBU2MsZUFBZSxDQUFDUixHQUFHUyx1QkFBdUIsSUFBSVAsS0FBS25CLE1BQU0yQixJQUFJVixJQUFJRSxPQUFPQSxLQUFLUyxVQUFVNUIsTUFBTTZCLE9BQU9aLElBQUksRUFBR0csYUFBYUwsTUFBTUUsR0FBR0MsZUFBZSxJQUFJQyxLQUFLbkIsTUFBTTJCLElBQUlWLElBQUksT0FBT0UsT0FBT0EsS0FBSyxnREFBb0JGLEdBQUdDLGFBQWFsQixNQUFNOEIsSUFBSWIsR0FBR0UsT0FBT0EsSyxxSkNENThCWSxFQUFJLG9CQUFRLHVGQUVkQyxRQUFRLEVBQWFELEVBQUVFLFdBQ0RGLEVBQUVHLFciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AcHJvamVjdHN0b3JtL3JlYWN0LXdvcmtzcGFjZXMtZGVtb3MvLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzdG9yeWJvb2srcmVhY3QtZG9tLXNoaW1AOC40LjVfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMV9zdG9yeWJvb2tAOC40LjVfcHJldHRpZXJAMy40LjFfL25vZGVfbW9kdWxlcy9Ac3Rvcnlib29rL3JlYWN0LWRvbS1zaGltL2Rpc3QvcmVhY3QtMTgubWpzIiwid2VicGFjazovL0Bwcm9qZWN0c3Rvcm0vcmVhY3Qtd29ya3NwYWNlcy1kZW1vcy8uLi9ub2RlX21vZHVsZXMvLnBucG0vcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjEvbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XG5cbnZhciBub2Rlcz1uZXcgTWFwO2Z1bmN0aW9uIGdldElzUmVhY3RBY3RFbnZpcm9ubWVudCgpe3JldHVybiBnbG9iYWxUaGlzLklTX1JFQUNUX0FDVF9FTlZJUk9OTUVOVH12YXIgV2l0aENhbGxiYWNrPSh7Y2FsbGJhY2ssY2hpbGRyZW59KT0+e2xldCBvbmNlPVJlYWN0LnVzZVJlZigpO3JldHVybiBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCk9PntvbmNlLmN1cnJlbnQhPT1jYWxsYmFjayYmKG9uY2UuY3VycmVudD1jYWxsYmFjayxjYWxsYmFjaygpKTt9LFtjYWxsYmFja10pLGNoaWxkcmVufTt0eXBlb2YgUHJvbWlzZS53aXRoUmVzb2x2ZXJzPlwidVwiJiYoUHJvbWlzZS53aXRoUmVzb2x2ZXJzPSgpPT57bGV0IHJlc29sdmU9bnVsbCxyZWplY3Q9bnVsbDtyZXR1cm4ge3Byb21pc2U6bmV3IFByb21pc2UoKHJlcyxyZWopPT57cmVzb2x2ZT1yZXMscmVqZWN0PXJlajt9KSxyZXNvbHZlLHJlamVjdH19KTt2YXIgcmVuZGVyRWxlbWVudD1hc3luYyhub2RlLGVsLHJvb3RPcHRpb25zKT0+e2xldCByb290PWF3YWl0IGdldFJlYWN0Um9vdChlbCxyb290T3B0aW9ucyk7aWYoZ2V0SXNSZWFjdEFjdEVudmlyb25tZW50KCkpe3Jvb3QucmVuZGVyKG5vZGUpO3JldHVybn1sZXR7cHJvbWlzZSxyZXNvbHZlfT1Qcm9taXNlLndpdGhSZXNvbHZlcnMoKTtyZXR1cm4gcm9vdC5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChXaXRoQ2FsbGJhY2sse2NhbGxiYWNrOnJlc29sdmV9LG5vZGUpKSxwcm9taXNlfSx1bm1vdW50RWxlbWVudD0oZWwsc2hvdWxkVXNlTmV3Um9vdEFwaSk9PntsZXQgcm9vdD1ub2Rlcy5nZXQoZWwpO3Jvb3QmJihyb290LnVubW91bnQoKSxub2Rlcy5kZWxldGUoZWwpKTt9LGdldFJlYWN0Um9vdD1hc3luYyhlbCxyb290T3B0aW9ucyk9PntsZXQgcm9vdD1ub2Rlcy5nZXQoZWwpO3JldHVybiByb290fHwocm9vdD1SZWFjdERPTS5jcmVhdGVSb290KGVsLHJvb3RPcHRpb25zKSxub2Rlcy5zZXQoZWwscm9vdCkpLHJvb3R9O1xuXG5leHBvcnQgeyByZW5kZXJFbGVtZW50LCB1bm1vdW50RWxlbWVudCB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgZXhwb3J0cy5jcmVhdGVSb290ID0gbS5jcmVhdGVSb290O1xuICBleHBvcnRzLmh5ZHJhdGVSb290ID0gbS5oeWRyYXRlUm9vdDtcbn0gZWxzZSB7XG4gIHZhciBpID0gbS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDtcbiAgZXhwb3J0cy5jcmVhdGVSb290ID0gZnVuY3Rpb24oYywgbykge1xuICAgIGkudXNpbmdDbGllbnRFbnRyeVBvaW50ID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG0uY3JlYXRlUm9vdChjLCBvKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG4gIGV4cG9ydHMuaHlkcmF0ZVJvb3QgPSBmdW5jdGlvbihjLCBoLCBvKSB7XG4gICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbS5oeWRyYXRlUm9vdChjLCBoLCBvKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOlsibm9kZXMiLCJNYXAiLCJXaXRoQ2FsbGJhY2siLCJjYWxsYmFjayIsImNoaWxkcmVuIiwib25jZSIsImN1cnJlbnQiLCJQcm9taXNlIiwid2l0aFJlc29sdmVycyIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlIiwicmVzIiwicmVqIiwicmVuZGVyRWxlbWVudCIsImFzeW5jIiwibm9kZSIsImVsIiwicm9vdE9wdGlvbnMiLCJyb290IiwiZ2V0UmVhY3RSb290IiwiZ2V0SXNSZWFjdEFjdEVudmlyb25tZW50IiwiZ2xvYmFsVGhpcyIsIklTX1JFQUNUX0FDVF9FTlZJUk9OTUVOVCIsInJlbmRlciIsInVubW91bnRFbGVtZW50Iiwic2hvdWxkVXNlTmV3Um9vdEFwaSIsImdldCIsInVubW91bnQiLCJkZWxldGUiLCJzZXQiLCJtIiwiZXhwb3J0cyIsImNyZWF0ZVJvb3QiLCJoeWRyYXRlUm9vdCJdLCJzb3VyY2VSb290IjoiIn0=