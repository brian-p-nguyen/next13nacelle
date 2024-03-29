import { CONTENT_QUERY_FRAGMENT } from './content';

export const SITE_QUERY = `
  {
    space: spaceProperties {
      properties {
        namespace
        items {
          key
          value
        }
      }
    }
    header: allContent(filter: { type: "componentHeader", handles: ["component-header"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
    newsletter: allContent(filter: { type: "componentNewsletter", handles: ["component-newsletter"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
    footer: allContent(filter: { type: "componentFooter", handles: ["component-footer"] }) {
      ${CONTENT_QUERY_FRAGMENT} 
    }
  }
`;

export const HEADER_QUERY = `
  {
    header: allContent(filter: { type: "componentHeader", handles: ["component-header"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;

export const NEWSLETTER_QUERY = `
  {
    newsletter: allContent(filter: { type: "componentNewsletter", handles: ["component-newsletter"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;

export const FOOTER_QUERY = `
  {
    footer: allContent(filter: { type: "componentFooter", handles: ["component-footer"] }) {
      ${CONTENT_QUERY_FRAGMENT} 
    }
  }
`;