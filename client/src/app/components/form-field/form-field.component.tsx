import {FieldError, UseFormRegister} from 'react-hook-form';

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";

const FormField = ({
  type, 
  placeholder, 
  name, 
  register, 
  error, 
  valueAsNumber }: FormFieldProps) => {
  return (
    <>
      <input type={type} placeholder={placeholder} {...register(name, { valueAsNumber })}/>
      {error && <span>{error.message}</span>}
    </>
  );
}

export default FormField;
