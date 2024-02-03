/**
 * Lists the titles and IDs of tasksList.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasklists/list
 */
function listTaskLists() {
  try {
    // Returns all the authenticated user's task lists.
    const taskLists = Tasks.Tasklists.list();
    // If taskLists are available then print all tasklists.
    if (!taskLists.items) {
      console.log('No task lists found.');
      return;
    }
    // Print the tasklist title and tasklist id.
    for (let i = 0; i < taskLists.items.length; i++) {
      const taskList = taskLists.items[i];
      const taskListTitle = taskLists.items[i].title;
      const taskListId = taskLists.items[i].id;
      Logger.log(`TaskList with title "%s" was found.`, taskListTitle);
      if (taskListTitle === "My Tasks") {

        /**
         * Lists task items for a provided tasklist ID.
         * @param  {string} taskListId The tasklist ID.
         * @see https://developers.google.com/tasks/reference/rest/v1/tasks/list
         */
        try {
          // List the task items of specified tasklist using taskList id.
          const tasks = Tasks.Tasks.list(taskListId);
          // If tasks are available then print all task of given tasklists.
          if (!tasks.items) {
            console.log('No tasks found.');
            return;
          }
          var taskTitleList = []
          // Print the task title and task id of specified tasklist.
          for (let i = 0; i < tasks.items.length; i++) {
            const task = tasks.items[i];
            taskTitleList[i] = task.title
            Logger.log('Task with title "%s" was found.', task.title);

            // Determines how many events are happening on due date of task.

            var events = CalendarApp.getCalendarsByName(`Tasks`)[0].getEventsForDay(new Date(task.due));
            //check weather you have alreay created the task event on Calendar
            var eventsTitleList = []
            for (let i = 0; i < events.length; i++) {
              eventsTitleList[i] = events[i].getTitle()
            }
            Logger.log("eventsTitleList Created from Calendar")
            if (
              !eventsTitleList.includes(task.title)
            ) {
              //due date not setted
              if (isNaN(new Date(task.due).getFullYear())) {
                const todaysEvent = CalendarApp.getCalendarsByName(`Tasks`)[0].getEventsForDay(new Date())
                var todaysEventTitle = []
                for (let i = 0; i < todaysEvent.length; i++) {
                  todaysEventTitle[i] = todaysEvent[i].getTitle()
                }
                if (!todaysEventTitle.includes(task.title)) {
                  CalendarApp.getCalendarsByName(`Tasks`)[0].createAllDayEvent(task.title,
                    new Date(),
                  );
                  Logger.log(`due date not setted task event created: ` + task.title + `(due date not setted)` + new Date())
                }
                else {
                  Logger.log(`due date not setted task event already been created`)
                }
              }
              //due date setted
              else {
                // Creates an event for the moon landing and logs the ID.
                CalendarApp.getCalendarsByName(`Tasks`)[0].createAllDayEvent(task.title,
                  new Date(task.due),
                );
                //https://developers.google.com/tasks/reference/rest/v1/tasks#:~:text=The%20due%20date%20only%20records%20date%20information%3B%20the%20time%20portion%20of%20the%20timestamp%20is%20discarded%20when%20setting%20the%20due%20date.%20It%20isn%27t%20possible%20to%20read%20or%20write%20the%20time%20that%20a%20task%20is%20due%20via%20the%20API.
                Logger.log('event created' + 'Event ID: ' + task.title + new Date(task.due));
              }
            }
            //when task not completed till due date
            else {
              //due date not setted
              if ((new Date(task.due) < new Date())) {
                const starttime = CalendarApp.getCalendarsByName(`Tasks`)[0].getEventsForDay(new Date(task.due))[eventsTitleList.indexOf(task.title)].getStartTime()
                CalendarApp.getCalendarsByName(`Tasks`)[0].getEventsForDay(new Date(task.due))[eventsTitleList.indexOf(task.title)].setAllDayDates(starttime, new Date(new Date().setDate(new Date().getDate() + 1)))
                Logger.log("calendar date extended to today")
              }
              else {
                Logger.log(`calendar date is already extended to today`)
              }
            }
          }
          //delete event when done(delete events done for yesterday)
          const yesterdayEvents = CalendarApp.getCalendarsByName(`Tasks`)[0].getEventsForDay(new Date(new Date().setDate(new Date().getDate() - 1)))
          for (let i = 0; i < yesterdayEvents.length; i++) {
            if (yesterdayEvents[i].getEndTime() < new Date(new Date().setDate(new Date().getDate()))) {
              yesterdayEvents[i].deleteEvent()
              Logger.log('event deleted "%s":' + yesterdayEvents[i].getTitle())
            } else {
              Logger.log(`no events to delete`)
            }

          }
        } catch (err) {
          // TODO (developer) - Handle exception from Task API
          console.log('Failed with an error %s', err.message);
        }


      } else {
        Logger.log(taskListTitle, `was found`)
      }
      console.log('Task list with title "%s" and ID "%s" was found.', taskList.title, taskList.id);

    }
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    console.log('Failed with an error %s ', err.message);
  }
}
