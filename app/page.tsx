'use client';

import { useEffect, useRef, useState, useMemo } from "react";

export default function Home() {
  const [sectionX, setSectionX] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const {
    pointGrid,
    currentFile,
    surface,
    avgDisappearedQuality,
  } = userSurfaceData();
  
  return (
    <h1> "Hello World" </h1>
  )
}
