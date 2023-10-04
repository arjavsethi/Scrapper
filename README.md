# Amazon Product Scraper

This project is a web scraper designed to extract 11 essential attributes from Amazon product pages and provide the data in an Excel sheet. It utilizes Next.js, Express, and Puppeteer to perform the scraping.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up and run the project locally, follow these steps:

1. Clone the repository:
git clone <repository_url>

2. Navigate to the project directory:

3. Install dependencies in both the client and server folders:
cd client
npm install
cd ../server
npm install
## Usage

1. After installation, start the development server for both the client and server:

In the `client` directory:
npm run dev
In the `server` directory:
npm run dev

2. Access the web application in your browser at `http://localhost:3000`.

3. Enter an Amazon product URL and initiate the scraping process.

4. The scraped data will be compiled into an Excel sheet and made available for download.

## Tech Stack

- Next.js
- Express
- Puppeteer
- Node.js
- HTML/CSS
- Excel.js (for Excel sheet generation)

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
