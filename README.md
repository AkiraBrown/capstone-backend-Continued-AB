# Giftune Frontend

An app designed to keep you on top of your loved ones’ upcoming birthdays where you can effortlessly select the perfect gift from a diverse array of options provided by your loved one's wishlist.

## Giftune instructions (local host)

1. In command line, navigate to 'capstone-backend'
2. Insert command 'npm install'
3. Insert command 'npm run pg:init'
4. Insert command 'npm run dev'

   Now for the Frontend

5. In command line, navigate to 'capstone-frontend'
6. Insert command 'npm install'
7. Insert command 'npm start' or 'npm run start'

   Application will now open in a new tab on your default browser with URL 'http://localhost:3000/'

### Deployed Links

frontend: [Giftune on Netlify (TBC)]()
backend: [Giftune on Render (TBC)]()
database: []()

#### Blockers we had during development

- Basic SQL queries everyone needed weren't made beforehand and we had multiple queries doing the same thing. We did some cleanup and fixed that as a group.
- At one point we needed to figure out how to store the user login in local storage or in state on App.js so we could get the user information passed around properly and make a conditional for the sidebar that should only show up after you log in. We asked Instructor Pak for help on this since we were at a loss to get this working. We ended up storing the user in both local storage and in state.
- Logic for maipulating the upcoming dates and sorting them was confusing and a couple of us put our heads together to work it out and then used chatgpt to clean up the code a bit before we finished making it more efficient.

## Express Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Package manager

### Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

> Note: The development server will restart automatically when changes are made to the source code as long as you use Nodemon to start the server and leave the server running. If you stop the server, you will need to restart it manually. We've setup a script in the `package.json` file to make this the default behavior when you run `npm run dev`.

### Built With

- [Express](https://expressjs.com/) - Web framework
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [nodemon](https://nodemon.io/) - Development server
- [cors](https://www.npmjs.com/package/cors) - Cross-origin resource sharing
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger

# Continuation

With Giftune in it's previous state I've been able to implement some more features into giftune such as enabling users to search for any item they want on their wishlist and to add each other on the implementing events. This fork of Giftune is only me working on the project.

## Challenges

### **Searching for items**

One of the major challenges we encountered when we first approached interacting with
multiple ecommerce stores was acquire information from multiple places. Since each ecommerce store would have their own API that feeds back information differently, so me and my team chose to simplify the function by enabling the user to put the link into a form and keep track of the wishlists that way. After our demo day I found a solution that scrapes the data off of Google shopping. I came to solution after reviewing Google's shopping API to only find that the API didn't provide the results I needed, so I found SerpAPI that enables me to safely scrape data off of the shopping tab in Google.

### New Problem Arises

After connecting SerpAPI to my backend I was able to get all the information that I needed for users to pick out items to add to their wishlist, but there was a new problem... _I only have 100 requests a month._

This new problem meant that it would be very easy for all my requests to be used up if this application ever makes it to production. So to solve for this I used the `fs` package in NODEjs to create JSON files of each brand new request. Then when a user makes a request that matches the filename on one of JSON results we return that data instead of making a fresh request from SerpAPI.
