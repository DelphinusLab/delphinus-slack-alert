# delphinus-slack-alert
Module which send alert to slack channel

### How to config slack to use this module

Each package using this slack tool should have an individual json-format config file.

The slack-config attributes:

- active: The on/off switch

- channelId: ID of the monitor-alerts channel

This ID can be found in the slack-app.

- token: The Bot User OAuth Token given by slack 

Firstly log in slack from website https://slack.com/signin#/signin if you haven't

Then collaborator users could found the currently valid OAuth Token in https://api.slack.com/apps/A03RBC2LR1D/oauth? 

If needed, collaborators could add other members as new collaborator in https://app.slack.com/app-settings/T03F10P1LSH/A03RBC2LR1D/collaborators

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
