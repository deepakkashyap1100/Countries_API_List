import React from 'react'
const ShimmerEffect = () => {
  return (
    <div className='bg-white w-full'>
      <div className='container  m-auto pt-5'>
        <div className='grid-cols-4 grid  gap-9 '>

          {Array.from({ length: 8 }).map((ele, index) => {
            return (<div key={index}>
              <div className='bg-slate-300 min-h-80 shimmer-card'></div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ShimmerEffect