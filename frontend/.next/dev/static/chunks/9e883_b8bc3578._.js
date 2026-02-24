(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/frontend/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
            var index = heap.length;
            heap.push(node);
            siftUp(heap, node, index);
        }
        function peek(heap) {
            return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
            if (heap.length === 0) {
                return null;
            }
            var first = heap[0];
            var last = heap.pop();
            if (last !== first) {
                heap[0] = last;
                siftDown(heap, last, 0);
            }
            return first;
        }
        function siftUp(heap, node, i) {
            var index = i;
            while(index > 0){
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];
                if (compare(parent, node) > 0) {
                    // The parent is larger. Swap positions.
                    heap[parentIndex] = node;
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    // The parent is smaller. Exit.
                    return;
                }
            }
        }
        function siftDown(heap, node, i) {
            var index = i;
            var length = heap.length;
            var halfLength = length >>> 1;
            while(index < halfLength){
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.
                if (compare(left, node) < 0) {
                    if (rightIndex < length && compare(right, left) < 0) {
                        heap[index] = right;
                        heap[rightIndex] = node;
                        index = rightIndex;
                    } else {
                        heap[index] = left;
                        heap[leftIndex] = node;
                        index = leftIndex;
                    }
                } else if (rightIndex < length && compare(right, node) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                } else {
                    // Neither child is smaller. Exit.
                    return;
                }
            }
        }
        function compare(a, b) {
            // Compare sort index first, then task id.
            var diff = a.sortIndex - b.sortIndex;
            return diff !== 0 ? diff : a.id - b.id;
        }
        // TODO: Use symbols?
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {}
        /* eslint-disable no-var */ var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
        if (hasPerformanceNow) {
            var localPerformance = performance;
            exports.unstable_now = function() {
                return localPerformance.now();
            };
        } else {
            var localDate = Date;
            var initialTime = localDate.now();
            exports.unstable_now = function() {
                return localDate.now() - initialTime;
            };
        } // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
        // Math.pow(2, 30) - 1
        // 0b111111111111111111111111111111
        var maxSigned31BitInt = 1073741823; // Times out immediately
        var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5000;
        var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
        var taskQueue = [];
        var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
        var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
        var currentTask = null;
        var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.
        var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom
        var isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
            // Check for tasks that are no longer delayed and add them to the queue.
            var timer = peek(timerQueue);
            while(timer !== null){
                if (timer.callback === null) {
                    // Timer was cancelled.
                    pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                    // Timer fired. Transfer to the task queue.
                    pop(timerQueue);
                    timer.sortIndex = timer.expirationTime;
                    push(taskQueue, timer);
                } else {
                    // Remaining timers are pending.
                    return;
                }
                timer = peek(timerQueue);
            }
        }
        function handleTimeout(currentTime) {
            isHostTimeoutScheduled = false;
            advanceTimers(currentTime);
            if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                } else {
                    var firstTimer = peek(timerQueue);
                    if (firstTimer !== null) {
                        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                    }
                }
            }
        }
        function flushWork(hasTimeRemaining, initialTime) {
            isHostCallbackScheduled = false;
            if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
            }
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                {
                    var currentTime;
                } else {
                    // No catch in prod code path.
                    return workLoop(hasTimeRemaining, initialTime);
                }
            } finally{
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
            }
        }
        function workLoop(hasTimeRemaining, initialTime) {
            var currentTime = initialTime;
            advanceTimers(currentTime);
            currentTask = peek(taskQueue);
            while(currentTask !== null && !enableSchedulerDebugging){
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
                    break;
                }
                var callback = currentTask.callback;
                if (typeof callback === 'function') {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
                    var continuationCallback = callback(didUserCallbackTimeout);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === 'function') {
                        currentTask.callback = continuationCallback;
                    } else {
                        if (currentTask === peek(taskQueue)) {
                            pop(taskQueue);
                        }
                    }
                    advanceTimers(currentTime);
                } else {
                    pop(taskQueue);
                }
                currentTask = peek(taskQueue);
            } // Return whether there's additional work
            if (currentTask !== null) {
                return true;
            } else {
                var firstTimer = peek(timerQueue);
                if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }
                return false;
            }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
            switch(priorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                    break;
                default:
                    priorityLevel = NormalPriority;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_next(eventHandler) {
            var priorityLevel;
            switch(currentPriorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                    // Shift down to normal priority
                    priorityLevel = NormalPriority;
                    break;
                default:
                    // Anything lower than normal priority should remain at the current level.
                    priorityLevel = currentPriorityLevel;
                    break;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_wrapCallback(callback) {
            var parentPriorityLevel = currentPriorityLevel;
            return function() {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;
                try {
                    return callback.apply(this, arguments);
                } finally{
                    currentPriorityLevel = previousPriorityLevel;
                }
            };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
            var currentTime = exports.unstable_now();
            var startTime;
            if (typeof options === 'object' && options !== null) {
                var delay = options.delay;
                if (typeof delay === 'number' && delay > 0) {
                    startTime = currentTime + delay;
                } else {
                    startTime = currentTime;
                }
            } else {
                startTime = currentTime;
            }
            var timeout;
            switch(priorityLevel){
                case ImmediatePriority:
                    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                    break;
                case UserBlockingPriority:
                    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                    break;
                case IdlePriority:
                    timeout = IDLE_PRIORITY_TIMEOUT;
                    break;
                case LowPriority:
                    timeout = LOW_PRIORITY_TIMEOUT;
                    break;
                case NormalPriority:
                default:
                    timeout = NORMAL_PRIORITY_TIMEOUT;
                    break;
            }
            var expirationTime = startTime + timeout;
            var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
            };
            if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);
                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                    // All tasks are delayed, and this is the task with the earliest delay.
                    if (isHostTimeoutScheduled) {
                        // Cancel an existing timeout.
                        cancelHostTimeout();
                    } else {
                        isHostTimeoutScheduled = true;
                    } // Schedule a timeout.
                    requestHostTimeout(handleTimeout, startTime - currentTime);
                }
            } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.
                if (!isHostCallbackScheduled && !isPerformingWork) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                }
            }
            return newTask;
        }
        function unstable_pauseExecution() {}
        function unstable_continueExecution() {
            if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
            }
        }
        function unstable_getFirstCallbackNode() {
            return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
            // remove from the queue because you can't remove arbitrary nodes from an
            // array based heap, only the first one.)
            task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
            return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
            var timeElapsed = exports.unstable_now() - startTime;
            if (timeElapsed < frameInterval) {
                // The main thread has only been blocked for a really short amount of time;
                // smaller than a single frame. Don't yield yet.
                return false;
            } // The main thread has been blocked for a non-negligible amount of time. We
            return true;
        }
        function requestPaint() {}
        function forceFrameRate(fps) {
            if (fps < 0 || fps > 125) {
                // Using console['error'] to evade Babel and ESLint
                console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                return;
            }
            if (fps > 0) {
                frameInterval = Math.floor(1000 / fps);
            } else {
                // reset the framerate
                frameInterval = frameYieldMs;
            }
        }
        var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
                var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread
                // has been blocked.
                startTime = currentTime;
                var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the
                // error can be observed.
                //
                // Intentionally not using a try-catch, since that makes some debugging
                // techniques harder. Instead, if `scheduledHostCallback` errors, then
                // `hasMoreWork` will remain true, and we'll continue the work loop.
                var hasMoreWork = true;
                try {
                    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                } finally{
                    if (hasMoreWork) {
                        // If there's more work, schedule the next message event at the end
                        // of the preceding one.
                        schedulePerformWorkUntilDeadline();
                    } else {
                        isMessageLoopRunning = false;
                        scheduledHostCallback = null;
                    }
                }
            } else {
                isMessageLoopRunning = false;
            } // Yielding to the browser will give it a chance to paint, so we can
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === 'function') {
            // Node.js and old IE.
            // There's a few reasons for why we prefer setImmediate.
            //
            // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
            // (Even though this is a DOM fork of the Scheduler, you could get here
            // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
            // https://github.com/facebook/react/issues/20756
            //
            // But also, it runs earlier which is the semantic we want.
            // If other browsers ever implement it, it's better to use it.
            // Although both of these would be inferior to native scheduling.
            schedulePerformWorkUntilDeadline = function() {
                localSetImmediate(performWorkUntilDeadline);
            };
        } else if (typeof MessageChannel !== 'undefined') {
            // DOM and Worker environments.
            // We prefer MessageChannel because of the 4ms setTimeout clamping.
            var channel = new MessageChannel();
            var port = channel.port2;
            channel.port1.onmessage = performWorkUntilDeadline;
            schedulePerformWorkUntilDeadline = function() {
                port.postMessage(null);
            };
        } else {
            // We should only fallback here in non-browser environments.
            schedulePerformWorkUntilDeadline = function() {
                localSetTimeout(performWorkUntilDeadline, 0);
            };
        }
        function requestHostCallback(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
                isMessageLoopRunning = true;
                schedulePerformWorkUntilDeadline();
            }
        }
        function requestHostTimeout(callback, ms) {
            taskTimeoutID = localSetTimeout(function() {
                callback(exports.unstable_now());
            }, ms);
        }
        function cancelHostTimeout() {
            localClearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
    })();
}
}),
"[project]/frontend/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/frontend/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/frontend/node_modules/@emotion/memoize/dist/memoize.browser.esm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function memoize(fn) {
    var cache = {};
    return function(arg) {
        if (cache[arg] === undefined) cache[arg] = fn(arg);
        return cache[arg];
    };
}
const __TURBOPACK__default__export__ = memoize;
}),
"[project]/frontend/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$emotion$2f$memoize$2f$dist$2f$memoize$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@emotion/memoize/dist/memoize.browser.esm.js [client] (ecmascript)");
;
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23
var index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$emotion$2f$memoize$2f$dist$2f$memoize$2e$browser$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
const __TURBOPACK__default__export__ = index;
}),
"[project]/frontend/node_modules/lottie-react/build/index.umd.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? factory(exports, __turbopack_context__.r("[project]/frontend/node_modules/lottie-web/build/player/lottie.js [client] (ecmascript)"), __turbopack_context__.r("[project]/frontend/node_modules/react/index.js [client] (ecmascript)")) : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(exports1, lottie, React) {
    'use strict';
    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {
            'default': e
        };
    }
    var lottie__default = /*#__PURE__*/ _interopDefaultLegacy(lottie);
    var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
        return n;
    }
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e, n, i, u, a = [], f = !0, o = !1;
            try {
                if (i = (t = t.call(r)).next, 0 === l) {
                    if (Object(t) !== t) return;
                    f = !1;
                } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
            } catch (r) {
                o = !0, n = r;
            } finally{
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally{
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })), t.push.apply(t, o);
        }
        return t;
    }
    function _objectSpread2(e) {
        for(var r = 1; r < arguments.length; r++){
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function _objectWithoutProperties(e, t) {
        if (null == e) return {};
        var o, r, i = _objectWithoutPropertiesLoose(e, t);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(e);
            for(r = 0; r < s.length; r++)o = s[r], t.includes(o) || ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
        }
        return i;
    }
    function _objectWithoutPropertiesLoose(r, e) {
        if (null == r) return {};
        var t = {};
        for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
            if (e.includes(n)) continue;
            t[n] = r[n];
        }
        return t;
    }
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != typeof i) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = ({}).toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    var _excluded$1 = [
        "animationData",
        "loop",
        "autoplay",
        "initialSegment",
        "onComplete",
        "onLoopComplete",
        "onEnterFrame",
        "onSegmentStart",
        "onConfigReady",
        "onDataReady",
        "onDataFailed",
        "onLoadedImages",
        "onDOMLoaded",
        "onDestroy",
        "lottieRef",
        "renderer",
        "name",
        "assetsPath",
        "rendererSettings"
    ];
    var useLottie = function useLottie(props, style) {
        var animationData = props.animationData, loop = props.loop, autoplay = props.autoplay, initialSegment = props.initialSegment, onComplete = props.onComplete, onLoopComplete = props.onLoopComplete, onEnterFrame = props.onEnterFrame, onSegmentStart = props.onSegmentStart, onConfigReady = props.onConfigReady, onDataReady = props.onDataReady, onDataFailed = props.onDataFailed, onLoadedImages = props.onLoadedImages, onDOMLoaded = props.onDOMLoaded, onDestroy = props.onDestroy;
        props.lottieRef;
        props.renderer;
        props.name;
        props.assetsPath;
        props.rendererSettings;
        var rest = _objectWithoutProperties(props, _excluded$1);
        var _useState = React.useState(false), _useState2 = _slicedToArray(_useState, 2), animationLoaded = _useState2[0], setAnimationLoaded = _useState2[1];
        var animationInstanceRef = React.useRef();
        var animationContainer = React.useRef(null);
        /*
          ======================================
              INTERACTION METHODS
          ======================================
       */ /**
     * Play
     */ var play = function play() {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.play();
        };
        /**
     * Stop
     */ var stop = function stop() {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.stop();
        };
        /**
     * Pause
     */ var pause = function pause() {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        };
        /**
     * Set animation speed
     * @param speed
     */ var setSpeed = function setSpeed(speed) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.setSpeed(speed);
        };
        /**
     * Got to frame and play
     * @param value
     * @param isFrame
     */ var goToAndPlay = function goToAndPlay(value, isFrame) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.goToAndPlay(value, isFrame);
        };
        /**
     * Got to frame and stop
     * @param value
     * @param isFrame
     */ var goToAndStop = function goToAndStop(value, isFrame) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.goToAndStop(value, isFrame);
        };
        /**
     * Set animation direction
     * @param direction
     */ var setDirection = function setDirection(direction) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.setDirection(direction);
        };
        /**
     * Play animation segments
     * @param segments
     * @param forceFlag
     */ var playSegments = function playSegments(segments, forceFlag) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.playSegments(segments, forceFlag);
        };
        /**
     * Set sub frames
     * @param useSubFrames
     */ var setSubframe = function setSubframe(useSubFrames) {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.setSubframe(useSubFrames);
        };
        /**
     * Get animation duration
     * @param inFrames
     */ var getDuration = function getDuration(inFrames) {
            var _a;
            return (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.getDuration(inFrames);
        };
        /**
     * Destroy animation
     */ var destroy = function destroy() {
            var _a;
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
            // Removing the reference to the animation so separate cleanups are skipped.
            // Without it the internal `lottie-react` instance throws exceptions as it already cleared itself on destroy.
            animationInstanceRef.current = undefined;
        };
        /*
          ======================================
              LOTTIE
          ======================================
       */ /**
     * Load a new animation, and if it's the case, destroy the previous one
     * @param {Object} forcedConfigs
     */ var loadAnimation = function loadAnimation() {
            var forcedConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _a;
            // Return if the container ref is null
            if (!animationContainer.current) {
                return;
            }
            // Destroy any previous instance
            (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
            // Build the animation configuration
            var config = _objectSpread2(_objectSpread2(_objectSpread2({}, props), forcedConfigs), {}, {
                container: animationContainer.current
            });
            // Save the animation instance
            animationInstanceRef.current = lottie__default["default"].loadAnimation(config);
            setAnimationLoaded(!!animationInstanceRef.current);
            // Return a function that will clean up
            return function() {
                var _a;
                (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
                animationInstanceRef.current = undefined;
            };
        };
        /**
     * (Re)Initialize when animation data changed
     */ React.useEffect({
            "useLottie.useEffect": function() {
                var onUnmount = loadAnimation();
                // Clean up on unmount
                return ({
                    "useLottie.useEffect": function() {
                        return onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount();
                    }
                })["useLottie.useEffect"];
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }["useLottie.useEffect"], [
            animationData,
            loop
        ]);
        // Update the autoplay state
        React.useEffect({
            "useLottie.useEffect": function() {
                if (!animationInstanceRef.current) {
                    return;
                }
                animationInstanceRef.current.autoplay = !!autoplay;
            }
        }["useLottie.useEffect"], [
            autoplay
        ]);
        // Update the initial segment state
        React.useEffect({
            "useLottie.useEffect": function() {
                if (!animationInstanceRef.current) {
                    return;
                }
                // When null should reset to default animation length
                if (!initialSegment) {
                    animationInstanceRef.current.resetSegments(true);
                    return;
                }
                // If it's not a valid segment, do nothing
                if (!Array.isArray(initialSegment) || !initialSegment.length) {
                    return;
                }
                // If the current position it's not in the new segment
                // set the current position to start
                if (animationInstanceRef.current.currentRawFrame < initialSegment[0] || animationInstanceRef.current.currentRawFrame > initialSegment[1]) {
                    animationInstanceRef.current.currentRawFrame = initialSegment[0];
                }
                // Update the segment
                animationInstanceRef.current.setSegment(initialSegment[0], initialSegment[1]);
            }
        }["useLottie.useEffect"], [
            initialSegment
        ]);
        /*
          ======================================
              EVENTS
          ======================================
       */ /**
     * Reinitialize listener on change
     */ React.useEffect({
            "useLottie.useEffect": function() {
                var partialListeners = [
                    {
                        name: "complete",
                        handler: onComplete
                    },
                    {
                        name: "loopComplete",
                        handler: onLoopComplete
                    },
                    {
                        name: "enterFrame",
                        handler: onEnterFrame
                    },
                    {
                        name: "segmentStart",
                        handler: onSegmentStart
                    },
                    {
                        name: "config_ready",
                        handler: onConfigReady
                    },
                    {
                        name: "data_ready",
                        handler: onDataReady
                    },
                    {
                        name: "data_failed",
                        handler: onDataFailed
                    },
                    {
                        name: "loaded_images",
                        handler: onLoadedImages
                    },
                    {
                        name: "DOMLoaded",
                        handler: onDOMLoaded
                    },
                    {
                        name: "destroy",
                        handler: onDestroy
                    }
                ];
                var listeners = partialListeners.filter({
                    "useLottie.useEffect.listeners": function(listener) {
                        return listener.handler != null;
                    }
                }["useLottie.useEffect.listeners"]);
                if (!listeners.length) {
                    return;
                }
                var deregisterList = listeners.map({
                    "useLottie.useEffect.deregisterList": /**
       * Handle the process of adding an event listener
       * @param {Listener} listener
       * @return {Function} Function that deregister the listener
       */ function(listener) {
                        var _a;
                        (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener(listener.name, listener.handler);
                        // Return a function to deregister this listener
                        return ({
                            "useLottie.useEffect.deregisterList": function() {
                                var _a;
                                (_a = animationInstanceRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener(listener.name, listener.handler);
                            }
                        })["useLottie.useEffect.deregisterList"];
                    }
                }["useLottie.useEffect.deregisterList"]);
                // Deregister listeners on unmount
                return ({
                    "useLottie.useEffect": function() {
                        deregisterList.forEach({
                            "useLottie.useEffect": function(deregister) {
                                return deregister();
                            }
                        }["useLottie.useEffect"]);
                    }
                })["useLottie.useEffect"];
            }
        }["useLottie.useEffect"], [
            onComplete,
            onLoopComplete,
            onEnterFrame,
            onSegmentStart,
            onConfigReady,
            onDataReady,
            onDataFailed,
            onLoadedImages,
            onDOMLoaded,
            onDestroy
        ]);
        /**
     * Build the animation view
     */ var View = /*#__PURE__*/ React__default["default"].createElement("div", _objectSpread2({
            style: style,
            ref: animationContainer
        }, rest));
        return {
            View: View,
            play: play,
            stop: stop,
            pause: pause,
            setSpeed: setSpeed,
            goToAndStop: goToAndStop,
            goToAndPlay: goToAndPlay,
            setDirection: setDirection,
            playSegments: playSegments,
            setSubframe: setSubframe,
            getDuration: getDuration,
            destroy: destroy,
            animationContainerRef: animationContainer,
            animationLoaded: animationLoaded,
            animationItem: animationInstanceRef.current
        };
    };
    // helpers
    function getContainerVisibility(container) {
        var _container$getBoundin = container.getBoundingClientRect(), top = _container$getBoundin.top, height = _container$getBoundin.height;
        var current = window.innerHeight - top;
        var max = window.innerHeight + height;
        return current / max;
    }
    function getContainerCursorPosition(container, cursorX, cursorY) {
        var _container$getBoundin2 = container.getBoundingClientRect(), top = _container$getBoundin2.top, left = _container$getBoundin2.left, width = _container$getBoundin2.width, height = _container$getBoundin2.height;
        var x = (cursorX - left) / width;
        var y = (cursorY - top) / height;
        return {
            x: x,
            y: y
        };
    }
    var useInitInteractivity = function useInitInteractivity(_ref) {
        var wrapperRef = _ref.wrapperRef, animationItem = _ref.animationItem, mode = _ref.mode, actions = _ref.actions;
        React.useEffect({
            "useInitInteractivity.useEffect": function() {
                var wrapper = wrapperRef.current;
                if (!wrapper || !animationItem || !actions.length) {
                    return;
                }
                animationItem.stop();
                var scrollModeHandler = function scrollModeHandler() {
                    var assignedSegment = null;
                    var scrollHandler = function scrollHandler() {
                        var currentPercent = getContainerVisibility(wrapper);
                        // Find the first action that satisfies the current position conditions
                        var action = actions.find({
                            "useInitInteractivity.useEffect.scrollModeHandler.scrollHandler.action": function(_ref2) {
                                var visibility = _ref2.visibility;
                                return visibility && currentPercent >= visibility[0] && currentPercent <= visibility[1];
                            }
                        }["useInitInteractivity.useEffect.scrollModeHandler.scrollHandler.action"]);
                        // Skip if no matching action was found!
                        if (!action) {
                            return;
                        }
                        if (action.type === "seek" && action.visibility && action.frames.length === 2) {
                            // Seek: Go to a frame based on player scroll position action
                            var frameToGo = action.frames[0] + Math.ceil((currentPercent - action.visibility[0]) / (action.visibility[1] - action.visibility[0]) * action.frames[1]);
                            //! goToAndStop must be relative to the start of the current segment
                            animationItem.goToAndStop(frameToGo - animationItem.firstFrame - 1, true);
                        }
                        if (action.type === "loop") {
                            // Loop: Loop a given frames
                            if (assignedSegment === null) {
                                // if not playing any segments currently. play those segments and save to state
                                animationItem.playSegments(action.frames, true);
                                assignedSegment = action.frames;
                            } else {
                                // if playing any segments currently.
                                //check if segments in state are equal to the frames selected by action
                                if (assignedSegment !== action.frames) {
                                    // if they are not equal. new segments are to be loaded
                                    animationItem.playSegments(action.frames, true);
                                    assignedSegment = action.frames;
                                } else if (animationItem.isPaused) {
                                    // if they are equal the play method must be called only if lottie is paused
                                    animationItem.playSegments(action.frames, true);
                                    assignedSegment = action.frames;
                                }
                            }
                        }
                        if (action.type === "play" && animationItem.isPaused) {
                            // Play: Reset segments and continue playing full animation from current position
                            animationItem.resetSegments(true);
                            animationItem.play();
                        }
                        if (action.type === "stop") {
                            // Stop: Stop playback
                            animationItem.goToAndStop(action.frames[0] - animationItem.firstFrame - 1, true);
                        }
                    };
                    document.addEventListener("scroll", scrollHandler);
                    return ({
                        "useInitInteractivity.useEffect.scrollModeHandler": function() {
                            document.removeEventListener("scroll", scrollHandler);
                        }
                    })["useInitInteractivity.useEffect.scrollModeHandler"];
                };
                var cursorModeHandler = function cursorModeHandler() {
                    var handleCursor = function handleCursor(_x, _y) {
                        var x = _x;
                        var y = _y;
                        // Resolve cursor position if cursor is inside container
                        if (x !== -1 && y !== -1) {
                            // Get container cursor position
                            var pos = getContainerCursorPosition(wrapper, x, y);
                            // Use the resolved position
                            x = pos.x;
                            y = pos.y;
                        }
                        // Find the first action that satisfies the current position conditions
                        var action = actions.find({
                            "useInitInteractivity.useEffect.cursorModeHandler.handleCursor.action": function(_ref3) {
                                var position = _ref3.position;
                                if (position && Array.isArray(position.x) && Array.isArray(position.y)) {
                                    return x >= position.x[0] && x <= position.x[1] && y >= position.y[0] && y <= position.y[1];
                                }
                                if (position && !Number.isNaN(position.x) && !Number.isNaN(position.y)) {
                                    return x === position.x && y === position.y;
                                }
                                return false;
                            }
                        }["useInitInteractivity.useEffect.cursorModeHandler.handleCursor.action"]);
                        // Skip if no matching action was found!
                        if (!action) {
                            return;
                        }
                        // Process action types:
                        if (action.type === "seek" && action.position && Array.isArray(action.position.x) && Array.isArray(action.position.y) && action.frames.length === 2) {
                            // Seek: Go to a frame based on player scroll position action
                            var xPercent = (x - action.position.x[0]) / (action.position.x[1] - action.position.x[0]);
                            var yPercent = (y - action.position.y[0]) / (action.position.y[1] - action.position.y[0]);
                            animationItem.playSegments(action.frames, true);
                            animationItem.goToAndStop(Math.ceil((xPercent + yPercent) / 2 * (action.frames[1] - action.frames[0])), true);
                        }
                        if (action.type === "loop") {
                            animationItem.playSegments(action.frames, true);
                        }
                        if (action.type === "play") {
                            // Play: Reset segments and continue playing full animation from current position
                            if (animationItem.isPaused) {
                                animationItem.resetSegments(false);
                            }
                            animationItem.playSegments(action.frames);
                        }
                        if (action.type === "stop") {
                            animationItem.goToAndStop(action.frames[0], true);
                        }
                    };
                    var mouseMoveHandler = function mouseMoveHandler(ev) {
                        handleCursor(ev.clientX, ev.clientY);
                    };
                    var mouseOutHandler = function mouseOutHandler() {
                        handleCursor(-1, -1);
                    };
                    wrapper.addEventListener("mousemove", mouseMoveHandler);
                    wrapper.addEventListener("mouseout", mouseOutHandler);
                    return ({
                        "useInitInteractivity.useEffect.cursorModeHandler": function() {
                            wrapper.removeEventListener("mousemove", mouseMoveHandler);
                            wrapper.removeEventListener("mouseout", mouseOutHandler);
                        }
                    })["useInitInteractivity.useEffect.cursorModeHandler"];
                };
                switch(mode){
                    case "scroll":
                        return scrollModeHandler();
                    case "cursor":
                        return cursorModeHandler();
                }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }["useInitInteractivity.useEffect"], [
            mode,
            animationItem
        ]);
    };
    var useLottieInteractivity = function useLottieInteractivity(_ref4) {
        var actions = _ref4.actions, mode = _ref4.mode, lottieObj = _ref4.lottieObj;
        var animationItem = lottieObj.animationItem, View = lottieObj.View, animationContainerRef = lottieObj.animationContainerRef;
        useInitInteractivity({
            actions: actions,
            animationItem: animationItem,
            mode: mode,
            wrapperRef: animationContainerRef
        });
        return View;
    };
    var _excluded = [
        "style",
        "interactivity"
    ];
    var Lottie = function Lottie(props) {
        var _a, _b, _c;
        var style = props.style, interactivity = props.interactivity, lottieProps = _objectWithoutProperties(props, _excluded);
        /**
     * Initialize the 'useLottie' hook
     */ var _useLottie = useLottie(lottieProps, style), View = _useLottie.View, play = _useLottie.play, stop = _useLottie.stop, pause = _useLottie.pause, setSpeed = _useLottie.setSpeed, goToAndStop = _useLottie.goToAndStop, goToAndPlay = _useLottie.goToAndPlay, setDirection = _useLottie.setDirection, playSegments = _useLottie.playSegments, setSubframe = _useLottie.setSubframe, getDuration = _useLottie.getDuration, destroy = _useLottie.destroy, animationContainerRef = _useLottie.animationContainerRef, animationLoaded = _useLottie.animationLoaded, animationItem = _useLottie.animationItem;
        /**
     * Make the hook variables/methods available through the provided 'lottieRef'
     */ React.useEffect({
            "Lottie.useEffect": function() {
                if (props.lottieRef) {
                    props.lottieRef.current = {
                        play: play,
                        stop: stop,
                        pause: pause,
                        setSpeed: setSpeed,
                        goToAndPlay: goToAndPlay,
                        goToAndStop: goToAndStop,
                        setDirection: setDirection,
                        playSegments: playSegments,
                        setSubframe: setSubframe,
                        getDuration: getDuration,
                        destroy: destroy,
                        animationContainerRef: animationContainerRef,
                        animationLoaded: animationLoaded,
                        animationItem: animationItem
                    };
                }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }["Lottie.useEffect"], [
            (_a = props.lottieRef) === null || _a === void 0 ? void 0 : _a.current
        ]);
        return useLottieInteractivity({
            lottieObj: {
                View: View,
                play: play,
                stop: stop,
                pause: pause,
                setSpeed: setSpeed,
                goToAndStop: goToAndStop,
                goToAndPlay: goToAndPlay,
                setDirection: setDirection,
                playSegments: playSegments,
                setSubframe: setSubframe,
                getDuration: getDuration,
                destroy: destroy,
                animationContainerRef: animationContainerRef,
                animationLoaded: animationLoaded,
                animationItem: animationItem
            },
            actions: (_b = interactivity === null || interactivity === void 0 ? void 0 : interactivity.actions) !== null && _b !== void 0 ? _b : [],
            mode: (_c = interactivity === null || interactivity === void 0 ? void 0 : interactivity.mode) !== null && _c !== void 0 ? _c : "scroll"
        });
    };
    Object.defineProperty(exports1, 'LottiePlayer', {
        enumerable: true,
        get: function() {
            return lottie__default["default"];
        }
    });
    exports1["default"] = Lottie;
    exports1.useLottie = useLottie;
    exports1.useLottieInteractivity = useLottieInteractivity;
    Object.defineProperty(exports1, '__esModule', {
        value: true
    });
}); //# sourceMappingURL=index.umd.js.map
}),
]);

//# sourceMappingURL=9e883_b8bc3578._.js.map