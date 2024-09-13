import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date(),
    },
    {
      url: "/user/signin",
      lastModified: new Date(),
    },
    {
      url: "/user/signup",
      lastModified: new Date(),
    },
    {
      url: "/user/dashboard",
      lastModified: new Date(),
    },
    {
      url: "/user/dashboard/my-interviews",
      lastModified: new Date(),
    },
    {
      url: "/interview",
      lastModified: new Date(),
    },
  ];
}
