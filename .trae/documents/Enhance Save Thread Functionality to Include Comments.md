I will modify the `savePost` function in `content.js` to include comment loading and saving logic.

**Steps:**

1.  **Update `content.js`**:
    *   Modify `savePost()` to be an `async` function.
    *   Update the "Save Thread" button UI to show a loading state ("⏳ Loading comments...") when clicked.
    *   Invoke `await this.loadAllComments()` to scroll and load all dynamic comments, similar to the Analyze function.
    *   Call `this.extractRedditComments()` to capture the thread structure and comments data.
    *   Construct the `savedPost` object to include the full `commentsData` (preserving the original structure/format).
    *   Save the extended object to `chrome.storage.local`.
    *   Restore the button state to "✅ Saved" upon success or show an error message on failure.

**Note:**
This change ensures that when you click "Save Thread", the extension will actively scroll through the page to capture all available comments before saving them to your local storage. The `home.js` viewer will currently ignore these extra comments until we update it to display them (which can be a future task).