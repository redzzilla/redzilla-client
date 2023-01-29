import React from 'react'
import metadata from './metadata.json'

const DataDrivenDisplay = (props) => {
    const { data } = props
    const arr = [];
    for (const key in data) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = data[key];
            
        }
    }
    return (
        <>
        {}
        {/* {data.map(item => (
          <div className='detailItem'> 
            <div className='itemOne'>
                <div className='itemTitle'>{item.section}</div>
                <div className='mb1'>
                    { data.Condo?.Assessments && (<div><span className='w50'>Assessments</span>: <span className='font500'>${data.Condo.Assessments}</span></div>) }
                </div>
            </div>
            <hr />
          </div> 
          ))} */}
        </>
    );
}
export default DataDrivenDisplay;