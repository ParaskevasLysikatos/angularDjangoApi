# Angular-Django web application about employees having devices

A simple angular django crud web application

Three folders which the first two are about the backend (angularEmployeesDevices=main django has settings, EmployeesDevicesApi=implementation of api),last one(EmployeesDevicesFrontend=implementation of frontend in angular framework) 

API is django and below check the url.
Angular is frontend with material design,take the third folder and install node_modules and ng serve,the runs on localhost:4200

The web application contains 3 main views(home page,view list of employees or devices, create-edit employee or device).The navbar is toggle one,footer is static but with my information,homepage values are recalculated on visit the component(no subject feature), sometimes also i have problem with picture rendering, on create employee upload feature is combined with creation, on edit is separated because on backend i have separate table for pictures.


check heroku url of the app=https://angular-employees-devices.herokuapp.com/

check API: is django rest framework=https://django-angular-api.herokuapp.com/api/      employees or devices


!!Highly Recommended for better experience run it locally(heroku too slow and cashes previous values)

(as for testing i tried only the components to be created and employees service to call get method but could not resolve the issue to close request methods)(karma testing)

(extra feature upload to every employee a profile image)( I used s3 bucket of amazon)
(minus no exprerience of karma testing(i gave up on services testing, maybe due to heroku could not find why could not close the request)).
