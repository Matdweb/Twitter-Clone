# Twitter Clone

🚀 Welcome to my Twitter Clone project – a platform designed to replicate the Twitter experience with features like posting, liking, retweeting, commenting, and more.

## Purpose

🌐 The main purpose of this project is to simulate the functionalities of Twitter, providing users with a social media space to express thoughts, create profiles, and share content.

## Why Build This?

🛠️ This project serves as a showcase for my skills and knowledge, demonstrating my ability to develop a real-world application. It's a portfolio piece highlighting my proficiency in creating scalable solutions and utilizing technology effectively.

## Problem Solving

🤔 In the realm of social media, this project addresses the need for users to share ideas, create profiles, and express themselves through images and text – solving the typical challenges faced by social media applications.

## Motivations

💡 My passion for creating things from scratch and utilizing technology to solve problems drove the development of this project. It provided valuable lessons in large-scale project planning and execution.

## About the project 

📽️ This [Next.js](https://nextjs.org/) project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
<br /> 📄 For commits we are using [`conventional-commits`](https://www.conventionalcommits.org/es/v1.0.0-beta.2/).
 <br /> ✍🏼 This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Design Solutions 🎨

Take a closer look at my design solutions in Figma to get a visual sense of the project's aesthetics. I've used designs for both desktop and responsive versions to ensure a seamless and engaging user experience.

- **Desktop Design:** [View Desktop Design](https://www.figma.com/file/VHDK0dBvWRZKIaqKW5QNHh/Twitter-desktop-pages-(feed%2C-sigup%2C-login%2C-profile)-(Community)?type=design&node-id=117%3A900&mode=design&t=TRokLBtdQnL0bqAj-1)
- **Responsive Design:** [View Responsive Design](https://www.figma.com/file/E7lH6SMwwU6cXmJFvqYzip/Twitter-UI-mobile-version?type=design&node-id=4%3A1224&mode=design&t=HSfLtzr9BS70YAo6-1)

Explore these designs to see how we've translated our project ideas into visually appealing and user-friendly interfaces. Your feedback and insights are always welcome!


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Features 🚀

### Project Overview
A Twitter clone project with the main purpose of simulating the Twitter experience. It includes features such as creating ⬆️, liking ❤️, retweeting 🔄, and commenting 📝 on posts.

### Key Features
#### **Mock Data API:**
-  Utilizes a mock data API to extract and display posts and images. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/8).

![image](https://github.com/Matdweb/Twitter-Clone/assets/110640534/47e2361f-9873-4c75-9531-52f9d3e380cf)

#### **User Authentication:**
- Implements user registration and login functionalities using NextAuth. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/11).
#### **Database Connection:** 
- Connects to a [MongoDB](https://www.mongodb.com/es) database (MongoDB) for storing user information.
#### **Theme Switching:** 
- Manual button to switch between light and dark modes. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/17)

![READMEmanualThemeSwitch](https://github.com/Matdweb/Twitter-Clone/assets/110640534/e969954e-918a-49b0-86b8-e8147527f6c2)

#### **Main Page:**
- Displays a set of posts with mock data, images, and loaders for a seamless user experience. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/20).

![READMEmainPage](https://github.com/Matdweb/Twitter-Clone/assets/110640534/e0867421-39fb-4092-a85e-740c0ea4c6dd)

#### **Profile Page:**
- Renders detailed information about the authenticated user and their posts. Also gives the user the ability to edit their profiles. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/22)

![image](https://github.com/Matdweb/Twitter-Clone/assets/110640534/56ed781d-32e5-4e32-93a2-51969b03e68e)

#### **Post Interactions:**
- Allows users to like, retweet, comment, and share posts, updating both the database and Redux state. Learn about [likes](https://github.com/Matdweb/Twitter-Clone/pull/28), [retweets](https://github.com/Matdweb/Twitter-Clone/pull/29), and [comments](https://github.com/Matdweb/Twitter-Clone/pull/37)

![READMEInteractWithPost](https://github.com/Matdweb/Twitter-Clone/assets/110640534/e8891928-c44e-432b-bb02-0160264ea4a7)


#### **User Posts:**
- Users can create their own posts, add text, and upload images managed by the [Edgestore](https://edgestore.dev/) service.
  
#### **User page:**
- Users can go the post's owners profile page and interact with their profile. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/46)

#### **Welcome Page:**
- A landing page that redirects authenticated users to the /home route or provides registration/login options. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/34)


### Additional Functionalities
- **Sign Out:** Enables users to log out across the application.
- **Dynamic Routing:** Unique pages for each post and user profile, facilitating easy sharing.
- **New Route Pages:** Created `home/notifications`, `home/more`, `home/messages`, and `home/explore` pages.

### Endpoint Overview 🌐
1. **`api/login`:** Validates user credentials and returns a success or error message. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/11).
2. **`api/register`:** Creates a new user in the database. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/11).
3. **`api/posts`:** Fetches posts from JSONPlaceholder and Piscum APIs and returns an array of posts. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/8).
4. **`api/posts/likePost`:** Modifies the likes count for a post in the MongoDB database. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/28)
5. **`api/posts/addComment`:** Adds a new comment to the user structure in the database. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/37)
6. **`api/posts/findPost`:** Returns the post that matches the post ID.
7. **`api/user`:** Retrieves user information based on the provided email. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/22)
8. **`api/user/addPost`:** Adds a new post to the user's posts array. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/32)
9. **`api/user/findById`:** Finds a user based on the user ID.
10. **`api/user/update`:** Updates user information. Learn more [here](https://github.com/Matdweb/Twitter-Clone/pull/22)

## How to Contribute

Thank you for showing interest in contributing to our `'Twitter-Clone'` project! Your help is greatly appreciated. To get started, please follow these steps:

1. **Find a Ticket**: Browse our project's issues and identify a ticket you'd like to contribute to. This helps maintain a clear and organized development process.

2. **Express Your Interest**: Leave a comment on the chosen ticket with your name and a clear statement indicating your intent to contribute. This helps us track who's working on what.

3. **Ticket Assignment**: The first contributor to express interest in a ticket will be assigned to it, provided they confirm their readiness within 24 hours. This ensures efficient ticket allocation.

4. **Single Contributor per Ticket**: To ensure focused development, only one contributor may work on a ticket at a time. However, we welcome feedback and suggestions from everyone.

5. **Time Commitment**: Once a ticket is assigned to you, coordinate a suitable development timeline with the project's owner or lead developer. Please honor this commitment, as other contributors and project timelines depend on it.

6. **Code Review**: Prior to merging any code, the project owner or lead developer will review your changes to ensure alignment with project standards and objectives.

> In rare cases where guidance is extremely necessary, you can refer to the other `'Twitter-Clone'` repository to guide yourself. See [here](https://github.com/Matdweb/Twitter-Clone).

By following these steps and communicating clearly, you can make valuable contributions to our project while keeping the development process organized and collaborative. Happy coding! 👨🏻‍💻

## Showcase Your Contributions

We encourage contributors to feature their `'Twitter-Clone'` project contributions in their portfolios and resumes. This helps you demonstrate your skills and experience to potential employers or collaborators. Here's how:

1. **List Your Contributions**: In your portfolio, create a section for your `'Twitter-Clone'` project contributions. Provide a brief description of each contribution and its impact.

2. **Link to the Repository**: Include a direct link to the `'Twitter-Clone'` repository, allowing others to explore your code and the overall project.

3. **Highlight Achievements**: Spotlight specific challenges you tackled, improvements you made, or unique solutions you implemented.

4. **Share Your Experience**: Discuss the valuable experience you gained while working on the project, including collaboration with the development team, adherence to coding standards, and real-world problem-solving.

5. **Connect with Us**: Let us know when you've added your `'Twitter-Clone'` contributions to your portfolio. We'd love to celebrate your success and promote your work within our community.

Your contributions are a testament to your skills and dedication. We're thrilled to have you as part of our project. Share your portfolio with us, and let's continue to grow and learn together!

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://es.react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [NextAuth](https://next-auth.js.org/)
- [EdgeStore](https://edgestore.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [MongoDB](https://www.mongodb.com/es)
- [jsonPlaceholder](https://jsonplaceholder.typicode.com/posts)
- [Picsum](https://picsum.photos/)
- [Ouch! illustrations](https://icons8.com/illustrations)

## License
This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
