# Icons for Reddit Reader 2

## Current Status
The extension currently works without custom icons. Chrome will use a default icon.

## Adding Custom Icons (Optional)

If you want to add custom icons to the extension:

### Method 1: Use the Icon Generator
1. Open `generate-icons.html` in your browser
2. Click "Generate Icons"
3. Download each icon (16x16, 48x48, 128x128) and save them in the `icons/` folder as:
   - `icon16.png`
   - `icon48.png` 
   - `icon128.png`

### Method 2: Create Your Own Icons
Create PNG files with these specifications:
- **icon16.png**: 16x16 pixels (toolbar icon)
- **icon48.png**: 48x48 pixels (extension management page)
- **icon128.png**: 128x128 pixels (Chrome Web Store)

### Method 3: Convert the SVG
You can convert the existing `icons/icon.svg` to PNG format using:
- Online converters (like convertio.co)
- Image editing software (Photoshop, GIMP)
- Command line tools (ImageMagick)

## Adding Icons to Manifest

Once you have the PNG files, add this to your `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "Reddit Reader 2",
  "version": "1.0.0",
  "description": "Enhanced Reddit reading experience with floating panel",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_end"
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Reddit Reader 2"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

## Note
The extension works perfectly without custom icons. Adding icons is purely for visual enhancement and branding purposes.