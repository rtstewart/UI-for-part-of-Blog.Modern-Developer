#UI for part of Blog.Modern Developer

This was a team project turned into a solo project and thus was built exclusively by [Robert T. (Bobby) Stewart](https://github.com/rtstewart).

The project assignment was to emulate [this portion of the UI for Blog.Modern Developer](http://goodtiming.com/moderndeveloper/CP3_Modern-Frontend-Developer/Course-06-Introduction-to-JavaScript-and-Modern-Web-Development/Chapter-02-Introduction-to-CSS/team-project-1_unrestrained-lemming/MD-Blog-UI-image.html) with HTML and CSS only.

There is some degree of responsive and adaptive behavior built into the CSS. Please view on a variety of different devices/screen sizes.

Some elements that may have been or contained anchor elements (`<a>`), may not be built as such for this prototype, such as the social network icons. Some HTML structural changes would likely be made with further knowledge of expected functionality and/or specifications. This was taken as largely a layout challenge.

##Part 2 - Add JavaScript to Your Team Project

For this part of the project, we were to add the necessary JavaScript to allow the collection of any data from application input elements. I was teamed up with [Jannat Kaur](https://github.com/Kauress). She had done the first part of a different Introduction to CSS team project, as solo. After an initial meeting via Google Hangouts, we agreed to use my project to continue with to add JavaScript to. Jannat preferred that I assume a managerial role for the project. During our second Google Hangout meeting, we decided that I would be tasked with creating/modifying the structure for the HTML and JavaScript files to facilitate the functionality required. In our project, there are three pieces of information to be "collected" from the page: input for search text from the form element in the upper right-hand corner of the page; input for comment submission from the textarea element from the form element in the center of the article section; and an email address supplied with the email input from the form element, indicated with the "Subscribe" button, within the &lt;section> element. We decided that we would each take one of the three form elements and be responsible for its validation and addition of validated information to the application data object meant to emulate a simple repository where application data is stored in an object with appropriate property names. For the third form element, we decided that we would pair program the solution to validate and add data to the application data object. I was to be responsible for the search input. Jannat would be responsible for the email input. We would both team up on the comment input.

In the first part of the project, I had not placed the three input elements on the page within form tags. I made that change to the HTML, so that the information would be subject to the submission process and associated validation. I added anchors to the "Related Articles on Encyclopedia.Modern Developer", and footer section of the main article section. I then added appropriate CSS hover and active states to those elements to have the UI more realistically functional. In addition, I added CSS-only tabbing animation to the "Recent Articles", and "Upcoming Posts" tabs.

I decided to use the revealing module pattern for the structure of the associated JavaScript files.

We each completed our assigned tasks. Along with the difficulty of getting together due to our ten and one half hour time zone difference, some family issues came about for Jannat that precluded us from getting together further to team up on the comment data validation and addition to the application data object. I took on that portion to complete the project and presented the solution to Jannat via the GitHub repository.

[View completed project hosted on Github](https://rtstewart.github.io/UI-for-part-of-Blog.Modern-Developer/)

