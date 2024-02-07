import React, { SetStateAction } from "react";
import { FormControl, FormGroup, FormLabel, Row, Col } from "react-bootstrap";
import { Field } from "react-final-form";
import Select from 'react-select'
import { SelectOption } from "../../views/helpers/selectHelper";

type FormGroupProps = {
    name: string;
    label: string;
    defaultValue?: any; //todo generic or type?
    placeholder?: string;
    inline?: boolean;
    full?: boolean;
    type?: "input" | "textarea" | "email" | "password" | "file" | "select";
    selectOptions?: SelectOption[];
}

export const FormGroupUI = ({ name, label, defaultValue, placeholder, inline, full, type, selectOptions }: FormGroupProps) => {
    return <FormGroup className="mb-3">
        <Row className="d-flex align-items-baseline">
            <Col md={inline ? 3 : 12} sm={12}>
                <FormLabel>{label}</FormLabel>
            </Col>
            <Col md={inline ? full ? 9 : 6 : 12} sm={12}>
                <Field name={name}>
                    {props => (
                        type === "select" 
                        ? <Select options={selectOptions} placeholder={placeholder} defaultValue={selectOptions?.find(opt => opt.value === defaultValue)} 
                        onChange={(item) => props.input.onChange(item?.value)}/> 
                        : <FormControl type={type ? type : "input"} placeholder={placeholder} defaultValue={defaultValue}
                                onChange={props.input.onChange} as={type === "textarea" ? "textarea" : "input"}/> 
                    )}
                </Field>
            </Col>
        </Row>
    </FormGroup>
}