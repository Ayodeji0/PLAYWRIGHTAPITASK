import { test, expect } from "@playwright/test";

/* 
  THIS IS THE REFACTORED CODE THE BREAK DOWN OF THE CODE IS AFTER THIS, 2 OF THE STEPS OF THE API FAILED WHILE THE REMAINING 4 PASSED 
  I TOOK THE PAINS TO SPLIT THE CODE AND ALSO DID SOME CONSOLE LOGS TO SHOW WHAT EACH API FUNCTIONS RETURNS.
 */

const Url = "https://jsonplaceholder.typicode.com/posts";

test("Automated API Test", async ({ request }) => {
  // Step 1: Read Total Number of Posts and Store in a Variable
  const totalPostsResponse = await request.get(Url);
  expect(totalPostsResponse.ok()).toBeTruthy();
  expect(totalPostsResponse.status()).toBe(200);
  const totalPostsData = await totalPostsResponse.json();
  const initialTotalPosts = totalPostsData.length;

  // Step 2: Create a New Post and Store its ID
  const newPostData = {
    userId: 1,
    id: 3,
    title: "micheal",
    body: "let love lead",
  };
  const createPostResponse = await request.post(Url, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: JSON.stringify(newPostData),
  });
  expect(createPostResponse.ok()).toBeTruthy();
  expect(createPostResponse.status()).toBe(201);
  const createdPostData = await createPostResponse.json();
  const createdPostId = createdPostData.id;

  // Step 3: Get Only the Created Post by ID
  const getPostResponse = await request.get(`${Url}/${createdPostId}`);
  //Assertions to verify
  expect(getPostResponse.ok()).toBeTruthy();
  expect(getPostResponse.status()).toBe(200);
  const retrievedPostData = await getPostResponse.json();
  expect(retrievedPostData.title).toBe(newPostData.title);
  expect(retrievedPostData.body).toBe(newPostData.body);
  expect(retrievedPostData.userId).toBe(newPostData.userId);

  // Step 4: Replace Some Field in the Created Post with PATCH
  const updatedPostData = {
    email: "jjjj@mail.com",
  };
  const updatePostResponse = await request.patch(
    `${Url}/${createdPostId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updatedPostData),
    }
  );
  expect(updatePostResponse.ok()).toBeTruthy();
  expect(updatePostResponse.status()).toBe(200);

  // Confirm the successful update by retrieving the post again
  const getUpdatedPostResponse = await request.get(
    `${Url}/${createdPostId}`
  );
  expect(getUpdatedPostResponse.ok()).toBeTruthy();
  expect(getUpdatedPostResponse.status()).toBe(200);
  const updatedPostDataResponse = await getUpdatedPostResponse.json();
  expect(updatedPostDataResponse.title).toBe(newPostData.title);

  // Step 5: Delete the Created Post by ID
  const deletePostResponse = await request.delete(
    `${Url}/${createdPostId}`
  );
  expect(deletePostResponse.ok()).toBeTruthy();
  expect(deletePostResponse.status()).toBe(200);

  // Verify that the post has been successfully deleted
  const getDeletedPostResponse = await request.get(
    `${Url}/${createdPostId}`
  );
  expect(getDeletedPostResponse.ok()).toBeFalsy();
  expect(getDeletedPostResponse.status()).toBe(404);

  // Step 6:  Assertions to Check the Number of Posts to Ensure Integrity
  const finalTotalPostsResponse = await request.get(Url);
  expect(finalTotalPostsResponse.ok()).toBeTruthy();
  expect(finalTotalPostsResponse.status()).toBe(200);
  const finalTotalPostsData = await finalTotalPostsResponse.json();
  const finalTotalPosts = finalTotalPostsData.length;
  expect(finalTotalPosts).toBe(initialTotalPosts);
});


/*


  BREAK DOWN OF THE CODE ON 
  TWO STEPS FAILED IN THE CODE THE FAILURE OF STEP 3 DEFINITELY AFFECTED STEP 4 BUT OTHER STEPS ARE OK

*/

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
  console.log(responseBody)
  // Store the total number of post in a variable for future reference
  const total = await responseBody.length;
});

// POST REQUEST AND SAVE ID FOR FUTURE REFERENCE
test("Create a New Post and Store its ID", async ({ request }) => {
  const newPostData = {
    "userId": 1,
    "id": 3,
    "title": "micheal",
    "body": "let love lead"
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
  const responseBody2 = await response.json();
  console.log(responseBody2)
  // ID STORE IN A VARIABLE FOR FUTURE REFERENCE
  const newPostId = responseBody2.id;
  console.log(newPostId);

});

// POST BY ID AND RETRIEVAL AND VALIDATION OF DATA
test("Get Only the Created Post by ID", async ({ request }) => {
  const newPostData = {
    "userId": 1,
    "id": 3,
    "title": "micheal",
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
  const responseBody3 = await postResponse.json();
  const newId = responseBody3.id;
  console.log(newId)

    // Send a GET request to retrieve the created post by its ID
    const getResponse = await request.get(`${requestUrl}/${newId}`)
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
    "userId": 1,
    "id": 3,
    "title": "micheal",
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
