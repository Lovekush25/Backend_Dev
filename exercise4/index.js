import createtask from "../createtask.js";

import readTasks from "./readTasks.js";
import updateTask from "../updateTask.js";
import completeTask from "./completeTask.js";
import deleteTask from "../deletetask.js";

createtask("Bharat", "Learn fs module");
createtask("Bharat", "Practice Node.js");

readTasks("Bharat");

updateTask("Bharat", 1770396223879, "Learn fs deeply");
