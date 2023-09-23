export function removeFileExtension(filename:string) {
    return filename.replace(/\.[^/.]+$/, ''); // Removes everything after the last dot
  }