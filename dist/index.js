"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = Loop;
exports.IfElse = IfElse;
exports.SwitchCase = SwitchCase;
const react_1 = __importDefault(require("react"));
function Loop({ children, collection }) {
    return collection.map((item, index, arr) => children(item, index, arr));
}
function IfElse({ children, condition }) {
    if (Array.isArray(children)) {
        const [truthy, falsy] = children;
        return condition ? truthy : falsy;
    }
    return condition ? children : null;
}
function SwitchCase({ children, expression }) {
    const childrenArray = react_1.default.Children.toArray(children);
    const matchingChild = childrenArray.find((child) => child.props['data-case'] === expression);
    if (matchingChild) {
        return matchingChild.props.children;
    }
    const defaultChild = childrenArray.find((child) => child.props.default);
    if (defaultChild) {
        return defaultChild.props.children;
    }
    return null;
}
