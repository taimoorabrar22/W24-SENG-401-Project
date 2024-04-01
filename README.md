# W24-SENG-401-Project

Welcome to Yes Chef ! This README.md file provides you with instructions on how to set up, run, and access the application, how this app is deployed, as well as an overview of the project's design.

## URL to application
https://w24-seng-401-project-final.vercel.app


## Table of Contents
- [Design](#design)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Design 

- Data privacy: Data is kept private by encrypting sensitive user information
- Ease of use: The application is very easy to use, with an intuitive GUI and helpful text prompts throughout the application. The app requires minimal training, so anyone can use it.
- User authentication: Only authenticated users can access this application

## Installation

Here are the instructions to get the code working locally.

### Prerequisites:
- [node v20.11.1](https://nodejs.org/en/download)

### Installation 

1. Clone the repository 

 ```bash
git clone https://github.com/maheen-raza/W24-SENG-401-Project.git
```
2. Install and run locally

- Front end
  Note: Please contact author for required .env file as the frontend will not run without it
  
 ```bash
cd yeschef
cd frontend
yarn install
yarn dev
```
- Backend
  Note: Please contact author for required .env file as the backend will not run without it
  
 ```bash
cd yeschef
cd backend
yarn install
yarn dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
