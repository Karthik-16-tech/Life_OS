import { useEffect, useRef } from "react";

const MetaballBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initRef.current) return;
    initRef.current = true;

    const loadMetaball = async () => {
      try {
        // @ts-ignore
        const THREE = await import(/* @vite-ignore */ "https://esm.sh/three@0.178.0");

        const container = containerRef.current;
        if (!container) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;
        const clock = new THREE.Clock();

        const renderer = new THREE.WebGLRenderer({
          antialias: !isMobile && !isLowPowerDevice,
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
          preserveDrawingBuffer: false,
          premultipliedAlpha: false,
        });

        renderer.setPixelRatio(pixelRatio);
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const canvas = renderer.domElement;
        canvas.style.cssText = `position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;display:block;pointer-events:none;`;
        container.appendChild(canvas);

        const settings = {
          sphereCount: isMobile ? 4 : 6,
          ambientIntensity: 0.12,
          diffuseIntensity: 1.2,
          specularIntensity: 2.5,
          specularPower: 3,
          fresnelPower: 0.8,
          backgroundColor: new THREE.Color(0x0a0a15),
          sphereColor: new THREE.Color(0x050510),
          lightColor: new THREE.Color(0xccaaff),
          lightPosition: new THREE.Vector3(0.9, 0.9, 1.2),
          smoothness: 0.8,
          contrast: 1.6,
          fogDensity: 0.06,
          cursorGlowIntensity: 1.2,
          cursorGlowRadius: 2.2,
          cursorGlowColor: new THREE.Color(0xaa77ff),
          fixedTopLeftRadius: 0.8,
          fixedBottomRightRadius: 0.9,
          smallTopLeftRadius: 0.3,
          smallBottomRightRadius: 0.35,
          cursorRadiusMin: 0.08,
          cursorRadiusMax: 0.15,
          animationSpeed: 0.6,
          movementScale: 1.2,
          mouseSmoothness: 0.1,
          mergeDistance: 1.5,
          minMovementScale: 0.3,
          maxMovementScale: 1.0,
        };

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(w, h) },
            uActualResolution: { value: new THREE.Vector2(w * pixelRatio, h * pixelRatio) },
            uPixelRatio: { value: pixelRatio },
            uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
            uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
            uCursorRadius: { value: settings.cursorRadiusMin },
            uSphereCount: { value: settings.sphereCount },
            uFixedTopLeftRadius: { value: settings.fixedTopLeftRadius },
            uFixedBottomRightRadius: { value: settings.fixedBottomRightRadius },
            uSmallTopLeftRadius: { value: settings.smallTopLeftRadius },
            uSmallBottomRightRadius: { value: settings.smallBottomRightRadius },
            uMergeDistance: { value: settings.mergeDistance },
            uSmoothness: { value: settings.smoothness },
            uAmbientIntensity: { value: settings.ambientIntensity },
            uDiffuseIntensity: { value: settings.diffuseIntensity },
            uSpecularIntensity: { value: settings.specularIntensity },
            uSpecularPower: { value: settings.specularPower },
            uFresnelPower: { value: settings.fresnelPower },
            uBackgroundColor: { value: settings.backgroundColor },
            uSphereColor: { value: settings.sphereColor },
            uLightColor: { value: settings.lightColor },
            uLightPosition: { value: settings.lightPosition },
            uContrast: { value: settings.contrast },
            uFogDensity: { value: settings.fogDensity },
            uAnimationSpeed: { value: settings.animationSpeed },
            uMovementScale: { value: settings.movementScale },
            uMouseProximityEffect: { value: true },
            uMinMovementScale: { value: settings.minMovementScale },
            uMaxMovementScale: { value: settings.maxMovementScale },
            uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
            uCursorGlowRadius: { value: settings.cursorGlowRadius },
            uCursorGlowColor: { value: settings.cursorGlowColor },
            uIsSafari: { value: isSafari ? 1.0 : 0.0 },
            uIsMobile: { value: isMobile ? 1.0 : 0.0 },
            uIsLowPower: { value: isLowPowerDevice ? 1.0 : 0.0 },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            ${isMobile || isSafari || isLowPowerDevice ? "precision mediump float;" : "precision highp float;"}
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uActualResolution;
            uniform float uPixelRatio;
            uniform vec2 uMousePosition;
            uniform vec3 uCursorSphere;
            uniform float uCursorRadius;
            uniform int uSphereCount;
            uniform float uFixedTopLeftRadius;
            uniform float uFixedBottomRightRadius;
            uniform float uSmallTopLeftRadius;
            uniform float uSmallBottomRightRadius;
            uniform float uMergeDistance;
            uniform float uSmoothness;
            uniform float uAmbientIntensity;
            uniform float uDiffuseIntensity;
            uniform float uSpecularIntensity;
            uniform float uSpecularPower;
            uniform float uFresnelPower;
            uniform vec3 uBackgroundColor;
            uniform vec3 uSphereColor;
            uniform vec3 uLightColor;
            uniform vec3 uLightPosition;
            uniform float uContrast;
            uniform float uFogDensity;
            uniform float uAnimationSpeed;
            uniform float uMovementScale;
            uniform bool uMouseProximityEffect;
            uniform float uMinMovementScale;
            uniform float uMaxMovementScale;
            uniform float uCursorGlowIntensity;
            uniform float uCursorGlowRadius;
            uniform vec3 uCursorGlowColor;
            uniform float uIsSafari;
            uniform float uIsMobile;
            uniform float uIsLowPower;
            varying vec2 vUv;
            const float PI = 3.14159265359;
            const float EPSILON = 0.001;
            const float MAX_DIST = 100.0;
            float smin(float a, float b, float k) {
              float h = max(k - abs(a - b), 0.0) / k;
              return min(a, b) - h * h * k * 0.25;
            }
            float sdSphere(vec3 p, float r) { return length(p) - r; }
            vec3 screenToWorld(vec2 np) {
              vec2 uv = np * 2.0 - 1.0;
              uv.x *= uResolution.x / uResolution.y;
              return vec3(uv * 2.0, 0.0);
            }
            float getDistanceToCenter(vec2 pos) {
              return smoothstep(0.0, 1.0, length(pos - vec2(0.5)) * 2.0);
            }
            float sceneSDF(vec3 pos) {
              float result = MAX_DIST;
              vec3 tlPos = screenToWorld(vec2(0.08, 0.92));
              float tl = sdSphere(pos - tlPos, uFixedTopLeftRadius);
              vec3 stlPos = screenToWorld(vec2(0.25, 0.72));
              float stl = sdSphere(pos - stlPos, uSmallTopLeftRadius);
              vec3 brPos = screenToWorld(vec2(0.92, 0.08));
              float br = sdSphere(pos - brPos, uFixedBottomRightRadius);
              vec3 sbrPos = screenToWorld(vec2(0.72, 0.25));
              float sbr = sdSphere(pos - sbrPos, uSmallBottomRightRadius);
              float t = uTime * uAnimationSpeed;
              float dms = uMovementScale;
              if (uMouseProximityEffect) {
                float dc = getDistanceToCenter(uMousePosition);
                dms = mix(uMinMovementScale, uMaxMovementScale, smoothstep(0.0, 1.0, dc));
              }
              int maxIter = uIsMobile > 0.5 ? 4 : (uIsLowPower > 0.5 ? 6 : min(uSphereCount, 10));
              for (int i = 0; i < 10; i++) {
                if (i >= uSphereCount || i >= maxIter) break;
                float fi = float(i);
                float speed = 0.4 + fi * 0.12;
                float radius = 0.12 + mod(fi, 3.0) * 0.06;
                float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dms;
                float phaseOffset = fi * PI * 0.35;
                float distToCursor = length(vec3(0.0) - uCursorSphere);
                float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
                orbitRadius *= proximityScale;
                vec3 offset;
                if (i == 0) {
                  offset = vec3(sin(t*speed)*orbitRadius*0.7, sin(t*0.5)*orbitRadius, cos(t*speed*0.7)*orbitRadius*0.5);
                } else if (i == 1) {
                  offset = vec3(sin(t*speed+PI)*orbitRadius*0.5, -sin(t*0.5)*orbitRadius, cos(t*speed*0.7+PI)*orbitRadius*0.5);
                } else {
                  offset = vec3(sin(t*speed+phaseOffset)*orbitRadius*0.8, cos(t*speed*0.85+phaseOffset*1.3)*orbitRadius*0.6, sin(t*speed*0.5+phaseOffset)*0.3);
                }
                vec3 toCursor = uCursorSphere - offset;
                float cursorDist = length(toCursor);
                if (cursorDist < uMergeDistance && cursorDist > 0.0) {
                  float attraction = (1.0 - cursorDist / uMergeDistance) * 0.3;
                  offset += normalize(toCursor) * attraction;
                }
                float ms = sdSphere(pos - offset, radius);
                float blend = 0.05;
                if (cursorDist < uMergeDistance) {
                  float influence = 1.0 - (cursorDist / uMergeDistance);
                  blend = mix(0.05, uSmoothness, influence * influence * influence);
                }
                result = smin(result, ms, blend);
              }
              float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
              float tlGroup = smin(tl, stl, 0.4);
              float brGroup = smin(br, sbr, 0.4);
              result = smin(result, tlGroup, 0.3);
              result = smin(result, brGroup, 0.3);
              result = smin(result, cursorBall, uSmoothness);
              return result;
            }
            vec3 calcNormal(vec3 p) {
              float eps = uIsLowPower > 0.5 ? 0.002 : 0.001;
              return normalize(vec3(
                sceneSDF(p+vec3(eps,0,0)) - sceneSDF(p-vec3(eps,0,0)),
                sceneSDF(p+vec3(0,eps,0)) - sceneSDF(p-vec3(0,eps,0)),
                sceneSDF(p+vec3(0,0,eps)) - sceneSDF(p-vec3(0,0,eps))
              ));
            }
            float ambientOcclusion(vec3 p, vec3 n) {
              if (uIsLowPower > 0.5) {
                float h1 = sceneSDF(p + n * 0.03);
                float h2 = sceneSDF(p + n * 0.06);
                return clamp(1.0 - ((0.03-h1) + (0.06-h2)*0.5)*2.0, 0.0, 1.0);
              }
              float occ = 0.0; float weight = 1.0;
              for (int i = 0; i < 6; i++) {
                float dist = 0.01 + 0.015 * float(i*i);
                occ += (dist - sceneSDF(p + n * dist)) * weight;
                weight *= 0.85;
              }
              return clamp(1.0 - occ, 0.0, 1.0);
            }
            float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
              float result = 1.0; float t = mint;
              int steps = uIsLowPower > 0.5 ? 3 : 20;
              for (int i = 0; i < 20; i++) {
                if (i >= steps || t >= maxt) break;
                float h = sceneSDF(ro + rd * t);
                if (h < EPSILON) return 0.0;
                result = min(result, k * h / t);
                t += uIsLowPower > 0.5 ? 0.3 : h;
              }
              return result;
            }
            float rayMarch(vec3 ro, vec3 rd) {
              float t = 0.0;
              int maxSteps = uIsMobile > 0.5 ? 16 : (uIsSafari > 0.5 ? 16 : 48);
              for (int i = 0; i < 48; i++) {
                if (i >= maxSteps) break;
                vec3 p = ro + rd * t;
                float d = sceneSDF(p);
                if (d < EPSILON) return t;
                if (t > 5.0) break;
                t += d * (uIsLowPower > 0.5 ? 1.2 : 0.9);
              }
              return -1.0;
            }
            vec3 lighting(vec3 p, vec3 rd, float t) {
              if (t < 0.0) return vec3(0.0);
              vec3 normal = calcNormal(p);
              vec3 viewDir = -rd;
              vec3 baseColor = uSphereColor;
              float ao = ambientOcclusion(p, normal);
              vec3 ambient = uLightColor * uAmbientIntensity * ao;
              vec3 lightDir = normalize(uLightPosition);
              float diff = max(dot(normal, lightDir), 0.0);
              float shadow = softShadow(p, lightDir, 0.01, 10.0, 20.0);
              vec3 diffuse = uLightColor * diff * uDiffuseIntensity * shadow;
              vec3 reflectDir = reflect(-lightDir, normal);
              float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
              float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
              vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;
              vec3 fresnelRim = uLightColor * fresnel * 0.4;
              float dtc = length(p - uCursorSphere);
              if (dtc < uCursorRadius + 0.4) {
                float hl = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, dtc);
                specular += uLightColor * hl * 0.2;
                ambient += uLightColor * exp(-dtc * 3.0) * 0.15 * 0.5;
              }
              vec3 color = (baseColor + ambient + diffuse + specular + fresnelRim) * ao;
              color = pow(color, vec3(uContrast * 0.9));
              color = color / (color + vec3(0.8));
              return color;
            }
            float calculateCursorGlow(vec3 wp) {
              float dist = length(wp.xy - uCursorSphere.xy);
              float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
              return pow(glow, 2.0) * uCursorGlowIntensity;
            }
            void main() {
              vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
              uv.x *= uResolution.x / uResolution.y;
              vec3 ro = vec3(uv * 2.0, -1.0);
              vec3 rd = vec3(0.0, 0.0, 1.0);
              float t = rayMarch(ro, rd);
              vec3 p = ro + rd * t;
              vec3 color = lighting(p, rd, t);
              float cursorGlow = calculateCursorGlow(ro);
              vec3 glowContribution = uCursorGlowColor * cursorGlow;
              if (t > 0.0) {
                float fogAmount = 1.0 - exp(-t * uFogDensity);
                color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);
                color += glowContribution * 0.3;
                gl_FragColor = vec4(color, 1.0);
              } else {
                if (cursorGlow > 0.01) {
                  gl_FragColor = vec4(glowContribution, cursorGlow * 0.8);
                } else {
                  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                }
              }
            }
          `,
          transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const targetMouse = new THREE.Vector2(0.5, 0.5);
        const mousePos = new THREE.Vector2(0.5, 0.5);
        const cursorSphere3D = new THREE.Vector3(0, 0, 0);

        function screenToWorldJS(nx: number, ny: number) {
          const ux = nx * 2.0 - 1.0;
          const uy = ny * 2.0 - 1.0;
          const aspect = window.innerWidth / window.innerHeight;
          return new THREE.Vector3(ux * aspect * 2.0, uy * 2.0, 0.0);
        }

        const onPointerMove = (e: MouseEvent | { clientX: number; clientY: number }) => {
          targetMouse.x = e.clientX / window.innerWidth;
          targetMouse.y = 1.0 - e.clientY / window.innerHeight;
          const wp = screenToWorldJS(targetMouse.x, targetMouse.y);
          cursorSphere3D.copy(wp);

          let closestDist = 1000;
          const fixedPositions = [
            screenToWorldJS(0.08, 0.92), screenToWorldJS(0.25, 0.72),
            screenToWorldJS(0.92, 0.08), screenToWorldJS(0.72, 0.25),
          ];
          fixedPositions.forEach((pos) => {
            closestDist = Math.min(closestDist, cursorSphere3D.distanceTo(pos));
          });
          const pf = Math.max(0, 1.0 - closestDist / settings.mergeDistance);
          const sf = pf * pf * (3.0 - 2.0 * pf);
          const dr = settings.cursorRadiusMin + (settings.cursorRadiusMax - settings.cursorRadiusMin) * sf;
          material.uniforms.uCursorSphere.value.copy(cursorSphere3D);
          material.uniforms.uCursorRadius.value = dr;
        };

        window.addEventListener("mousemove", onPointerMove, { passive: true });

        const onTouchMove = (e: TouchEvent) => {
          if (e.touches.length > 0) {
            onPointerMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
          }
        };
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        const onResize = () => {
          const nw = window.innerWidth;
          const nh = window.innerHeight;
          const pr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
          renderer.setSize(nw, nh);
          renderer.setPixelRatio(pr);
          material.uniforms.uResolution.value.set(nw, nh);
          material.uniforms.uActualResolution.value.set(nw * pr, nh * pr);
          material.uniforms.uPixelRatio.value = pr;
        };
        window.addEventListener("resize", onResize, { passive: true });

        onPointerMove({ clientX: w / 2, clientY: h / 2 });

        let animId: number;
        const animate = () => {
          animId = requestAnimationFrame(animate);
          mousePos.x += (targetMouse.x - mousePos.x) * settings.mouseSmoothness;
          mousePos.y += (targetMouse.y - mousePos.y) * settings.mouseSmoothness;
          material.uniforms.uTime.value = clock.getElapsedTime();
          material.uniforms.uMousePosition.value = mousePos;
          renderer.render(scene, camera);
        };
        animate();

        // Cleanup stored for unmount
        (container as any).__metaball_cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("mousemove", onPointerMove);
          window.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
          geometry.dispose();
          material.dispose();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        };
      } catch (e) {
        console.warn("Metaball background failed to load:", e);
      }
    };

    loadMetaball();

    return () => {
      if (containerRef.current && (containerRef.current as any).__metaball_cleanup) {
        (containerRef.current as any).__metaball_cleanup();
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-auto" />;
};

export default MetaballBackground;
