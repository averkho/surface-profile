export interface LegendItem {
    color: string;
    label: string;
}

export interface InfoItem {
    label: string;
    value: string;
    isRed?: boolean;
    hasDot?: boolean;
}

export interface SurfaceContent {
    surface_points: import('./surface').Point[];
    array: number[][][];
    avg_disappeared_quality: number | null;
}