import { Ubuntu } from 'next/font/google';
import * as THREE from 'three';

export interface Point {
    x: number;
    y: number;
    z: number;
    color?: string;
    quality?: number;
}

export interface SurfaceLayer {
    id: string;
    name: string;
    points: Point[];
    visible: boolean;
    color?: string;
};

export interface SurfaceFile {
    name: string;
    geometries: THREE.BufferGeometry[];
    materials: THREE.Material[];
};

export type PointGrid = Map<number, Map<number, Point[]>>;

export type PointGridJSON = {
    [x: string] : {
        [y: string] : Point[];
    };
};

export function convertToPointGrid(obj: PointGridJSON): PointGrid {
    const grid = new Map<number, Map<number, Point[]>>();

    Object.entries(obj).forEach(([xStr, yMap]) => {
        const x = Number(xStr);
        const yMapObj = new Map<number, Point[]>();

        Object.entries(yMap).forEach(([yStr, points]) => {
            const y = Number(yStr);
            const sortedPoints = [...points].sort((a, b) => a.z - b.z);
            yMapObj.set(y, sortedPoints);
        });

        grid.set(x, yMapObj);

    });
    return grid;    
}

export function getUniqueCoordinates(points: Point[]) : { x: number[], y: number[] } 
{
    const uniqueX = Array.from(new Set(points.map(p => p.x))).sort((a,b) => a - b);
    const uniqueY = Array.from(new Set(points.map(p => p.y))).sort((a,b) => a - b);
    return { x: uniqueX, y: uniqueY};
}

export function updatePointGrid(grid: PointGrid, newPoints: Point[]) : PointGrid {
    const newGrid = new Map(grid);
    newPoints.forEach(point => {
        if (!newGrid.has(point.x)) {
            newGrid.set(point.x, new Map());
        }
        const yMap = newGrid.get(point.x)!;

        if (!yMap.has(point.y)){
            yMap.set(point.y, [point]);
        }
        else {
            let arr = yMap.get(point.y)!;
            arr = arr.filter(p => p.z <= point.z);
            arr.push(point);
            arr.sort((a,b) => a.z - b.z);
            yMap.set(point.y, arr);
        }
    })
    return newGrid;
}

// Функция для полчения верхних точек для 3D
export function getTopPoints(grid: PointGrid): Point[] {
    const points: Point[] = [];
    grid.forEach(yMap =>{
        yMap.forEach(arr => {
            if (arr.length > 0) {
                points.push(arr[arr.length - 1]);
            }
        });
    });

    return points;
}

// Функция для получения всех точек для среза Х (все слои)

export function getAllSectionPoints(grid: PointGrid, x: number) : Point[]{
    const yMap = grid.get(x);
    if (!yMap) return [];
    let result: Point[] = [];
    yMap.forEach(arr => {
        result = result.concat(arr);
    });
    result.sort((a,b) => a.y - b.y || a.z - b.z);
    return result;
}

// Функция для получения всех точек из сетки
export function getAllPoints(grid: PointGrid): Point[] {
    const points: Point[] = [];
    grid.forEach(yMap => {
        yMap.forEach( arr => {
            points.push(...arr);
        });
    });

    return points;
}
