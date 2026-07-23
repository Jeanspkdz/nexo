import Link from "next/link";
import type { ReactNode } from "react";

export function SiteHeader({
  navigation,
  actions,
  mobileNavigation,
  className = "",
}: {
  navigation: ReactNode;
  actions: ReactNode;
  mobileNavigation?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`site-header ${className}`}>
      <Link className="site-header-logo" href="/" aria-label="Nexo, ir al inicio">
        Nexo
      </Link>
      <nav className="site-header-navigation" aria-label="Navegación principal">
        {navigation}
      </nav>
      <div className="site-header-actions">{actions}</div>
      {mobileNavigation}
    </header>
  );
}
