import { translationKeysList } from "../translation";

export const UPLOAD_FILE_FIELDS = `
        id
        alt
        url
`;

export const PROJECT_PAGE_FIELDS = `
  id
  name
  startDate
  endDate
  description
  thumbnailImage {
    ${UPLOAD_FILE_FIELDS}
  }
  stack { 
    tech
  }
`;

export const BLOG_PAGE_FIELDS = `
     title
      slug
      category
      content
      publishedDate
      project {
    ${PROJECT_PAGE_FIELDS}
      }
`;

export const HOME_PAGE_FIELDS = `
HomePage {
    Header {
      avatar { 
        ${UPLOAD_FILE_FIELDS}

      }
      title
      subTitle
      description
      socials {
        icon
        url
        id
      }
    }
    blogs {
    id
      title
      slug
      category
      publishedDate
    }
    projects {
      ${PROJECT_PAGE_FIELDS}
     
    }
    resume {
      ${UPLOAD_FILE_FIELDS}
    }
  }
   `;

export const Label_ASSETS_QUERY = `
   query LatestTextAsset {
  Text_assets (limit : 1) {
    docs {
      ${translationKeysList.join("\n")}
    }
  }
}
   `;
