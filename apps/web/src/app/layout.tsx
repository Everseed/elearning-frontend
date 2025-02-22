import "./globals.css";
import { I18nProvider } from "@/components/i18n";
import Footer from "@/components/ui/footer";
import { API_URL_LOCAL } from "@/lib/constants";
import { User } from "@ng-youth/lib/models";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import Navbar from "@/components/ui/nav-bar";
import Providers from "@/components/ui/providers";

export const metadata: Metadata = {
  title: "Ng Youth E-Learning",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getUser = async () => {
  const url = `${API_URL_LOCAL}/profile`;

  try {
    const resp = await fetch(url, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    return resp.ok ? ((await resp.json()) as User) : null;
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return null;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (headers().get("revalidate") === "true") {
    revalidatePath("/", "layout");
  }

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`h-full antialiased min-h-screen bg-background`}>
        <Providers>
          <Navbar user={user} />
          <div className="pt-16">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
