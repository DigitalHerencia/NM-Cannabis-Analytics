# Retail Analytics Dashboard for the New Mexico Cannabis Industry

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

![alt text](<Untitled design.jpg>)

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjkuMDAwMDExNDQ0MDkxOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDE2OS4wMDAwMTE0NDQwOTE4IDM1Ij48cmVjdCB3aWR0aD0iMTA0LjAwMDAwNzYyOTM5NDUzIiBoZWlnaHQ9IjM1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeD0iMTA0LjAwMDAwNzYyOTM5NDUzIiB3aWR0aD0iNjUuMDAwMDAzODE0Njk3MjciIGhlaWdodD0iMzUiIGZpbGw9IiM2MWRhZmIiLz48dGV4dCB4PSI1Mi4wMDAwMDM4MTQ2OTcyNjYiIHk9IjIxLjUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSInUm9ib3RvJywgc2Fucy1zZXJpZiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPk1BREUgV0lUSDwvdGV4dD48dGV4dCB4PSIxMzYuNTAwMDA5NTM2NzQzMTYiIHk9IjIxLjUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSInTW9udHNlcnJhdCcsIHNhbnMtc2VyaWYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSI5MDAiIGxldHRlci1zcGFjaW5nPSIyIj5SRUFDVDwvdGV4dD48L3N2Zz4=)](https://forthebadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAuMDAwMDExNDQ0MDkxOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDE2MC4wMDAwMTE0NDQwOTE4IDM1Ij48cmVjdCB3aWR0aD0iMTA0LjAwMDAwNzYyOTM5NDUzIiBoZWlnaHQ9IjM1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeD0iMTA0LjAwMDAwNzYyOTM5NDUzIiB3aWR0aD0iNTYuMDAwMDAzODE0Njk3MjY2IiBoZWlnaHQ9IjM1IiBmaWxsPSIjMzM5OTMzIi8+PHRleHQgeD0iNTIuMDAwMDAzODE0Njk3MjY2IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ1JvYm90bycsIHNhbnMtc2VyaWYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSIyIj5NQURFIFdJVEg8L3RleHQ+PHRleHQgeD0iMTMyLjAwMDAwOTUzNjc0MzE2IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBsZXR0ZXItc3BhY2luZz0iMiI+Tk9ERTwvdGV4dD48L3N2Zz4=)](https://forthebadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODcuMDAwMDE1MjU4Nzg5MDYiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxODcuMDAwMDE1MjU4Nzg5MDYgMzUiPjxyZWN0IHdpZHRoPSIxMDQuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIGZpbGw9IiMwMDAwMDAiLz48cmVjdCB4PSIxMDQuMDAwMDA3NjI5Mzk0NTMiIHdpZHRoPSI4My4wMDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIzNSIgZmlsbD0iIzRkYjMzZCIvPjx0ZXh0IHg9IjUyLjAwMDAwMzgxNDY5NzI2NiIgeT0iMjEuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidSb2JvdG8nLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMiI+TUFERSBXSVRIPC90ZXh0Pjx0ZXh0IHg9IjE0NS41MDAwMTE0NDQwOTE4IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBsZXR0ZXItc3BhY2luZz0iMiI+IE1PTkdPREIgPC90ZXh0Pjwvc3ZnPg==)](https://forthebadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODcuMDAwMDE1MjU4Nzg5MDYiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxODcuMDAwMDE1MjU4Nzg5MDYgMzUiPjxyZWN0IHdpZHRoPSIxMDQuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIGZpbGw9IiMwMDAwMDAiLz48cmVjdCB4PSIxMDQuMDAwMDA3NjI5Mzk0NTMiIHdpZHRoPSI4My4wMDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIzNSIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjUyLjAwMDAwMzgxNDY5NzI2NiIgeT0iMjEuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidSb2JvdG8nLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMiI+TUFERSBXSVRIPC90ZXh0Pjx0ZXh0IHg9IjE0NS41MDAwMTE0NDQwOTE4IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBsZXR0ZXItc3BhY2luZz0iMiI+IEVYUFJFU1M8L3RleHQ+PC9zdmc+)](https://forthebadge.com)

</div>
</div>

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">


[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDIuMDAwMDExNDQ0MDkxOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDE0Mi4wMDAwMTE0NDQwOTE4IDM1Ij48cmVjdCB3aWR0aD0iOTUuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSI5NS4wMDAwMDc2MjkzOTQ1MyIgd2lkdGg9IjQ3LjAwMDAwMzgxNDY5NzI2NiIgaGVpZ2h0PSIzNSIgZmlsbD0iIzAwN2ZmZiIvPjx0ZXh0IHg9IjQ3LjUwMDAwMzgxNDY5NzI2NiIgeT0iMjEuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidSb2JvdG8nLCBzYW5zLXNlcmlmIiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMiI+Q09OVEFJTlM8L3RleHQ+PHRleHQgeD0iMTE4LjUwMDAwOTUzNjc0MzE2IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBsZXR0ZXItc3BhY2luZz0iMiI+TVVJPC90ZXh0Pjwvc3ZnPg==)](https://forthebadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAuMDAwMDExNDQ0MDkxOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDE2MC4wMDAwMTE0NDQwOTE4IDM1Ij48cmVjdCB3aWR0aD0iOTUuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSI5NS4wMDAwMDc2MjkzOTQ1MyIgd2lkdGg9IjY1LjAwMDAwMzgxNDY5NzI3IiBoZWlnaHQ9IjM1IiBmaWxsPSIjNzY0YWJjIi8+PHRleHQgeD0iNDcuNTAwMDAzODE0Njk3MjY2IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ1JvYm90bycsIHNhbnMtc2VyaWYiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSIyIj5DT05UQUlOUzwvdGV4dD48dGV4dCB4PSIxMjcuNTAwMDA5NTM2NzQzMTYiIHk9IjIxLjUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSInTW9udHNlcnJhdCcsIHNhbnMtc2VyaWYiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSI5MDAiIGxldHRlci1zcGFjaW5nPSIyIj5SRURVWDwvdGV4dD48L3N2Zz4=)](https://forthebadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDIuMDAwMDExNDQ0MDkxOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDE0Mi4wMDAwMTE0NDQwOTE4IDM1Ij48cmVjdCB3aWR0aD0iOTUuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSI5NS4wMDAwMDc2MjkzOTQ1MyIgd2lkdGg9IjQ3LjAwMDAwMzgxNDY5NzI2NiIgaGVpZ2h0PSIzNSIgZmlsbD0iIzAwYWVlZiIvPjx0ZXh0IHg9IjQ3LjUwMDAwMzgxNDY5NzI2NiIgeT0iMjEuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidSb2JvdG8nLCBzYW5zLXNlcmlmIiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMiI+Q09OVEFJTlM8L3RleHQ+PHRleHQgeD0iMTE4LjUwMDAwOTUzNjc0MzE2IiB5PSIyMS41IiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iOTAwIiBsZXR0ZXItc3BhY2luZz0iMiI+SldUPC90ZXh0Pjwvc3ZnPg==)](https://forthebadge.com)

</div>
</div>

<div align="center">
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px;">


[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](http://ForTheBadge.com)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDQuMDAwMDA3NjI5Mzk0NTMiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxMDQuMDAwMDA3NjI5Mzk0NTMgMzUiPjxyZWN0IHdpZHRoPSI1Ny4wMDAwMDM4MTQ2OTcyNjYiIGhlaWdodD0iMzUiIGZpbGw9IiMzMUM0RjMiLz48cmVjdCB4PSI1Ny4wMDAwMDM4MTQ2OTcyNjYiIHdpZHRoPSI0Ny4wMDAwMDM4MTQ2OTcyNjYiIGhlaWdodD0iMzUiIGZpbGw9IiMwMDAwMDAiLz48dGV4dCB4PSIyOC41MDAwMDE5MDczNDg2MzMiIHk9IjIxLjUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSInUm9ib3RvJywgc2Fucy1zZXJpZiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPlVTRVM8L3RleHQ+PHRleHQgeD0iODAuNTAwMDA1NzIyMDQ1OSIgeT0iMjEuNSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IidNb250c2VycmF0Jywgc2Fucy1zZXJpZiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9IjkwMCIgbGV0dGVyLXNwYWNpbmc9IjIiPkpTWDwvdGV4dD48L3N2Zz4=)](https://forthebadge.com)

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
    <figcaption>Dashboard Overview</figcaption>
  </figure>
  </div>


  <div align="center">
  <div style="display: flex; ; gap: 5px;">

  <figure>
    <img src="./client/src/assets/Breakdown.jpeg" width="400" alt="Breakdown by Category" />
    <figcaption>Breakdown by Category</figcaption>
  </figure>
  <figure>
    <img src="./client/src/assets/Rankings.jpeg" width="400" alt="Licensee Rankings" />
    <figcaption>Licensee Rankings</figcaption>
  </figure>

  </div>
  </div>

  <div align="center">
  <div style="display: flex; ; gap: 5px;">

  <figure>
    <img src="./client/src/assets/PerformanceComparison.jpeg" width="400" alt="Performance Comparison" />
    <figcaption>Performance Comparison</figcaption>
  </figure>
  <figure>
    <img src="./client/src/assets/ProductComparison.jpeg" width="400" alt="Product Comparison" />
    <figcaption>Product Comparison</figcaption>
  </figure>

  </div>
  </div>

<div align="center">
  <figure>
    <img src="./client/src/assets/GeographicAnalysis.jpeg" width="800" alt="Geographic Analysis" />
    <figcaption>Geographic Analysis</figcaption>
  </figure>
</div>

> [!TIP]
> Use your own MongoDB connection string in the .env file and load in your custom data:


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

