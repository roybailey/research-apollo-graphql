import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


// const TodoForm = (props:any) => {
//   const { handleSubmit }:any = props
//   return (
//   <form onSubmit={handleSubmit}>
//     <div>
//         <label htmlFor="title">Title</label>
//         <Field name="title" component="input" type="text" />
//     </div>
//     <div>
//         <label htmlFor="status">Status</label>
//         <Field name="status" component="input" type="text" />
//     </div>
//     <button type="submit">Submit</button>
//     </form>
//   )
// }



// function hasErrors(fieldsError:any[]) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

// class HorizontalTodoForm extends React.Component {

//   props:any

//   componentDidMount() {
//     // To disabled submit button at the beginning.
//     this.props.form.validateFields();
//   }
//   handleSubmit = (evt:any) => {
//     evt.preventDefault();
//     this.props.form.validateFields((err:any, values:any) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   }
//   render() {
//     const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

//     // Only show error after a field is touched.
//     const userNameError = isFieldTouched('userName') && getFieldError('userName');
//     const passwordError = isFieldTouched('password') && getFieldError('password');
//     return (
//       <Form layout="inline" onSubmit={this.handleSubmit}>
//         <FormItem
//           validateStatus={userNameError ? 'error' : undefined}
//           help={userNameError || ''}
//         >
//           {getFieldDecorator('userName', {
//             rules: [{ required: true, message: 'Please input your username!' }],
//           })(
//             <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
//           )}
//         </FormItem>
//         <FormItem
//           validateStatus={passwordError ? 'error' : undefined}
//           help={passwordError || ''}
//         >
//           {getFieldDecorator('password', {
//             rules: [{ required: true, message: 'Please input your Password!' }],
//           })(
//             <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
//           )}
//         </FormItem>
//         <FormItem>
//           <Button
//             type="primary"
//             htmlType="submit"
//             disabled={hasErrors(getFieldsError())}
//           >
//             Log in
//           </Button>
//         </FormItem>
//       </Form>
//     );
//   }
// }

// const reduxHorizontalTodoForm = reduxForm({
//     // a unique name for the form
//     form: 'todo'
//   })(HorizontalTodoForm)
  
// const WrappedHorizontalLoginForm = Form.create()(HorizontalTodoForm);
// const reduxHorizontalTodoForm = reduxForm({
  // a unique name for the form
//   form: 'todo'
// })(WrappedHorizontalLoginForm)



const AntTodoForm = (props:any) => {
  const { handleSubmit }:any = props
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  console.log(handleSubmit);
  
  return (
    <Form style={{padding: '1em 5em 2em'}} layout="inline" onSubmit={handleSubmit}>
      <FormItem label="Title">
          {/* {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your todo title!' }],
            })( */}
              <Field name="title" component="input" type="text" />
            {/* )} */}
      </FormItem>
      <FormItem label="Status">
          <Field name="completed" component="input" type="checkbox" />
      </FormItem>
      <FormItem label="Title">
        <Button type="primary" htmlType="submit">Submit</Button>
      </FormItem>
    </Form>
  )
}

// const WrappedAntTodoForm = Form.create()(AntTodoForm)

const reduxTodoForm = reduxForm({
  // a unique name for the form
  form: 'todo'
})(AntTodoForm)

export default reduxTodoForm


