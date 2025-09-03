declare module 'canvas-confetti' {
    interface Options {
    // あなたが使用しているプロパティを追加
    particleCount?: number;
    spread?: number;
    shapes?: (string | HTMLImageElement)[];
    scalar?: number;
    colors?: string[] | undefined;
    // その他の一般的なプロパティも追加
    angle?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    ticks?: number;
    origin?: {
        x: number;
        y: number;
    };
    zIndex?: number;
    }

    interface ICanvasConfetti {
    (options?: Options): void;
    create(canvas?: HTMLCanvasElement, options?: Options): ICanvasConfetti;
    shapeFromImage(options: { img: HTMLImageElement; flat?: boolean }): string;
    shapeFromText(options: { text: string; scalar?: number }): string;
    } 

    const confetti: ICanvasConfetti;
    export default confetti;
}