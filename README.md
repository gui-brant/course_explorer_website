# course_explorer_website
Creating an interactive website to explore different websites. The website contains definitions for the courses and allows for filtering and sorting of the courses. Also, I will do my best to handle most major errors and odd inputs gracefully. 

The website will likely be limited, as it is a smaller assignment for my scripting language course, but it should still work fine. 
Below you'll find a detailed description of my the project:

# Mini Project 2: Course Explorer

This mini project involves importing course data from a JSON file, implementing filtering and sorting functionality on a webpage to help users explore different courses. The project aims to build a comprehensive user interface that allows for interactive data exploration, including filtering by course attributes and sorting course listings. This will give you practical experience in working with JSON data, JavaScript array methods, and DOM manipulation.

**Please check the rubric before you start to see if there are points for implementing a feature a given way. For example, it is required to use the filter method for the filtering.** --> I excluded this part from the description below, but it only meant that I was forced into using specific libraries and having files in specific ways.

## Basic Requirements

1. **HTML Layout**: Create a well-structured HTML page that provides an intuitive user interface for users to upload data, filter courses, and apply sorting. The layout should include an input element for file uploads, drop-down forms to filter based on different criteria, and a display area to show the details of a single focused course. Ensure the page is styled appropriately for easy navigation. You are not required to exactly replicate the style shown in the layout, but use CSS to visually define the different areas of the page (e.g., with colours or borders).

2. **Data Loading**: The webpage should allow users to load course data from a JSON file. The data must be properly parsed, and any errors during loading should be handled gracefully, ensuring the program doesn't crash. Users will first browse and upload the JSON file containing course listings, after which the course data will be displayed in a list format. **Note: Due to browser security restrictions, JavaScript cannot directly access local files without user interaction. Therefore, users must manually select and upload the JSON file; attempting to directly load local files via JavaScript will not work.**

3. **Course Class Definition**: Define a `Course` class to encapsulate the details of each course entry, such as title, posted time, type, level, skill, and detail. Use JavaScript to create methods for retrieving and formatting course details.

4. **Filtering Functionality**: Implement filtering functionality that allows users to filter courses based on criteria such as course `Level`, `Credits`, and `Instructor` (see image for complete list). The filtering options should be generated based on the available data, and the project may be tested on slightly different objects than those provided. (That is, **don't** hard-code a list of categories!) As users select different filters, the course listing should be updated to reflect only those course that match the selected criteria. The user should be able to select multiple filters at once and have them all applied.


5. **Sorting Functionality**: Provide sorting options to allow users to sort courses by title, id, or date. You will need to write a function to sort ! You **may** assume that any dates you recieve are in the exact format "Winter XXXX", "Spring XXXX", "Summer XXXX", or "Fall XXXX" where XXXX is a 4-digit year (like 2025 or 2026).


6. **Error Handling**: Ensure the application handles incomplete or incorrect data gracefully, providing informative error messages without crashing.


7. **Interactive Course Details**: Users should be able to click on each course listing to view more detailed information about the course, including attributes such as id, title, and credits. (See the first image for all attributes.) 
