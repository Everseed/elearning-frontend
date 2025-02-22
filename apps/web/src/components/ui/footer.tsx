"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "../i18n/I18nProvider";

export default function Footer() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();

  if (pathname.match(/^\/learn\/.+\/lessons\/.+/)) {
    return null;
  }

  const copyRight = `${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }`;

  return (
    <footer className="">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 border-t py-7">
          <div className="flex order-2 lg:order-1 justify-center lg:justify-start">
            <div className="text-nowrap text-sm text-muted-foreground">
              &copy; {copyRight}
            </div>
          </div>

          <div className="flex order-1 lg:order-3 justify-center lg:justify-end text-sm text-muted-foreground space-x-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-foreground"
            >
              {t("footer.terms")}
            </Link>
            <Link href="/about-us" className="hover:text-foreground">
              {t("footer.about")}
            </Link>
            <Link href="talent" className="hover:text-foreground">
              {t("footer.talents")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
