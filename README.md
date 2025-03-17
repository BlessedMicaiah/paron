# Paron - Modern Presentation Tool

![Paron Logo](public/logo192.png)

Paron is a powerful, React-based presentation tool designed to help you create beautiful, engaging presentations with ease. Similar to tools like Pitch, Paron provides a modern, intuitive interface for crafting professional presentations that stand out.

## Features

### 🎨 Modern Design Interface
- Clean, intuitive user interface
- Beautiful slide templates
- Responsive design for all screen sizes

### ✏️ Rich Content Editing
- Text formatting (bold, italic, underline)
- Text alignment options
- Support for headings, paragraphs, and lists
- Content blocks for images, videos, and tables

### 📊 Presentation Management
- Create, edit, and organize presentations
- Dashboard view of recent and team presentations
- Duplicate and delete slides
- Presentation preview

### 👥 Team Collaboration
- Share presentations with team members
- View team presentations
- Collaborative editing capabilities

### 🎬 Presentation Mode
- Full-screen presentation mode
- Presenter notes and controls
- Seamless transitions between slides

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/paron.git
cd paron
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating a New Presentation
1. Navigate to the Dashboard
2. Click the "New Presentation" button
3. Start editing your presentation in the editor

### Editing Slides
- Add text by clicking on the slide and typing
- Format text using the toolbar options
- Add new slides using the "Add Slide" button
- Rearrange slides by dragging them in the sidebar

### Presenting
- Click the "Present" button in the editor to start presentation mode
- Use arrow keys to navigate between slides
- Press Escape to exit presentation mode

## Project Structure

```
paron/
├── public/              # Static files
├── src/                 # Source files
│   ├── assets/          # Images and other assets
│   ├── components/      # React components
│   │   ├── common/      # Common UI components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── editor/      # Editor components
│   │   ├── layout/      # Layout components
│   │   └── slides/      # Slide components
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   ├── styles/          # Global styles and themes
│   └── utils/           # Utility functions
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Technologies Used

- React.js - Frontend framework
- React Router - Navigation
- Styled Components - Styling
- Material UI Icons - UI elements
- Framer Motion - Animations
- React Beautiful DnD - Drag and drop functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern presentation tools like Pitch and Slides
- Built with React and modern web technologies
