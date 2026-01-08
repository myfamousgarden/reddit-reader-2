# Reddit Reader 2 - Installation Guide

## 📦 Installation Steps

### 1. Prepare the Extension
Make sure all files are in the project directory:
```
reddit_reader_2/
├── manifest.json
├── content.js
├── content.css
├── popup.html
├── popup.js
├── icons/
│   └── icon.svg
└── test.html (for testing)
```

### 2. Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar
   - Or go to Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `reddit_reader_2` folder
   - Click "Select Folder"

4. **Verify Installation**
   - The extension should appear in your extensions list
   - You should see "Reddit Reader 2" with a toggle switch
   - Make sure it's enabled (toggle should be blue/on)

### 3. Test the Extension

1. **Open Test Page**
   - Open `test.html` in your browser
   - Or visit any website (like reddit.com)

2. **Look for Floating Button**
   - A circular floating button should appear on the right side
   - It has a gradient purple background with a white icon

3. **Test Functionality**
   - **Drag**: Click and drag the button to move it around
   - **Click**: Click the button to open the side panel
   - **Panel**: The panel should slide in from the right
   - **Close**: Click the × button or click outside to close

### 4. Troubleshooting

#### Icon Loading Error
If you see "Could not load icon" errors:
- This is normal and doesn't affect functionality
- The extension will use Chrome's default icon
- See `ICONS.md` for instructions on adding custom icons (optional)

#### Button Not Appearing
- Refresh the webpage after installing the extension
- Check if the extension is enabled in `chrome://extensions/`
- Look for any error messages in the extension details

#### Button Not Draggable
- Make sure you're clicking and holding the button
- Try clicking in the center of the button
- Check browser console for JavaScript errors (F12 → Console)

#### Panel Not Opening
- Try clicking the button without dragging
- Check if there are any JavaScript errors in the console
- Ensure the extension has proper permissions

#### General Issues
- Reload the extension: Go to `chrome://extensions/`, find Reddit Reader 2, click the reload icon
- Check browser console for errors: Press F12 → Console tab
- Try on a different website to isolate the issue

### 5. Browser Compatibility

✅ **Supported Browsers:**
- Google Chrome 88+
- Microsoft Edge 88+
- Brave Browser
- Other Chromium-based browsers

❌ **Not Supported:**
- Firefox (uses different extension format)
- Safari (uses different extension format)
- Internet Explorer

### 6. Permissions Explained

The extension requests these permissions:
- **activeTab**: To inject the floating button and panel into web pages
- **storage**: To save user preferences (for future features)

### 7. Next Steps

Once installed and working:
1. Visit different websites to see the floating button
2. Test the drag functionality on various page layouts
3. Try the panel on both desktop and mobile-sized windows
4. Explore the extension popup by clicking the extension icon in the toolbar

### 8. Development Mode

If you want to modify the extension:
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the reload icon for Reddit Reader 2
4. Refresh any open web pages to see changes

---

🎉 **Congratulations!** You now have Reddit Reader 2 installed and ready to enhance your browsing experience!