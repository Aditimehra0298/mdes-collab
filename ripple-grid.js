// Ripple Grid Effect using OGL
import { Renderer, Program, Triangle, Mesh } from './node_modules/ogl/src/index.mjs';

class RippleGrid {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            enableRainbow: options.enableRainbow || false,
            gridColor: options.gridColor || '#f97316',
            rippleIntensity: options.rippleIntensity || 0.05,
            gridSize: options.gridSize || 10.0,
            gridThickness: options.gridThickness || 15.0,
            fadeDistance: options.fadeDistance || 1.5,
            vignetteStrength: options.vignetteStrength || 2.0,
            glowIntensity: options.glowIntensity || 0.1,
            opacity: options.opacity || 0.8,
            gridRotation: options.gridRotation || 0,
            mouseInteraction: options.mouseInteraction !== false,
            mouseInteractionRadius: options.mouseInteractionRadius || 1.2
        };

        this.mousePosition = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.mouseInfluence = 0;

        this.init();
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [
                parseInt(result[1], 16) / 255,
                parseInt(result[2], 16) / 255,
                parseInt(result[3], 16) / 255
              ]
            : [1, 1, 1];
    }

    init() {
        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true
        });

        const gl = renderer.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        gl.canvas.style.position = 'absolute';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        this.container.appendChild(gl.canvas);

        const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

        const fragment = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`;

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [1, 1] },
            enableRainbow: { value: this.options.enableRainbow },
            gridColor: { value: this.hexToRgb(this.options.gridColor) },
            rippleIntensity: { value: this.options.rippleIntensity },
            gridSize: { value: this.options.gridSize },
            gridThickness: { value: this.options.gridThickness },
            fadeDistance: { value: this.options.fadeDistance },
            vignetteStrength: { value: this.options.vignetteStrength },
            glowIntensity: { value: this.options.glowIntensity },
            opacity: { value: this.options.opacity },
            gridRotation: { value: this.options.gridRotation },
            mouseInteraction: { value: this.options.mouseInteraction },
            mousePosition: { value: [0.5, 0.5] },
            mouseInfluence: { value: 0 },
            mouseInteractionRadius: { value: this.options.mouseInteractionRadius }
        };

        this.uniforms = uniforms;
        this.renderer = renderer;

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex, fragment, uniforms });
        const mesh = new Mesh(gl, { geometry, program });
        this.mesh = mesh;

        // Handle resize
        const resize = () => {
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            renderer.setSize(w, h);
            uniforms.iResolution.value = [w, h];
        };
        window.addEventListener('resize', resize);
        resize();

        // Mouse interaction
        if (this.options.mouseInteraction) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1.0 - (e.clientY - rect.top) / rect.height;
                this.targetMouse = { x, y };
            });

            this.container.addEventListener('mouseenter', () => {
                this.mouseInfluence = 1.0;
            });

            this.container.addEventListener('mouseleave', () => {
                this.mouseInfluence = 0.0;
            });
        }

        // Animation loop
        const render = (t) => {
            uniforms.iTime.value = t * 0.001;

            // Smooth mouse position
            const lerpFactor = 0.1;
            this.mousePosition.x += (this.targetMouse.x - this.mousePosition.x) * lerpFactor;
            this.mousePosition.y += (this.targetMouse.y - this.mousePosition.y) * lerpFactor;

            // Smooth mouse influence
            const currentInfluence = uniforms.mouseInfluence.value;
            uniforms.mouseInfluence.value += (this.mouseInfluence - currentInfluence) * 0.05;

            uniforms.mousePosition.value = [this.mousePosition.x, this.mousePosition.y];

            renderer.render({ scene: mesh });
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }
}

// Initialize ripple grids when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRippleGrids);
} else {
    initRippleGrids();
}

function initRippleGrids() {
    // ITC Feature Cards
    const itcCards = document.querySelectorAll('.feature-card, .eurocert-feature-card');
    itcCards.forEach(card => {
        const rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple-grid-container';
        rippleContainer.style.position = 'absolute';
        rippleContainer.style.top = '0';
        rippleContainer.style.left = '0';
        rippleContainer.style.width = '100%';
        rippleContainer.style.height = '100%';
        rippleContainer.style.pointerEvents = 'none';
        rippleContainer.style.zIndex = '0';
        rippleContainer.style.overflow = 'hidden';
        
        card.style.position = 'relative';
        card.insertBefore(rippleContainer, card.firstChild);
        
        new RippleGrid(rippleContainer, {
            gridColor: '#f97316',
            rippleIntensity: 0.03,
            gridSize: 8,
            gridThickness: 12,
            opacity: 0.3,
            mouseInteraction: true,
            mouseInteractionRadius: 1.5
        });
    });
}

export default RippleGrid;


