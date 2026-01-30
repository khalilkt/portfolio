export const dynamic = "force-dynamic";

import HeroSection from "../components/HeroSection";
import { Divider } from "../components/components";
import { ProjectsSection } from "../components/ProjectsSection";
import BlogsSection from "../components/BlogsSection";
import { getHomePageData, getLabelAssets } from "@/lib/cms/cms";

export default async function Home() {
  const data = await getHomePageData();
  const t = await getLabelAssets();
  return (
    <div>
      <main>
        <HeroSection data={data.Header} t={t} />
        <Divider />
        <ProjectsSection projects={data.projects} />
        <Divider />
        <BlogsSection blogs={data.blogs} t={t} />
      </main>
    </div>
  );
}
