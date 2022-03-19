export const Shaders = () => {
    const vertex = `
        struct Inputs {
            @location(0) pos : vec4<f32>;
            @location(1) index: vec4<f32>;
        };

        struct Outputs {
            @builtin(position) Position : vec4<f32>;
            @location(0) vColor : vec4<f32>;
        };

        @stage(vertex)
        fn main(in: Inputs) -> Outputs {
            let outPos = vec4<f32>(in.pos[0], in.pos[1], 0.0, 1.0);
            let outColor = vec4<f32>(in.index[0], in.index[1], in.index[2], 1.0);
            var out: Outputs;
            out.Position = outPos;
            out.vColor = outColor;
            return out;
        }
    `;
    const fragment = `
        @stage(fragment)
        fn main(@location(0) vColor : vec4<f32>) -> @location(0) vec4<f32> {
            return vColor;
        }
    `;
    return { vertex, fragment };
};
export const ShadersGL = () => {
    const vertex = `#version 300 es
        in vec2 coordinates;
        in vec3 colors;
        out vec4 color;
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
            color = vec4(colors, 1.0);
        }
    `;
    const fragment = `#version 300 es
        precision highp float;
        in vec4 color;
        out vec4 outColor;
        void main(void) {
            outColor = color;
        }
    `;
    return { vertex, fragment };
};
