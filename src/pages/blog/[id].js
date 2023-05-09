import client from '../../components/ApolloClient'
import { POST_BY_ID, POSTS } from '../../../queries/posts'
import React, { Fragment } from 'react'
import { HeadData } from '../../components/Head'
import LayoutOne from '../../components/Layout'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { BreadcrumbsItem, BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import NotFoundComponent from '../../components/NotFound'
import { StaticDataSingleton } from '../../utils/getStaticData'
import striptags from 'striptags'
import { formatPost } from '../../utils/functions'

const Post = ({ post, categories, notFound }) => {
  if (notFound || post == null) {
    return (
      <BreadcrumbsProvider>
        <NotFoundComponent />
      </BreadcrumbsProvider>
    )
  }

  return (
    <BreadcrumbsProvider>
      <Fragment>
        <HeadData
          pageUrl='/blog/'
          pageData={{
            postTitle: post.title,
            image: post?.featuredImage?.node?.sourceUrl,
            date: post.rawDate,
          }}
          description={post.short}
        />

        <BreadcrumbsItem to={'/'}>Главная</BreadcrumbsItem>
        <BreadcrumbsItem to={`/blog/${post.id}`}>{post.title}</BreadcrumbsItem>

        <LayoutOne categories={categories} headerTop='visible'>
          {/* breadcrumb */}
          <Breadcrumb />
          <div className='blog-area pt-100 pb-100'>
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <div className='blog-details-top'>
                    <div className='blog-details-img'>
                      <img alt='' src={post?.featuredImage?.node?.sourceUrl} />
                    </div>
                  </div>

                  <div className='px-2 blog-details-content'>
                    <div className='blog-meta-2'>
                      <ul>
                        <li>{post.date}</li>
                      </ul>
                    </div>
                    <h3>{post.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
    </BreadcrumbsProvider>
  )
}

export const getStaticPaths = async () => {
  const paths = []

  const fetchPosts = async (after) => {
    const _tempPostsResult = await client.query({
      query: POSTS,
      variables: {
        first: 100,
        after,
      },
    })

    paths.push(
      ..._tempPostsResult.data.posts.nodes.map((post) => ({
        params: { id: String(post.databaseId) },
      }))
    )

    if (_tempPostsResult.data.posts.pageInfo.hasNextPage) {
      await fetchPosts(_tempPostsResult.data.posts.pageInfo.endCursor)
    }
  }

  await fetchPosts()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  let result

  try {
    result = await client.query({
      query: POST_BY_ID,
      variables: { id: params.id },
      fetchPolicy: 'no-cache',
    })
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
      revalidate: 600,
    }
  }

  return {
    props: {
      post: formatPost(result.data.post),
      categories: staticData.categories.main,
      notFound: false,
    },
    revalidate: 600,
  }
}

export default Post
