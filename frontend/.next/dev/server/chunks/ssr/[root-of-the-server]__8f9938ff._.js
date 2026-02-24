module.exports = [
"[project]/frontend/components/WaveBackground.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>WaveBackground
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/frontend/node_modules/@react-three/fiber)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import, [project]/frontend/node_modules/three)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function WaveParticles() {
    const meshRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const count = 2000;
    const geometry = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for(let i = 0; i < count; i++){
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            const y = Math.sin(x * 0.5) * 0.5 + Math.sin(z * 0.3) * 0.3;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y - 2;
            positions[i * 3 + 2] = z;
            // Teal colors with variation
            const tealIntensity = 0.5 + Math.random() * 0.5;
            colors[i * 3] = 0.05 * tealIntensity;
            colors[i * 3 + 1] = 0.6 * tealIntensity;
            colors[i * 3 + 2] = 0.55 * tealIntensity;
        }
        const geo = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__["BufferGeometry"]();
        geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__["BufferAttribute"](positions, 3));
        geo.setAttribute('color', new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f$three$29$__["BufferAttribute"](colors, 3));
        return geo;
    }, [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["useFrame"])((state)=>{
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const posAttr = meshRef.current.geometry.attributes.position;
        for(let i = 0; i < count; i++){
            const x = posAttr.getX(i);
            const z = posAttr.getZ(i);
            // Animated wave effect
            const y = Math.sin(x * 0.5 + time * 0.5) * 0.4 + Math.sin(z * 0.3 + time * 0.3) * 0.2 + Math.sin((x + z) * 0.2 + time * 0.4) * 0.15 - 2;
            posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.02;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("points", {
        ref: meshRef,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pointsMaterial", {
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        }, void 0, false, {
            fileName: "[project]/frontend/components/WaveBackground.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/WaveBackground.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function WaveBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$2c$__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$29$__["Canvas"], {
            camera: {
                position: [
                    0,
                    2,
                    8
                ],
                fov: 60
            },
            gl: {
                antialias: true,
                alpha: true
            },
            style: {
                background: 'transparent'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ambientLight", {
                    intensity: 0.5
                }, void 0, false, {
                    fileName: "[project]/frontend/components/WaveBackground.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pointLight", {
                    position: [
                        10,
                        10,
                        10
                    ],
                    intensity: 1,
                    color: "#14b8a6"
                }, void 0, false, {
                    fileName: "[project]/frontend/components/WaveBackground.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(WaveParticles, {}, void 0, false, {
                    fileName: "[project]/frontend/components/WaveBackground.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/components/WaveBackground.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/WaveBackground.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/frontend/components/WaveBackground.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/WaveBackground.tsx [ssr] (ecmascript)"));
}),
"[externals]/@react-three/fiber [external] (@react-three/fiber, cjs, [project]/frontend/node_modules/@react-three/fiber)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/fiber-21ccb3f723985678", () => require("@react-three/fiber-21ccb3f723985678"));

module.exports = mod;
}),
"[externals]/three [external] (three, esm_import, [project]/frontend/node_modules/three)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("three-9c799d3dedca64cc");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f9938ff._.js.map