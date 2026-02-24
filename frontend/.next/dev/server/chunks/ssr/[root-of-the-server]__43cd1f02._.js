module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/frontend/components/ThemeProvider.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'light');
    const [palette, setPalette] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'brand-500');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [
        theme
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        document.documentElement.style.setProperty('--brand-accent', `var(--${palette})`);
        localStorage.setItem('palette', palette);
    }, [
        palette
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme,
            palette,
            setPalette
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/ThemeProvider.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function useTheme() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/frontend/components/MotionPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>MotionPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/frontend/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/router.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const variants = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
function MotionPage({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["AnimatePresence"], {
            mode: "sync",
            initial: false,
            onExitComplete: ()=>window.scrollTo(0, 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                variants: variants,
                initial: "initial",
                animate: "enter",
                exit: "exit",
                className: "relative z-10",
                children: children
            }, router.pathname, false, {
                fileName: "[project]/frontend/components/MotionPage.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/components/MotionPage.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/MotionPage.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/frontend/assets/animations/crown.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"v":"5.7.4","fr":60,"ip":0,"op":180,"w":200,"h":200,"nm":"Premium Crown Animation","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Crown Base","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[100,110,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"t":0,"s":[100,100,100]},{"t":60,"s":[100,100,100]},{"t":120,"s":[105,105,100]},{"t":180,"s":[102,102,100]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[0,-50],[0,-50],[0,-50],[0,-50],[0,-50],[0,-50],[0,-50]],"c":true}]},{"t":60,"s":[{"i":[[0,0],[8,-15],[12,0],[8,15],[0,0],[-8,15],[-12,0]],"o":[[-12,0],[-8,-15],[0,0],[8,-15],[12,0],[8,15],[0,0]],"v":[[-60,30],[-35,-40],[0,-60],[35,-40],[60,30],[40,30],[-40,30]],"c":true}]}]}},{"ty":"fl","c":{"a":1,"k":[{"t":0,"s":[0.04,0.04,0.06,0]},{"t":60,"s":[0.04,0.04,0.06,0.1]},{"t":120,"s":[0.96,0.73,0.26,1]}]},"o":{"a":0,"k":100}},{"ty":"st","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":60,"s":[100]},{"t":120,"s":[0]}]},"w":{"a":0,"k":2},"lc":2,"lj":2}]}]},{"ddd":0,"ind":2,"ty":4,"nm":"Crown Center Peak","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":30,"s":[0]},{"t":80,"s":[100]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[100,105,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"t":60,"s":[0,0,100]},{"t":100,"s":[100,100,100]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,-8],[0,0]],"o":[[0,-8],[0,0],[0,0]],"v":[[0,-45],[0,-65],[0,-25]],"c":false}}},{"ty":"st","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":3},"lc":2,"lj":2}]},{"ty":"gr","it":[{"ty":"el","s":{"a":0,"k":[12,12]},"p":{"a":0,"k":[0,-65]}},{"ty":"fl","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":3,"ty":4,"nm":"Left Peak","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":20,"s":[0]},{"t":70,"s":[100]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[68,115,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"t":40,"s":[0,0,100]},{"t":90,"s":[100,100,100]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,0],[-15,-35]],"c":false}}},{"ty":"st","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":2,"lj":2}]},{"ty":"gr","it":[{"ty":"el","s":{"a":0,"k":[10,10]},"p":{"a":0,"k":[-15,-35]}},{"ty":"fl","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":4,"ty":4,"nm":"Right Peak","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":25,"s":[0]},{"t":75,"s":[100]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[132,115,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"t":45,"s":[0,0,100]},{"t":95,"s":[100,100,100]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,0],[15,-35]],"c":false}}},{"ty":"st","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":2,"lj":2}]},{"ty":"gr","it":[{"ty":"el","s":{"a":0,"k":[10,10]},"p":{"a":0,"k":[15,-35]}},{"ty":"fl","c":{"a":0,"k":[0.96,0.73,0.26,1]},"o":{"a":0,"k":100}}]}]},{"ddd":0,"ind":5,"ty":4,"nm":"Inner Detail","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":80,"s":[0]},{"t":130,"s":[100]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[100,105,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-25,15],[-15,-5],[0,10],[15,-5],[25,15]],"c":false}}},{"ty":"st","c":{"a":0,"k":[0.91,0.64,0.2,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":1.5},"lc":2,"lj":2}]}]},{"ddd":0,"ind":6,"ty":4,"nm":"Glow Effect","sr":1,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":100,"s":[0]},{"t":120,"s":[60]},{"t":150,"s":[30]},{"t":180,"s":[50]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[100,100,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"t":100,"s":[80,80,100]},{"t":150,"s":[120,120,100]},{"t":180,"s":[100,100,100]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"el","s":{"a":0,"k":[120,120]},"p":{"a":0,"k":[0,0]}},{"ty":"gf","o":{"a":0,"k":100},"r":1,"g":{"p":3,"k":{"a":0,"k":[0,0.96,0.73,0.26,0.5,0.96,0.85,0.45,1,0.96,0.73,0.26,0,0.8,0.5,0.4,1,0]}},"s":{"a":0,"k":[0,0]},"e":{"a":0,"k":[100,0]},"t":2}]}]}]});}),
"[project]/frontend/components/SplashScreen.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>SplashScreen,
    "hasSplashBeenShown",
    ()=>hasSplashBeenShown,
    "resetSplashScreen",
    ()=>resetSplashScreen
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/frontend/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$lottie$2d$react__$5b$external$5d$__$28$lottie$2d$react$2c$__cjs$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$lottie$2d$react$29$__ = __turbopack_context__.i("[externals]/lottie-react [external] (lottie-react, cjs, [project]/frontend/node_modules/lottie-react)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$assets$2f$animations$2f$crown$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/frontend/assets/animations/crown.json (json)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const ANIMATION_DURATION = 3000 // 3 seconds total
;
const SESSION_KEY = 'kingdomx_splash_shown';
function SplashScreen({ onComplete, redirectPath = '/login', skipAnimation = false }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('entering');
    const [showText, setShowText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [hideText, setHideText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Handle completion and navigation
    const handleComplete = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setPhase('exiting');
        // Shorter fade-out animation before redirect
        setTimeout(()=>{
            setPhase('complete');
            localStorage.setItem(SESSION_KEY, 'true');
            if (onComplete) {
                onComplete();
            } else {
                router.push(redirectPath);
            }
        }, 300); // Reduced from 500ms to 300ms for smoother transition
    }, [
        router,
        redirectPath,
        onComplete
    ]);
    // Skip animation if already shown this session
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (skipAnimation || localStorage.getItem(SESSION_KEY)) {
            handleComplete();
            return;
        }
        // Phase 1: Entrance (0-1s) - Crown outline draws
        const phase1Timer = setTimeout(()=>{
            setPhase('animating');
        }, 100);
        // Text is already visible from start (showText initialized to true)
        // Just animate it in on mount
        const textTimer = setTimeout(()=>{
        // Text animation is handled by initial/animate props
        }, 100);
        // No hide timer - text stays until animation ends
        // Complete at 3s
        const completeTimer = setTimeout(()=>{
            handleComplete();
        }, ANIMATION_DURATION);
        return ()=>{
            clearTimeout(phase1Timer);
            clearTimeout(textTimer);
            clearTimeout(completeTimer);
        };
    }, [
        skipAnimation,
        handleComplete
    ]);
    // Click to skip
    const handleClick = ()=>{
        handleComplete();
    };
    // Don't render if complete
    if (phase === 'complete') return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
            className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer overflow-hidden",
            style: {
                background: `
            radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0a0a0f 50%),
            linear-gradient(180deg, #0a0a0f 0%, #000000 100%)
          `
            },
            initial: {
                opacity: 0
            },
            animate: {
                opacity: phase === 'exiting' ? 0 : 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: phase === 'exiting' ? 0.3 : 0.3,
                ease: [
                    0.25,
                    0.46,
                    0.45,
                    0.94
                ]
            },
            onClick: handleClick,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                    className: "absolute inset-0 pointer-events-none",
                    animate: {
                        opacity: phase === 'animating' ? [
                            0.3,
                            0.5,
                            0.3
                        ] : 0.3
                    },
                    transition: {
                        duration: 2,
                        repeat: phase === 'animating' ? Infinity : 0,
                        ease: "easeInOut"
                    },
                    style: {
                        background: `
              radial-gradient(circle at 50% 50%, rgba(245, 185, 66, 0.08) 0%, transparent 60%)
            `
                    }
                }, void 0, false, {
                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center h-full w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center -mt-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                className: "relative",
                                initial: {
                                    scale: 0.8,
                                    opacity: 0
                                },
                                animate: {
                                    scale: phase === 'animating' ? [
                                        1,
                                        1.02,
                                        1
                                    ] : 1,
                                    opacity: 1
                                },
                                transition: {
                                    scale: {
                                        duration: 1,
                                        repeat: phase === 'animating' ? Infinity : 0,
                                        ease: "easeInOut"
                                    },
                                    opacity: {
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                        className: "absolute inset-0 blur-3xl",
                                        animate: {
                                            opacity: phase === 'animating' ? [
                                                0.2,
                                                0.4,
                                                0.2
                                            ] : 0,
                                            scale: phase === 'animating' ? [
                                                1,
                                                1.1,
                                                1
                                            ] : 1
                                        },
                                        transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        style: {
                                            background: 'radial-gradient(circle, rgba(245, 185, 66, 0.4) 0%, transparent 70%)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SplashScreen.tsx",
                                        lineNumber: 152,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative w-32 h-32 md:w-40 md:h-40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$lottie$2d$react__$5b$external$5d$__$28$lottie$2d$react$2c$__cjs$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$lottie$2d$react$29$__["default"], {
                                            animationData: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$assets$2f$animations$2f$crown$2e$json__$28$json$29$__["default"],
                                            loop: false,
                                            autoplay: true,
                                            style: {
                                                width: '100%',
                                                height: '100%'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SplashScreen.tsx",
                                            lineNumber: 170,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SplashScreen.tsx",
                                        lineNumber: 169,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SplashScreen.tsx",
                                lineNumber: 135,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["AnimatePresence"], {
                                children: showText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                    className: "text-center",
                                    initial: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -20,
                                        scale: 0.9
                                    },
                                    transition: {
                                        duration: 0.6,
                                        ease: [
                                            0.25,
                                            0.46,
                                            0.45,
                                            0.94
                                        ]
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl md:text-4xl font-light tracking-[0.2em] flex items-center justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-[#e8e6e3]",
                                                    children: "KingDom"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].span, {
                                                    className: "font-semibold bg-clip-text text-transparent",
                                                    style: {
                                                        backgroundImage: 'linear-gradient(135deg, #f5d485 0%, #f5b942 50%, #e8a332 100%)'
                                                    },
                                                    animate: {
                                                        textShadow: [
                                                            '0 0 20px rgba(245, 185, 66, 0.3)',
                                                            '0 0 40px rgba(245, 185, 66, 0.5)',
                                                            '0 0 20px rgba(245, 185, 66, 0.3)'
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    },
                                                    children: "X"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SplashScreen.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].p, {
                                            className: "mt-3 text-xs tracking-[0.3em] text-white/30 uppercase",
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            transition: {
                                                delay: 0.3,
                                                duration: 0.5
                                            },
                                            children: "Premium Workspace"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SplashScreen.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/SplashScreen.tsx",
                                lineNumber: 180,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                className: "absolute bottom-12 left-1/2 -translate-x-1/2",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 0.5,
                                    duration: 0.3
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-0.5 bg-white/10 rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                                        className: "h-full bg-gradient-to-r from-[#f5b942] to-[#f5d485]",
                                        initial: {
                                            width: '0%'
                                        },
                                        animate: {
                                            width: '100%'
                                        },
                                        transition: {
                                            duration: 0.8,
                                            ease: "easeOut"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SplashScreen.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                                    lineNumber: 236,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/SplashScreen.tsx",
                                lineNumber: 230,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$29$__["motion"].p, {
                                className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/20 tracking-wider uppercase",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 1,
                                    duration: 0.3
                                },
                                children: "Click anywhere to continue"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/SplashScreen.tsx",
                                lineNumber: 247,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/SplashScreen.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/components/SplashScreen.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/SplashScreen.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/SplashScreen.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function resetSplashScreen() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function hasSplashBeenShown() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/frontend/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$ThemeProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/ThemeProvider.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MotionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/MotionPage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SplashScreen$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SplashScreen.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MotionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SplashScreen$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MotionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SplashScreen$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function App({ Component, pageProps }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showSplash, setShowSplash] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true) // Start true to prevent flash
    ;
    const [splashComplete, setSplashComplete] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const publicRoutes = [
            '/',
            '/login',
            '/signup',
            '/splash'
        ];
        const isPublic = publicRoutes.includes(router.pathname);
        // Check if splash was already shown this session
        const alreadyShown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SplashScreen$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["hasSplashBeenShown"])();
        if (alreadyShown) {
            setShowSplash(false);
            setSplashComplete(true);
        }
        // Auth routing logic
        if (!token && !isPublic) {
            router.replace('/login');
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setIsLoading(false);
    }, [
        router.pathname
    ]);
    const handleSplashComplete = ()=>{
        setSplashComplete(true);
        // Remove splash from DOM immediately for smoother transition
        setShowSplash(false);
    };
    // Show nothing while checking localStorage (prevents flash)
    if (isLoading) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$ThemeProvider$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MotionPage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: showSplash ? 'invisible' : 'visible',
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                        ...pageProps
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/_app.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/_app.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/_app.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            showSplash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[99999]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SplashScreen$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onComplete: handleSplashComplete,
                    redirectPath: "/login",
                    skipAnimation: splashComplete
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/_app.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/_app.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/pages/_app.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__43cd1f02._.js.map