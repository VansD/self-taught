import React, { SetStateAction } from "react";
import { FormControl, FormGroup, FormLabel, Row, Col } from "react-bootstrap";
import { Field } from "react-final-form";
import Select from 'react-select'
import { SelectOpion } from "../../views/helpers/selectHelper";

type FormGroupProps = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
    inline?: boolean;
    full?: boolean;
    type?: "input" | "textarea" | "email" | "password" | "file" | "select";
    selectOptions?: SelectOpion[];
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
                        ? <Select options={selectOptions} placeholder={placeholder} /> 
                        : <FormControl type={type ? type : "input"} placeholder={placeholder} defaultValue={defaultValue}
                                onChange={props.input.onChange} as={type === "textarea" ? "textarea" : "input"}/> 
                    )}
                </Field>
            </Col>
        </Row>
    </FormGroup>
}