const apiKey = process.env.REACT_APP_API_KEY;
export const createNotes = async ({ token, title, content, userId }) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", token);
  myHeaders.append("_id", userId);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    title: title,
    content: content
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${apiKey}/notes/createnotes`,
      requestOptions
    );

    const data = await response.json();
    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response
      return data;
    } else {
      // Handle non-successful responses (status code other than 2xx)
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getNotes = async ({ token, userId }) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "authorization",
    token
  );
  myHeaders.append("_id", userId);

//   var raw = "";

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${apiKey}/notes/allnotes`,
      requestOptions
    );
    // console.log('res', response)
    const data = await response.json();
    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      // Parse the JSON response
      return data;
    } else {
      // Handle non-successful responses (status code other than 2xx)
      return data;
    }
  } catch (error) {
    return error;
    // Handle fetch errors (network issues, etc.)
    // throw new Error(`Failed to register: ${error.message}`);
  }
};

export const updateNote = async ({token, userId, id, title, content}) => {
  var myHeaders = new Headers();
myHeaders.append("authorization", token);
myHeaders.append("_id", userId);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title": title,
  "content": content
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

try {
  const response = await fetch(
    `${apiKey}/notes/${id}`,
    requestOptions
  );
  // console.log('res', response)
  const data = await response.json();
  // Check if the response is successful (status code 2xx)
  if (response.ok) {
    // Parse the JSON response
    return data;
  } else {
    // Handle non-successful responses (status code other than 2xx)
    return data;
  }
} catch (error) {
  return error;
  // Handle fetch errors (network issues, etc.)
  // throw new Error(`Failed to register: ${error.message}`);
}
}

export const deleteNote = async ({token, userId, id}) => {
  var myHeaders = new Headers();
myHeaders.append("authorization", token);
myHeaders.append("_id", userId);

// var raw = "";

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  // body: raw,
  redirect: 'follow'
};

try {
  const response = await fetch(
    `${apiKey}/notes/${id}`,
    requestOptions
  );
  // console.log('res', response)
  const data = await response.json();
  // Check if the response is successful (status code 2xx)
  if (response.ok) {
    // Parse the JSON response
    return data;
  } else {
    // Handle non-successful responses (status code other than 2xx)
    return data;
  }
} catch (error) {
  return error;
  // Handle fetch errors (network issues, etc.)
  // throw new Error(`Failed to register: ${error.message}`);
}
}
