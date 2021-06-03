# Speech-to-Text featured Media Manager
Media Manager is a modern media manager and player which supports
text keyword searching inside the video/audio files. 
## Installation

In order to run the application in local environment follow instructions below:

1. Copy the public repo's URL Media Manager - Speech-To-Text generated Media Manager
2. Create virtual environment for the Python application and activate it
1. On Linux/Mac: python3 -m venv env and source env/bin/activate
2. On Windows: py -m venv env and .\env\Scripts\activate
3. Clone the repository inside the virtual environment using git clone <https-URL> command.
4. Install pip (Python package manager) and npm (Node.JS) if you haven’t already
5. Navigate to the cloned repository and install all dependencies for the backend application using the pip install -r requirements.txt command.
6. Install all dependencies for the frontend application using the `npm install` command.
7. Run `python manage.py migrate` to migrate the database
8. Run `npm start` and `python manage.py runserver` to start frontend and backend concurrently
9. If there have not occurred prior errors until this step, you'll be able to access the website via http://localhost:3000/

## Future improvements

- Video summarization based on the generated text.
- Real-Time subtitle generation with any media url
- Adding instant notification system for better user experience.

## References

- React JS Documentation,
  URL: https://reactjs.org/docs/getting-started, Last accessed on 12/05/2021.
- Django Documentation,
  URL: https://docs.djangoproject.com/en/3.2/, Last accessed on 12/05/2021.
- Django Rest Framework Documentation,
  URL: https://www.django-rest-framework.org/, Last accessed on 12/05/2021.
- PostGreSQL Documentation,
  URL: https://www.postgresql.org/docs/, Last accessed on 12/05/2021.
- IBM Watson Documentation,
  URL: https://cloud.ibm.com/developer/watson/documentation, Last accessed on 12/05/2021.
- Watson Speech-To-Text Documentation,
  URL: https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-gettingStarted#gettingStarted, Last accessed on 12/05/2021.
- React-Redux Documentation,
  URL: https://react-redux.js.org/api/hooks, Last accessed on 12/05/2021.
- Jest Documentation,
  URL: https://jestjs.io/docs/en/getting-started, Last accessed on 15/05/2021.
