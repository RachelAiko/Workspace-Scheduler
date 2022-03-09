import { User } from './User';
import { Workspace } from './Workspace';

export interface Reservation {
  id: any;
  date: string;
  creator: User;
  reservedFor: User;
  workspace: Workspace;
}
