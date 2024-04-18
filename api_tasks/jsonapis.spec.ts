
import { test, expect } from "@playwright/test";

// REQUEST URL SET AS A GLOBAL VARIABLE 
const requestUrl = "https://jsonplaceholder.typicode.com/posts";

// GET REQUEST
test("Read Total Number of Posts and Store in a Variable", async ({
  request,
}) => {
  // get request sent to /posts and response status verified
  const response = await request.get(requestUrl);
  // Assertion to ensure the response status is 200 ok
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  // Retrieve the total number of posts from the response body
  const responseBody = await response.json();
  // Store the total number of post in a variable for future reference
  const total = await responseBody.length;
});

// POST REQUEST AND SAVE ID FOR FUTURE REFERENCE
test("Create a New Post and Store its ID", async ({ request }) => {
  const newPostData = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  const response = await request.post(requestUrl, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(newPostData),
  });

  // Assertion to ensure the response status is 201 ok
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  // Extract the ID of the newly created post from the response body
  const responseBody = await response.json();
  // ID STORE IN A VARIABLE FOR FUTURE REFERENCE
  const newPostId = responseBody.id;
  console.log(newPostId);
    
});

// POST BY ID AND RETRIEVAL AND VALIDATION OF DATA
test("Get Only the Created Post by ID", async ({ request }) => {
  const newPostData = {
    "postId": 1,
    "id": 3,
    "name": "micheal",
    "email": "john@mail.com",
    "body": "let love lead"
  };

  // Send a POST request to create a new post
  const postResponse = await request.post(requestUrl, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(newPostData),
  });

  // Assertion to ensure the response status is 201 Created
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(201);

  // Extract the ID of the newly created post from the response body
  const newPostId = (await postResponse.json()).id;
  console.log("Newly created post ID:", newPostId);

    // Send a GET request to retrieve the created post by its ID
    const getResponse = await request.get(`https://jsonplaceholder.typicode.com/comments?postId=${newPostId}`);
  console.log(getResponse.status())
    // Assertion to ensure the response status is 200 OK
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    // Retrieve the details of the created post from the response body
    const retrievedPost = await getResponse.json();
   
});
// Test to Replace Some Field in the Created Post with PATCH
test("Replace Some Field in the Created Post with PATCH", async ({ request }) => {
  const newPostData = {
    "postId": 1,
    "id": 3,
    "name": "micheal",
    "email": "john@mail.com",
    "body": "let love lead"
  };

  // Send a POST request to create a new post
  const postResponse = await request.post(requestUrl, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(newPostData),
  });

  // Assertion to ensure the response status is 201 Created
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(201);

  // Extract the ID of the newly created post from the response body
  const newPostId = (await postResponse.json()).id;
  console.log("Newly created post ID:", newPostId);

  // Prepare the updated field(s) for the post
  const updatedFields = {
    email: "jjjj@mail.com",
  };

  // Send a PATCH request to update the post
  const patchResponse = await request.patch(`${requestUrl}/${newPostId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(updatedFields),
  });

  // Assertion to ensure the response status is 200 OK
  expect(patchResponse.ok()).toBeTruthy();
  expect(patchResponse.status()).toBe(200);

  // Send a GET request to retrieve the updated post
  const getResponse = await request.get(`${requestUrl}/${newPostId}`);

  // Assertion to ensure the response status is 200 OK
  expect(getResponse.ok()).toBeTruthy();
  expect(getResponse.status()).toBe(200);

  // Retrieve the updated post from the response body
  const updatedPost = await getResponse.json();

  // Validate the changes in the updated post
  expect(updatedPost.id).toBe(newPostId);
  // expect(updatedPost.title).toBe(updatedFields.title);
  expect(updatedPost.body).toBe(newPostData.body); // Assuming body is not updated
  // expect(updatedPost.userId).toBe(newPostData.userId); // Assuming userId is not updated
});




// Test to Delete the Created Post by ID
test("Delete the Created Post by ID", async ({ request }) => {
  const newPostData = {
    "postId": 1,
    "id": 3,
    "name": "micheal",
    "email": "john@mail.com",
    "body": "let love lead"
  };

  // Send a POST request to create a new post
  const postResponse = await request.post(requestUrl, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(newPostData),
  });

  // Assertion to ensure the response status is 201 Created
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(201);

  // Extract the ID of the newly created post from the response body
  const newPostId = (await postResponse.json()).id;
  console.log("Newly created post ID:", newPostId);

  // Send a DELETE request to delete the created post
  const deleteResponse = await request.delete(`${requestUrl}/${newPostId}`);

  // Assertion to ensure the response status is 200 OK
  expect(deleteResponse.ok()).toBeTruthy();
  expect(deleteResponse.status()).toBe(200);

  // Attempt to retrieve the deleted post using a GET request
  const getResponse = await request.get(`${requestUrl}/${newPostId}`);

  // Assertion to ensure the response status is 404 Not Found
  expect(getResponse.ok()).toBeFalsy();
  expect(getResponse.status()).toBe(404);
});

// Test to Check the Number of Posts to Ensure Integrity
test("Check the Number of Posts to Ensure Integrity", async ({ request }) => {
  // Step 1: Send a GET request to retrieve all posts
  const initialResponse = await request.get(requestUrl);

  // Assertion to ensure the response status is 200 OK
  expect(initialResponse.ok()).toBeTruthy();
  expect(initialResponse.status()).toBe(200);

  // Retrieve the initial total number of posts from the response body
  const initialPosts = await initialResponse.json();
  const initialTotalPosts = initialPosts.length;
  console.log("Initial total number of posts:", initialTotalPosts);

  // Step 2: Send a GET request again to retrieve all posts
  const currentResponse = await request.get(requestUrl);

  // Assertion to ensure the response status is 200 OK
  expect(currentResponse.ok()).toBeTruthy();
  expect(currentResponse.status()).toBe(200);

  // Retrieve the current total number of posts from the response body
  const currentPosts = await currentResponse.json();
  const currentTotalPosts = currentPosts.length;
  console.log("Current total number of posts:", currentTotalPosts);

  // Step 3: Compare the initial and current total number of posts to ensure integrity
  expect(currentTotalPosts).toBe(initialTotalPosts);
});




