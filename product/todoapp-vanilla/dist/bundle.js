(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),ActionCreator=function(){function e(t){_classCallCheck(this,e),this.dispatcher=t}return _createClass(e,[{key:"changeFilter",value:function(e){this.dispatcher.emit("changeFilter",{hash:e})}},{key:"addTodo",value:function(e){this.dispatcher.emit("addTodo",{todo:e})}},{key:"editTodo",value:function(e){this.dispatcher.emit("editTodo",{todo:e})}},{key:"deleteTodo",value:function(e){this.dispatcher.emit("deleteTodo",{todo:e})}},{key:"changeAllTodo",value:function(e){this.dispatcher.emit("changeAllTodo",{isCompleted:e})}},{key:"deleteAllCompletedTodo",value:function(){this.dispatcher.emit("deleteAllCompletedTodo")}}]),e}();exports.default=ActionCreator;

},{}],2:[function(require,module,exports){
"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),EventEmitter=function(){function e(){_classCallCheck(this,e),this._handlers={}}return _createClass(e,[{key:"on",value:function(e,n){"undefined"==typeof this._handlers[e]&&(this._handlers[e]=[]),this._handlers[e].push(n)}},{key:"off",value:function(e,n){var t=this._handlers[e]||[];t.forEach(function(e,r){e===n&&t.splice(r,1)})}},{key:"emit",value:function(e,n){var t=this,r=this._handlers[e]||[];r.forEach(function(e){e.call(t,n)})}}]),e}();exports.default=EventEmitter;

},{}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}return Array.from(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),_EventEmitter2=require("./EventEmitter"),_EventEmitter3=_interopRequireDefault(_EventEmitter2),_getUrlHash=require("./utils/getUrlHash"),_getUrlHash2=_interopRequireDefault(_getUrlHash),Store=function(t){function e(t){_classCallCheck(this,e);var o=_possibleConstructorReturn(this,Object.getPrototypeOf(e).call(this));return o.state={filter:{current:(0,_getUrlHash2.default)(),list:["all","active","completed"]},todos:JSON.parse(localStorage.getItem("todos"))||[]},t.on("changeFilter",o._onChangeFilter.bind(o)),t.on("addTodo",o._onAddTodo.bind(o)),t.on("editTodo",o._onEditTodo.bind(o)),t.on("deleteTodo",o._onDeleteTodo.bind(o)),t.on("changeAllTodo",o._onChangeAllTodo.bind(o)),t.on("deleteAllCompletedTodo",o._onDeleteAllCompletedTodo.bind(o)),o}return _inherits(e,t),_createClass(e,[{key:"getState",value:function(){return this.state}},{key:"_onChangeFilter",value:function(t){this.state=Object.assign({},this.state,{filter:{current:t.hash,list:this.state.filter.list}}),this.emit("CHANGE FILTER")}},{key:"_onAddTodo",value:function(t){var e=Object.assign({},t.todo,{id:this._getUniqueString()});this.state=Object.assign({},this.state,{todos:[].concat(_toConsumableArray(this.state.todos),[e])}),this._setLocalStorage(),this.emit("ADD TODO",e)}},{key:"_getUniqueString",value:function(){return(new Date).getTime().toString(16)+Math.floor(1e3*Math.random()).toString(16)}},{key:"_setLocalStorage",value:function(){localStorage.setItem("todos",JSON.stringify(this.state.todos))}},{key:"_onEditTodo",value:function(t){this.state=Object.assign({},this.state,{todos:this.state.todos.map(function(e){return e.id===t.todo.id?t.todo:e})}),this._setLocalStorage(),this.emit("EDIT TODO",t.todo)}},{key:"_onDeleteTodo",value:function(t){this.state=Object.assign({},this.state,{todos:this.state.todos.filter(function(e){return e.id!==t.todo.id})}),this._setLocalStorage(),this.emit("DELETE TODO",t.todo)}},{key:"_onChangeAllTodo",value:function(t){this.state=Object.assign({},this.state,{todos:this.state.todos.map(function(e){return Object.assign({},e,{isCompleted:t.isCompleted})})}),this._setLocalStorage(),this.emit("CHANGE ALL TODO")}},{key:"_onDeleteAllCompletedTodo",value:function(){this.state=Object.assign({},this.state,{todos:this.state.todos.filter(function(t){return!t.isCompleted})}),this._setLocalStorage(),this.emit("CHANGE ALL TODO")}}]),e}(_EventEmitter3.default);exports.default=Store;

},{"./EventEmitter":2,"./utils/getUrlHash":6}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),_getUrlHash=require("./utils/getUrlHash"),_getUrlHash2=_interopRequireDefault(_getUrlHash),_EventEmitter=require("./EventEmitter"),_EventEmitter2=_interopRequireDefault(_EventEmitter),_Store=require("./Store"),_Store2=_interopRequireDefault(_Store),_ActionCreator=require("./ActionCreator"),_ActionCreator2=_interopRequireDefault(_ActionCreator),_Filter=require("./views/Filter"),_Filter2=_interopRequireDefault(_Filter),_Operation=require("./views/Operation/"),_Operation2=_interopRequireDefault(_Operation),_Length=require("./views/Length"),_Length2=_interopRequireDefault(_Length),_Form=require("./views/Todo/Form"),_Form2=_interopRequireDefault(_Form),_List=require("./views/Todo/List"),_List2=_interopRequireDefault(_List),dispatcher=new _EventEmitter2.default,store=new _Store2.default(dispatcher),action=new _ActionCreator2.default(dispatcher),TodoApp=function(){function e(){_classCallCheck(this,e),this.views={filter:new _Filter2.default,operation:new _Operation2.default(action),length:new _Length2.default,todoForm:new _Form2.default(action),todoList:new _List2.default(action)},this._event()}return _createClass(e,[{key:"start",value:function(){var e=this,t=store.getState();Object.keys(this.views).filter(function(t){return"function"==typeof e.views[t].render}).forEach(function(r){e.views[r].render(t)})}},{key:"_event",value:function(){window.addEventListener("hashchange",function(){action.changeFilter((0,_getUrlHash2.default)())},!1),store.on("CHANGE FILTER",this._onChangeFilter.bind(this)),store.on("ADD TODO",this._onAddTodo.bind(this)),store.on("EDIT TODO",this._onEditTodo.bind(this)),store.on("DELETE TODO",this._onDeleteTodo.bind(this)),store.on("CHANGE ALL TODO",this._onChangeAllTodo.bind(this))}},{key:"_onChangeFilter",value:function(){var e=store.getState();this.views.filter.render(e),this.views.todoList.render(e)}},{key:"_onAddTodo",value:function(e){var t=store.getState();this.views.todoList.add(e),this.views.operation.render(t),this.views.length.render(t)}},{key:"_onEditTodo",value:function(e){var t=store.getState();this.views.todoList.edit(e),this.views.operation.render(t),this.views.length.render(t)}},{key:"_onDeleteTodo",value:function(e){var t=store.getState();this.views.todoList.delete(e),this.views.operation.render(t),this.views.length.render(t)}},{key:"_onChangeAllTodo",value:function(){var e=store.getState();this.views.todoList.render(e),this.views.operation.render(e),this.views.length.render(e)}}]),e}();document.addEventListener("DOMContentLoaded",function(){var e=new TodoApp;e.start()});

},{"./ActionCreator":1,"./EventEmitter":2,"./Store":3,"./utils/getUrlHash":6,"./views/Filter":7,"./views/Length":8,"./views/Operation/":11,"./views/Todo/Form":12,"./views/Todo/List":18}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e){var d=document.createElement("div"),t=void 0;return d.style.display="none",d.innerHTML=e,document.body.appendChild(d),t=d.childNodes[1],document.body.removeChild(d),t};

},{}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var getUrlHash=function(){var e=arguments.length<=0||void 0===arguments[0]?"all":arguments[0];return location.hash.split("#/")[1]||e};exports.default=getUrlHash;

},{}],7:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Filter=function(){function e(){_classCallCheck(this,e),this.filter=document.querySelector(".js-filter")}return _createClass(e,[{key:"render",value:function(e){var t=e.filter;this.filter.innerHTML=t.list.map(function(e){return'\n      <li>\n        <a class="c-filter__link c-btn c-btn--middle '+(t.current===e&&"is-active")+'" href="#/'+e+'">'+e.toUpperCase()+"</a>\n      </li>\n    "}).join("")}}]),e}();exports.default=Filter;

},{}],8:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Length=function(){function e(){_classCallCheck(this,e),this.length=document.querySelector(".js-length")}return _createClass(e,[{key:"render",value:function(e){var t=e.todos,n=t.length,r=t.filter(function(e){return e.isCompleted}).length;this.length.textContent=r+" / "+n}}]),e}();exports.default=Length;

},{}],9:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_getDomNode=require("../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),ChangeAllTodoBtn=function(){function e(t){_classCallCheck(this,e),this.action=t,this.btn=void 0}return _createClass(e,[{key:"render",value:function(e){var t=e.todos,n=t.length,a=!!n&&t.every(function(e){return e.isCompleted});return this.btn=(0,_getDomNode2.default)('\n      <a data-btn-type="'+(a?"incomplete":"complete")+'" href="" class="c-btn c-btn--small c-btn--default '+(n?"":"is-disabled")+'">\n        全て'+(a?"未":"")+"完了にする\n      </a>\n    "),this.btn.addEventListener("click",this._onClickBtn.bind(this),!1),this.btn}},{key:"_onClickBtn",value:function(e){e.preventDefault();var t=e.target;if(!t.classList.contains("is-disabled"))switch(t.dataset.btnType){case"incomplete":this.action.changeAllTodo(!1);break;case"complete":this.action.changeAllTodo(!0)}}}]),e}();exports.default=ChangeAllTodoBtn;

},{"../../utils/getDomNode":5}],10:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_getDomNode=require("../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),DeleteAllTodoBtn=function(){function e(t){_classCallCheck(this,e),this.action=t,this.btn=void 0}return _createClass(e,[{key:"render",value:function(e){var t=e.todos.some(function(e){return e.isCompleted});return this.btn=(0,_getDomNode2.default)('\n      <a href="" class="c-btn c-btn--small c-btn--alert '+(t?"":"is-disabled")+'">\n        完了済みを削除する\n      </a>\n    '),this.btn.addEventListener("click",this._onClickBtn.bind(this),!1),this.btn}},{key:"_onClickBtn",value:function(e){e.preventDefault();var t=e.target;t.classList.contains("is-disabled")||this.action.deleteAllCompletedTodo()}}]),e}();exports.default=DeleteAllTodoBtn;

},{"../../utils/getDomNode":5}],11:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),_ChangeAllTodoBtn=require("./ChangeAllTodoBtn"),_ChangeAllTodoBtn2=_interopRequireDefault(_ChangeAllTodoBtn),_DeleteAllTodoBtn=require("./DeleteAllTodoBtn"),_DeleteAllTodoBtn2=_interopRequireDefault(_DeleteAllTodoBtn),Operation=function(){function e(t){_classCallCheck(this,e),this.action=t,this.wrap=document.querySelector(".js-operation"),this.btnList=[new _ChangeAllTodoBtn2.default(this.action),new _DeleteAllTodoBtn2.default(this.action)]}return _createClass(e,[{key:"render",value:function(e){var t=this;this.wrap.innerHTML="",this.btnList.forEach(function(n){var l=document.createElement("li");l.appendChild(n.render(e)),t.wrap.appendChild(l)})}}]),e}();exports.default=Operation;

},{"./ChangeAllTodoBtn":9,"./DeleteAllTodoBtn":10}],12:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),TodoForm=function(){function e(t){_classCallCheck(this,e),this.action=t,this.form=document.querySelector(".js-todo-form"),this.form.addEventListener("submit",this.onSubmit.bind(this),!1)}return _createClass(e,[{key:"onSubmit",value:function(e){e.preventDefault();var t=e.target.todo;this.action.addTodo({isCompleted:!1,content:t.value}),t.value=""}}]),e}();exports.default=TodoForm;

},{}],13:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_getDomNode=require("../../../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),CheckBox=function(){function e(t){_classCallCheck(this,e),this.action=t,this.checkbox=void 0}return _createClass(e,[{key:"render",value:function(e){return this.checkbox=(0,_getDomNode2.default)('\n      <input type="checkbox" class="c-input--checkbox__check js-check" '+(e.isCompleted?"checked":"")+">\n    "),this.checkbox.addEventListener("change",this._onChangeComplete.bind(this,e),!1),this.checkbox}},{key:"_onChangeComplete",value:function(e,t){this.action.editTodo(Object.assign({},e,{isCompleted:t.target.checked}))}}]),e}();exports.default=CheckBox;

},{"../../../../utils/getDomNode":5}],14:[function(require,module,exports){
"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),_getDomNode=require("../../../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),Content=function(){function t(e){_classCallCheck(this,t),this.action=e,this.content=void 0,this.txt=void 0}return _createClass(t,[{key:"render",value:function(t){return this.content=(0,_getDomNode2.default)('\n      <form class="c-input--checkbox__body">\n        <span class="c-input--checkbox__body__content">'+t.content+"</span>\n      </form>\n    "),this.txt=this.content.childNodes[1],this.content.addEventListener("submit",this._onEditTodoContent.bind(this,t),!1),this.content}},{key:"_onEditTodoContent",value:function(t,e){e.preventDefault(),this.action.editTodo(Object.assign({},t,{content:e.target.todo.value})),this.txt.removeEventListener("keyup",this,!1)}},{key:"renderEditor",value:function(t){this.txt.innerHTML='<input class="c-input c-input--small" type="text" name="todo" value="'+t.content+'" required>',this.txt.querySelector("input").focus(),this.txt.addEventListener("keyup",this,!1),this.todo=t}},{key:"handleEvent",value:function(t){27===t.keyCode&&this._cancelEdit()}},{key:"_cancelEdit",value:function(){this.txt.removeEventListener("keyup",this,!1),this.txt.innerHTML=this.todo.content}}]),t}();exports.default=Content;

},{"../../../../utils/getDomNode":5}],15:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_getDomNode=require("../../../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),DeleteIcon=function(){function e(t){_classCallCheck(this,e),this.action=t,this.wrap=document.createElement("li"),this.icon=void 0}return _createClass(e,[{key:"render",value:function(e){return this.icon=(0,_getDomNode2.default)('\n      <i class="c-icon is-trash"></i>\n    '),this.wrap.appendChild(this.icon),this.icon.addEventListener("click",this._onDeleteTodo.bind(this,e),!1),this.wrap}},{key:"_onDeleteTodo",value:function(e){this.action.deleteTodo(e)}}]),e}();exports.default=DeleteIcon;

},{"../../../../utils/getDomNode":5}],16:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),_getDomNode=require("../../../../utils/getDomNode"),_getDomNode2=_interopRequireDefault(_getDomNode),EditIcon=function(){function e(t){_classCallCheck(this,e),this.action=t,this.wrap=document.createElement("li"),this.icon=void 0}return _createClass(e,[{key:"render",value:function(e,t,n){return this.icon=(0,_getDomNode2.default)('\n      <i class="c-icon is-pencil">\n    '),this.wrap.appendChild(this.icon),this.icon.addEventListener("click",t.bind(n,e),!1),this.wrap}}]),e}();exports.default=EditIcon;

},{"../../../../utils/getDomNode":5}],17:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),_CheckBox=require("./CheckBox"),_CheckBox2=_interopRequireDefault(_CheckBox),_Content=require("./Content"),_Content2=_interopRequireDefault(_Content),_DeleteIcon=require("./DeleteIcon"),_DeleteIcon2=_interopRequireDefault(_DeleteIcon),_EditIcon=require("./EditIcon"),_EditIcon2=_interopRequireDefault(_EditIcon),TodoItem=function(){function e(t){_classCallCheck(this,e),this.action=t,this.item=document.createElement("li"),this.checkBox=new _CheckBox2.default(t),this.content=new _Content2.default(t),this.deleteIcon=new _DeleteIcon2.default(t),this.editIcon=new _EditIcon2.default(t)}return _createClass(e,[{key:"render",value:function(e){this.item.id=e.id,this.item.innerHTML='\n      <div class="c-todoItem">\n        <label class="c-todoItem__body c-input--checkbox js-label"></label>\n\n        <ul class="c-todoItem__info js-info"></ul>\n      </div>\n    ';var t=this.item.querySelector(".js-label"),n=this.item.querySelector(".js-info");return t.appendChild(this.checkBox.render(e)),t.appendChild(this.content.render(e)),n.appendChild(this.editIcon.render(e,this.onEditTodo,this)),n.appendChild(this.deleteIcon.render(e)),this.item}},{key:"onEditTodo",value:function(e){this.content.renderEditor(e)}}]),e}();exports.default=TodoItem;

},{"./CheckBox":13,"./Content":14,"./DeleteIcon":15,"./EditIcon":16}],18:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_Item=require("./Item/"),_Item2=_interopRequireDefault(_Item),TodoList=function(){function e(t){_classCallCheck(this,e),this.action=t,this.list=document.querySelector(".js-todo-list")}return _createClass(e,[{key:"render",value:function(e){var t=e.todos,n=e.filter;this.list.innerHTML="",t.filter(function(e){switch(n.current){case"active":return!e.isCompleted;case"completed":return e.isCompleted;case"all":default:return e}}).forEach(this.add.bind(this))}},{key:"add",value:function(e){var t=new _Item2.default(this.action);this.list.appendChild(t.render(e))}},{key:"edit",value:function(e){var t=new _Item2.default(this.action),n=document.getElementById(e.id);this.list.replaceChild(t.render(e),n)}},{key:"delete",value:function(e){var t=document.getElementById(e.id);t.parentNode.removeChild(t)}}]),e}();exports.default=TodoList;

},{"./Item/":17}]},{},[4]);
