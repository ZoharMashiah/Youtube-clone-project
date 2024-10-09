# Streambox Project

Welcome to the Streambox project repository!

Our comprehensive documentation and user guides are available in our [Wiki](https://github.com/ZoharMashiah/Youtube-clone-project/wiki).

![WhatsApp Image 2024-05-29 at 18 01 24](https://github.com/ZoharMashiah/Youtube-clone-project/assets/103347396/9416f52b-d946-4d82-8c0d-af0c2ee122ac)

### Part 1

Hi,
This is the first part of the project. We designed to replicate the core functionalities of YouTube. It allows users to upload, view, and interact with video content. The platform includes features such as user authentication, video streaming, commenting, liking, and subscribing to channels.

1. We planned the working schedule and created a jira sprint where we splitted the missions between the team partners.
2. We started from the part of the web. we built the visual of the pages, included with the style that we planned ahead in step 1.
3. We built the functionallty of the web part. We allows users to upload, view, and interact with video content and add a connection between the pages.
4. We added validation checks for every page, like: password with a validation check that the password is 8 digits , and icluded 2 chararcters and 2 numbers minimum.
5. We worked the same way with the Android part.
6. We splitted the work between us the way that both of us taked a part at each part, the two of us worked with React and with Android.

how to run the program: Minimum sdk 24.

### Part 2

This is the second part of the project. In this, Omri joined us. We added a server, and wrote the data to a database. In addition, we added nested comments and made some UI changes.  
This part will be locked under "part2-branch", and everything that comes after that, will in be a sperate branch for part 3.

1. First, we added the server logic, and the DB support using mongoose.
2. Then, we made a overhaul for the entire front end, to prepare it for server connection.
3. After that, we worked on connecting between the client and the server.

### Part 3
Android Server Connection and Data Handling
In this part, we connected the Android app to the MongoDB server from Part 2.

Process

API Requests:
Defined endpoints for video, comments, user authentication, and interactions.
Ensured secure and efficient data transfer.

Web Services:
Implemented services to handle network operations and provide a clean interface for the app.
Included error handling and response parsing.

Repository Integration:
Managed data operations, abstracted data sources, and provided a unified data source.
Simplified architecture and maintained separation of concerns.

ViewModel Setup:
Managed UI-related data in a lifecycle-conscious way.
Interacted with the repository for data fetching and storage.

Room Database and DAO:
Implemented Room for offline support and performance.
Created DAOs for efficient and type-safe database operations.

Running the Program
Minimum SDK version: 24.
Ensure the server is running and accessible.
Configure the app with the correct API base URL.

1. Open mongoDb Compass
![Screenshot 2024-07-18 at 11 47 14](https://github.com/user-attachments/assets/219b7fb0-85d5-4cf0-a079-412962e15cf6)
2. Click connect
3. Run the server and then come back to the mongoDb Compass
4. Now you will see api database in the collections comments, users, videos
5. For each collection enter to it
![Screenshot 2024-07-18 at 11 50 30](https://github.com/user-attachments/assets/6c849d0a-42a8-47c0-8869-20d87b5996cf)
6. And click Add Data -> Import JSON or CSV file
7. Select the data from the project folder -> data and choose the collection name
8. Then you will see in the web and android that the data updated

### Part 4

In this part, we created a video suggestion mechanism that is handled by a seperate TCP server. The suggestions are based on the user's watching history, where users would be recommended videos that were prevously watched by users with similar interests.  
We also created a wiki for the repository, containing a full demonstration of the app.

#### How to build and run

1. Navigate to "server/tcp-server/", and run the "make" command to compile the TCP server. Do note that the TCP server must be compiled and run on POSIX compliant systems.
2. Run "./tcpServer" to start the server.
3. From a different terminal, navigate to "server/" and run "npm start". This will build and run the ReactJS and NodeJS apps.
4. Visit the [website](http://localhost:3000/), or run the android app using an emulator.
