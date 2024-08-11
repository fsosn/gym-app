# gym-app

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#see-the-app">See The App!</a></li>
        </ul>
    </li>
    <li>
        <a href="#built-with">Built With</a></li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
    </li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#running-api">Running Backend</a></li>
            <li><a href="#running-frontend">Running Frontend</a></li>
            <li><a href="#running-both">Running Both</a></li>
        </ul>
    </li>
  </ol>
</details>

## About The Project

### Overview

**Gym App** is a **full stack** web-based application designed to help users **track their fitness routines, exercises and progress**. 🏋🏽💪🏼

It was designed using a **mobile-first approach** to ensure an **optimal user experience** on all devices. 📱💻

Currently working on adding new features and improving functionality! 📈🚀

### See The App!

<p float="left">
    <img src="https://i.imgur.com/4WbxAfT.png" width=250>
    <img src="https://i.imgur.com/IRHRX5T.png" width=250>
    <img src="https://i.imgur.com/8jJwGrx.png" width=250>
</p>
<p float="left">
    <img src="https://i.imgur.com/VTxVmGZ.png" width=250>
    <img src="https://i.imgur.com/iy8U42T.png" width=250>
    <img src="https://i.imgur.com/N1cIe9d.png" width=250>
</p>

## Built With

-   ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
-   ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
-   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
-   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
-   ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
-   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
-   ![shadcn/UI](https://img.shields.io/badge/shadcn/UI-000000?style=for-the-badge)
-   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Getting Started

This section provides step-by-step instructions on how to set up the project locally.

### Prerequisites

Ensure you have Docker and Docker Compose installed on your local machine.

### Installation

1. Clone the repository
    ```sh
    git clone https://github.com/fsosn/gym-app.git
    ```
2. Make sure Docker is running.
3. Navigate to the root of project.
4. Build Docker containers:
    ```sh
    docker-compose build
    ```

## Usage

#### Running Backend

To start API and database:

```sh
docker-compose up backend
```

The API will be accessible at `http://localhost:5000`.

#### Running Frontend

To run frontend:

```sh
docker-compose up frontend
```

Frontend will be accessible at `http://localhost:5173`.

#### Running Both

To run both the whole app:

```sh
docker-compose up
```
