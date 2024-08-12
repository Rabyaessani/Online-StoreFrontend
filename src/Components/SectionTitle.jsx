import React from 'react'

const SectionTitle = ({title}) => {
  return (
    <div className='border-b-2 border-base-300 pb-5'>
        <h3 className='text-3xl capitalize font-medium tracking-wider'>{title}</h3>
    </div>
  )
}

export default SectionTitle