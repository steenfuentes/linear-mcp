import { BaseHandler } from '../../../core/handlers/base.handler.js';
import { BaseToolResponse } from '../../../core/interfaces/tool-handler.interface.js';
import { LinearAuth } from '../../../auth.js';
import { LinearGraphQLClient } from '../../../graphql/client.js';
import {
  InitiativeHandlerMethods,
  CreateInitiativeInput,
  UpdateInitiativeInput,
  ListInitiativesInput,
  GetInitiativeInput,
  DeleteInitiativeInput,
  LinkProjectToInitiativeInput,
  UnlinkProjectFromInitiativeInput,
  CreateInitiativeResponse,
  UpdateInitiativeResponse,
  ListInitiativesResponse,
  GetInitiativeResponse,
  DeleteInitiativeResponse,
  LinkProjectResponse,
  Initiative
} from '../types/initiative.types.js';

/**
 * Handler for initiative-related operations.
 * Manages creating, updating, listing, and deleting initiatives.
 */
export class InitiativeHandler extends BaseHandler implements InitiativeHandlerMethods {
  constructor(auth: LinearAuth, graphqlClient?: LinearGraphQLClient) {
    super(auth, graphqlClient);
  }

  /**
   * Creates a new initiative.
   */
  async handleCreateInitiative(args: CreateInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['name']);

      const result = await client.createInitiative(args) as CreateInitiativeResponse;

      if (!result.initiativeCreate.success || !result.initiativeCreate.initiative) {
        throw new Error('Failed to create initiative');
      }

      const initiative = result.initiativeCreate.initiative;

      return this.createResponse(
        `Successfully created initiative\n` +
        `Name: ${initiative.name}\n` +
        `URL: ${initiative.url}\n` +
        `Description: ${initiative.description || 'None'}\n` +
        `Target Date: ${initiative.targetDate || 'Not set'}\n` +
        `Owner: ${initiative.owner?.name || 'Not assigned'}\n` +
        `Color: ${initiative.color || 'Default'}`
      );
    } catch (error) {
      this.handleError(error, 'create initiative');
    }
  }

  /**
   * Updates an existing initiative.
   */
  async handleUpdateInitiative(args: UpdateInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['id']);

      const result = await client.updateInitiative(args) as UpdateInitiativeResponse;

      if (!result.initiativeUpdate.success || !result.initiativeUpdate.initiative) {
        throw new Error('Failed to update initiative');
      }

      const initiative = result.initiativeUpdate.initiative;

      return this.createResponse(
        `Successfully updated initiative\n` +
        `Name: ${initiative.name}\n` +
        `URL: ${initiative.url}`
      );
    } catch (error) {
      this.handleError(error, 'update initiative');
    }
  }

  /**
   * Lists initiatives with filtering and pagination.
   */
  async handleListInitiatives(args: ListInitiativesInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();

      const result = await client.listInitiatives(
        args.first || 50,
        args.after,
        args.includeArchived || false,
        args.orderBy,
        args.filter
      ) as ListInitiativesResponse;

      if (!result.initiatives.nodes.length) {
        return this.createResponse('No initiatives found');
      }

      const initiativesList = result.initiatives.nodes.map((initiative: Initiative) => {
        const projectCount = initiative.projects?.nodes.length || 0;
        const status = initiative.completedAt ? 'Completed' : 
                      initiative.startedAt ? 'In Progress' : 'Planned';
        
        return `- ${initiative.name}\n` +
               `  ID: ${initiative.id}\n` +
               `  Status: ${status}\n` +
               `  Owner: ${initiative.owner?.name || 'Not assigned'}\n` +
               `  Projects: ${projectCount}\n` +
               `  Target Date: ${initiative.targetDate || 'Not set'}\n` +
               `  URL: ${initiative.url}`;
      }).join('\n\n');

      const response = `Found ${result.initiatives.nodes.length} initiatives:\n\n${initiativesList}`;
      
      if (result.initiatives.pageInfo.hasNextPage) {
        return this.createResponse(
          response + `\n\nMore initiatives available. Use cursor: ${result.initiatives.pageInfo.endCursor}`
        );
      }

      return this.createResponse(response);
    } catch (error) {
      this.handleError(error, 'list initiatives');
    }
  }

  /**
   * Gets a single initiative by ID.
   */
  async handleGetInitiative(args: GetInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['id']);

      const result = await client.getInitiative(args.id) as GetInitiativeResponse;

      if (!result.initiative) {
        throw new Error('Initiative not found');
      }

      const initiative = result.initiative;
      const projectNames = initiative.projects?.nodes.map(p => p.name).join(', ') || 'None';
      const status = initiative.completedAt ? 'Completed' : 
                    initiative.startedAt ? 'In Progress' : 'Planned';

      return this.createResponse(
        `Initiative Details:\n` +
        `Name: ${initiative.name}\n` +
        `ID: ${initiative.id}\n` +
        `URL: ${initiative.url}\n` +
        `Status: ${status}\n` +
        `Description: ${initiative.description || 'None'}\n` +
        `Content: ${initiative.content ? initiative.content.substring(0, 100) + '...' : 'None'}\n` +
        `Owner: ${initiative.owner?.name || 'Not assigned'}\n` +
        `Creator: ${initiative.creator?.name || 'Unknown'}\n` +
        `Color: ${initiative.color || 'Default'}\n` +
        `Icon: ${initiative.icon || 'None'}\n` +
        `Started At: ${initiative.startedAt || 'Not started'}\n` +
        `Target Date: ${initiative.targetDate || 'Not set'}\n` +
        `Completed At: ${initiative.completedAt || 'Not completed'}\n` +
        `Projects: ${projectNames}\n` +
        `Organization: ${initiative.organization.name}`
      );
    } catch (error) {
      this.handleError(error, 'get initiative');
    }
  }

  /**
   * Deletes an initiative.
   */
  async handleDeleteInitiative(args: DeleteInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['id']);

      const result = await client.deleteInitiative(args.id) as DeleteInitiativeResponse;

      if (!result.initiativeDelete.success) {
        throw new Error('Failed to delete initiative');
      }

      return this.createResponse(`Successfully deleted initiative ${args.id}`);
    } catch (error) {
      this.handleError(error, 'delete initiative');
    }
  }

  /**
   * Links a project to an initiative.
   */
  async handleLinkProjectToInitiative(args: LinkProjectToInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['projectId', 'initiativeId']);

      const result = await client.linkProjectToInitiative(
        args.projectId,
        args.initiativeId
      ) as LinkProjectResponse;

      if (!result.projectUpdate.success) {
        throw new Error('Failed to link project to initiative');
      }

      return this.createResponse(
        `Successfully linked project ${args.projectId} to initiative ${args.initiativeId}`
      );
    } catch (error) {
      this.handleError(error, 'link project to initiative');
    }
  }

  /**
   * Unlinks a project from an initiative.
   */
  async handleUnlinkProjectFromInitiative(args: UnlinkProjectFromInitiativeInput): Promise<BaseToolResponse> {
    try {
      const client = this.verifyAuth();
      this.validateRequiredParams(args, ['projectId']);

      const result = await client.unlinkProjectFromInitiative(args.projectId) as LinkProjectResponse;

      if (!result.projectUpdate.success) {
        throw new Error('Failed to unlink project from initiative');
      }

      return this.createResponse(
        `Successfully unlinked project ${args.projectId} from its initiative`
      );
    } catch (error) {
      this.handleError(error, 'unlink project from initiative');
    }
  }
}