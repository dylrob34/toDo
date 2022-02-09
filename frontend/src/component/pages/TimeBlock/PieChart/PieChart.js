"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChart = void 0;
const react_1 = __importDefault(require("react"));
const pieEntry_1 = require("./pieEntry");
const PieChart = (props) => {
    react_1.default.useEffect(() => {
        (0, pieEntry_1.pieChart)(props.categories, props.resolution || 1, props.defaultColor || [0, 0, 0], props.MSAASamples || 4, props.font || "25px Arial");
    }, [props.categories, props.resolution, props.defaultColor, props.MSAASamples, props.width, props.height, props.font]);
    return (react_1.default.createElement("div", { style: { display: "flex" } },
        react_1.default.createElement("canvas", { id: "piecharttextcanvas", width: props.width * .4, height: props.height }),
        react_1.default.createElement("canvas", { id: "piechartcanvas", width: props.width, height: props.height })));
};
exports.PieChart = PieChart;
