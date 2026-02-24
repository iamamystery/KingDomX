(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/components/DarkParticleBackground.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DarkParticleBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/three/build/three.core.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
function Particles() {
    _s();
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const { viewport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const count = 120;
    const [positions, velocities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo": ()=>{
            const pos = new Float32Array(count * 3);
            const vel = new Float32Array(count * 3);
            for(let i = 0; i < count; i++){
                pos[i * 3] = (Math.random() - 0.5) * 16;
                pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
                vel[i * 3] = (Math.random() - 0.5) * 0.02;
                vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
                vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            }
            return [
                pos,
                vel
            ];
        }
    }["Particles.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            const onMove = {
                "Particles.useEffect.onMove": (e)=>{
                    mouse.current.x = e.clientX / window.innerWidth * 2 - 1;
                    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
                }
            }["Particles.useEffect.onMove"];
            window.addEventListener('mousemove', onMove);
            return ({
                "Particles.useEffect": ()=>window.removeEventListener('mousemove', onMove)
            })["Particles.useEffect"];
        }
    }["Particles.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Particles.useFrame": (state)=>{
            if (!mesh.current) return;
            const time = state.clock.elapsedTime;
            const attr = mesh.current.geometry.attributes.position;
            for(let i = 0; i < count; i++){
                let x = attr.getX(i);
                let y = attr.getY(i);
                let z = attr.getZ(i);
                // Organic movement
                const speed = 0.5 + i % 5 * 0.2;
                x += velocities[i * 3] + Math.sin(time * speed + i) * 0.005;
                y += velocities[i * 3 + 1] + Math.cos(time * speed * 0.7 + i) * 0.005;
                z += velocities[i * 3 + 2] + Math.sin(time * speed * 0.3) * 0.002;
                // Mouse interaction
                const mx = mouse.current.x * viewport.width * 0.5;
                const my = mouse.current.y * viewport.height * 0.5;
                const dx = x - mx;
                const dy = y - my;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 2 && d > 0) {
                    x += dx / d * 0.02;
                    y += dy / d * 0.02;
                }
                // Wrap
                if (x > 8) x = -8;
                if (x < -8) x = 8;
                if (y > 5) y = -5;
                if (y < -5) y = 5;
                attr.setXYZ(i, x, y, z);
            }
            attr.needsUpdate = true;
        }
    }["Particles.useFrame"]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Particles.useMemo[geometry]": ()=>{
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            return geo;
        }
    }["Particles.useMemo[geometry]"], [
        positions
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: mesh,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
            size: 0.25,
            color: "#5eead4",
            transparent: true,
            opacity: 1,
            sizeAttenuation: true,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        }, void 0, false, {
            fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(Particles, "TbJpvg6xL+d7Xpm5GGmBWff9tQc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = Particles;
function Connections({ count = 120 }) {
    _s1();
    const lines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Float32Array(count * 6));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Connections.useFrame": ()=>{
            if (!lines.current?.parent) return;
            const pts = lines.current.parent.children[0];
            if (!pts) return;
            const posAttr = pts.geometry.attributes.position;
            const linePos = lines.current.geometry.attributes.position;
            let idx = 0;
            for(let i = 0; i < count; i++){
                const x1 = posAttr.getX(i);
                const y1 = posAttr.getY(i);
                const z1 = posAttr.getZ(i);
                let connections = 0;
                for(let j = i + 1; j < count && connections < 2; j++){
                    const x2 = posAttr.getX(j);
                    const y2 = posAttr.getY(j);
                    const z2 = posAttr.getZ(j);
                    const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
                    if (d < 2) {
                        linePos.setXYZ(idx++, x1, y1, z1);
                        linePos.setXYZ(idx++, x2, y2, z2);
                        connections++;
                    }
                }
            }
            for(let i = idx; i < count * 6; i += 3){
                linePos.setXYZ(i / 3 | 0, 0, 0, 0);
            }
            linePos.needsUpdate = true;
            lines.current.geometry.setDrawRange(0, idx);
        }
    }["Connections.useFrame"]);
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Connections.useMemo[geometry]": ()=>{
            const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions.current, 3));
            return geo;
        }
    }["Connections.useMemo[geometry]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineSegments", {
        ref: lines,
        geometry: geometry,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineBasicMaterial", {
            color: "#2dd4bf",
            transparent: true,
            opacity: 0.5,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        }, void 0, false, {
            fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s1(Connections, "0KgKFvYSZLDu3hWAwkZhd0YKAeE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = Connections;
function DarkParticleBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 -z-10",
        style: {
            background: '#020617'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-4 border-2 border-brand-500/20 rounded-lg pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    position: [
                        0,
                        0,
                        9
                    ],
                    fov: 50
                },
                gl: {
                    antialias: true,
                    alpha: false
                },
                dpr: 1,
                style: {
                    width: '100%',
                    height: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Particles, {}, void 0, false, {
                        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Connections, {}, void 0, false, {
                        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DarkParticleBackground.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_c2 = DarkParticleBackground;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Particles");
__turbopack_context__.k.register(_c1, "Connections");
__turbopack_context__.k.register(_c2, "DarkParticleBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/components/DarkParticleBackground.tsx [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/components/DarkParticleBackground.tsx [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_components_DarkParticleBackground_tsx_fd4bee1c._.js.map