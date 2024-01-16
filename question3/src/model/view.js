const readAllTopics = async () => {
    try {
      const res = await fetch(`http://localhost:3000/queries`);
      console.log('Response from backend:', res);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }
  
      const viewPage = await res.json();
      console.log('Data from backend:', viewPage);
      return viewPage;
    } catch (err) {
      console.error('readAllTopics::error: ', err);
      throw err;
    }
  };

  const addOneTopic = async (topic) => {
    try {
      // eslint-disable-next-line no-use-before-define
      const authenticatedUser = authenticatedUser();
      const options = {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  
      const response = await fetch(`${process.env.API_BASE_URL}/topics`, options);

      const createdTopic = await response.json();
      
      return createdTopic;

    } catch (err) {
      console.error('addOneTopic::error: ', err);
      throw err;
    }
  };

  export { readAllTopics, addOneTopic};