import React from 'react';
import { stringify } from 'querystring';

export default (() => {
  const params = {
    client_id: process.env.CLIENT_ID,
    scope: 'bot channels:history chat:write:bot groups:history',
    redirect_uri: `${process.env.URL_BASE}/api/add_team`,
  };
  const href = `https://slack.com/oauth/authorize?${stringify(params)}`;
  return (
    <div>
      <h1>Add Yatlab to your Slack workspace</h1>
      <a href={href}>
        <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
      </a>
    </div>
  );
});
