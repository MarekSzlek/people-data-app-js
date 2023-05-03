# people-data-app-js

A simple React web app for data visualisation in the form of a table or card elements written in JavaScript.

- the app uses routing for 2 pages, main and /views (+ 404 page)
- all names, descriptions, messages and components are translated with i18n and by using Ant Design locale (pl/en supported)
- /main page includes a table of data (name/age/birth date/resume), checkboxes and edit/delete buttons
- checkboxes are used to delete multiple items at once
- pressing 'edit' next to a record scrolls down to a form which gets autopopulated with its data. It can be then edited and submitted to replace the original record
- form validation (required fields, max. characters etc.) is achieved with Yup
- /views page includes an element displaying a set amount of rows of cards. The cards display raw data of JSON objects as key/value pairs
- application state including form inputs is managed by Redux store using Redux Toolkit
- table and form elements are Ant Design components
- dates are stored as timestamps.
