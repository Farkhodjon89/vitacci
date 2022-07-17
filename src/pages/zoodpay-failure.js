import React, { Fragment } from 'react'
import LayoutOne from '../components/Layout'
import { StaticDataSingleton } from '../utils/getStaticData'

const ZoodpayFailure = ({ categories }) => {
  return (
    <LayoutOne categories={categories} headerTop='visible'>
      <div className='zoodpayText'>
        Не получилось завершить транзакцию. <br /> Убедитесь, что вы ввели правильные данные и попробуйте снова.
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

export default ZoodpayFailure
