import React, { JSX, ReactElement, ReactNode } from 'react'

interface LoopProps<T> {
  collection: T[]
  children: (item: T, index?: number, collection?: T[]) => ReactNode
}

function Loop<T,>({ children, collection }: LoopProps<T>) {
  return collection.map((item, index, arr) => children(item, index, arr))
}


interface IfElseProps {
  children: [ReactNode, ReactNode] | ReactNode;
  condition: boolean
}

function IfElse({ children, condition }: IfElseProps): ReactNode {
  if (Array.isArray(children)) {
    const [truthy, falsy] = children;
    return condition ? truthy : falsy;
  }

  return condition ? children : null;
}

interface CaseProps {
  'data-case'?: any;
  'data-default'?: boolean;
  default?: boolean;
  children: ReactNode;
}

interface SwitchCaseProps {
  children: ReactElement<CaseProps> | ReactElement<CaseProps>[];
  expression: any;
}

function SwitchCase({ children, expression }: SwitchCaseProps): ReactNode {
  const childrenArray = React.Children.toArray(children) as ReactElement<CaseProps>[];

  const matchingChild = childrenArray.find(
    (child) => child.props['data-case'] === expression
  );

  if (matchingChild) {
    return matchingChild.props.children;
  }

  const defaultChild = childrenArray.find((child) => child.props['data-default']);

  if (defaultChild) {
    return defaultChild.props.children;
  }

  return null;
}

export { Loop, IfElse, SwitchCase }