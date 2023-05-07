# Kaam Daam (کام دام)  
## Domestic Services Provider App

![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech%20Stack&lineCount=2&line1=react,react,auto;Flutter,Flutter,auto;vite,Vite,auto;&line2=nodedotjs,Node,auto;express,express,auto;postgresql,Postgresql,auto;)

### Description 
Hiring a maid for home chores or a gardener to look after a garden is a daunting task especially for females in Pakistan as people seem to have trust issues due to authenticity and security concerns.

Keeping that in mind, we have come up with an idea of an app that provides a safe and trusted platform for the people who want to hire for home chores or to be registered on the platform as those who provide domestic services on an individual level. Since authenticity is our first priority that is what makes our platform safe as all the registrations are varied first before they go online on our platform.

The model of this app is similar to freelancing sites where employers post jobs and the potential employees submit their proposal and rate for the jobs.
Types of services 
Major services for which people can register or hire include housecleaning, cooking, nanny, gardening, and personal service etc.
### Features
- Employers/employees can create their profile on the platform by providing required details.
- Employer/Client is able to post their job with all the required details. 
- Employee/Worker is able to apply to jobs from different clients based on their services they are registered to provide. 
- Employers are able to access the employee's profile and his profile rating if available. 
- Only Employer can initiate communication to protect Employer’s privacy.
- Service providers’ profiles are online only when Kaam Daam’s admin verifies it.
- Employers can give ratings to the workers after the job completion.
- Users can make account deletion requests to delete his/her account.

### Tech Stack
- Frontend: Flutter  
Reason: Our target market is mobile users. As per the norm, people prefer to use mobile apps for hiring related activities like the users of Careem and Bykea. For this particular reason we are building a mobile app.

- Frontend (Optional): React  
Reason: To create a basic information/portal site for our admin but this will be implemented when our mobile app is ready.

- Backend: Node  
Reason: Node.js is very efficient with real-time applications, as it facilitates handling multiple client requests, enables sharing and reusing packages. Our service does not require multi-threaded tasks and hence node.js will be ideal in terms of development and QoS.

- Database: Postgre  
Reason: First of all our data is structured, so SQL is the best option for using structured data.  Postgre is a powerful, open source object-relational database system that is known for reliability, feature robustness, and performance. It is easily scalable and it is open-source with a large community. So our development cost will be reduced.

- Framework: Express.js  
Reason: Express.js, is a web application framework for Node.js, released as free and open-source software. It is flexible, and scalable since it is made in NodeJS itself. It allows defining routes of an application based on HTTP methods and URLs.

### Milestones
- [X] Creation of ERD and then relational database using postgre to store and manipulate all the data.
- [X] Make a robust backend which handles all the requests on both web(optional) and mobile.
- [X] Make a web server to handle app queries using express.js.
- [X] Create a frontend on Flutter using Material Design and web(optional).

### Schema
<img src="https://github.com/owaisali8/web-dev-project/blob/main/SQL/Opera%20Snapshot_2023-03-11_045820_127.0.0.1.png" height="80%" width="80%" />

### Backend:

|Feature  | Framework |
|--|--|
| Hashing | Bcrypt |
| Authorization & Authentication | JWT |
| Web Server|Express|
|Database Access|pg|
|Validation|Joi|

### Frontend:

|Feature  | Framework |
|--|--|
| Admin Portal| React|
| Mobile App | Flutter|
| UI Design |Material Design|

### Screenshots:


