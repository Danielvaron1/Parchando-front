import {Input} from "@nextui-org/react";
import React from "react";

/*
    Props:
    label
    isInvalid
    value
    setValue
    type
    error
 */
const InputForm = (props) => {
    return (
        <Input
            label={props.label}
            isInvalid={props.isInvalid}
            value={props.value}
            type={props.type}
            onChange={(e) => props.setValue(e.target.value)}
            variant="bordered"
            classNames={{
                label: "text-white/90 form-label"
            }}
            errorMessage={props.error}
            showMonthAndYearPickers={props.calendar}
        />
    )
}

export default InputForm;