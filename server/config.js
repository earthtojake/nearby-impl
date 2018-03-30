const facebook = {
  clientID: "895238370637125",
  clientSecret: "4a7db53418907ae4bc6944c58c238eb1",
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'email', 'picture.height(400)'],
}

module.exports = {facebook};