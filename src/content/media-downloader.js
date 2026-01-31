/**
 * Logic for downloading media (images, videos, HLS streams).
 */
class MediaDownloader {
  // Helper to convert base64 data URL to Uint8Array
  static base64ToUint8Array(dataUrl) {
    const base64 = dataUrl.split(',')[1];
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // Helper to download HLS (m3u8) video
  static async downloadHLS(url, onProgress) {
    console.log('Downloading HLS stream:', url);
    
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'fetchMedia', url: url }, resolve);
    });
    
    if (!response || !response.ok || !response.dataUrl) {
      throw new Error('Failed to fetch m3u8 playlist');
    }

    const m3u8Bytes = this.base64ToUint8Array(response.dataUrl);
    const m3u8Text = new TextDecoder().decode(m3u8Bytes);
    
    if (m3u8Text.includes('#EXT-X-STREAM-INF')) {
        const lines = m3u8Text.split('\n');
        let bestBandwidth = 0;
        let bestUrl = null;
        const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXT-X-STREAM-INF')) {
                const bandwidthMatch = line.match(/BANDWIDTH=(\d+)/);
                const bandwidth = bandwidthMatch ? parseInt(bandwidthMatch[1]) : 0;
                
                let nextLine = lines[i+1]?.trim();
                if (nextLine && !nextLine.startsWith('#')) {
                    if (bandwidth > bestBandwidth) {
                        bestBandwidth = bandwidth;
                        bestUrl = nextLine.startsWith('http') ? nextLine : baseUrl + nextLine;
                    }
                }
            }
        }
        
        if (bestUrl) {
            return this.downloadHLS(bestUrl, onProgress);
        } else {
            throw new Error('No valid stream found in Master Playlist');
        }
    }

    const lines = m3u8Text.split('\n');
    const segments = [];
    const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        if (trimmed.startsWith('http')) {
          segments.push(trimmed);
        } else {
          segments.push(baseUrl + trimmed);
        }
      }
    }
    
    if (segments.length === 0) {
      throw new Error('No segments found in m3u8 playlist');
    }
    
    const downloadedSegments = [];
    for (let i = 0; i < segments.length; i++) {
        if (onProgress) {
            onProgress(Math.round((i / segments.length) * 100));
        }
        
        const segmentUrl = segments[i];
        const segResponse = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'fetchMedia', url: segmentUrl }, resolve);
        });
        
        if (segResponse && segResponse.ok && segResponse.dataUrl) {
          const bytes = this.base64ToUint8Array(segResponse.dataUrl);
          downloadedSegments.push(bytes);
        }
    }
    
    if (downloadedSegments.length === 0) {
        throw new Error('No segments downloaded');
    }

    const firstByte = downloadedSegments[0][0];
    let isMpegTs = (firstByte === 0x47);
    
    if (isMpegTs) {
        if (typeof muxjs === 'undefined') {
          throw new Error('mux.js library not found');
        }
        
        const transmuxer = new muxjs.mp4.Transmuxer();
        const initSegments = [];
        const mediaSegments = [];
        
        transmuxer.on('data', (segment) => {
          if (segment.initSegment) {
            initSegments.push(segment.initSegment);
          }
          mediaSegments.push(segment.data);
        });
        
        for (const segment of downloadedSegments) {
            transmuxer.push(segment);
            transmuxer.flush();
        }
        
        let finalParts = [];
        if (initSegments.length > 0) {
            finalParts.push(initSegments[0]);
        }
        finalParts = finalParts.concat(mediaSegments);
        
        const blob = new Blob(finalParts, { type: 'video/mp4' });
        return await this.blobToDataUrl(blob);
    } else {
        const blob = new Blob(downloadedSegments, { type: 'video/mp4' });
        return await this.blobToDataUrl(blob);
    }
  }

  static async blobToDataUrl(blob) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  static async downloadMedia(url, onProgress) {
    try {
      if (url.includes('.m3u8')) {
        return await this.downloadHLS(url, onProgress);
      }
      
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'fetchMedia', url: url }, resolve);
      });
      if (response && response.ok && response.dataUrl) {
        return response.dataUrl;
      }
      return null;
    } catch (e) {
      console.warn('Error downloading media:', url, e);
      return null;
    }
  }
}

if (typeof window !== 'undefined') {
  window.MediaDownloader = MediaDownloader;
}
