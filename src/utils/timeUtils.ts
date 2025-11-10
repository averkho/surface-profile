
export function extractTimeFromFileName(fileName: string): string {
    const baseName = fileName.replace(/\.[^/.]+$/,'');
    if (/^\d+$/.test(baseName)) {
        const seconds = parseInt(baseName, 10);
        const date = new Date(seconds * 1000);
        if (!isNaN(date.getTime())){
            const hh = String(date.getHours()).padStart(2, '0');
            const mm = String(date.getMinutes()).padStart(2, '0');
            return `${hh}:${mm}`;
        }

    }
    return fileName;
}