import dynamic from 'next/dynamic'
import { GetStaticProps, NextPage } from 'next'

import SeoTags from '../../components/SeoTags'
import Layout from '../../components/layout'
import { getChangeHistoryServerSide } from '../../js/graphql/contribAPI'
import { RecentChangeHistoryProps } from '../../components/edit/RecentChangeHistory'

interface PageProps {
  history: any[]
}
const Page: NextPage<PageProps> = ({ history }: PageProps) => {
  return (
    <>
      <SeoTags
        title='Contribute to OpenBeta'
        description='Share your climbing adventure photos and contribute to the climbing route catalog.'
      />
      <Layout
        contentContainerClass='content-default'
        showFilterBar={false}
        showFooter
      >
        <section className='max-w-lg mx-auto w-full'>
          <h2 className='px-4 sm:px-0'>Recent history</h2>
          <RecentChangeHistory history={history} />
        </section>
      </Layout>
    </>
  )
}
export default Page

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }): Promise<any> => {
  const history = await getChangeHistoryServerSide()
  return ({
    props: {
      history
    },
    revalidate: 30 // regenerate page when a request comes in but no faster than every 5s
  })
}

const RecentChangeHistory = dynamic<RecentChangeHistoryProps>(
  async () =>
    await import('../../components/edit/RecentChangeHistory').then(
      module => module.default), { ssr: false }
)
