# newRegistrationApp

This project is a combination of .NET Core backend and Angular frontend.

## Description

This repository contains the source code for a web application built with .NET Core for the backend and Angular for the frontend. The backend is responsible for handling data storage, business logic, and API endpoints, while the frontend provides a user-friendly interface for interacting with the application.

## Features

- **.NET Core Backend:**
  - RESTful API endpoints
  - Data storage with MS SQL Server
  - Entity Framework Core for data access

- **Angular Frontend:**
  - Single-page application (SPA) architecture
  - Responsive design

## Registration Process

The registration process is divided into the following steps:

1. **Collecting data about the new user’s company:** Gather information about the user's company, such as company name, and industry.

2. **Collecting data about the new user:** Gather information about the new user, including personal details, contact information, etc.

3. **Display of a summary and approval of terms of service:** Present a summary of the provided information to the user for review. The user is required to approve the terms of service before proceeding.

4. **Saving all data in the database:** Once the user approves, save all collected data in the database securely.

5. **Show the successful message to the user:** Display a success message confirming the successful completion of the registration process.

## Project Objectives

This project aims to achieve the following objectives:

- **Fault Tolerance:** Implement measures to handle errors gracefully and ensure the application remains operational even in the face of failures.

- **Security:** Employ best practices for data security to protect user data and prevent unauthorized access.

- **Usability:** Design an intuitive user interface and user experience to make the registration process smooth and easy to understand.

- **Maintainability:** Write clean, modular, and well-documented code to facilitate future maintenance and updates.

## Prerequisites

Before running the application, ensure you have the following installed:

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
