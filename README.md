# OutOfTime
Habit Tracking Calendar 

## Current User Guide for Launch ##
1.Update current date in daytracking.json

2.Launch index.js with node in backend folder

3.npm start in frontend folder  

## Current List of Tasks ##
1. Make App Function on any day
  - migrate app data from local .json files to mongo db
  - hold app data in two of tables history/current day
    - current day holds detailed profile info as well as detailed habit info
    - history holds previous current day percentages 
  
2. Clean up Props and Variables
  - components have too many props passed down to them when most data can already be accessed through props
  
3. CSS changes
  - change css color variable names to reflect reality
  - break css component tree into smaller trees
    - most current components css branches out of a body div tag (this is unacceptable)
  
  ## Current BIG Bugs and Problems ##
 - moving adding then deleteing habits causes newly created habits to be assigned id's identical to previously moved/deleted habits
 - moving back a day resets previous days habit statuses
 - progam breaks if json data hasn't been updated
