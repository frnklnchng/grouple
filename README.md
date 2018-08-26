# Grouple

## Background and Overview
Grouple is a web application that allows for like-minded Reddit users to chat with other Redditors about their subject -subreddit- of choice.


## Functionality and MVP

- [ ] Reddit users are able to sign in through Reddit's OAuth and access the app directly
- [ ] Information such as a user's subscribed subreddits and accumuluated karma in a specific subreddit will be requested directly from the Reddit API
- [ ] Direct messages in a chatroom will have a single-depth response thread
- [ ] Guests will be able to view a subreddit's chatroom, but will not be able to participate until authenticated
- [ ] User profiles and statistics will be generated from user data requests to the API
- [ ] User location and timezone will optionally be available for other users to view

### Bonus

- [ ] Lazy loading chatroom messages for a smooth user experience and to reduce unnecessary requests
- [ ] Karma related rewards such as avatar and profile borders
- [ ] Proximity chat to contact other like-minded Redditors around you

## Technologies and Technical Challenges

- MongoDB
- Express 
- React - To create front end web components
- Node.js - 
- Socket.IO - connceting multiple users to chatroomns
- Bootstrap - CSS standard to style application

### Technical Challenges include: 
* Implementing a simple and clean OAuth system for users to login through their Reddit accounts
* Connecting many users to live chat for respective subreddit topics
* Polishing front end User Interface for great user experience 

## Weekend Goals

- Mobile-first styling
- Reddit OAuth
- Backend setup
- Websockets

## Things Accomplished Over the Weekend
- [ ] Create a backend with working login and signup
- [ ] Get the oauth working for reddit

## Group Memebers and Work Breakdown
Donguk Kim, Franklin Chang, Kevin Choy, Jason Wong

Donguk Kim's primary responsibilities will be:
- Backend implementations

Franklin's primary responsibilities will be:
- Reddit API integration

Kevin's primary responsibilities will be:
- researching OAuth
- implementing OAuth into the application 

Jason's primary responsibilities will be:
- Backend implementations


### Weekend
- Study MERN stack, Reddit API, Websockets
- Complete backend setup
- Selecting bootstrap template
- Complete Reddit API request functionality
- Backend: models, database, controllers, server, websockets, routes
- OAuth

### Day 1 (Mon)
 - Complete websockets setup (if not earlier)
 - Complete working front end for users to login through Reddit account (OAuth)
 - Display basic Reddit user details 
### Day 2 (Tue)
 - Style an impressive spash page
 - Create a working multi-user live chatroom
### Day 3 (Wed)
 - Create multiple chatrooms for distinct subreddit topics (Avoid duplicate subreddits)
 - Create system to link active subreddit forum to respective chatroom
 - Style chatrooms appropriately
### Day 4 (Thur)
 - Create user profile view to display Reddit statistics
 - Create display component for active users for current chatroom
 - Style display appropriately 
### Day 5 (Fri)
 - Implement direct message system for private messages between users
 - Research and implement lazy load for chatroom messages
### Day 6 (Sat)
 
### Day 7 (Sun)

## Plan for getting users and reviews
* Team members will share with friends and family
* Suggest application to appropriate outlets



