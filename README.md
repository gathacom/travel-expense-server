## TRAVEL EXPENSE API


### IDEA
This travel expense logger API is a helpful tool to track expenses while traveling. 
In this API you can add trips, then for each trip you can add expenses based on that trip

### Installation
Follow the step below to run this project :

-Clone this project :

    $ git clone 
    
-Install the node modules:

    $ npm install

-Add a file on the root folder named ".env"
this file will contain 3 env variable
    
    $ DATABASE_URL 
    $ PORT    
    $ SECRET_KEY 

-Run the project

    $ npm run start

## Endpoint
Now you can hit the API using Postman or another app

#### Auth
|     Method    |    Endpoint   |
| ------------- | ------------- |
| post      | /checkUser |
| post | /signup  |
| post | /signin    |

#### Trip
|     Method    |    Endpoint   |
| ------------- | ------------- |
| get      | /trips |
| get | /trip/:tripId  |
| get | /tripsByAuthor   |
| post      | /trip |
| patch | /trip/:tripId  |
| delete | /trip/:tripId    |

##### Expense
|     Method    |    Endpoint   |
| ------------- | ------------- |
| get      | /expenses/total |
| get | /expenses/total/:tripId  |
| get | /expenses/:tripId   |
| get      | /expense/:tripId/:id |
| post      | /expense |
| put | /expense/:tripId/:id  |
| delete | /expense/:tripId/:id    |


