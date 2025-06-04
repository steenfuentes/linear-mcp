import { gql } from 'graphql-tag';

export const SEARCH_ISSUES_QUERY = gql`
  query SearchIssues(
    $filter: IssueFilter
    $first: Int
    $after: String
    $orderBy: PaginationOrderBy
  ) {
    issues(
      filter: $filter
      first: $first
      after: $after
      orderBy: $orderBy
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        identifier
        title
        description
        url
        state {
          id
          name
          type
          color
        }
        assignee {
          id
          name
          email
        }
        team {
          id
          name
          key
        }
        project {
          id
          name
        },
        priority
        labels {
          nodes {
            id
            name
            color
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_TEAMS_QUERY = gql`
  query GetTeams {
    teams {
      nodes {
        id
        name
        key
        description
        states {
          nodes {
            id
            name
            type
            color
          }
        }
        labels {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser {
    viewer {
      id
      name
      email
      teams {
        nodes {
          id
          name
          key
        }
      }
    }
  }
`;

export const SEARCH_PROJECTS_QUERY = gql`
  query SearchProjects($filter: ProjectFilter) {
    projects(filter: $filter) {
      nodes {
        id
        name
        description
        url
        teams {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      url
      teams {
        nodes {
          id
          name
        }
      }
    }
  }
`;

export const LIST_INITIATIVES_QUERY = gql`
  query ListInitiatives(
    $first: Int
    $after: String
    $includeArchived: Boolean
    $orderBy: PaginationOrderBy
    $filter: InitiativeFilter
  ) {
    initiatives(
      first: $first
      after: $after
      includeArchived: $includeArchived
      orderBy: $orderBy
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        name
        description
        content
        url
        slugId
        color
        icon
        sortOrder
        targetDate
        startedAt
        completedAt
        archivedAt
        createdAt
        updatedAt
        trashed
        creator {
          id
          name
        }
        owner {
          id
          name
        }
        organization {
          id
          name
        }
        projects {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_INITIATIVE_QUERY = gql`
  query GetInitiative($id: String!) {
    initiative(id: $id) {
      id
      name
      description
      content
      url
      slugId
      color
      icon
      sortOrder
      targetDate
      startedAt
      completedAt
      archivedAt
      createdAt
      updatedAt
      trashed
      creator {
        id
        name
      }
      owner {
        id
        name
      }
      organization {
        id
        name
      }
      projects {
        nodes {
          id
          name
        }
      }
      updateReminderFrequency
      updateReminderFrequencyInWeeks
      updateRemindersDay
      updateRemindersHour
    }
  }
`;
