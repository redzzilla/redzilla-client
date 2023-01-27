import { useEffect, useState } from 'react';
// import { BsSearch } from 'react-icons/bs';
import Select from 'react-select'
import { FaMapMarkerAlt } from "react-icons/fa";

import './SearchForm.scss';

const SearchForm = (props) => {
    const { 
        filterStatus, 
        setFilterStatus
    } = props
    
    const [options, setOptions] = useState([])
    const [value, setValue] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setFilterStatus({
    //         ...filterStatus,
    //         keywords : value
    //     })
    // }

    const handlePosition = () => {
        setFilterStatus({
            ...filterStatus,
            keywords : value
        })
    }

    const handleChange = (e) => {
        setFilterStatus({
            ...filterStatus,
            keywords : e.value
        })
        setValue(e.target.value);
    }

    useEffect(() => {
        async function searchPosition() {
            const result = await fetch('./ZIP_CODES.geojson');
            const geojson = await result.json();
            const temp = []

            // eslint-disable-next-line array-callback-return
            geojson.features.map(item => {
                const twin = temp.find(one => one.label === item.label);
                if(!twin) {
                    temp.push({
                        'value' : item.properties.ZIP,
                        'label' : item.properties.COMMUNITY + ' ' + item.properties.ZIP
                    })
                }
            })
            setOptions(temp)
        }
        searchPosition()
        // setValue(filterStatus.keywords)
    }, [filterStatus]);

    return (
        // <form action="#" onSubmit={handleSubmit} className='inlineInputContainer mr10'>
        //     <input type="text" value={value} className='inputBox prevInputBox font12' id="keywords" onChange={handleChange}/>
        //     <button type="submit" className='inlineNext'>
        //         <BsSearch />
        //     </button>
        // </form>
        <>
            <Select 
                options={options}
                onChange={handleChange}
                style ={{ width: "100%", minWidth: "200px"}}
                placeholder = 'City, Neighborhood, ZIP, Address'
            />
            <button className='floating-btn' onClick={handlePosition}>
                <FaMapMarkerAlt/>&nbsp;Current Location
            </button>
        </>
    )
}

export default SearchForm;