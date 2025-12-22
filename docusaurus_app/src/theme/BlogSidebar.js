import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './blog-sidebar.module.css';

function BlogSidebar({sidebar}) {
  if (!sidebar.items.length) {
    return null;
  }

  return (
    <aside className={clsx(styles.sidebar, 'thin-scrollbar')}>
      <nav
        aria-label="Blog recent posts"
        className={styles.sidebarMenu}>
        <div className={styles.sidebarTitle}>Recent Posts</div>
        <ul className={styles.sidebarList}>
          {sidebar.items.map((item) => (
            <li key={item.permalink} className={styles.sidebarItem}>
              <Link
                to={item.permalink}
                className={clsx(
                  styles.sidebarItemLink,
                  item.permalink === window.location.pathname &&
                    styles.sidebarItemLinkActive,
                )}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default BlogSidebar;