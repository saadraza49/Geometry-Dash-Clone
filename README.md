# Geometry Dash Clone

A faithful web-based clone of the popular rhythm-based platformer game, Geometry Dash. This project replicates the core gameplay mechanics including cube jumping, obstacle avoidance, ship mode, and multiple levels with increasing difficulty.

## Features

- **Multiple Levels**: Contains all original 8 levels (Stereo Madness to Clubstep) with accurate obstacle placement.
- **Multiple Modes**:
  - **Cube Mode**: Standard jumping gameplay.
  - **Ship Mode**: Fly through the level avoiding obstacles.
- **Responsive Controls**:
  - **Space / Arrow Up**: Jump / Fly.
  - **Mouse Click / Touch**: Jump / Fly (mobile friendly).
- **Dynamic Visuals**:
  - Smooth animations and transitions.
  - Responsive canvas scaling to fit any screen.
  -Trail effects and glow effects.
- **Audio System**:
  - Built-in audio engine with sound effects for jump, land, crash, and portal transitions.
  - Supports background music (BGM) integration (placeholder paths provided).
- **User Interface**:
  - Main Menu with level selection.
  - In-Game HUD showing progress and stats.
  - Death Screen with retry and menu options.
  - Level Complete Screen with detailed stats.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari).
- **Live Server extension** for VS Code recommended for optimal audio and file handling.

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Open the project folder in your code editor.
3.  Use the **Live Server** extension to open `index.html` in your browser.

### Running the Game
1.  Open `index.html`.
2.  Click the **Play** button on the Main Menu.
3.  Select a level from the grid.
4.  Press **Space**, **Up Arrow**, **Mouse Click**, or **Touch** to jump/fly.

## Controls

| Action        | Keyboard             | Mouse          | Touch         |
| ------------- | -------------------- | -------------- | ------------- |
| **Jump/Fly**  | `Space`, `Arrow Up`  | Click          | Tap           |
| **Go Back**   | `Esc`                | `Esc`          | Swipe Left    |
| **Retry Level** | `Space`, `Enter`     | Click          | Tap           |

## Code Structure

- `index.html`: Main entry point and HTML structure.
- `styles.css`: Styling for the UI and game elements.
- `game.js`: Core game logic, rendering, physics, and collision detection.
- `levels.js`: Configuration for all levels including obstacle data and difficulty settings.

## Development

### Adding New Levels
To add a new level, modify the `LEVELS` array in `levels.js`. Each level object should contain:
- `id`: Unique identifier.
- `name`: Display name of the level.
- `diff`: Difficulty level.
- `stars`: Number of stars.
- `speed`: Game speed (meters per second).
- `colors`: Theme colors.
- `bg`, `ground`, `accent`, `playerColor`: Color configurations.
- `tempo`, `key`: Music parameters.
- `length`: Total length of the level in pixels.
- `obs`: Array of obstacles `[x_position, type]`.

### Creating Obstacles
Obstacles are defined as `[x, type]` pairs.
- `'s'`: Single Spike
- `'ds'`: Double Spike
- `'ts'`: Triple Spike
- `'b'`: Block
- `'tb'`: Tall Block
- `'portal_ship'`: Portal to Ship Mode
- `'portal_cube'`: Portal to Cube Mode

## License

This project is created for educational purposes and as a fan tribute to the original Geometry Dash. It does not claim ownership of the original game concepts or design elements.

## Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.
