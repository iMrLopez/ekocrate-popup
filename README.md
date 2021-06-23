# EkoCrate Form

A small popup created for the team at https://ekocrate.com

This form uses the following technologies

* CSS
* HTML
* FIREBASE
* JAVASCRIPT

The idea is that the user would fill all the data, this data will be validated and then the user will be able to save it to a firestore collection.

## DEPLOY INSTRUCTIONS

* You need to include the contents of the index.html file in an HTML element in squarespace.
* The page containing the HTML element in squarespace should have a url like this:

```javascript
    /zipcheck?beds=studio
    /zipcheck?beds=34
    /zipcheck?beds=5
    /zipcheck?beds=12
```
(Notice the `?beds=` parameter, this is important for the site to know where to redirect the user)

* You will need to modify your database rules in Firestore to allow writing to it.
* * Go to your `Firestore Database` tab and click on `Rules`
* * Add the following rule just before the last closing bracket in your rules

```
  match /ekocrate_users_zipcheck/{id} {
  	allow write: if true;
  }
```

Your security rules should look something like this:

```
rules_version = '2';
service cloud.firestore {
    ...
    match /ekocrate_users_zipcheck/{id} {
        allow write: if true;
    }
}
```

(Adding this rule is strictly necessary to allow the script to write to your database).
(This rule only enables writing to `ekocrate_users_zipcheck`, this, in order to make sure your db doesnt get open to the public).

## LIVE DEMO OF THE FORM

https://imrlopez.github.io/upwork-ekocrate-zipform/
