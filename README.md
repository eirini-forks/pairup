# Pairup

Allocate team members to work tracks

## Prerequisites

### Firebase

You will need a firebase realtime database for this app. To get one:

- Go to https://console.firebase.google.com/
- Create a new project (preferably linked to a GCP account)
- Add an app to the project
- Add a Realtime Database from the Build tab
- Enable google authentication in the Authentication -> Sign-in Method config
- Restrict access to the data based on email addresses
  E.g., in Realtime Database -> Rules:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth.token.email_verified == true && auth.token.email.matches(/^(foo@gmail.com|.*@example.com)$/)"
  }
}
```
- Go to project settings, and grab the Firebase SDK snippet, which looks like:
```javascript
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "https://xxx",
  projectId: "xxx",
  ...
}
```
- Put this in the file `src/conf.js` as:
```javascript
  export const conf = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "https://xxx",
    projectId: "xxx",
    ...
  };
```

## Running

`yarn install`, then...

### Dev mode

```bash
yarn dev
```

### Production

```bash
yarn build
yarn start
```
