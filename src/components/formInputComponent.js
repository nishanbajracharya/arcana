import React from 'react';
import PropTypes from 'prop-types';

import {Input} from '@nextui-org/input';
import {Select, SelectItem} from '@nextui-org/select';
import {Checkbox} from "@nextui-org/react";

const FormInputView = ({ label, placeholder, inputType, required, onChange, options, value }) => {
    console.log("options are", options)
  return (
    <div className="p-5">
        {inputType=="text"?
            <div>
                <label className="px-2 block text-base font-bold">
                    {label} {(required&&"*")}
                </label>
                <Input
                    type="text"
                    // className="border border-gray-300 rounded-md w-full bg-slate-500 h-12 mt-3 p-2"
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        :(inputType=="number")?
            <div>
                <label className="px-2 block text-base font-bold">
                    {label}
                </label>
                <Input
                    type="number"
                    // className="border border-gray-300 rounded-md w-full bg-slate-500 h-12 mt-3 p-2"
                    value={value}
                    // className="border border-gray-300 rounded-md w-full bg-slate-500 h-12 mt-3 p-2"
                    required={required}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>    
        :(inputType=="checkbox")?
            <div className="flex content-start items-center">
                {/* <label className="px-2 block text-base font-bold w-fit">
                    {label}
                </label> */}
                <Checkbox
                    defaultSelected={value}
                    type="checkbox"
                    // className="border border-gray-300 rounded-md bg-slate-500 h-5 w-5 p-2"
                    required={required}
                    placeholder={placeholder}
                    onChange={onChange}
                >{label}</Checkbox>
            </div>
        :(inputType=="dropdown")?
            <div className="flex flex-col content-start w-full">
                <label className="px-2 block text-base font-bold w-fit">{label}</label>

                <Select
                    value={value}
                    onChange={onChange}
                    // className="border border-gray-300 rounded-md w-full bg-slate-500 h-12 mt-3 p-2"
                >
                    {options.map(option => {
                        return(
                            <SelectItem value={option.value}>{option.label}</SelectItem>
                        )
                    }
                    )}
                </Select>
            </div>
        :
                    null
        }
        
    </div>
  );
};

FormInputView.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    inputType: PropTypes.oneOf(['text', 'number', 'checkbox', 'dropdown']).isRequired,
    options: PropTypes.any
};

export default FormInputView;