// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';
import { Facebook, Twitter, Mail, Pinterest, Reddit } from 'react-social-sharing'

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const url = "https://pianobin.com" + slug

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Facebook solid medium link={url}/>
        <Twitter solid medium link={url}/>
        <Mail solid medium link={url}/>
        <Pinterest solid medium link={url}/>
        <Reddit solid medium link={url}/>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>
    </div>
  );
};

export default Post;
