(this["webpackJsonpplanificador-frontend"]=this["webpackJsonpplanificador-frontend"]||[]).push([[51],{140:function(n,t,e){"use strict";e.r(t),e.d(t,"KEYBOARD_DID_CLOSE",(function(){return r})),e.d(t,"KEYBOARD_DID_OPEN",(function(){return i})),e.d(t,"copyVisualViewport",(function(){return l})),e.d(t,"keyboardDidClose",(function(){return g})),e.d(t,"keyboardDidOpen",(function(){return p})),e.d(t,"keyboardDidResize",(function(){return b})),e.d(t,"resetKeyboardAssist",(function(){return a})),e.d(t,"setKeyboardClose",(function(){return h})),e.d(t,"setKeyboardOpen",(function(){return c})),e.d(t,"startKeyboardAssist",(function(){return f})),e.d(t,"trackViewportChanges",(function(){return y}));var i="ionKeyboardDidShow",r="ionKeyboardDidHide",o={},u={},d=!1,a=function(){o={},u={},d=!1},f=function(n){s(n),n.visualViewport&&(u=l(n.visualViewport),n.visualViewport.onresize=function(){y(n),p()||b(n)?c(n):g(n)&&h(n)})},s=function(n){n.addEventListener("keyboardDidShow",(function(t){return c(n,t)})),n.addEventListener("keyboardDidHide",(function(){return h(n)}))},c=function(n,t){w(n,t),d=!0},h=function(n){v(n),d=!1},p=function(){var n=(o.height-u.height)*u.scale;return!d&&o.width===u.width&&n>150},b=function(n){return d&&!g(n)},g=function(n){return d&&u.height===n.innerHeight},w=function(n,t){var e=t?t.keyboardHeight:n.innerHeight-u.height,r=new CustomEvent(i,{detail:{keyboardHeight:e}});n.dispatchEvent(r)},v=function(n){var t=new CustomEvent(r);n.dispatchEvent(t)},y=function(n){o=Object.assign({},u),u=l(n.visualViewport)},l=function(n){return{width:Math.round(n.width),height:Math.round(n.height),offsetTop:n.offsetTop,offsetLeft:n.offsetLeft,pageTop:n.pageTop,pageLeft:n.pageLeft,scale:n.scale}}}}]);
//# sourceMappingURL=51.53e2d62b.chunk.js.map