
// useWhiteboard.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type Tool = 'pen' | 'image';
type Drawing = {
    type: Tool;
    points: number[][];
    color: string;
    strokeWidth: number;
};

type Image = {
    id: string;
    dataURL: string;
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: number;
    isDragging: boolean;
};

const useWhiteboard = () => {
    const [selectedTool, setSelectedTool] = useState<Tool>('pen');
    const [color, setColor] = useState('#ffffff');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [drawings, setDrawings] = useState<Drawing[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [history, setHistory] = useState<{ drawings: Drawing[], images: Image[] }[]>([{ drawings: [], images: [] }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const startPos = useRef<{ x: number; y: number } | null>(null);
    const imagesCache = useRef<Map<string, HTMLImageElement>>(new Map());

    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState<'nw' | 'ne' | 'sw' | 'se'>('se');
    const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const imageStartProps = useRef<{ x: number; y: number; width: number; height: number }>({
        x: 0, y: 0, width: 0, height: 0
    });

    const pushHistory = useCallback((newDrawings: Drawing[], newImages: Image[]) => {
        setHistory(prev => {
            const newHistory = [...prev.slice(0, historyIndex + 1), { drawings: newDrawings, images: newImages }];
            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [historyIndex]);

    const undo = useCallback(() => {
        setHistoryIndex(prev => {
            const newIndex = Math.max(0, prev - 1);
            setDrawings(history[newIndex].drawings);
            setImages(history[newIndex].images);
            return newIndex;
        });
    }, [history]);

    const redo = useCallback(() => {
        setHistoryIndex(prev => {
            const newIndex = Math.min(history.length - 1, prev + 1);
            setDrawings(history[newIndex].drawings);
            setImages(history[newIndex].images);
            return newIndex;
        });
    }, [history]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(image => {
            const cachedImg = imagesCache.current.get(image.dataURL);
            if (cachedImg) {
                ctx.drawImage(cachedImg, image.x, image.y, image.width, image.height);
            }

            if (image.id === selectedImageId) {
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 2;
                ctx.strokeRect(image.x - 2, image.y - 2, image.width + 4, image.height + 4);

                const handleSize = 8;
                const handles = {
                    nw: [image.x - handleSize/2, image.y - handleSize/2],
                    ne: [image.x + image.width - handleSize/2, image.y - handleSize/2],
                    sw: [image.x - handleSize/2, image.y + image.height - handleSize/2],
                    se: [image.x + image.width - handleSize/2, image.y + image.height - handleSize/2]
                };

                ctx.fillStyle = '#3b82f6';
                Object.values(handles).forEach(([x, y]) => {
                    ctx.fillRect(x, y, handleSize, handleSize);
                });
            }
        });

        drawings.forEach(drawing => {
            ctx.strokeStyle = drawing.color;
            ctx.lineWidth = drawing.strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            drawing.points.forEach(([x, y], i) => {
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        });
    }, [drawings, images, selectedImageId]);

    useEffect(() => {
        draw();
    }, [draw]);

    const handleImageMouseDown = (e: React.MouseEvent, image: Image, handle?: 'nw' | 'ne' | 'sw' | 'se') => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        e.preventDefault();

        if (handle) {
            setIsResizing(true);
            setResizeHandle(handle);
            setSelectedImageId(image.id);
        } else {
            setSelectedImageId(image.id);
            setImages(prev => prev.map(img =>
                img.id === image.id
                    ? { ...img, isDragging: true }
                    : img
            ));
            dragStartPos.current = { x: mouseX, y: mouseY };
        }

        imageStartProps.current = {
            x: image.x,
            y: image.y,
            width: image.width,
            height: image.height
        };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedTool === 'pen') {
            setIsDrawing(true);
            startPos.current = { x, y };
            setDrawings(prev => {
                const newDrawing: Drawing = {
                    type: 'pen',
                    points: [[x, y]],
                    color,
                    strokeWidth
                };
                const newDrawings = [...prev, newDrawing];
                pushHistory(newDrawings, images);
                return newDrawings;
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (isDrawing && startPos.current) {
            setDrawings(prev => {
                const last = prev[prev.length - 1];
                const updatedPoints = [...last.points, [mouseX, mouseY]];
                const updated = { ...last, points: updatedPoints };
                return [...prev.slice(0, -1), updated];
            });
        }
        else {
            const targetImage = images.find(img =>
                img.id === selectedImageId && (img.isDragging || isResizing)
            );

            if (targetImage) {
                const deltaX = mouseX - dragStartPos.current.x;
                const deltaY = mouseY - dragStartPos.current.y;

                setImages(prev => prev.map(image => {
                    if (image.id !== targetImage.id) return image;

                    if (isResizing) {
                        let newWidth = imageStartProps.current.width;
                        let newHeight = imageStartProps.current.height;
                        let newX = imageStartProps.current.x;
                        let newY = imageStartProps.current.y;

                        switch (resizeHandle) {
                            case 'se':
                                newWidth = imageStartProps.current.width + deltaX;
                                newHeight = newWidth / image.aspectRatio;
                                break;
                            case 'sw':
                                newWidth = imageStartProps.current.width - deltaX;
                                newHeight = newWidth / image.aspectRatio;
                                newX = imageStartProps.current.x + deltaX;
                                break;
                            case 'ne':
                                newWidth = imageStartProps.current.width + deltaX;
                                newHeight = newWidth / image.aspectRatio;
                                newY = imageStartProps.current.y - (newHeight - imageStartProps.current.height);
                                break;
                            case 'nw':
                                newWidth = imageStartProps.current.width - deltaX;
                                newHeight = newWidth / image.aspectRatio;
                                newX = imageStartProps.current.x + deltaX;
                                newY = imageStartProps.current.y - (newHeight - imageStartProps.current.height);
                                break;
                        }

                        return {
                            ...image,
                            width: newWidth,
                            height: newHeight,
                            x: newX,
                            y: newY
                        };
                    } else {
                        return {
                            ...image,
                            x: imageStartProps.current.x + deltaX,
                            y: imageStartProps.current.y + deltaY
                        };
                    }
                }));
            }
        }
    };

    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            startPos.current = null;
            pushHistory(drawings, images);
        }
        else {
            setImages(prev => prev.map(img => ({ ...img, isDragging: false })));
            if (selectedImageId) {
                pushHistory(drawings, images);
            }
            setIsResizing(false);
        }
    };

    const clearCanvas = () => {
        setDrawings([]);
        setImages([]);
        setHistory([{ drawings: [], images: [] }]);
        setHistoryIndex(0);
        setSelectedImageId(null);
    };

    const createImageFromDataURL = (dataURL: string, img: HTMLImageElement) => {
        const aspectRatio = img.width / img.height;
        const newImage: Image = {
            id: uuidv4(),
            dataURL,
            x: 100,
            y: 100,
            width: 200,
            height: 200 / aspectRatio,
            aspectRatio,
            isDragging: false,
        };

        setImages(prev => {
            const newImages = [...prev, newImage];
            pushHistory(drawings, newImages);
            return newImages;
        });
    };

    const addImage = (dataURL: string) => {
        if (imagesCache.current.has(dataURL)) {
            const cachedImg = imagesCache.current.get(dataURL)!;
            createImageFromDataURL(dataURL, cachedImg);
            return;
        }

        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            imagesCache.current.set(dataURL, img);
            createImageFromDataURL(dataURL, img);
        };
    };

    return {
        canvasRef,
        selectedTool,
        setSelectedTool,
        color,
        setColor,
        strokeWidth,
        setStrokeWidth,
        undo,
        redo,
        clearCanvas,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        history,
        historyIndex,
        addImage,
        handleImageMouseDown,
        images,
        selectedImageId,
        setSelectedImageId,
    };
};

export default useWhiteboard;