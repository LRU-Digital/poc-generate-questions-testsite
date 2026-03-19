# Mock Chapter for portals - instructions

## Layout
- The portal should use the EXACT styling of the image "chapter.png" in the "assets" folder. Explanation of the styling: left side has a vertical navigation bar with the chapter buttons, and the right side has the content for the chapter. The navigation bar should have a background color of #f0f0f0 and the active button should have a background color of #5f0000. The content area should have a white background and some padding around the text. Use the public/skagensmalere.png as the top image below the title and short description.
- Use tailwind CSS for styling.
- The portal should be responsive and look good on both desktop and mobile devices.
- The navigation should be visible but none of the buttons should be clickable. The active button should be "Chapter 2" and it should be styled differently to indicate that it is the active page.
- Below the chapter bar, add a button that has the same styling as the chapter buttons, but this one is to open an AI chat. The button should have an icon that looks similar to this emoji: ✨.

## Content
- The portal should have a header with the title "Skagensmalere".
- Use the PDF from the assets folder as the content for the chapter. Only use the material from chapter 2 that matches the image "chapter.png". You can use the text from the PDF and the image as a reference for the content.

## Tech
- Use Next.js for the project.
- Use TypeScript for type safety.
- Use Tailwind CSS for styling.
- Use a PDF parsing library to extract the text content from the PDF file. You can use a library like `pdf-parse` or `pdfjs-dist` to achieve this.

## Additional Instructions
- Do not implement the functionality for the AI chat button, just create the button with the appropriate styling and icon.
