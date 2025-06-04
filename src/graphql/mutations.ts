import { gql } from 'graphql-tag';

export const CREATE_ISSUE_MUTATION = gql`
  mutation CreateIssue($input: IssueCreateInput!) {
    issueCreate(input: $input) {
      success
      issue {
        id
        identifier
        title
        url
        team {
          id
          name
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_ISSUES_MUTATION = gql`
  mutation CreateIssues($input: [IssueCreateInput!]!) {
    issueCreate(input: $input) {
      success
      issue {
        id
        identifier
        title
        url
        team {
          id
          name
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      success
      project {
        id
        name
        url
      }
      lastSyncId
    }
  }
`;

export const CREATE_BATCH_ISSUES = gql`
  mutation CreateBatchIssues($input: IssueBatchCreateInput!) {
    issueBatchCreate(input: $input) {
      success
      issues {
        id
        identifier
        title
        url
      }
      lastSyncId
    }
  }
`;

export const UPDATE_ISSUE_MUTATION = gql`
  mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
    issueUpdate(id: $id, input: $input) {
      success
      issue {
        id
        identifier
        title
        url
        state {
          name
        }
      }
    }
  }
`;

export const UPDATE_ISSUES_MUTATION = gql`
  mutation UpdateIssues($ids: [String!]!, $input: IssueUpdateInput!) {
    issueUpdate(ids: $ids, input: $input) {
      success
      issues {
        id
        identifier
        title
        url
        state {
          name
        }
      }
    }
  }
`;

export const DELETE_ISSUE_MUTATION = gql`
  mutation DeleteIssue($id: String!) {
    issueDelete(id: $id) {
      success
    }
  }
`

export const DELETE_ISSUES_MUTATION = gql`
  mutation DeleteIssues($ids: [String!]!) {
    issueDelete(ids: $ids) {
      success
    }
  }
`;

export const CREATE_ISSUE_LABELS = gql`
  mutation CreateIssueLabels($labels: [IssueLabelCreateInput!]!) {
    issueLabelCreate(input: $labels) {
      success
      issueLabels {
        id
        name
        color
      }
    }
  }
`;

export const CREATE_INITIATIVE_MUTATION = gql`
  mutation CreateInitiative($input: InitiativeCreateInput!) {
    initiativeCreate(input: $input) {
      success
      initiative {
        id
        name
        description
        content
        url
        slugId
        color
        icon
        targetDate
        startedAt
        createdAt
        owner {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_INITIATIVE_MUTATION = gql`
  mutation UpdateInitiative($id: String!, $input: InitiativeUpdateInput!) {
    initiativeUpdate(id: $id, input: $input) {
      success
      initiative {
        id
        name
        description
        content
        url
        slugId
        color
        icon
        targetDate
        startedAt
        completedAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_INITIATIVE_MUTATION = gql`
  mutation DeleteInitiative($id: String!) {
    initiativeDelete(id: $id) {
      success
    }
  }
`;

export const UPDATE_PROJECT_INITIATIVE = gql`
  mutation UpdateProjectInitiative($id: String!, $input: ProjectUpdateInput!) {
    projectUpdate(id: $id, input: $input) {
      success
      project {
        id
        initiative {
          id
          name
        }
      }
    }
  }
`;
