//THIS THE ANSWER 
let tasker = {
	construct: function() {
		this.selectElements();
		this.bindEvents();
		this.scanTaskList();
	},
	//This Below only getting the Element from html, for javascript
	selectElements: function() {
		 //this.x = x 
		this.taskInput = document.getElementById("taskInput"); //id="taskInput"

		this.taskList = document.getElementById("tasksList"); //<ul id="tasksList"></ul>
		this.taskListChildren = this.taskList.children; //used from the object: taskList(above)
		
		this.addButton = document.getElementById("addButton"); //<button id="addButton">

		this.errorMessage = document.getElementById("error") //<div id="error"
	},
	//This Above only getting the Element from html, for javascript

	buildTask: function() {
	let taskListItem, taskCheckbox, taskValue, taskButton, taskTrash;
		taskListItem = document.createElement("li");  //creating li
		//The setAttribute() method adds the specified attribute to an element, and gives it the specified value.

		taskListItem.setAttribute("class", "task");
		//checkbox
		taskCheckbox = document.createElement("input");
		taskCheckbox.setAttribute("type", "checkbox"); //"type" so you can type in button
		//task value
		taskValue = document.createTextNode(this.taskInput.value); //get from taskINp
		//delete button
		taskButton = document.createElement("button");
		//trash icon
		taskTrash = document.createElement("i");
		taskTrash.setAttribute("class","fa fa-trash");
		
	//append elements to tasklist  || AppendChild means adding a child...a
	//The Node.appendChild() method adds a node to the end of the list of children of a specified parent node. If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position 
		//insert trash-Can icon into button
		taskButton.appendChild(taskTrash);
		//append taskValue and taskButton in taskListItem
		taskListItem.appendChild(taskValue);
		taskListItem.appendChild(taskButton);
		//check Box
		taskListItem.appendChild(taskCheckbox);
		//add task to taskList Object 
		this.taskList.appendChild(taskListItem);		
	},
	error: function() {
		this.errorMessage.style.display = "block";
	},
	addTask: function() {
		let taskValue = this.taskInput.value;
		this.errorMessage.style.display = "none";
		
		if(taskValue === ""){
			this.error();
		}
		else {
			this.buildTask();
			this.taskInput.value = "";
			this.scanTaskList();
		}
	},
	enterKey: function(event){
		if (event.keyCode === 13 || event.which === 13 ){
			this.addTask();
		}
	},
	bindEvents: function(){
		//add click event to button
		this.addButton.onclick = this.addTask.bind(this);

		//add enter key to task textbox
		this.taskInput.onkeypress = this.enterKey.bind(this);
	},

	scanTaskList: function() {
		let taskListItem, checkBox, deleteButton;

		//loop through all list elements
		for (i = 0; i < this.taskListChildren.length; i++){
			taskListItem = this.taskListChildren[i];
			//select checkbox and delete button
			checkBox = taskListItem.getElementsByTagName("input")[0];
			deleteButton = taskListItem.getElementsByTagName("button")[0];

			//bind onclick event to the checkbox
			checkBox.onclick = this.completeTask.bind(this, taskListItem, checkBox);

			//add click event to the delete button
			deleteButton.onclick = this.deleteTask.bind(this, i);
		}
	},

	deleteTask: function(i) {
		this.taskListChildren[i].remove();
		this.scanTaskList();
	},
	completeTask: function(taskListItem, checkBox) {
		if (checkBox.checked){
			taskListItem.className = "task completed";
		}
		else {
			this.incompleteTask(taskListItem);
		}
	},
	incompleteTask: function(taskListItem){
		taskListItem.className = "task";
	}
};