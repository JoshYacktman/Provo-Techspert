<h1 align="center">Provo Techspert</h1>


A website for my tech repair "business" at BYU. https://startup.provotechspert.click

# Specification Deliverable 🚀

## Elevator Pitch

Have you ever had a broken game console, controller, or laptop? Have you ever worried that if you bring this to a technician they will upcharge the service significantly, be dishonest, and/or hold on to your device for a significant period of time? Provo Techsperts is the solution for you! With a completely transparent process that involves the customer every step of the way they can be sure they're getting the best price and the best timeframe!

## Design

<img src="public/images/Provo Techspert.jpg" alt="Design Image">

## Key Features:
 - Minimal design aesthetic
 - Minimal user info (only stores username, password hash, email, and chat logs (this account can also be deleted))
 - Secure login over HTTPS
 - Multiple chat tabs and ability to send messages in chat
 - Emails notifying users when new message appears
 - Environment variables for safely storing email system username and password on the server
 - Chat renaming on both ends
 - Multiple chats can be swapped between or opened
 - Status bar ("Not Completed", "Parts Ordered", "In Progress", "Completed", "Item Returned")
 - Can delete account
 - Chat names are limited to 20 characters and chat messages are limited to 500 characters
 - Usernames are limited to 12 characters

## Technologies:

 - HTML (application structure Three pages: One for the home page, one for the chat boards, and one for account settings (allows for account deletion))
 - CSS (Styling of application that styles nicely for different device sized)
 - React (Provides useful widgets and helps simplify the process)
 - JS (For the backend and frontend. Backend uses Nodemailer for emails and MongoDB for the database. Backend has endpoints for login, account creation, chats list retrieval, chat log retrieval,
 - Nodemailer (For simplified email handling)
 - MongoDB (For simplified database handling. There are two databases: One for chat logs and one for user information)
 - AWS (Website and backend hosting)
 - Environment Variables (For safely storing the username and password for the email system)
 - Google fonts (Planning on using "Bangers" (main text) and "Montserrat" (chat messages and main page about me))
 - WebSocket (used for chat)
 - API: Gmail API to send an email from provotechspert@gmail.com to itself so I get notifications on my phone

## The Process

The process looks like this:
 - The customer goes to the website and creates an account/logs in
 - The customer creates a new chat and renames it to the name of their device
 - They automatically recieve an automated message that explains the necessary information. (E.G. "Hello! This is the Provo Techspert! Before getting started please remember that I only work on hardware issues for game consoles, controllers, and laptops. With this in mind, would you please describe the issue you are encountering with a link to a short video and/or images showing your issue (I would prefer YouTube/imgbb)?")
 - They describe the issue and give links showing the issue
 - I get a notifictaion that a message was sent in my email.
 - I send a non-liability waiver form that indicates that repair work is an inherently risky endeavor and that should an issue occur or damage come to the device I am not liable. Any parts ordered that are not used in the repair belong to me and there are no refunds if the repair is cancelled or if damage comes to the device.
 - From there I discusss the specifics of the repair and show the parts I am planning or hoping to order. They can choose to meet me in person so I can look at the device with them present and be confident that we have addressed the problem correctly.
 - The customer pays for the parts discussed being delivered to my home. Note that before any repairs begin, these parts are ordered and paid for by the customer. Therefore, if they choose to leave halfway they have only paid for the parts that were to be used in the repair.
 - Once all the parts arrive I send a message (notifies them by email) and we coordinate a time to meet for the repair.
 - At the coordinated date and time they give me the device and I start recording my repair work with them having the option to be present for the entirety of it. At this point the waiver MUST be signed or no work will happen.
 - I complete my work. The device is tested and hopefully the issue is fixed. At this point my services have not been paid for. Here they choose how much to pay me for my work. If I damage the device further they have no obligation to pay me but also cannot suee me thanks to the waiver. If they are unsatisfied with my work but it works they can take the device and leave without any further payment. If they are pleased with my work they can choose to pay me an amount they deem reasonable.
 - I upload the video of my repair work to the chat via an unlisted YouTube video and mark the status as device returned (meaning fully complete)


# AWS Deliverable 🚀

 - Server is deployed with my custom domain [here](https://startup.provotechspert.click)

# HTML Deliverable 🚀

 - Three pages: `about`, `chat`, & `settings`
 - Proper html elements (such as `<header>`, `<footer>`, `<main>`, etc)
 - Navigation links (the button in the top right shows a dropdown. Click the links and look around)
 - Placeholder text for uncompleted areas
 - Images

# CSS Deliverable 🚀
 - Header, Footer, and main are styled
 - No nav elements are used so they weren't styled. I use buttons with dropdowns to navigate.
 - Responsive to resizing
 - Application text is styled
 - Styled images

# React Deliverable 🚀
 - All HTML except minimum needed for index has been moved to React
 - All CSS has been moved to be imported by React or be inlined in React
 - Routed with React Router
 - Components created to simplify the page (most notable in the chat page)

# React Deliverable 2 🚀
 - All functionality mocked out (about page, fake log in/log out, sending messages, creating, changing, or deleting chats, and fake settings page)
 - No visible API usage since in the final version it will quietly send an email to the other individual the user is chatting with
 - Many react components to simplify the structure as much as possible
 - useState and useEffect hooks
 - Local storage used to hold fake username from mocked sign in/log out
 - Automatic redirection when not logged in or not logged out
 - Mocked out endpoints using states

# Service Deliverable
 - Create service endpoints
 - Create auth middleware
 - Add cookie tokens, store data
 - Make all endpoints working
 - Add basic tests for endpoints (TODO: fill these as endpoints completed)
 - Call api from website
 - Get placeholder images working in about (see simon about)
 - Simon deployed
 - External API used (gmail api through nodemailer)
 - Created API test suite (outdated with websockets)

# DB Deliverable
 - Simon DB
 - Add database inference in service/utils/db.js
 - Write and read from DB
 - Uses MongoDB

# Websockets Deliverable
 - Chat page uses websockets to message and manage chats
 - Chat routing replaced with websockets
 - The messages you send are returned to you as a way of verifying that it sent properly
 - Fully functional with no mocks or placeholders
