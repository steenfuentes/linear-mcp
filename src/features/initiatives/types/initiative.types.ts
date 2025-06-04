import { BaseToolResponse } from '../../../core/interfaces/tool-handler.interface.js';

/**
 * Input types for initiative operations
 */

export interface CreateInitiativeInput {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  targetDate?: string;
  startedAt?: string;
  ownerId?: string;
  sortOrder?: number;
}

export interface UpdateInitiativeInput {
  id: string;
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  targetDate?: string;
  startedAt?: string;
  completedAt?: string;
  ownerId?: string;
  sortOrder?: number;
  updateReminderFrequency?: number;
  updateReminderFrequencyInWeeks?: number;
  updateRemindersDay?: number;
  updateRemindersHour?: number;
}

export interface ListInitiativesInput {
  first?: number;
  after?: string;
  includeArchived?: boolean;
  orderBy?: string;
  filter?: {
    state?: {
      type?: {
        eq?: string;
      };
    };
  };
}

export interface GetInitiativeInput {
  id: string;
}

export interface DeleteInitiativeInput {
  id: string;
}

export interface LinkProjectToInitiativeInput {
  projectId: string;
  initiativeId: string;
}

export interface UnlinkProjectFromInitiativeInput {
  projectId: string;
  initiativeId: string;
}

/**
 * Response types for initiative operations
 */

export interface Initiative {
  id: string;
  name: string;
  description?: string;
  content?: string;
  url: string;
  slugId: string;
  color?: string;
  icon?: string;
  sortOrder: number;
  targetDate?: string;
  startedAt?: string;
  completedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  trashed?: boolean;
  creator?: {
    id: string;
    name: string;
  };
  owner?: {
    id: string;
    name: string;
  };
  organization: {
    id: string;
    name: string;
  };
  projects?: {
    nodes: Array<{
      id: string;
      name: string;
    }>;
  };
  updateReminderFrequency?: number;
  updateReminderFrequencyInWeeks?: number;
  updateRemindersDay?: number;
  updateRemindersHour?: number;
}

export interface CreateInitiativeResponse {
  initiativeCreate: {
    success: boolean;
    initiative?: Initiative;
  };
}

export interface UpdateInitiativeResponse {
  initiativeUpdate: {
    success: boolean;
    initiative?: Initiative;
  };
}

export interface ListInitiativesResponse {
  initiatives: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    nodes: Initiative[];
  };
}

export interface GetInitiativeResponse {
  initiative: Initiative;
}

export interface DeleteInitiativeResponse {
  initiativeDelete: {
    success: boolean;
  };
}

export interface LinkProjectResponse {
  projectUpdate: {
    success: boolean;
    project?: {
      id: string;
      initiative?: {
        id: string;
        name: string;
      };
    };
  };
}

/**
 * Handler method types
 */

export interface InitiativeHandlerMethods {
  handleCreateInitiative(args: CreateInitiativeInput): Promise<BaseToolResponse>;
  handleUpdateInitiative(args: UpdateInitiativeInput): Promise<BaseToolResponse>;
  handleListInitiatives(args: ListInitiativesInput): Promise<BaseToolResponse>;
  handleGetInitiative(args: GetInitiativeInput): Promise<BaseToolResponse>;
  handleDeleteInitiative(args: DeleteInitiativeInput): Promise<BaseToolResponse>;
  handleLinkProjectToInitiative(args: LinkProjectToInitiativeInput): Promise<BaseToolResponse>;
  handleUnlinkProjectFromInitiative(args: UnlinkProjectFromInitiativeInput): Promise<BaseToolResponse>;
}