# Questions and Answers - Anonymously
Purpose: Students sometimes are afraid to ask questions openly, so with this app they can submit questions to the app anonymously and the instructional staff can answer either in class or through the app. It is also integrated with Slack, so whenever a new question is asked or if one is answered, a message will be posted.


Setup: After deploying to heroku, make sure to do the following things:
 * Create administrative credentials by creating the following two environment variables: 
   * ADMIN
   * PASSWORD
 * Create the following two environment variables for Slack API:
   * SLACK_ACCESS_TOKEN*
   * SLACK_CHANNEL
 * Add JAWS_DB to your Heroku app
 
*You can get a slack access token by going to https://api.slack.com/slack-apps and clicking the green "Create slack app" button.
