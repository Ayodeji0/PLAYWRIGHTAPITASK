# SymphonySolutionTest
# Description
This is a test on how to automate Json api using playwright with typescript,the test automate and verified if the API is ok or not,i perform the CRUD exercise on the API 
# STEPS ON HOW TO RUN IT ON LOCAL
This is a typscript project, so the first thing to do is to run npm install  in your terminal editor preferabbly vscode
This will install all the dependencies
# Arrangement 
This is a one file code because it's API automation testing, 
# Result 
The api failed in general because it didn't fulfil the get by id and the patch method, this is issue is from the api, because delete and other method passed even with using same id, because everyother activity passed, you can confirm this by uncommenting the diffrent steps in the api
The commented 6 seperate steps are under the first test, i did it this way because i want to get the step that actually failed the test after which i rewrote the code to make it clean in avoidance of repitations
so you can run this API test singularly or in group have made provisions for that. Alot of console logging were done to ensure the failure was actually from the api
# HOW TO RUN THE TEST
Once you have installed the dependency by running npm install now the stage is set to run the test
there are many ways to run this test
* On you terminal you can use either npx playwright test, npx playwright test --ui, npx playwright test --headed
  1.npx playwright test will run the test on all multiple browsers and it is done in the endless mood after runnung you can run npx playwright --show-report to see the result in html format on your screen
  2. npx playwright --ui This will run the test on the UI, where you can see the result on your screen instead terminal, the beauty of this is you see the result as it runs and can see the result immediately without going to the terminal
  3. npx playwright --headed. This will run the script in an visible mode whereby you see the code as it runs on the multiple browers, by defualt playwright run in headless mode but with this command you see the activity as it runs.
