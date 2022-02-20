import React from "react";
import { pieChart } from "./pieEntry";
export const PieChart = (props) => {
    React.useEffect(() => {
        if (navigator.gpu) {
            pieChart(props.categories, props.resolution || 1, props.defaultColor || [0, 0, 0], props.MSAASamples || 4, props.font || "25px Arial");
        }
    }, [props.categories, props.resolution, props.defaultColor, props.MSAASamples, props.width, props.height, props.font]);
    return (React.createElement("div", { style: { display: "flex" } }, navigator.gpu ?
        React.createElement("div", null,
            React.createElement("canvas", { id: "piecharttextcanvas", width: props.width * .4, height: props.height }),
            React.createElement("canvas", { id: "piechartcanvas", width: props.width, height: props.height }))
        :
            "Your browser does not support this new feature. Please update your new browser, or switch to a modern one."));
};
