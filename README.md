# Github CoolOrgs

Displays the 10 most starred repos in a Github Organization.
This project uses the following stack:

- React
- Redux
- Tachyons
- CSS Modules

### Getting Stated

First, install all the dependencies with npm or yarn:

```
yarn install or npm install
```

Then, you need to start the dev server:

```
yarn start
```

### Other Scripts
To build the application, run:

```
yarn build
```

To lint the application, run:

```
yarn lint
```

### Routes

The `index route` renders the repos for the organization `marvin-ai`.
Click the title to change the current organization.

The route `/:repos` renders info about the current org's chosen repository. Stars, forks, contribs and commits.

The route `/choose-cool-org` let's you choose which org you're seeing.
