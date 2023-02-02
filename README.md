# delphinus-slack-alert
Module which send alert to slack channel

### Create and setup Alert app in slack
Firstly log in slack from website https://slack.com/signin#/signin if you haven't

Secondly, create a new channel to use this app

Thirdly, Create Alert App mannully through https://api.slack.com/ (Create New APP)
- Choose to create From scratch
- Give it an App name
- Pick a workspace to develop your app in
- Set up incoming webhooks (click and active it, then click to add new webhoook to workspace and choose the the channel you would like to add this app)
- Add more permissions(such as channels:history, channels:read, chat:write) under setting/basic information/Add features and functionality/Scopes.
- reinstall the app to channel if settings are changed.

At last, you can click the channel to entering setting page, and then click add apps in integrations section.

### How to config slack to use this module

Each package using this slack tool should have an individual json-format config file.

The slack-config attributes:

- channelId: ID of the monitor-alerts channel (you can find this in about setion by clicking the channel)
- token: The Bot User OAuth Token given by slack api (pick the app and find your Bot User OAuth Token in SlackApi/Features/OAuth&Permissions)

If needed, collaborators could add other members as new collaborator in SlackApi/Setting/Collaborator

Note: Do Not push the token to a public github repo as it would be detected by Slack and then be disabled automatically. 

- timePeriod: The allowed repeat interval(unit: second). 

This bot would fetch history messages and avoid sending repeat messages within the given time period.

### How to test slack alert and its config

You could modify the src/test-config.json and run `npm test` command to trigger a test error.
If it succeeds, the target slack channel should receive a message of this error. 

### How to use this tool in other packages

Other packages could import `sendAlert` method from src/index file

The method `sendAlert` has three parameters: text, config, printOut

- text is a printable variable such as Error and string. If it is an Error, it's stack of location will be sent out as well

- config is the object loaded from config json file

- printOut is a boolean value. When printOut = true, the error messages will be consoled out to server as well. The default value is true.
