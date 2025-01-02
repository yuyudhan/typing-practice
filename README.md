# Typing Practice

## Overview

Typing Practice is a simple web application designed to help users improve their blind touch typing skills. The application displays one character at a time along with instructions on which finger and shift key to use. Users type the displayed character, and the application provides real-time feedback on their performance.

## Features

- **Character Display**: Shows a random character (letters, numbers, or special characters).
- **Finger Instructions**: Provides guidance on which finger and shift key to use for each character.
- **Performance Tracking**: Displays counts of correct and incorrect inputs, along with median typing times for letters, numbers, and special characters.
- **Frequency Sliders**: Allows users to adjust the frequency of different character types.

## Getting Started

### Prerequisites

- Python 3.x

### Running the Application

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/typing-practice.git

Navigate to the Project Directory

```bash
cd typing-practice
```

### Start a Simple Python Server

`python -m http.server 8000`

Open in Browser

Open your web browser and go to `http://localhost:8000`.

## Usage

Adjust Frequencies
1. Use the sliders at the bottom left to set the frequency of characters, numbers, and special characters.
2. Click the "Update" button to apply the new settings.

Practice Typing
1. A character will appear in the center with instructions on how to press it.
2. Type the character in the input box.
3. The application will indicate whether your input was correct (green) or incorrect (red) and update the stats accordingly.

## File Structure

/typing-practice
│
├── index.html        # Main HTML file for the application
    ├── keymap.js         # Contains key press instructions for all characters
└── script.js         # Handles the application logic (character generation, input handling, etc.)

## Contributing

    Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

    This project is open-source and licensed under the MIT License.


