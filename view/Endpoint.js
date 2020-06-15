const Endpoint = {};

Endpoint.NETWORK_PROJECT =
  "https://cdn.jsdelivr.net/gh/jmthompson2015/talon-game";
Endpoint.LOCAL_PROJECT = "..";

Endpoint.NETWORK_RESOURCE = `${Endpoint.NETWORK_PROJECT}/resource`;
Endpoint.LOCAL_RESOURCE = `${Endpoint.LOCAL_PROJECT}/resource`;

Object.freeze(Endpoint);

export default Endpoint;
