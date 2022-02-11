"use strict";
const exports = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shaders = void 0;
const Shaders = () => {
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
exports.Shaders = Shaders;
