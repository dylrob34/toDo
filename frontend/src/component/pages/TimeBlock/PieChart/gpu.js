"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const exports = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckWebGPU = exports.createUIntBuffer = exports.createBuffer = exports.initGPU = void 0;
function initGPU(canvasName) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = document.getElementById(canvasName);
        const adapter = yield navigator.gpu.requestAdapter();
        const device = yield adapter.requestDevice();
        const context = canvas.getContext("webgpu");
        const width = canvas.width;
        const height = canvas.height;
        const swapChainFormat = "bgra8unorm";
        context.configure({
            device: device,
            format: swapChainFormat,
        });
        return { canvas, width, height, device, context, swapChainFormat };
    });
}
exports.initGPU = initGPU;
function createBuffer(device, data, usageFlag = 32 | 8) {
    const buffer = device.createBuffer({
        size: data.byteLength,
        usage: usageFlag,
        mappedAtCreation: true
    });
    new Float32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
}
exports.createBuffer = createBuffer;
function createUIntBuffer(device, data, usageFlag = 32 | 8) {
    const buffer = device.createBuffer({
        size: data.byteLength,
        usage: usageFlag,
        mappedAtCreation: true
    });
    new Uint32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
}
exports.createUIntBuffer = createUIntBuffer;
function CheckWebGPU() {
    let result = "Great, your current browser supports WebGPU!";
    if (!navigator.gpu) {
        result = "Your current browser does not support WebGPU";
    }
    return result;
}
exports.CheckWebGPU = CheckWebGPU;
