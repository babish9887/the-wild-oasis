import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {signup, isLoading} =useSignUp();
  const {register, formState, getValues, handleSubmit, reset}=useForm()
  const {errors} =formState;
  function onSubmit({fullName, email, password}){
    signup({fullName, email, password}, {
      onSettled: ()=>reset()
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName',{
          required: 'This field is requied'
        })}
        disabled={isLoading}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email"  {...register('email',{
          required: 'This field is requied',
          pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Please provide a valid email address",
        
          }
        })}  disabled={isLoading}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)"  error={errors?.password?.message}>
        <Input type="password" id="password"  {...register('password',{
          required: 'This field is requied',
          minLength: {value: 8,
          message: "Password need a mininum of 8 characters"}
        })}  disabled={isLoading}/>
      </FormRow>

      <FormRow label="Repeat password"  error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm"  {...register('passwordConfirm',{
          required: 'This field is requied',
          validate: (value)=>value === getValues().password || 'Password does not match'
        })}  disabled={isLoading}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset"  disabled={isLoading}>
          Cancel
        </Button >
        <Button  disabled={isLoading}>{isLoading? <SpinnerMini/> :"Create new user"}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
