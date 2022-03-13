
import { Shaders } from "./shaders";
import { initGPU, createBuffer } from "./gpu";var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const RADIUS = 1;
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function rotate(angle, point) {
    let resultX = (point[0] * Math.cos(toRadians(angle))) + (point[1] * Math.sin(toRadians(angle)));
    let resultY = (-1 * point[0] * Math.sin(toRadians(angle))) + (point[1] * Math.cos(toRadians(angle)));
    return [resultX, resultY];
}
function rotateMatrix(angle, matrix) {
    let vertexs = [];
    for (var i = 0; i < matrix.length; i++) {
        vertexs.push(rotate(angle, matrix[i]));
    }
    return vertexs;
}
function matToArray(matrix) {
    let arr = [];
    for (var i = 0; i < matrix.length; i++) {
        arr.push(matrix[i][0]);
        arr.push(matrix[i][1]);
    }
    return arr;
}
function createWedge(start, current, resolution) {
    let vertexs = [];
    // center
    vertexs.push([.0, .0]);
    // top
    vertexs.push([.0, RADIUS]);
    // right
    let right = rotate(current, [.0, RADIUS]);
    vertexs.push(right);
    // build small triangles
    //const halfway = [.0 - (.0 - right[0]) / 2, .9 - (.9 - right[RADIUS]) / 2];
    const halfway = [right[0] / 2, RADIUS - (RADIUS - right[RADIUS]) / 2];
    // rotate by start
    let beginX = .0;
    let beginY = RADIUS;
    let max = current * resolution;
    for (var i = 1; i < max + 1; i++) {
        // first
        vertexs.push([beginX, beginY]);
        // second
        let end = rotate(current / max * i, [0.0, RADIUS]);
        vertexs.push(end);
        // center
        vertexs.push(halfway);
        beginX = end[0];
        beginY = end[1];
    }
    vertexs = rotateMatrix(start, vertexs);
    vertexs = matToArray(vertexs);
    //offsetMatrix(vertexs);
    return vertexs;
}
function getWedgeColorVertexs(start, size, resolution, color) {
    let wedge = createWedge(start, size, resolution);
    let colors = new Uint8Array(wedge.length * 3 / 2);
    for (var i = 0; i < colors.length; i += 3) {
        colors[i] = color[0];
        colors[i + 1] = color[1];
        colors[i + 2] = color[2];
    }
    return [colors, wedge];
}
function rgbToHex(color) {
    let hex = "#";
    color.forEach(c => {
        let newHex = c.toString(16);
        hex = hex.concat(newHex.length === 1 ? "0" + newHex : newHex);
    });
    return hex;
}
function renderText(categories, width, height, font) {
    categories = categories.sort((a, b) => b.size - a.size);
    ;
    const canvas = document.getElementById("piecharttextcanvas");
    if (canvas === null) {
        return;
    }
    const textContext = canvas.getContext("2d");
    const elementHeight = height / (categories.length + 1);
    if (textContext !== null) {
        textContext.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < categories.length; i++) {
            textContext.beginPath();
            textContext.rect(width / 8, (elementHeight * (i + 1)) - 2, 14, 14);
            textContext.fillStyle = rgbToHex(categories[i].color);
            textContext.fill();
            textContext.closePath();
            textContext.fillStyle = "white";
            textContext.font = font;
            textContext.fillText(categories[i].name + " " + Math.round(categories[i].size / 360 * 100) + "%", width / 8 + 25, (elementHeight * (i + 1)) + 10);
        }
    }
}
export function pieChart(categories, resolution, defaultColor, MSAASamples, font) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.gpu) {
            throw ("Your current browser does not support WebGPU!");
        }
        categories = categories.sort((a, b) => a.size - b.size);
        let total = 0;
        for (let i = 0; i < categories.length; i++) {
            total += categories[i].size;
            ;
        }
        if (total < 360) {
            categories.push({
                name: "Nothing",
                size: 360 - total,
                color: defaultColor
            });
        }
        const gpu = yield initGPU("piechartcanvas");
        const device = gpu.device;
        const context = gpu.context;
        const swapChainFormat = gpu.swapChainFormat;
        let currentStart = 0;
        let vertexs = [];
        let colors = [];
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].size > 180) {
                const categorySize = categories[i].size;
                const min = Math.floor(categorySize / 180);
                const remainder = categorySize % 180;
                let wedges;
                if (remainder === 0) {
                    wedges = min;
                }
                else {
                    wedges = min + 1;
                }
                for (let j = 0; j < wedges; j++) {
                    let size = 180;
                    if (j === wedges - 1 && remainder !== 0) {
                        size = remainder;
                    }
                    const colorVerts = getWedgeColorVertexs(currentStart, size, resolution, categories[i].color);
                    for (const c of colorVerts[0]) {
                        colors.push(c);
                    }
                    for (const v of colorVerts[1]) {
                        vertexs.push(v);
                    }
                    currentStart += size;
                }
            }
            else {
                const colorVerts = getWedgeColorVertexs(currentStart, categories[i].size, resolution, categories[i].color);
                for (const c of colorVerts[0]) {
                    colors.push(c);
                }
                for (const v of colorVerts[1]) {
                    vertexs.push(v);
                }
            }
            currentStart += categories[i].size;
        }
        const vertexBuffer = createBuffer(device, Float32Array.from(vertexs));
        const colorBuffer = createBuffer(device, Float32Array.from(colors).map((e) => { return e / 255; }));
        const shader = Shaders();
        const pipeline = device.createRenderPipeline({
            vertex: {
                module: device.createShaderModule({
                    code: shader.vertex
                }),
                buffers: [{
                        arrayStride: 8,
                        attributes: [{
                                format: "float32x2",
                                offset: 0,
                                shaderLocation: 0
                            }]
                    }, {
                        arrayStride: 12,
                        attributes: [{
                                format: "float32x3",
                                offset: 0,
                                shaderLocation: 1
                            }]
                    }],
                entryPoint: "main"
            },
            multisample: {
                count: MSAASamples,
                alphaToCoverageEnabled: false
            },
            fragment: {
                module: device.createShaderModule({
                    code: shader.fragment
                }),
                entryPoint: "main",
                targets: [{
                        format: swapChainFormat
                    }]
            },
            primitive: { topology: "triangle-list" },
        });
        const commandEncoder = device.createCommandEncoder();
        const myTexture = device.createTexture({
            size: {
                width: gpu.width,
                height: gpu.height
            },
            sampleCount: MSAASamples,
            format: swapChainFormat,
            usage: 16 // GPUTextureUsage.RENDER_ATTACHMENT // 16
        });
        const attachment = myTexture.createView();
        const textureView = context.getCurrentTexture().createView();
        let colorAttachments = [];
        if (MSAASamples === 1) {
            colorAttachments.push({
                view: textureView,
                loadOp: "load",
                storeOp: "store"
            });
        }
        else {
            colorAttachments.push({
                view: attachment,
                resolveTarget: textureView,
                loadOp: "load",
                storeOp: "store"
            });
        }
        const renderPass = commandEncoder.beginRenderPass({ colorAttachments });
        renderPass.setPipeline(pipeline);
        renderPass.setVertexBuffer(0, vertexBuffer);
        renderPass.setVertexBuffer(1, colorBuffer);
        renderPass.draw(vertexs.length / 2);
        renderPass.end();
        device.queue.submit([commandEncoder.finish()]);
        renderText(categories, gpu.width / .6 * .4, gpu.height, font);
    });
}
/*
    let pieButton = document.getElementById("pie");
    if (pieButton != null) {
        pieButton.onclick = () => {
            const input = document.getElementById("id-array") as HTMLInputElement;
            let resolutionInput = document.getElementById("id-resolution") as HTMLInputElement;
            const resolution: number = parseInt(resolutionInput.value);

            const inputArr = input.value.split(",");
            let newArr: Array<number> = [];
            let total = 0;
            for (let i = 0; i < inputArr.length; i++) {
                const num = parseInt(inputArr[i]);
                total += num;
                newArr.push(num);
            }
            if (total < 360) {
                newArr.push(360 - total);
            }

            console.log(`InnerText: ${resolution}`)
            if (resolution != null) {
                pieChart(newArr, resolution);
            }
        }
    } else {
        console.log("Fuck the button");
    }
    */
//}
