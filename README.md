# google_tasks

This script enhances the functionality of Google Tasks by creating corresponding calendar events, specifically tailored for iPhone calendar app users.

While Google Calendar app seamlessly displays tasks, users employing the iPhone calendar app face the challenge of task visibility. This code bridges the gap, enabling users to sync their tasks with the iPhone calendar application effortlessly.

To use this code, it's important to [enable the advanced service](https://developers.google.com/apps-script/guides/services/advanced). Unlock the full potential of your task management by making it accessible and synchronized across both Google and iPhone calendar apps.--
-----
known bug
- When attempting to change the name of a task with a future due date, the modification is not reflected on the calendar. Instead, a new event with the updated name is created, while the previous task name persists on the calendar. We are actively working on resolving this issue, and a fix will be included in an upcoming release.
