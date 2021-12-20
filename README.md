# Project Overview

LabInventory website (name coming soon). 

## Project Links

- [github repo](https://github.com/adelaney923/labinventory-frontend.git)
- [Link to Site]()

## Project Description

This will be a site that can be used by laboratories to store lab inventory in one easy place.  The user will be able to login and see their current inventory while also being able to add inventory, update, edit or delete.


## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe. Also, define the the React components and the architectural design of your app.

- [React Architecture](https://res.cloudinary.com/adelaney923/image/upload/v1640030825/Screen_Shot_2021-12-20_at_12.05.46_PM_tkv0xo.png)


### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP
- Create backend API using Django/Python
- Use React to create frontend
- Allow user to sign in and render data stored to backend
- Have full CRUD for lab inventory

#### PostMVP

- Add user to organization
- Have user be able to add a model in the front end for a different type of lab supply

## Additional Libraries
Django Rest Framework

## Backend Routes
|  Verb | URL Pattern | Token | Response
|---|---|---|---|
|POST| /sign-up/ |  | 201 - user object
|POST| /sign-in/ |  | 201 - user object with token
|PATCH| /change-password/ | required | 204
|DELETE| /sign-out/ | required | 204
|GET| /consumables/ | required | 200 - array of all blogs for user
|POST| /consumables/ | required | 201 - consumable object
|GET| /consumables/:id | required | 200 - blog object
|DELETE| /consumables/:id/ | required | 204
|PATCH| /consumables/:id/ | required | 200 - blog object

The consumables is one example of a lab supply that has a model for storing inventory.  There are 3 other models for controls, reagents and calibrators that will follow these same routes.