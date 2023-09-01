## About Software Development @ Cyberhawk

need some content for this section

## The task
We've designed this task to try and give you the ability to show us what you can do and hopefully flex your technical and creative muscles. You can't show off too much here, show us you at your best and wow us!

To make things as simple as we could, we've opted to use [Laravel Sail](https://laravel.com/docs/8.x/sail) to provide a quick and convenient development environment, this will require you to install
[Docker Desktop](https://www.docker.com/products/docker-desktop) before you can start the test. We've provided [some more detailed instructions](#setting-everything-up) below in case this is your first time using Docker or Sail.

We'd like you to build an application that will display an example wind farm, its turbines and their components.
We'd like to be able to see components and their grades (measurement of damage/wear) ranging between 1 - 5.

For example, a turbine could contain the following components:
- Blade
- Rotor
- Hub
- Generator

Don't worry about using real names for components or accurate looking data, we're more interested in how you structure the application and how you present the data.

Don't be afraid of submitting incomplete code or code that isn't quite doing what you would like, just like your maths teacher, we like to see your working.
Just Document what you had hoped to achieve and your thoughts behind any unfinished code, so that we know what your plan was.

### Requirements
- Display a list of turbine inspections
- Each Turbine should have a number of components
- A component can be given a grade from 1 to 5 (1 being perfect and 5 being completely broken/missing)
- Use Laravel Models to represent the Entities in the task.

### Bonus Points
- Great UX/UI
- Use of React JS
- Use of Tailwind CSS
- Use of 3D
- Use of a web map technology in the display of the data
- Automated tests
- API Authentication
- Use of coding style guidelines (we use PSR-12 and AirBnb)
- Use of git with clear logical commits
- Specs/Plans/Designs

### Submitting The Task
We're not too fussy about how you submit the task, providing it gets to us and we're able to run it we'll be happy however here are some of the ways we commonly see:
- Fork this repo, work and add us as a collaborator on your GitHub repo and send us a link
- ZIP the project and email it to us at nick.stewart@thecyberhawk.com

## Setting Everything Up
As mentioned above we have chosen to make use of Laravel Sail as the foundation of this technical test.
- If you haven't already, you will need to install [Docker Desktop](https://www.docker.com/products/docker-desktop).
- One that is installed your next step is to install this projects composer dependencies (including Sail).
    - This will require either PHP 8 installed on your local machine or the use of [a small docker container](https://laravel.com/docs/8.x/sail#installing-composer-dependencies-for-existing-projects) that runs PHP 8 that can install the dependencies for us.
- If you haven't done so already copy the `.env.example` file to `.env`
    - If you are running a local development environment you may need to change some default ports in the `.env` file
        - We've already changed mysql to 33060 and NGINX to 81 for you
- It should now be time to [start Sail](https://laravel.com/docs/8.x/sail#starting-and-stopping-sail) and the task

### Installing Composer Dependencies
https://laravel.com/docs/9.x/sail#installing-composer-dependencies-for-existing-projects
```bash
docker run --rm \
-u "$(id -u):$(id -g)" \
-v $(pwd):/var/www/html \
-w /var/www/html \
laravelsail/php81-composer:latest \
composer install --ignore-platform-reqs
```

## Your Notes

# 1. Understanding the Task
## Objective
The goal is to develop an application that displays wind farms, their turbines and turbine's components. Each component should have a condition grade from 1-5. 
I've initially assumed the 4 mentioned components, Blade, Generator, Hub and Rotor.

## Key Entities and Thoughts
### Entities
- **Wind Farms**: Entities that store multiple turbines.
- **Turbines**: Entities inside farms. A turbine has multiple components inside.
- **Components**: Entities that compose a turbine. Each of them has a grade assigned in the last inspection made to the component.
- **Manufacturers**: Entities that produce the components and assemble the turbines. Not in the task description but I thought it would be a great addition. 
- **Inspectors**: Entities that make inspections in the components. Also not in the task description.

### Users should be able to...
- **...list farms, turbines, components, inspections and manufacturers**: Every entity should be listed in a way that it can be sorted and filtered.
- **...view every farm in a map with their turbines**: It would be awesome to show a map where the farms are marked on. When you zoom in you should see the positioning of every turbine inside it.
- **...have a dashboard that shows up summarized info**: It's important to show summarized info in the dashboard, for example the turbines that need attention because their components have poor condition and the map with the farms locations.
- **...easily navigate through the app**: Great UX and UI is important to reduce the cognitive overload. 

### Questions that appeared while planning
- **Should each type of component have custom fields ?**: For example, should a blade have its length or a rotor its diameter? Depending on the answer, the database schema could change a lot.
- **Should the inspections be made to a single component or to the entire turbine ?**: In terms of database relationships it's also a major factor.


# 2. Planning
## Branding

### Name 
The name of the app will be **WindFlow**. "Wind" is self-explanatory and "Flow" is related to how wind interact with turbines and how smooth the data flows in the app.

### Logo
![WindFlow Logo](![image](https://github.com/bgrou/technical-test/assets/61094081/c640a05c-208c-49cd-8883-de304d0e3a93)
)
### Database Design
As I though before the entities that should exist in this app are **Wind Farms, Turbines, Components, Manufacturers and Inspectors**. 
After some thinking, I came up with a potential dillema:
-  Should I create a table for each component type so I can have their singular attributes separated? Should I follow single table inheritance? Or the JSON path for singular attributes(not a good idea)?
Well, I decided to put custom fields aside so the database design remains simplified. It would be an overkill.
    
![Database Diagram](https://github.com/bgrou/technical-test/assets/61094081/0c9fee44-77c2-47f3-af8c-d4eb689b484f)

I decided that inspections should be made to single component so each of the components can have a super detailed and precise inspection. Also decided that the inspectors could actually be the users of the app itself(I thought about creating an inspectors table).

### Backend
It might sound controversial but I chose to follow a monolith architecture due to its simplicity and ease of development. If it was a production app it tons of users and data we could have to move to a decoupled architecture.
I decided to use [Inertia.js](https://inertiajs.com) so I can achieve the performance and smooth UX of a SPA while developing in Laravel with a monolith architecture.

I decided to use a Controller->Service->Repository design pattern due to its separation of concerns. Repository might sound overkill and that I added unnecessary complexity, but I prefer to isolate the application from the ORM.

![Backed Layers](https://github.com/bgrou/technical-test/assets/61094081/fa0f4547-1492-4459-89d1-d22a974166f1)

To be continued...


