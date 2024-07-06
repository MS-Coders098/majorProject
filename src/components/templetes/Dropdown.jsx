import React from 'react'

const Dropdown = ({title, options, func}) => {
    return (
        <div className='container '>
            <select onChange={func} className='p-3 dropdown caret menu' defaultValue="0" name="format" id="format">
                <option  className='select' value="0" disabled>
                    {title}
                </option>
                {options.map((option, index) => (
                    <option key={index} className='select' value={option}>
                        {option.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown