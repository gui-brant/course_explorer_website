/* 
Users will upload a JSON file manually through <input type="file">
FileReader must be used to read and parse the JSON --> include: incorrect file type, invalid JSON format, missing file, and must not crash. The output is a user-friendly message.

Course Class:
-> must include the following fields: title, postedTime, type, level, skill, detail
-> must include methods for retrieving and formatting course details for display

Filtering functionality:
Use Array.prototype.filter
Filter based on the criteria shown in the screenshot (look at given screenshot for more information)
Filter dropdown options must be generated dynamically based on the uploaded data: must use Set to collect unique values AND must not hard-code filter values.
Multiple filters must be allows at once.

Sorting Functionality:
User Array.prototype.sort
Must implement sorting by: Title (A-> Z and Z -> A, ID, Posted Time (Semester): with the sorder of Winter < Spring < Summer < Fall and correct year ordering -> assume posted time is in order Season YYYY format)

Interactive Course Details:
User must be able to click a course listing.
Clicking must update a detail panel showing all attributes of the selected course.

Error Handling: check back when done for more information. 
*/
/*
Goals to be completed:

1. Ensure the file input accepts the correct format only. Errors are handled gracefully in a user-friendly manner:

Accept only .json files (check file.type or filename extension).
Handle these failure cases explicitly:

No file selected.
Wrong file type.
JSON parse error (malformed file).
JSON with wrong shape (e.g., not an array of courses).
Show errors in the UI, not just in console.log (e.g., a <div id="error-message">).


2. Render the #course-container (that's inside of ul):
Each will contain a:
    <li class="course-item">
        <button class="course-toggle">
            <h3>Course 1</h3>
        </button>
        <p>Description of Course 1</p>
    </li>
When a new file is loaded, we should:
Decide whether we replace the existing list or append to it. (For sanity + filters/sorting, I strongly recommend replace and re-render from scratch.)

We also need:
An internal JS array (e.g., allCourses) that stores all course objects from every load.
Filters/sorting should always work from that array, not from whatever is currently in the DOM.

Requires a renderCounrses(coursesArray) function to: clear #course-container, map each course -> <li class="course-item">…, and attaches the click to expand behaviour.

3. Filter through courses. Functionalities
    a. Dynamic Options:
    When courses are added or replaced, scan AllCourses (courses array):
        - collect unique instructors, semesters, etc (those that are not in the dropdown list already -> if not in dropdown list array, then add to collection)
        - for every option not in dropdown, add the option to the dropdown option.
    b. Inclusive/combined filters:
    Every filter looks at the details for each course object. If inputType === object.inputType, then select those courses and refresh the courses list container.
    Do this for every filter in a stacked fashion.

    c. Reset/Show all behaviour:
    If the user clicks on "All," that resets the behaviour for that filter. 
    The logic is the same as b., but All matches true to the string.

4. Create the sorting functionality. You may sort by title, id, or date. They are all alphabetically ordered, but Semester. 
Semester is ordered first by year and then by season (Winter -> Spring -> Summer -> Fall). 
The only challenge here is to 1. set up alphabetical ordering, and 2. take the correct tag (Title should be tagged with that id, id should be tagged differently, and so should date). 

5. The added courses must all be clickable. Meaning that whenever you click on the actual name of the course, it will open the full description of the course on screen.
*/

//FileReader must be used to read and parse the JSON --> include: incorrect file type, invalid JSON format, missing file, and must not crash. The output is a user-friendly message.



class Course{
    constructor(id, title, semester, department, level, instructor, credits, description){
        this.id =id;
        this.title = title;
        this.semester = semester;
        this.department = department;
        this.level = String(level);
        this.credits = String(credits);
        this.description = description;
        this.instructor = instructor;
    }  
    callTitle(){
        return this.title;
    }
    callDetails(){
        return this.description;
    }
    describeCourse(){
        return `${this.id}\nTitle: ${this.title}\nDepartment: ${this.department}\nLevel: ${this.level}\nCredits: ${this.credits}\nInstructor: ${this.instructor}\nSemester: ${this.semester}\n${this.description}`
    }
    timeConversion(time){
        let timeCount = 0;
        const year = Number(time.match(/\d+/)[0]);
        timeCount += year;
        if (time.includes("Winter")) {
            timeCount += 1;
        }
        else if (time.includes("Spring")) {
            timeCount += 2;
        }
        else if (time.includes("Summer")) {
            timeCount += 3;
        }
        else if (time.includes("Fall")){
            timeCount += 4;
        }
        return timeCount;
    }
}
function createNewElement(course, elementName, elementType, div){
    const  p = document.createElement("p");
    const span = document.createElement("span");
    span.classList.add("label");
    span.textContent = `${elementName}:`; 
    p.appendChild(span);
    const spanContent = document.createElement("span");
    spanContent.classList.add("course-info");
    spanContent.textContent = ` ${course[elementType]}`;
    p.appendChild(spanContent); 
    div.appendChild(p);
}
function addCourse(courses){
    let getList = document.getElementById("course-container");
    getList.innerHTML ="";
    for (const course of courses){

        let li = document.createElement("li");
        li.classList.add("course-item");
        getList.appendChild(li);
        
        let button = document.createElement("button");
        button.classList.add("course-toggle");
        li.appendChild(button);

        let h3 = document.createElement("h3");
        h3.classList.add("course-header");
        h3.textContent = `${course.id}`; //This is meant to be the largest one because it is the title of the section. CSS issue as well. 
        button.appendChild(h3);

        let div = document.createElement("div");
        div.classList.add("course-description", "hidden"); // dont forget to define hidden in CSS so that this is not visible to the user (user click section and the description unfolds)
        li.appendChild(div);
        button.addEventListener("click", ()=>{
            div.classList.toggle("hidden"); //this will toggle the CSS class "hidden" ON and OFF. It is ON by default for div, as per the classList definition.
            //Note that classList is used to play around with the classification of classes in websites.
        })

        createNewElement(course, "Title", "title", div);

        createNewElement(course,"Department", "department", div);

        createNewElement(course,"Level", "level", div);
        
        createNewElement(course,"Credits", "credits", div);

        createNewElement(course,"Instructor", "instructor", div);

        createNewElement(course,"Semester", "semester", div);

        let pDescription = document.createElement("p");
        pDescription.classList.add("course-description"); //this is meant to not be bolded and to have text the same as the actual description of the other class descripiton elements
        pDescription.textContent = `${course.description}`; 
        div.appendChild(pDescription);

    }
}

function verifyFile(){
    let doc = document.getElementById("file-input").files[0];
    const selectBox = document.getElementById("select-file");
    const warningMessageBox = document.getElementById("error-message");

    selectBox.classList.add("hidden");
    warningMessageBox.classList.add("hidden");
    if (!doc){
        selectBox.classList.remove("hidden")
        return false;
    }
    if(doc.name.toLowerCase().endsWith(".json")){
        return true;
    }
    else{
        warningMessageBox.classList.remove("hidden");
         //Whenever this is used, we have to put it in read and with a larger font. This is a CSS issue.
        return false;
    }
}

function addFilterOption(selectElement, value, set) {
    if (!set.has(value)) {
        set.add(value);

        const option = document.createElement("option");
        option.textContent = value;
        option.value = value;

        selectElement.appendChild(option);
    }
}


function addToFilters(courseObject){ 
    const departFilters = document.getElementById("department-filter");
    const levelFilters = document.getElementById("level-filter");
    const creditFilters = document.getElementById("credits-filter");
    const instructFilters = document.getElementById("instructor-filter");


    addFilterOption(departFilters, courseObject.department, availableFilters.department);
    addFilterOption(levelFilters, courseObject.level, availableFilters.level);
    addFilterOption(creditFilters, courseObject.credits, availableFilters.credits);
    if (courseObject.instructor) {
        addFilterOption(instructFilters, courseObject.instructor, availableFilters.instructor);
    }
}
function showError(message) {
    const box = document.getElementById("error-message");
    if (!box) return;
    box.textContent = message;
    box.classList.remove("hidden");
}

function parseFile(){
    let doc = document.getElementById("file-input").files[0]; //document.getElementById will create an array-like structure for fetching files regardlesse of whether there are multiple files, so you need .files[0]
    if (!verifyFile()){
        return;
    }
    let reader = new FileReader(); //create a FileReader object
    reader.readAsText(doc); //start file reading
    reader.onload = function(){ //define the callback trigger of when the file is finished reading to:
        let data;
        try{
            data = JSON.parse(reader.result); //if you turn the informatiuon into an object, data, then be done
        }catch(e){
            showError("Invalid JSON structure. Try again.");
            return;
        }
        if (!Array.isArray(data)) {
            showError("JSON must be an array of course objects.");
            return;
        }
        for (const courseInfo of data){
            const course = new Course(courseInfo.id,courseInfo.title, courseInfo.semester, courseInfo.department, courseInfo.level, courseInfo.instructor, courseInfo.credits, courseInfo.description);
            addToFilters(course);
            allCourses.push(course);
        }
    updateDisplayCourses();
    }
}
let selectedFilters = {
    department: "All",
    level: "All",
    credits: "All",
    instructor: "All"
};

let availableFilters = {
    department: new Set(),
    level: new Set(),
    credits: new Set(),
    instructor: new Set()
};

let allCourses = []; 

function getFilteredCourses() {
    return allCourses.filter(course => {
        if (selectedFilters.department !== "All" &&
            course.department !== selectedFilters.department) {
            return false;
        }

        if (selectedFilters.level !== "All" &&
            course.level !== selectedFilters.level) {
            return false;
        }

        if (selectedFilters.credits !== "All" &&
            course.credits !== selectedFilters.credits) {
            return false;
        }

        if (selectedFilters.instructor !== "All" &&
            course.instructor !== selectedFilters.instructor) {
            return false;
        }

        return true;
    });
}


function filterListener(filterType, filter){
    document.getElementById(filterType).addEventListener("change", function(event) {
        const filterName = event.target.value; 
        selectedFilters[filter] = filterName;
        updateDisplayCourses();
    })
}

function filterCourses(){
    filterListener("department-filter", "department");
    filterListener("level-filter", "level");
    filterListener("credits-filter","credits");
    filterListener("instructor-filter", "instructor");
}

let selectedSort = "All";

function getSortedCourses(courseArray){
    let sortingArray = [...courseArray];
    if (selectedSort === "ID(A-Z)"){
        sortingArray.sort((a, b) => a.id.localeCompare(b.id));
    }
    else if (selectedSort === "Title(A-Z)"){
        sortingArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (selectedSort === "ID(Z-A)") {
        sortingArray.sort((a,b) => b.id.localeCompare(a.id));
    }
    else if(selectedSort === "Title(Z-A)") {
        sortingArray.sort((a,b) => b.title.localeCompare(a.title));
    }
    else if (selectedSort === "Semester(Earliest)"){
        sortingArray.sort((a,b) => {
        const timeA = a.timeConversion(a.semester);
        const timeB = b.timeConversion(b.semester);
        return timeA - timeB;
        });
    }
    else if (selectedSort === "Semester(Latest)"){
        sortingArray.sort((a, b) => {
            const timeA = a.timeConversion(a.semester);
            const timeB = b.timeConversion(b.semester);
            return timeB - timeA;
        });
    }
    return sortingArray;
}

function updateDisplayCourses(){
    const filtered = getFilteredCourses();
    const sorted = getSortedCourses(filtered);
    addCourse(sorted);
}
function sortCourses() {
    document.getElementById("sorting-by").addEventListener("change", function(event) {
        selectedSort = event.target.value;
        updateDisplayCourses();
    });
}

function main(){
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
        fileInput.addEventListener("change", parseFile);
    }
    filterCourses();
    sortCourses();
    //updateDisplayCourses();
} 

document.addEventListener("DOMContentLoaded", main);