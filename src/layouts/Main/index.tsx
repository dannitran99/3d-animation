import './index.scss';

import { Link, Outlet } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Model Inspect', href: '/' }
  // { label: 'Model Movement', href: '/model-movement' },
  // { label: 'Manipulator Simulation', href: '/manipulator-simulation' }
];

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <span className="main-layout__logo">3D Animation</span>

        <nav className="main-layout__nav">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} to={href} className="main-layout__nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* <button type="button" className="main-layout__cta">
          Bắt đầu
        </button> */}
      </header>

      <main className="main-layout__content">{children ?? <Outlet />}</main>

      <footer className="main-layout__footer">
        <span>© {new Date().getFullYear()} 3D Animation. All rights reserved.</span>
        <div className="main-layout__footer-links">
          <button type="button">Facebook</button>
          <button type="button">Instagram</button>
          <button type="button">GitHub</button>
        </div>
      </footer>
    </div>
  );
};
