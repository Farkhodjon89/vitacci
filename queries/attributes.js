import gql from 'graphql-tag';

export const ATTRIBUTES = gql`
  query Attributes {
    paColors(first: 80) {
      nodes {
        name
        slug
        databaseId
      }
    }
    paSizes(first: 80) {
      nodes {
        name
        slug
        databaseId
      }
    }
    paHeelHeights(first: 80) {
      nodes {
        name
        slug
        databaseId
      }
    }
    paDecors(first: 80) {
      nodes {
        name
        slug
      }
    }
    paLinings(first: 80) {
      nodes {
        name
        slug
      }
    }
    paMaterials(first: 80) {
      nodes {
        name
        slug
      }
    }
    paTypeOfFasteners(first: 80) {
      nodes {
        name
        slug
      }
    }
    paCollections(first: 80) {
      nodes {
        name
        slug
      }
    }
    paViewOfTheSockets(first: 80) {
      nodes {
        name
        slug
      }
    }
    paHealthViews(first: 80) {
      nodes {
        name
        slug
      }
    }
    paViewOfHeels(first: 80) {
      nodes {
        name
        slug
      }
    }
    paTopColorOptionals(first: 80) {
      nodes {
        name
        slug
      }
    }
  }
`;
