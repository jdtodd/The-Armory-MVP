# The-Armory-MVP

## A simple web application that allows users to search for games in the GiantBomb API, create a new account, and save games into their favorites list

Written using MySQL, Express.js, Node.js, React, React-Bootstrap, Webpack/Babel, and Axios

### Features
 * Search bar that communicates with GiantBomb API. Returns list of 10 games that are the closest match to the name searched.
 * Each game in the list contains:
    * Title
    * Date Released
    * ESRB Rating (if provided by GiantBomb)
    * Description of game
    * Some games include:
    * Weapon information
    * Map information
    * Character information
    * DLC
    * Platforms
    * Game modes
    * System Requirements (for PC)
 * Favorites List
 * New user creation
 * Login to retrieve previously favorited games

### Install instructions
 * Clone repository
 * **npm install**
 * In seperate terminals:
   * Run **npm run dev** to build bundled file through webpack
   * Run **npm start** to start the server

