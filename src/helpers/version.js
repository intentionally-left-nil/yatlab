const version = 2; // Needs to stay in sync with server/routes/team_controller

const needsReauthorization = teamVersion => teamVersion < version;
export { needsReauthorization };
export default version;
