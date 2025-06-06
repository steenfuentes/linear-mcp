/**
 * This file contains the schema definitions for all MCP tools exposed by the Linear server.
 * These schemas define the input parameters and validation rules for each tool.
 */

export const toolSchemas = {
  linear_auth: {
    name: 'linear_auth',
    description: 'Initialize OAuth flow with Linear',
    inputSchema: {
      type: 'object',
      properties: {
        clientId: {
          type: 'string',
          description: 'Linear OAuth client ID',
        },
        clientSecret: {
          type: 'string',
          description: 'Linear OAuth client secret',
        },
        redirectUri: {
          type: 'string',
          description: 'OAuth redirect URI',
        },
      },
      required: ['clientId', 'clientSecret', 'redirectUri'],
    },
  },

  linear_auth_callback: {
    name: 'linear_auth_callback',
    description: 'Handle OAuth callback',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'OAuth authorization code',
        },
      },
      required: ['code'],
    },
  },

  linear_create_issue: {
    name: 'linear_create_issue',
    description: 'Create a new issue in Linear',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Issue title',
        },
        description: {
          type: 'string',
          description: 'Issue description',
        },
        teamId: {
          type: 'string',
          description: 'Team ID',
        },
        assigneeId: {
          type: 'string',
          description: 'Assignee user ID',
          optional: true,
        },
        priority: {
          type: 'number',
          description: 'Issue priority (0-4)',
          optional: true,
        },
        estimate: {
          type: 'number',
          description: 'Issue estimate points (typically 1, 2, 3, 5, 8, etc.)',
          optional: true,
        },
        projectId: {
          type: 'string',
          description: 'Project ID',
          optional: true,
        },
        createAsUser: {
          type: 'string',
          description: 'Name to display for the created issue',
          optional: true,
        },
        displayIconUrl: {
          type: 'string',
          description: 'URL of the avatar to display',
          optional: true,
        },
      },
      required: ['title', 'description', 'teamId'],
    },
  },

  linear_create_project_with_issues: {
    name: 'linear_create_project_with_issues',
    description: 'Create a new project with associated issues. Note: Project requires teamIds (array) not teamId (single value).',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Project name',
            },
            description: {
              type: 'string',
              description: 'Project description (optional)',
            },
            teamIds: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of team IDs this project belongs to (Required). Use linear_get_teams to get available team IDs.',
              minItems: 1
            },
          },
          required: ['name', 'teamIds'],
        },
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Issue title',
              },
              description: {
                type: 'string',
                description: 'Issue description',
              },
              teamId: {
                type: 'string',
                description: 'Team ID (must match one of the project teamIds)',
              },
            },
            required: ['title', 'description', 'teamId'],
          },
          description: 'List of issues to create with this project',
        },
      },
      required: ['project', 'issues'],
    },
    examples: [
      {
        description: "Create a project with a single team and issue",
        value: {
          project: {
            name: "Q1 Planning",
            description: "Q1 2025 Planning Project",
            teamIds: ["team-id-1"]
          },
          issues: [
            {
              title: "Project Setup",
              description: "Initial project setup tasks",
              teamId: "team-id-1"
            }
          ]
        }
      },
      {
        description: "Create a project with multiple teams",
        value: {
          project: {
            name: "Cross-team Initiative",
            description: "Project spanning multiple teams",
            teamIds: ["team-id-1", "team-id-2"]
          },
          issues: [
            {
              title: "Team 1 Tasks",
              description: "Tasks for team 1",
              teamId: "team-id-1"
            },
            {
              title: "Team 2 Tasks",
              description: "Tasks for team 2",
              teamId: "team-id-2"
            }
          ]
        }
      }
    ]
  },

  linear_bulk_update_issues: {
    name: 'linear_bulk_update_issues',
    description: 'Update multiple issues at once',
    inputSchema: {
      type: 'object',
      properties: {
        issueIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of issue IDs to update',
        },
        update: {
          type: 'object',
          properties: {
            stateId: {
              type: 'string',
              description: 'New state ID',
              optional: true,
            },
            assigneeId: {
              type: 'string',
              description: 'New assignee ID',
              optional: true,
            },
            priority: {
              type: 'number',
              description: 'New priority (0-4)',
              optional: true,
            },
            estimate: {
              type: 'number',
              description: 'Issue estimate points (typically 1, 2, 3, 5, 8, etc.)',
              optional: true,
            },
          },
        },
      },
      required: ['issueIds', 'update'],
    },
  },

  linear_search_issues: {
    name: 'linear_search_issues',
    description: 'Search for issues with filtering and pagination',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string',
          optional: true,
        },
        teamIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Filter by team IDs',
          optional: true,
        },
        assigneeIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Filter by assignee IDs',
          optional: true,
        },
        states: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Filter by state names',
          optional: true,
        },
        priority: {
          type: 'number',
          description: 'Filter by priority (0-4)',
          optional: true,
        },
        first: {
          type: 'number',
          description: 'Number of issues to return (default: 50)',
          optional: true,
        },
        after: {
          type: 'string',
          description: 'Cursor for pagination',
          optional: true,
        },
        orderBy: {
          type: 'string',
          description: 'Field to order by (default: updatedAt)',
          optional: true,
        },
      },
    },
  },

  linear_get_teams: {
    name: 'linear_get_teams',
    description: 'Get all teams with their states and labels',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  linear_get_user: {
    name: 'linear_get_user',
    description: 'Get current user information',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  linear_delete_issue: {
    name: 'linear_delete_issue',
    description: 'Delete an issue',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Issue identifier (e.g., ENG-123)',
        },
      },
      required: ['id'],
    },
  },

  linear_delete_issues: {
    name: 'linear_delete_issues',
    description: 'Delete multiple issues',
    inputSchema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of issue identifiers to delete',
        },
      },
      required: ['ids'],
    },
  },

  linear_get_project: {
    name: 'linear_get_project',
    description: 'Get project information',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Project identifier',
        },
      },
      required: ['id'],
    },
  },

  linear_search_projects: {
    name: 'linear_search_projects',
    description: 'Search for projects by name',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Project name to search for (exact match)',
        },
      },
      required: ['name'],
    },
  },

  linear_create_issues: {
    name: 'linear_create_issues',
    description: 'Create multiple issues at once',
    inputSchema: {
      type: 'object',
      properties: {
        issues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Issue title',
              },
              description: {
                type: 'string',
                description: 'Issue description',
              },
              teamId: {
                type: 'string',
                description: 'Team ID',
              },
              assigneeId: {
                type: 'string',
                description: 'Assignee user ID',
                optional: true,
              },
              priority: {
                type: 'number',
                description: 'Issue priority (0-4)',
                optional: true,
              },
              projectId: {
                type: 'string',
                description: 'Project ID',
                optional: true,
              },
              estimate: {
                type: 'number',
                description: 'Issue estimate points (typically 1, 2, 3, 5, 8, etc.)',
                optional: true,
              },
              labelIds: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Label IDs to apply',
                optional: true,
              }
            },
            required: ['title', 'description', 'teamId'],
          },
          description: 'List of issues to create',
        },
      },
      required: ['issues'],
    },
  },

  linear_create_initiative: {
    name: 'linear_create_initiative',
    description: 'Create a new initiative in Linear',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Initiative name',
        },
        description: {
          type: 'string',
          description: 'Initiative description',
          optional: true,
        },
        color: {
          type: 'string',
          description: 'Initiative color (hex format)',
          optional: true,
        },
        icon: {
          type: 'string',
          description: 'Initiative icon',
          optional: true,
        },
        targetDate: {
          type: 'string',
          description: 'Target completion date (YYYY-MM-DD format)',
          optional: true,
        },
        startedAt: {
          type: 'string',
          description: 'Start date (ISO 8601 format)',
          optional: true,
        },
        ownerId: {
          type: 'string',
          description: 'User ID of the initiative owner',
          optional: true,
        },
        sortOrder: {
          type: 'number',
          description: 'Sort order within the organization',
          optional: true,
        },
      },
      required: ['name'],
    },
  },

  linear_update_initiative: {
    name: 'linear_update_initiative',
    description: 'Update an existing initiative',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Initiative ID to update',
        },
        name: {
          type: 'string',
          description: 'New name',
          optional: true,
        },
        description: {
          type: 'string',
          description: 'New description',
          optional: true,
        },
        color: {
          type: 'string',
          description: 'New color (hex format)',
          optional: true,
        },
        icon: {
          type: 'string',
          description: 'New icon',
          optional: true,
        },
        targetDate: {
          type: 'string',
          description: 'New target date (YYYY-MM-DD format)',
          optional: true,
        },
        startedAt: {
          type: 'string',
          description: 'New start date (ISO 8601 format)',
          optional: true,
        },
        completedAt: {
          type: 'string',
          description: 'Completion date (ISO 8601 format)',
          optional: true,
        },
        ownerId: {
          type: 'string',
          description: 'New owner user ID',
          optional: true,
        },
        sortOrder: {
          type: 'number',
          description: 'New sort order',
          optional: true,
        },
        updateReminderFrequency: {
          type: 'number',
          description: 'Reminder frequency',
          optional: true,
        },
        updateReminderFrequencyInWeeks: {
          type: 'number',
          description: 'Reminder frequency in weeks',
          optional: true,
        },
        updateRemindersDay: {
          type: 'number',
          description: 'Day of week for reminders (0-6)',
          optional: true,
        },
        updateRemindersHour: {
          type: 'number',
          description: 'Hour of day for reminders (0-23)',
          optional: true,
        },
      },
      required: ['id'],
    },
  },

  linear_list_initiatives: {
    name: 'linear_list_initiatives',
    description: 'List initiatives with optional filtering and pagination',
    inputSchema: {
      type: 'object',
      properties: {
        first: {
          type: 'number',
          description: 'Number of initiatives to return (default: 50)',
          optional: true,
        },
        after: {
          type: 'string',
          description: 'Cursor for pagination',
          optional: true,
        },
        includeArchived: {
          type: 'boolean',
          description: 'Include archived initiatives',
          optional: true,
        },
        orderBy: {
          type: 'string',
          description: 'Field to order by',
          optional: true,
        },
        filter: {
          type: 'object',
          description: 'Filter criteria',
          optional: true,
        },
      },
      required: [],
    },
  },

  linear_get_initiative: {
    name: 'linear_get_initiative',
    description: 'Get a single initiative by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Initiative ID',
        },
      },
      required: ['id'],
    },
  },

  linear_delete_initiative: {
    name: 'linear_delete_initiative',
    description: 'Delete an initiative',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Initiative ID to delete',
        },
      },
      required: ['id'],
    },
  },

  linear_link_project_to_initiative: {
    name: 'linear_link_project_to_initiative',
    description: 'Link a project to an initiative',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project ID to link',
        },
        initiativeId: {
          type: 'string',
          description: 'Initiative ID to link to',
        },
      },
      required: ['projectId', 'initiativeId'],
    },
  },

  linear_unlink_project_from_initiative: {
    name: 'linear_unlink_project_from_initiative',
    description: 'Unlink a project from its initiative',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project ID to unlink',
        },
        initiativeId: {
          type: 'string',
          description: 'Initiative ID to unlink from (optional, will unlink from any initiative)',
          optional: true,
        },
      },
      required: ['projectId'],
    },
  },
};
