// src/lib/image-utils.ts
export async function getBlurDataURL(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const smallWidth = 10;
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const smallHeight = Math.max(1, Math.floor(smallWidth * aspectRatio));
            const canvas = document.createElement('canvas');
            canvas.width = smallWidth;
            canvas.height = smallHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Не удалось получить контекст канваса'));
                return;
            }
            ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
            try {
                const dataURL = canvas.toDataURL('image/jpeg');
                resolve(dataURL);
            } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
                reject(new Error('Не удалось конвертировать canvas в data URL'));
            }
        };
        img.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${imageUrl}`));
    });
}