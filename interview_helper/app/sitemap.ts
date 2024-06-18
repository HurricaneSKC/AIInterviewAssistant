import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "",
      lastModified: new Date(),
    },
    {
      url: "/demo",
      lastModified: new Date(),
    },
  ];
}
