import { useState, useCallback, useEffect } from 'react';
import { loadSurfaceFileContent, loadSurface } from '@/utils/fileManager';
import { PointGrid, convertToPointGrid, SurfaceFile } from '@/types/surface';
import { SurfaceContent  } from '@/types/components';


interface UseSurfaceDataReturn {
    pointGrid: any | null; 
    currentFile: string;
    surface: SurfaceFile | null;
    avgDisappearedQuality: number | null;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
}

export function UseSurfaceData(): UseSurfaceDataReturn {
    const [pointGrid, setPointGrid] = useState<PointGrid>(new Map());
    const [currentFile, setCurrentFile] = useState<string>('');
    const [surface, setSurface] = useState<SurfaceFile | null>(null);
    const [avgDisappearedQuality, setAvgDisappearedQuality] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleFileSelect = useCallback(async (filename: string) => {
        try {
            const content = await loadSurfaceFileContent(filename);
            const surfaceData = await loadSurface(filename);
            
            if (!isPlaying){
                return;
            }

            let parsedPoints = content.surface_point;
            const validPoints = parsedPoints.filter(p =>
                typeof p.x === 'number' && !isNaN(p.x) &&
                typeof p.y === 'number' && !isNaN(p.y) &&
                typeof p.z === 'number' && !isNaN(p.z)
            );

            if (validPoints.length !== parsedPoints.length) {
                console.warn('Некорректные точки были отброшены:', parsedPoints.length - validPoints.length);
            }
            parsedPoints =validPoints;

            setSurface(surfaceData);
            const grid = convertToPointGrid(content.array);
            setAvgDisappearedQuality(content.avg_disappeared_quality);
            setPointGrid(grid);
            setCurrentFile(filename);
        }
        catch (error) {
            console.error('Ошибка при загрузке файла: ', error);
            setIsPlaying(false);
        }
    }, [isPlaying]);
 
    return {
        pointGrid: null
    };
} 

