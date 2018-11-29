# Receipt OCR Expense Tracker

## Problem to Solve/Purpose

* This app aims to help users track and organize their expenses, encouraging them to go paperless. 

## Solution

The core of this app is its OCR (optical character recognition) functionality.  Using this functionality, users can upload images of receipts to have the images transcribed into usable data (rendered as text).  Therefore, users will not have to manually type down each single expense when they want to track their expenditures online. A simple upload of their receipt will capture all of the purchases!  

However, one should note that the OCR functionality has a limited confidence in translating bits of images into accurate characters.  As such, the input form allows for users to edit any collection of purchases before and after data is ingested and associated with their account. To simply put it, data will be made clean and accurate.

Once expenses are uploaded, users can browse/query their expenses based on date, category, and keywords.  To capture as much data as possible in each query, keywords are case-insensitive and expenses only need to include the keyword (eg. The keyword "pump" will return expenses with the name "pumpkin", "Pumpkin", "mattress pump", etc.).  The total dollar sum of each query is listed at the bottom of the results.  This helps users with calculating their expenditures.  An option to export the results as a table in a Microsoft excel file is also available.  This therefore allows users to easily send their data to their accountants or for external use. 

## Main Functionalities

* Upload images of receipts using the OCR functionality 
* Upload expenses through manual input (when receipts are not available)
* Query expenses based on date, category, and keywords (case insensitive)
* Return the results' total dollar amount when querying expenses 
* Export the queried expenses as a Microsoft excel file (rendered as a table)

## Security

* Users must sign up for an account 
* Passwords are encrypted in the database 
* Session tokens are provided upon a successful login 
* Sessions last 300s (roughly 5 minutes) for testing purposes
* Session tokens are validated upon every API call (if the token has expired, the user must login again to proceed)
* Expenses are linked by accounts, so a user cannot view the expenses of other users 

## Technologies/Tools

React.js, MongoDB, Node.js, Express.js, CSS, Tesseract.js, JWT, Bcrypt, other node packages, YARN

## Installation 

* Git clone the repo
* In the command line, run **yarn install** at the root and in the client folder
* Cd back to the root after installing all the node modules and run **yarn start**
* When running this locally, you can use large image files for the receipts.  However, if you are using the deployed version on Heroku, please ensure to only use images that are 140 KB or under.  Samples of receipts can be found in the **README_Images** folder.  If you want to use a demo account on the deployed app, you can use:

Username: Karen12345
Password: Karen12345

![Help](./README_Images/screenshot1.png)


