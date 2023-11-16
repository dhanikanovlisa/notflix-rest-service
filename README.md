# REST Service for Notflix App
This is a REST Service for Notflix which manage premium films for premium users. This service is created using NodeTS, Express,
PostgresSQL, Prisma and Docker. This service contains management for user to submit and manage their own films. This service also
allows admin premium to manage subscription and users film submission.

## Database Schemes
![image](screenshots/notflix_rest_schema.png)

## Endpoint API
### 1. Endpoint Profile
| Feature             | Endpoint         |
|---------------------|--------------|
| **Get Profile**           | /profile/:id     |
| **Edit Profile**    | /profile/edit/:id      |

### 2. Endpoint Authentication
| Feature             | Endpoint        |
|---------------------|--------------|
| **Login**           | /auth/login     |
| **Registration**    | /auth/register      |

### 3. Endpoint Film
| Feature             | Endpoint          |
|---------------------|--------------|
| **All Premium Films**           | /films/premium-film     |
| **Premium Film By User Id*    | /films/user/:id      |
| **Premium Film By FIlm Id & User Id*    | /films/film/:filmId/user/:userId      |
| **Delete Film*    | /films/film/delete/:id      |
| **Get All Request Film*    | /films/requestFilm     |
| **Get Request Film by Film Id*    | /films/requestFilm/:id      |
| **Detail Request Film*    | /films/requestFilm/detail/:id      |
| **Create Request Film*    | /films/requestFilm/create      |
| **Edit Request Film*    | /films/requestFilm/edit/:id      |
| **Delete Request Film*    | /films/requestFilm/delete/:id      |

### 4. Endpoint Subscription
| Feature             | Endpoint         |
|---------------------|--------------|
| **All Subscription**           | /subscriptions/     |
| **Check Subscription Status*    | /subscriptions/check/:userId     |
| **Get Subscription by Status*    | /subscriptions/:status    |
| **Request Subscription*    | /subscriptions/request/:userId     |
| **Accept Request Subscription*    | /subscriptions/accept/:userId   |
| **Reject Request Subscription**    | /subscriptions/reject/:userId    |

### 5. Genre 
| Feature             | Endpoint         |
|---------------------|--------------|
| **Get All Genre**           | /genres/     |
| **Get Genre by Id*    | /genres/:id     |


## Prerequisites
1. Make sure your machine has Docker and Docker Compose installed.
2. Make sure your machine has NodeJS installed.

## How To Run
1. Make an .env file based of .env.example
2. Navigate to the root directory of the project.
3. Run the following command:

    ```
    docker-compose up -d
    ```
4. Or you can run it locally
    
        ```
        npm install
        npx prisma generate
        npm run dev
        ```

This will start the Notflix REST Service application using Docker containers.

## Task Division
| Backend Function            | NIM          |
|---------------------|--------------|
| **Database**           | 13521132     |
| **Authentication**    | 13521130     |
| **Endpoint Profile**    | 13521132     |
| **Endpoint Film**    | 13521132     |
| **Endpoint Subscription**    | 13521165     |
| **Endpoint for Other Client**    | 13521132     |
