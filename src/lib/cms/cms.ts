"use server";

import { Users } from "@/collections/Users";
import {
  BLOG_PAGE_FIELDS,
  HOME_PAGE_FIELDS,
  Label_ASSETS_QUERY,
} from "./fields";
import { BlogCms, HomepageCms } from "./types";
import { TObject } from "../translation";

async function fetchGraphQL(query: string, variables = {}, tt?: string) {
  const ROOT_URL = process.env.NEXT_URL;
  const CMS_TOKEN = process.env.CMS_TOKEN;

  const start = performance.now();
  const res = await fetch(`${ROOT_URL}/api/graphql`, {
    method: "POST",
    cache: "force-cache",
    next: { revalidate: 10 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Users.slug} API-Key ${CMS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  console.log(
    "TOOK ",
    (performance.now() - start).toFixed(2),
    "ms to fetch graphql for  ",
    tt,
  );

  const json = await res.json();
  if (!!json.errors) {
    console.error("Error while fetching the graphql : ", json.errors);
    throw Error(
      `Error while fetching the graphql ${JSON.stringify(json.errors)}`,
    );
  }
  return json.data;
}

export async function getHomePageData(): Promise<HomepageCms> {
  const q = `query {
      ${HOME_PAGE_FIELDS} 
  }`;

  try {
    const ret = await fetchGraphQL(q);
    return ret.HomePage as HomepageCms;
  } catch (e) {
    console.log("ERROR WHILE GETTING THE HOME PAGE DATA : ", e);
    throw e;
  }
}

export async function getBlogData(slug: string): Promise<BlogCms | undefined> {
  const q = `query BlogBySlug {
  Blogs(limit :1, where: { slug: { equals: "${slug}" } }) {
    docs {
    ${BLOG_PAGE_FIELDS}
    }
  }
}
`;

  try {
    const ret = await fetchGraphQL(q);
    return ret.Blogs.docs.at(0);
  } catch (e) {
    console.log("ERROR WHILE GETTING THE BLOG DATA : ", e);
    throw e;
  }
}

export async function getProjectRelatedBlogSlug(
  projectId: string,
): Promise<string | undefined> {
  console.log("GETTING BLOG SLUG FOR PROJECT ID : ", projectId);
  const q = `query BlogByProjectId {
  Blogs(limit: 1, where: { project: { equals: "${projectId}" } } ) {
    docs {
    slug
    }
  }
}
`;

  try {
    const ret = await fetchGraphQL(q);
    return ret.Blogs.docs.at(0)?.slug;
  } catch (e) {
    console.log("ERROR WHILE GETTING THE BLOG DATA BY PROJECT ID : ", e);
    throw e;
  }
}

export async function getLabelAssets(): Promise<TObject> {
  const q = Label_ASSETS_QUERY;

  try {
    console.log("GETTING LABELS");
    const ret = await fetchGraphQL(q, {}, "LABELS");
    return ret.Text_assets.docs.at(0);
  } catch (e) {
    console.log("ERROR WHILE GETTING THE TEXT lABEL DATA : ", e);
    throw e;
  }
}
