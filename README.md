Group Contributions:

Donna 
	Turned the map of san diego into svg, pulled data from Delphi database, made data from database interact and change the map, created a key/scale for the map, dynamically grabbed information from delphi database to show up in left infobox

Edward 
	Majority of the front end functionality of the site (html, css, javascript) including title page, about page, positioning of graph page. Also added nav bar that stays on the page no matter which section the user is in and the scrolling

Chris 
	Provided the information for the “About” section, which details the purpose of our application, along with the details for how officers should effectively utilize the application. Also provided assistance with stylizing the schema of the application, landing page

Macklin 
	Incorporated tipsy.js, name of each location shows up when the user hovers over a specific zip code, color fill also shows up when a user hovers over a specific zip code, dynamically reads the zip code from the database and converts to location to show up on the left infobox, wrote first draft of readme page






Justifications of Design Decisions:

	We did not use any external CSS libraries.
	Though we considered using bootstrap, we decided to write the CSS from scratch to get full control of our website. Though bootstrap might have made it easier, we realized we knew how to do everything we wanted from scratch and that bootstrap would contain many unnecessary parts. It is much easier to manipulate a css file that only holds things relevant to our project. 
	We used tipsy.js as an external JS library. This library allows for a label to be placed for each of our zip codes (svg paths and polygons). Because of our unfamiliarity of D3 and SVG files we believed using an external library was the best choice for us. It allowed us to label each region and also included a feature that determines whether having the arrow above or below each zone was the optimal position which we believed helped for a user's visibility of the information via Gestalt Principles. 




Six Design Principles:

Discoverability/Signifiers
	We included a navigation bar that scrolls when the user scrolls. The user will always have the ability to go to any section of our application. They can go to the home, about, and graph sections at any time. At no point do they need to manually scroll, they can always click the navigation bar button to navigate through the pages for them and they are well-labeled so that there is no ambiguity in what section of the page you're going to.

Learnability 
	We wanted the navigation bar and the map to both be simple and interactive. We did not want them to have to remember where each section of our application was on the page. The user can just click the navigation bar to get to their intended section. We also made the map information appear when hovering over each section, so if they are interested in a certain area they can simply move their mouse around instead of clicking on each place which saves time and effort.

Feedback 
	When the user hovers over a specific zip code, the section changes color, and information appears near the location on the same screen in big visible font. We made it obvious that when hovering over the map, you'd get immediate information. We believed the extra step of clicking on the location would take unnecessary time when looking for a specific location so we kept information flowing on hover. For clarity, hovering over various locations on the map will provide not only the zip code of the area, but also the name of the region along with the specific number of marijuana arrests made in that area.  

Natural Mapping/Mental Metaphors
	We decided to visualize our data on a map of San Diego to show our information because it was the most natural way to show our information and have it map directly to what users expect to see when looking for marijuana violations in each area. Since our information is area based, a map was an intuitive visualization to use. When looking at different graphs and the goal of the project, we believed a map was the best way to show cops which parts of town would have the most marijuana. As for mental metaphors, we used a beige to green range to indicate marijuana crime intensity increasing as the sections got more dark like many other maps that exist.

Constraints
	We addressed the issue of color blind users by having one specific color in different shades, because color blind users can definitely detect lightness and darkness of colors. By only using shades of green, the user would have a clear idea of which locations have more or less criminal cases without even having to look back and forth from our map key. We also constrain the users to only hoverable regions of the map. The greyed out regions don't give any hover feedback on purpose in order to show that there is no info associated with that region. 

Error Prevention/Recovery
	We prevent errors by limiting the controls of the user. The only thing the user can click on is the buttons on the navigation bar. The map interface information appears when hovering over it. We changed the color of the hovered area so the user would know exactly which area they are looking at and not get confused. For areas on the map where we did not have sufficient data, we provided users with a notice, to signify that the absence of visible data is a fault on our side, and not the user's interface.
