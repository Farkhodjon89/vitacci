import React, { Fragment } from 'react'
import LayoutOne from '../components/Layout'
import { StaticDataSingleton } from '../utils/getStaticData'

const  ZoodpaySuccess= ({ categories }) => {
  return (
    <LayoutOne categories={categories} headerTop='visible'>
      <div className='zoodpayText'>
      Благодарим за покупку! <br /> Наш консультант выйдет на связь с вами в ближайшее время.
      </div>
    </LayoutOne>
  )
}

export const getStaticProps = async () => {
  const staticData = new StaticDataSingleton().getInstance()
  await new StaticDataSingleton().checkAndFetch()

  return {
    props: {
      categories: staticData.categories.main,
    },
    revalidate: 600,
  }
}

export default  ZoodpaySuccess
