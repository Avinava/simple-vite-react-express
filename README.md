# simple-vite-react-express

<p align="center">
  <img src="./public/template-logo.png" alt="Ganges Logo" height="200">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=Vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/postgresql-4169e1.svg?style=flat-square&logo=PostgreSQL&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&logoColor=white" alt="Prisma">
    <br>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white" alt="Nodemon">
    <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios">
    <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON">
</p>

This is a boilerplate to build a full stack web application using React, Node.js, Express and Vite.

- [simple-vite-react-express](#simple-vite-react-express)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Vite](#vite)
    - [Nodemon](#nodemon)
    - [Express](#express)
    - [Postgres](#postgres)
    - [Prisma](#prisma)
    - [PostgreSQL and Prisma](#postgresql-and-prisma)
    - [Express API and React](#express-api-and-react)
    - [Formik](#formik)

## Introduction

This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express. This application is formatted through [prettier](https://prettier.io/).

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [vite dev server](https://vitejs.dev/guide/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using vite and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone git@github.com:Avinava/simple-vite-react-express.git
# Go inside the directory
cd simple-vite-react-express
# Install dependencies
yarn (or npm install)
# Start development server
yarn dev (or npm run dev)
# Build for production
yarn build (or npm run build)
# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is `client` and `server` directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the `server` directory.

### Vite
Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a dev server that serves your source files over native ES modules, and a build command that bundles your code for production.

### Nodemon
Nodemon is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

### Express
Express is a web application framework for Node.js. It is used to build our backend API's.

### Postgres
Postgres is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. A sample `Contact` schema is created in this application to store contact records.

### Prisma
Prisma is an open-source database toolkit. It includes a JavaScript/TypeScript ORM for Node.js

### PostgreSQL and Prisma
This boilerplate uses [PostgreSQL](https://www.postgresql.org/) as its database and [Prisma](https://www.prisma.io/) as its ORM. Prisma makes it easy to perform database operations from your Node.js server.
To connect to your PostgreSQL database, update the `DATABASE_URL` in the `.env` file with your database credentials. Then, you can use Prisma's [database client](https://www.prisma.io/docs/concepts/components/prisma-client) to perform database operations in your Express routes.
This boilerplate includes a sample `Contact` model in `prisma/schema.prisma` and corresponding API routes in `server/routes/contact.routes.js` that demonstrate how to create and delete records in your PostgreSQL database using Prisma.

### Express API and React
This boilerplate includes a simple Express API in `server/index.js` and `server/routes/contact.routes.js`. The API includes routes for creating and deleting contacts.
The React application components that use these API routes to create and delete contacts. The `pages/NewContact` component includes a form for creating new contacts, and the `Contacts` component includes a list of all contacts with a delete button for each contact.

### Formik
This boilerplate uses [Formik](https://formik.org/) for form handling and validation in the React application. The `ContactForm` component in `client/pages/NewContact.js` demonstrates how to use Formik to create a form with validation.
Formik makes it easy to handle form state, validation, and submission in React. It includes built-in hooks like `useFormik` that you can use to manage your form state and handle form submission.
