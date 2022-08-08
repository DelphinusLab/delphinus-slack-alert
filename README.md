# delphinus-slack-alert
Module which send alert to slack channel

*** The config setup:
- active: The on/off switch
- channelId: ID of the monitor-alerts channel
- token: The Bot User OAuth Token given by slack. Could be found in https://api.slack.com/apps/A03RBC2LR1D/oauth? after login
- timePeriod: The allowed repeat interval(unit: second). This bot won't send the same message repeatly within the given time period.
