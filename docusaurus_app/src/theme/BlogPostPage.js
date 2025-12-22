import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogSidebar from '@theme/BlogSidebar';
import Translate from '@docusaurus/Translate';
import styles from './blog-post.module.css';

function BlogPostPage(props) {
  const {content: BlogPostContents, sidebar, frontMatter} = props;
  const {
    nextItem,
    prevItem,
    metadata: {title, description},
  } = BlogPostContents;

  return (
    <Layout
      wrapperClassName="blog-wrapper"
      pageClassName="blog-post-page"
      title={title}
      description={description}
      keywords={frontMatter.keywords}
      image={frontMatter.image}>
      <BlogPostPageMetadata {...props} />
      <div className={styles.blogPostHeader}>
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.meta}>
                  <time className={styles.date}>
                    {new Date(BlogPostContents.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {BlogPostContents.metadata.authors && BlogPostContents.metadata.authors.length > 0 && (
                    <span className={styles.author}>
                      By {BlogPostContents.metadata.authors[0].name}
                    </span>
                  )}
                </div>
                {BlogPostContents.metadata.tags && BlogPostContents.metadata.tags.length > 0 && (
                  <div className={styles.tags}>
                    {BlogPostContents.metadata.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-vert--lg">
        <div className="row">
          <div className={clsx('col', {
            'col--8': sidebar,
            'col--9': !sidebar,
            'col--offset-2': !sidebar,
          })}>
            <article className={styles.article}>
              <BlogPostItem
                frontMatter={frontMatter}
                metadata={BlogPostContents.metadata}
                isBlogPostPage>
                <BlogPostContents />
              </BlogPostItem>
            </article>

            {(nextItem || prevItem) && (
              <div className={styles.paginator}>
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
              </div>
            )}
          </div>

          {sidebar && (
            <div className="col col--3">
              <BlogSidebar sidebar={sidebar} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default BlogPostPage;