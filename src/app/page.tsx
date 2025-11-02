'use client';

import { useEffect, useRef, useState, useMemo } from "react";
import { UseSurfaceData } from '@/hooks/UseSurfaceData';

export default function Home() {
  const [sectionX, setSectionX] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const {
    pointGrid,
  } = UseSurfaceData();
  
  return (
    <h1> "Hello World" </h1>
  )
}
