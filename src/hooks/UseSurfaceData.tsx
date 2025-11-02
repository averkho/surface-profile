import { useState, useCallback, useEffect } from 'react';

interface UseSurfaceDataReturn {
    pointGrid: any | null; 
}

export function UseSurfaceData(): UseSurfaceDataReturn{

    return {
        pointGrid: null
    };
} 

