## Next lesson date
The web API of the service for organizing the courses returns the courses
schedules in the following format:
```JSON
{
 "startDate": "2022-01-07",
 "endDate": "2022-01-21",
 "startTime": "09:00",
 "endTime": "12:00",
 "weekDays": ["Monday", "Thursday"]
}
```
Our function will calculate the date of the next lesson by this course based on the current date and time
Note: "startDate" and "endDate" values don't always match to the courses dates.
For example, based on the example data above, the last lesson of the course can take place on "2022-01-20" (Thursday), but the "endDate" can be "2022-01-21" (Friday)

#### Setup Steps:
#####  Install dependencies
```
$ npm i
```
#####  Run tests
```
$ npm test
```
