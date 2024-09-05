# Retail Analytics Dashboard for the New Mexico Cannabis Industry 

![alt text](./client/src/assets/splash2.jpg)

## Overview
The disruptive and brand-new Digital Herencia Competitive Advantage Retail Analytics Dashboard is a comprehensive tool designed to provide dispensaries in New Mexico with actionable insights through interactive data visualizations. It focuses on competitive pricing, sales trends, and market share analysis, leveraging advanced data visualization and state management techniques.

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
2. [Technical Stack](#technical-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)



## Features
### Menu Comparison Feature
- 📋 **Description:** Allows dispensaries to compare their product prices against competitors.
- 🖥️  **Technology:** Heads-up display technology.
- 🛒  **Implementation:** Utilizes RESTful API to fetch competitive pricing data and display comparisons in a user-friendly format.

### Sales Data Visualization
- 🗃️ **Description:** Presents time-series analysis of sales data to aid trend identification and forecasting.
- 📊 **Technology:** Nivo charts.
- 📈 **Implementation:** Uses Nivo’s line charts to depict sales trends over time, with data fetched from the backend via RESTful APIs.

### Market Share Analysis
- 📖  **Description:** Analyzes and displays market share by zip code using GIS data.
- 🗺️ **Technology:** Mapbox maps, pie charts.
- 📍 **Implementation:** Integrates Mapbox for geographical visualization and Nivo pie charts for market share representation. Data is processed and visualized based on zip code analysis.

## Technical Stack

![alt text](<client/src/assets/Untitled design.jpg>)

<div align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Styling-Material--UI-blue?style=for-the-badge&logo=mui" alt="Material-UI">
  <img src="https://img.shields.io/badge/State%20Management-Redux-purple?style=for-the-badge&logo=redux" alt="Redux">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Framework-Express.js-lightgrey?style=for-the-badge&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Authentication-JWT-black?style=for-the-badge&logo=json-web-tokens" alt="JWT">
  <img src="https://img.shields.io/badge/Visualization-Nivo-orange?style=for-the-badge&logo=nivo" alt="Nivo">
  <img src="https://img.shields.io/badge/Maps-Mapbox-blue?style=for-the-badge&logo=mapbox" alt="Mapbox">
</div>  

---

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
1. Navigate to the project directory:

    ```sh
    cd retail-analytics-dashboard
    ```
1. Install frontend dependencies:

    ```sh
    cd client
    npm install
    ```
1. Install backend dependencies:

    ```sh
    cd ../server
    npm install
    ```
1. Set up environment variables by creating a .env file in the root of the server directory with the following content:

    ```makefile
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

> [!NOTE]
> Make sure to install all dependencies and create the .env file with the required environment variables


## Usage
To start the development server, run the following commands:

1. Start the frontend:
    ```sh
    cd client
    npm start
    ```
1. Start the backend:
    ```sh
    cd ../server
    npm start
    ```
## Screenshots


  <div align="center">
  <figure>
    <img src="./client/src/assets/Dashboard.jpeg" width="800" alt="Dashboard Overview" />
  </figure>
  </div>


  <div align="center">
  <div style="display: flex; ; gap: 5px;">

  <figure>
    <img src="./client/src/assets/Breakdown.jpeg" width="400" alt="Breakdown by Category" />
  </figure>
  <figure>
    <img src="./client/src/assets/Rankings.jpeg" width="400" alt="Licensee Rankings" />
  </figure>

  </div>
  </div>

  <div align="center">
  <div style="display: flex; ; gap: 5px;">

  <figure>
    <img src="./client/src/assets/PerformanceComparison.jpeg" width="400" alt="Performance Comparison" />
  </figure>
  <figure>
    <img src="./client/src/assets/ProductComparison.jpeg" width="400" alt="Product Comparison" />
  </figure>

  </div>
  </div>

<div align="center">
  <figure>
    <img src="./client/src/assets/GeographicAnalysis.jpeg" width="800" alt="Geographic Analysis" />
  </figure>
</div>

> [!TIP]
> Use your own MongoDB connection string in the .env file and load in your custom data!


### Contributing
---
Contributions are welcome! Please contact us for  our contributing guidelines before submitting a pull request.

### License
---
This project is licensed under the [GNU General Public License version 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) - see the LICENSE file for details.

### Contact
---
For any inquiries or feedback, please reach out to us at DigitalHerencia@Outlook.com

![Digital Herencia](./client/src/assets/reg2.jpg)

