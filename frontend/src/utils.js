const formatDate = (date) => {
    const pad = (num) => String(num).padStart(2, '0'); 
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatSize = (kilobytes) => {
    const sizes = ["KB", "MB", "GB", "TB", "PB"];
    let sizeIndex = 0;
    let size = kilobytes;

    while (size >= 1024 && sizeIndex < sizes.length - 1) {
        size /= 1024;
        sizeIndex++;
    }

    return `${size.toFixed(2)} ${sizes[sizeIndex]}`;
}

const chunkFile = (file, chunkSize = 1 * 1024 * 1024) => {
    const chunks = [];
    let offset = 0;

    while (offset < file.size) {
        console.log(offset, file.size)
        const end = Math.min(offset + chunkSize, file.size);
        const chunk = file.slice(offset, end);
        chunks.push(chunk);
        offset = end;
    }

    return chunks;
}

export {
    formatDate,
    formatSize,
    chunkFile
};