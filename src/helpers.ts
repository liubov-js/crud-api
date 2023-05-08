import { IncomingMessage } from 'http';

export const REGEX_UUID = new RegExp(
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
);

export const getBaseUrl = (req: IncomingMessage) =>
  req.url!.substring(0, req.url!.lastIndexOf('/') + 1); // TODO: !

export const getId = (req: IncomingMessage) => req.url!.split('/')[3]; // TODO: 3 && !
