import React from 'react';
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
    const childrenArray = React.Children.toArray(children);
    const matchingChild = childrenArray.find((child) => child.props['data-case'] === expression);
    if (matchingChild) {
        return matchingChild.props.children;
    }
    const defaultChild = childrenArray.find((child) => 'data-default' in child.props);
    if (defaultChild) {
        return defaultChild.props.children;
    }
    return null;
}
export { Loop, IfElse, SwitchCase };
//# sourceMappingURL=index.js.map