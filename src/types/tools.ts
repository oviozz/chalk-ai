
export type Tool = 'pen' | 'rectangle' | 'text';
export type Drawing = {
    type: Tool | 'text';
    points: number[][];
    color: string;
    strokeWidth: number;
    text?: string;
};