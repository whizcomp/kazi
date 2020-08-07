import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }
    validate() {
        const {error} = Joi.validate(this.state.data, this.schema,{abortEarly:false});
        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors
    }
    
  handleSubmit = e => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors:errors||{} })
       
      
      if (errors) return;
      this.doSubmit()
      
  };
    validateProperty = ({name,value}) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const result = Joi.validate(obj, schema);
        return result.error ? result.error.details[0].message : null;
  }
  handleChange = ({currentTarget:input}) => {
      const { errors } = this.state;
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
    renderInput(name, label, type) {
        const { data,errors } = this.state;
        return (
            <Input name={name} label={label} value={data[name]} onChange={this.handleChange} type={type} error={errors[name]}/>
        )
    }
    renderButton(label){
        return (
            <button disabled={this.validate()}className="btn btn-primary">{label}</button>
        )
    }
    renderSelect(name, label, options) {
        const { data, errors } = this.state;
    
        return (
          <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
          />
        );
      }
   
}
 
export default Form;