# Documentation for Backlog Buddy 


## 👋🏼 Intro:
Welcome to Backlog Buddy, a personal project born out of a familiar problem: buying too many video games and never getting around to playing them. This project is not just a tool; it's a response to the overwhelm of choice and a strategy for making the most of the games you already own. By recommending games from your existing backlog based on your current mood or interests, Backlog Buddy aims to save you money and encourage you to enjoy the games you were excited enough to purchase.

## 📦 Tech Stack: 
* **React.js:** For building the user interface with a component-based approach.
* **TypeScript:** Adding type safety to enhance code quality and developer experience.
* **Node.js:** For the server-side logic, providing a scalable foundation.
* **Knex.js:** A SQL query builder, facilitating database interactions.
* **Express.js:** To handle web server operations, making API routing simple and efficient.
 

## 👩🏻‍🍳 Features: 
Backlog Buddy is equipped with several key features to help users manage their game collections:

* **Backlog Management:** Add games to your personal backlog, noting why each title caught your interest.
* **Detailed Game Insights:** Access comprehensive details about each game in your backlog, including the mood you were in when you made the purchase.
* **Personalized Recommendations:** Before buying a new game, get suggestions from your backlog matching the new game's genre or your current mood.
* **Flexible Categorization:** Organize and filter your games by status, mood, and genre to easily find what you're looking for.


## 💭 Process: 
This project initially started as part of the Dev Academy bootcamp, for a personal project. It was an idea I had because of a personal problem I experience on a frequent basis. I’ve been working on it, iterating, and refactoring even after graduating the bootcamp.  It was very exciting to work on this initially, and to see how my idea was coming to life. I struggled in the beginning to work with the IGDB api, as it was also the first time I was working with an API of that size and, what felt like at the time, complexity. 
As I worked on this more and more, I recognised the need to work more structured. Previously, I was just coding whatever came to mind, instead of thinking per component or per feature, which often left the codebase a bit messy. 
As I worked on it more and more, I got a little demotivated since my UI work is not great. I’m still working on really translating the vision I have for it, into an actual nice looking website. Ultimately though, this project was envisioned as an app, rather than a webpage so eventually I will be building an app version of this. 

## 📚 Learnings: 
* Learned how to use the IGDB API 
* Learned how to use Chakra UI 
* Learned how to build a project from initial idea to Minimum Viable Product

## ✨ Improvements: 
* UI could be improved by loads
* I’ve currently only got one database that holds all the user’s backlog, but I will need to create another one in order to query things more effectively 

## 🚦 Running the project: 

```
Clone the repo
npm install
npm run knex migrate:latest 
npm run knex seed:run 
npm run dev
```

📸 Video/Images:

<div>
    <a href="https://www.loom.com/share/587ab4e02abc448dba704ab23c5d4e61">
      <p>Backlog Buddy Demo - February 16 2024 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/587ab4e02abc448dba704ab23c5d4e61">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/587ab4e02abc448dba704ab23c5d4e61-with-play.gif">
    </a>
  </div>

