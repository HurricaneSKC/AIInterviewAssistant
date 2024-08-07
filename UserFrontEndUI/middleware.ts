export const config = {
  matcher: ["/api/transcribe", "/api/generate"],
};

export { auth as middleware } from "@/auth"