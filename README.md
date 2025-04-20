# Manga Explorer

A modern, responsive web application built with React that allows users to explore, search, and manage their favorite manga titles. The application integrates with the MyAnimeList API to provide comprehensive manga information and features a sleek dark mode interface.

## Screenshots

### Home Page & Search
![Home Page with Search](src/assets/screenshots/Screenshot%202025-04-20%20at%209.08.25%20AM.png)

*Home page featuring the search interface and manga grid layout*

### Manga Details
![Manga Details](src/assets/screenshots/Screenshot%202025-04-20%20at%209.08.30%20AM.png)

*Detailed view of a manga showing comprehensive information*

### Dark Mode Interface
![Dark Mode](src/assets/screenshots/Screenshot%202025-04-20%20at%209.08.41%20AM.png)

*Dark mode interface for comfortable viewing*

### Search Results
![Search Results](src/assets/screenshots/Screenshot%202025-04-20%20at%209.09.14%20AM.png)

*Search results with filtering options*

### Favorites Management
![Favorites Page](src/assets/screenshots/Screenshot%202025-04-20%20at%209.11.50%20AM.png)

*Favorites page showing saved manga*

### Genre Filtering
![Genre Filtering](src/assets/screenshots/Screenshot%202025-04-20%20at%209.11.56%20AM.png)

*Genre filtering interface for refined searching*

## Features

### 1. Manga Discovery
- Browse through an extensive collection of manga titles
- View detailed information about each manga including:
  - Title and cover image
  - Synopsis
  - Score and status
  - Publication details
  - Genre information

### 2. Search Functionality
- Advanced search capabilities to find specific manga titles
- Real-time search results
- Filter options for refined searching

### 3. Favorites Management
- Add/remove manga to personal favorites list
- Persistent favorites storage using local storage
- Dedicated favorites page for easy access

### 4. User Interface
- Modern and responsive design
- Dark mode support for comfortable viewing
- Intuitive navigation system
- Mobile-friendly layout
- Smooth animations and transitions

### 5. Genre Filtering
- Filter manga by specific genres
- Interactive genre selection interface
- Combined filtering with search functionality

## Project Structure

```
ReactProjectTrimester3/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Main navigation bar
│   │   ├── Search.jsx          # Search functionality component
│   │   ├── GenreFilter.jsx     # Genre filtering component
│   │   ├── ThemeToggle.jsx     # Dark mode toggle component
│   │   └── Todo.jsx            # Component for managing tasks
│   ├── context/
│   │   ├── ThemeContext.jsx    # Dark mode context management
│   │   └── FavoritesContext.jsx # Favorites state management
│   ├── pages/
│   │   ├── Home.jsx           # Home page component
│   │   ├── Search.jsx         # Search page
│   │   ├── MangaDetail.jsx    # Detailed manga view
│   │   └── Favorites.jsx      # Favorites management page
│   ├── App.jsx                # Main application component
│   └── index.css              # Global styles and Tailwind configuration
├── public/                    # Public assets
└── package.json              # Project dependencies and scripts
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For handling navigation and routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Context API**: For state management (themes and favorites)
- **MyAnimeList API**: External API for manga data
- **Local Storage**: For persistent data storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ReactProjectTrimester3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Navigation
- Use the navigation bar to switch between different pages
- Toggle dark mode using the theme switch in the navigation bar

### Searching Manga
1. Navigate to the Search page
2. Enter your search query in the search bar
3. Use genre filters to refine your search
4. Click on any manga card to view detailed information

### Managing Favorites
1. Click the favorite button on any manga to add it to your favorites
2. Access your favorites through the Favorites page
3. Remove items from favorites using the remove button

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MyAnimeList API for providing manga data
- Tailwind CSS for the styling framework
- React community for excellent documentation and resources
