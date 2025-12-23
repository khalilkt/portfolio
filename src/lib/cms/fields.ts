import { translationKeysList } from "../translation";

export const UPLOAD_FILE_FIELDS = `
        id
        alt
        url
`;

export const BLOG_PAGE_FIELDS = `
     title
      slug
      category
      content
      publishedDate
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
      title
      slug
      category
      publishedDate
    }
    projects {
      name
      startDate
      endDate
      description
      thumbnailImage {
       ${UPLOAD_FILE_FIELDS}
      }
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
