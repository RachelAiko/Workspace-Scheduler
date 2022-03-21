import { Office } from './Office';
import { WorkspaceType } from './WorkspaceType';

export interface Workspace {
  id: any;
  spaceNumber: number;
  office: Office;
  workspaceType: WorkspaceType;
  isPermanent: boolean;
  permanentFor: any;
  issues: any;
}
