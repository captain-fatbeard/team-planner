<h1 align="center">Team Planner</h1>

<div align="center">

Plan team projects based on, skills, expertise, available hours and education

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/captain-fatbeard/team-planner/blob/main/LICENSE)

</div>

# Summary

Description

# Scope

-   backend
    -   general setup (est 1 sp)
    -   schema (2 sp)
    -   seeder (1 sp)
    -   entities (2 sp)
        -   tests
        -   crud
        -   relations
    -   usecases (3 sp)
        -   filteredList/searchUsers
-   frontend
    -   general setup (est 1 sp)
    -   list all users (est 1 sp)
    -   list users with filter (est 2 sp)
    -   profile page (est 1 sp)
-   devops (est 2 sp)

Total 16 storypoints

# Run locally

Steps to run this project:

## backend

1. `cd backend`
2. `npm install`
2. `npm run prisma:reset` (also seeds test data to db)
3. `npm run start:dev` (also start postgres docker image)

## backend tests

1. `cd backend`
2. `npm run test:e2e` (also starts postgres test database in docker)

## backend

1. `cd frontend`
2. `npm install`
2. `npm run dev`

The project uses node v16 and docker.
