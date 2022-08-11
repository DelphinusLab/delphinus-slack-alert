# delphinus-slack-alert
Module which send alert to slack channel

### How to config slack to use this module

Each package using this slack tool should have an individual json-format config file.

The slack-config attributes:

- active: The on/off switch

- channelId: ID of the monitor-alerts channel

This ID can be found in the slack-app.

- token: The Bot User OAuth Token given by slack 

User could found the currently valid OAuth Token in https://api.slack.com/apps/A03RBC2LR1D/oauth? if he/she has been added as a collaborator;

Collaborators could add other members as new collaborator in https://app.slack.com/app-settings/T03F10P1LSH/A03RBC2LR1D/collaborators.

- timePeriod: The allowed repeat interval(unit: second). 

This bot would fetch history messages and avoid sending repeat messages within the given time period.

### How to test slack alert and its config

You could modify the src/test-config.json and run `npm test` command to trigger a test error.
If it succeeds, the aimed slack channel could receive a message of this error. 
