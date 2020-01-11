# NoteTaker
## Description

Created an application that can be used to write, save, and delete notes. This application uses an express backend and save and retrieve note data from a JSON file.


* The following HTML routes should were created:

  * GET `/notes` -  returns the `notes.html` file.

  * GET `*` -  returns the `index.html` file

* The application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

* The following API routes were created:

  * GET `/api/notes` -  reads the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - recieves a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` -  recieves a query paramter containing the id of a note to delete. 
