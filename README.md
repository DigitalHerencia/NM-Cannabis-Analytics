# A Retail Analytics Dashboard for the New Mexico Cannabis Industry

![alt text](./client/src/assets/splash2.jpg)

## Overview
The Retail Analytics Dashboard is a comprehensive tool designed to provide dispensaries in New Mexico with actionable insights through interactive data visualizations. It focuses on competitive pricing, sales trends, and market share analysis, leveraging advanced data visualization and state management techniques.

<div align="center">

![GitHub watchers](https://img.shields.io/github/watchers/DigitalHerencia/NM-Cannabis-Analytics)
[![GitHub forks](https://img.shields.io/github/forks/DigitalHerencia/NM-Cannabis-Analytics)](https://github.com/DigitalHerencia/NM-Cannabis-Analytics/network)
[![GitHub stars](https://img.shields.io/github/stars/DigitalHerencia/NM-Cannabis-Analytics)](https://github.com/DigitalHerencia/NM-Cannabis-Analytics/stargazers)

![GitHub last commit](https://img.shields.io/github/last-commit/DigitalHerencia/NM-Cannabis-Analytics)
[![GitHub issues](https://img.shields.io/github/issues/DigitalHerencia/NM-Cannabis-Analytics)](https://github.com/DigitalHerencia/NM-Cannabis-Analytics/issues)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

</div>

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Features
### Menu Comparison Feature
- 📋 **Description:** Allows dispensaries to compare their product prices against competitors.
- 🖥️ **Technology:** Heads-up display technology.
- 🛒 **Implementation:** Utilizes RESTful API to fetch competitive pricing data and display comparisons in a user-friendly format.

### Sales Data Visualization
- 🗃️ **Description:** Presents time-series analysis of sales data to aid trend identification and forecasting.
- 📊 **Technology:** Nivo charts.
- 📈 **Implementation:** Uses Nivo’s line charts to depict sales trends over time, with data fetched from the backend via RESTful APIs.

### Market Share Analysis
- 📖 **Description:** Analyzes and displays market share by zip code using GIS data.
- 🗺️ **Technology:** Mapbox maps, pie charts.
- 📍 **Implementation:** Integrates Mapbox for geographical visualization and Nivo pie charts for market share representation. Data is processed and visualized based on zip code analysis.

> [!TIP]
> Use your own MongoDB connection string in the `.env` file and load in your custom data.

## Technology Stack

![Tech Stack](./client/src/assets/Untitleddesign.jpg)

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933.svg?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Made with MongoDB](https://img.shields.io/badge/Made%20with-MongoDB-47A248.svg?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Made with Express](https://img.shields.io/badge/Made%20with-Express-000000.svg?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

</div>
</div>

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">

[![Contains Material-UI](https://img.shields.io/badge/Contains-MUI-007FFF.svg?style=flat-square&logo=material-ui&logoColor=white)](https://mui.com/)
[![Contains Redux](https://img.shields.io/badge/Contains-Redux-764ABC.svg?style=flat-square&logo=redux&logoColor=white)](https://redux.js.org/)
[![Contains JWT](https://img.shields.io/badge/Contains-JWT-000000.svg?style=flat-square&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

</div>
</div>

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">


[![Uses JavaScript](https://img.shields.io/badge/Uses-JavaScript-F7DF1E.svg?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Uses JSX](https://img.shields.io/badge/Uses-JSX-000000.svg?style=flat-square&logo=jsx&logoColor=white)](https://reactjs.org/docs/introducing-jsx.html)


</div>
</div>

- **Frontend:** React, Material-UI
- **State Management:** Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Data Visualization:** Nivo, Mapbox

## Installation
To install and run this project locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/retail-analytics-dashboard.git
   ```
2. Navigate to the project directory:

    ```sh
    cd retail-analytics-dashboard
    ```
3. Install frontend dependencies:

    ```sh
    cd client
    npm install
    ```
4. Install backend dependencies:

    ```sh
    cd ../server
    npm install
    ```
5. Set up environment variables by creating a .env file in the root of the server directory with the following content:

    ```makefile
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

> [!NOTE]  
> Make sure to install all dependencies and create the `.env` file with the required environment variables.

## Usage
To start the development server, run the following commands:

1. Start the frontend:
    ```sh
    cd client
    npm start
    ```
2. Start the backend:
    ```sh
    cd ../server
    npm start
    ```

## Screenshots

  <div align="center">
  <figure>
    <img src="./client/src/assets/Dashboard.jpeg" width="800" alt="Dashboard Overview" />
    <figcaption> </figcaption>
  </figure>
  </div>

  <br>
  
  <div align="center">
  <div style="display: flex;">

  <figure>
    <img src="./client/src/assets/Breakdown.jpeg" width="375" alt="Breakdown by Category" />
    <figcaption>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</figcaption>
  </figure>
  <figure>
    <img src="./client/src/assets/Rankings.jpeg" width="375" alt="Licensee Rankings" />
    <figcaption>  </figcaption>
  </figure>

  </div>
  </div>

  <br>
  
  <div align="center">
  <div style="display: flex;">

  <figure>
    <img src="./client/src/assets/PerformanceComparison.jpeg" width="375" alt="Performance Comparison" />
    <figcaption>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</figcaption>
  </figure>
  <figure>
    <img src="./client/src/assets/ProductComparison.jpeg" width="375" alt="Product Comparison" />
    <figcaption>   </figcaption>
  </figure>

  </div>
  </div>

<br>

<div align="center">
  <figure>
    <img src="./client/src/assets/GeographicAnalysis.jpeg" width="800" alt="Geographic Analysis" />
    <figcaption> </figcaption>
  </figure>
</div>

## Contributing
Contributions are welcome! Please see our contributing guidelines before submitting a pull request.

## License
This project is licensed under the [GNU General Public License version 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).

## Contact
For any inquiries or feedback, please reach out to us at DigitalHerencia@Outlook.com

![Digital Herencia](./client/src/assets/reg2.jpg)

