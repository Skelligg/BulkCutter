# Bulk Cutter

*Bulk Cutter* is a web application designed to provide you with all the information that you may need when it comes to your diet. Whether you're only interested in calories, or are also looking to track a variety of nutrients, it's all calculated for you.

Just search for the foods that you're planning on eating and enter their weight in grams, and Bulk Cutter will handle the rest. 

The **Edamam food database** provides all the nutritional data with close to **900,000** foods available. If you can't find a food you're looking for or disagree with Edamam's data, you can add a custom food and fill in the data yourself. There is also an optional 'cost' parameter which lets you track the total price of your meals.

When you're finished adding all your foods to your plan, you can **download a pdf** of all information in a readable table format.

**For more information about the application, see below.**




## Features

- Calorie Calculator
- Macro Calculator
- Light/Dark Mode
- Mobile and Desktop friendly
- Downloadable PDF
- Custom Entries
- LocalStorage Saving of Entries (not available for Custom Entries)



## Technologies

**Client:** HTML, SASS, JavaScript, html2pdf

With this project, I intended to refine my HTML, CSS and JavaScript skills so I did not implement any complex technologies. Everything is done on the client side with minimal setup. Just clone the repository and open the index.html to use the application.

### Edamam API
For this project the free version of the *Edamam Food Databse API* is used to fetch the relevant data. Unfortunately, this means that the application is limited to **35 API calls / minute.** If you go over this limit, the application will display a visible **API ERROR!** warning and you will need to briefly wait until you can use the app again. If someone else is using the application at the same time as you, you may need to try using the application again later.


## Screenshots

#### Blank Home Screen

![Blank Home Screen](/resources/screenshots/homescreen.PNG)

#### Search Bar

![Search Bar](/resources/screenshots/toaddcustomfood.PNG)

#### Some Foods Added

![Some Fodds Added](/resources/screenshots/samplefoods.PNG)

#### Nutritional Value Cards

![Nutritional Value Cards](/resources/screenshots/nutrtionofsomefoods.PNG)

#### Total Card

![Total Card](/resources/screenshots/totalbar.PNG)

#### Dark Mode

![Dark Mode](/resources/screenshots/darkmode.PNG)

#### Custom Food Added

![Custom Food Added](/resources/screenshots/customfoodadded.PNG)

#### Data In Table Format

![Data In Table Format](/resources/screenshots/datatable.PNG)

