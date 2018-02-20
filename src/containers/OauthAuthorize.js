import React from 'react';
import { stringify } from 'querystring';

export default (() => {
  const params = {
    client_id: process.env.CLIENT_ID,
    scope: 'bot channels:history chat:write:bot groups:history',
    redirect_uri: process.env.REDIRECT_URI,
  };
  const href = `https://slack.com/oauth/authorize?${stringify(params)}`;

  return (
    <React.Fragment>
      <h1>Add Yatlab to slack</h1>
      <a href={href}>Authorize Yatlab for your slack workspace</a>
    </React.Fragment>
  );
});
