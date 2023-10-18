const apiKey = process.env.REACT_APP_API_KEY;
export const loginapi = async (
    email,
    password
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  // console.log('emaol', email, password)
    const raw = JSON.stringify({
      email: email,
      password: password,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `${apiKey}/auth/login`,
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
      // Handle fetch errors (network issues, etc.)
      // throw new Error(`Failed to register: ${error.message}`);
    }
  };
  