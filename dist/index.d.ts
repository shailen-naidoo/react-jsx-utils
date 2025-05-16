import React, { ReactElement, ReactNode } from 'react';
interface LoopProps<T> {
    collection: T[];
    children: (item: T, index?: number, collection?: T[]) => ReactNode;
}
declare function Loop<T>({ children, collection }: LoopProps<T>): React.ReactNode[];
interface IfElseProps {
    children: [ReactNode, ReactNode] | ReactNode;
    condition: boolean;
}
declare function IfElse({ children, condition }: IfElseProps): ReactNode;
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
declare function SwitchCase({ children, expression }: SwitchCaseProps): ReactNode;
export { Loop, IfElse, SwitchCase };
//# sourceMappingURL=index.d.ts.map