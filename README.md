# lost-ark-tools

Deployed version is accessable at https://lost-ark-tools.herokuapp.com/

There is currently no user registration interface. To test the app please use the following credentials:
```
username: admin
password: password
```

Note: there is currently 1 rare edge case bug (stats display as infinity or NaN) in `/engravings` that requires the user to refresh the page.
## run

To run locally, 
- Clone the project and run `npm run build`. 
- Create `.env` in the project root folder and add `MONGODB_URI=<...>` and `SECRET='...'` environment variables. Default port should be 3003, add `PORT=3003` if needed.
- Run `npm start`.


See `package.json` for more details.

### todo

- add linting
- add unit tests (Jest/Mocha)
- add a comprehensive integration test (Cypress)
- add heroku deployment to CI/CD
  - waiting on https://github.com/AkhileshNS/heroku-deploy/issues/84, currently working around it through auto-deploy in heroku settings 
- change to REST API to GraphQL
  - had a bug, reverted to rest api for now
- features
  - efficient honing calculator
  - add search bar to leaderboards page