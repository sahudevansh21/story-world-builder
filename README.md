# Story World Builder

A centralized, easy-to-use web application for writers to organize their creative universe, designed with Next.js 14 App Router. This entirely browser-based tool helps writers maintain consistency and build richer, more coherent story worlds by storing all data locally within the browser.

## Features

*   **Projects Dashboard**: Manage multiple story projects.
*   **Character Builder**: Create detailed profiles for your characters, including traits and relationships.
*   **Location Designer**: Document your story's settings with descriptions and significant events.
*   **Plot Timeline**: Outline key plot points, arcs, and scenes to keep your narrative on track.
*   **Local Storage**: All your data is saved securely in your browser's local storage, ensuring privacy and offline access without external dependencies.
*   **Stunning UI**: A dark, glassmorphic design with vibrant gradient accents and smooth animations for an engaging user experience.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/story-world-builder.git
    cd story-world-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```

5.  **Start the production server:**
    ```bash
    npm run start
    # or
    yarn start
    ```

## Technologies Used

*   **Next.js 14**: React framework for production.
*   **React**: UI library.
*   **CSS**: For styling, no external frameworks like Tailwind CSS or CSS Modules were used.
*   **Local Storage API**: For client-side data persistence.

## Project Structure

The project uses the Next.js App Router, organizing pages and components within the `app/` directory.

```
story-world-builder/
├── public/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js                     (Projects Dashboard)
│   ├── character-builder/
│   │   └── page.js                 (Character Builder)
│   ├── location-designer/
│   │   └── page.js                 (Location Designer)
│   └── plot-timeline/
│       └── page.js                 (Plot Timeline)
├── next.config.js
├── package.json
├── README.md
└── .gitignore
```
