import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import router from "../router/index";

export function useRegisterForm() {
  const store = useStore();
  const { handleSubmit, isSubmitting } = useForm();

  const MIN_LENGTH_PW = 6;
  const MIN_LENGTH_NAME = 3;
  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Please add email")
      .email("Require correct email")
  );

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Please add password")
      .min(
        MIN_LENGTH_PW,
        `Password cant be less than ${MIN_LENGTH_PW} characters`
      )
  );
  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    "name",
    yup
      .string()
      .trim()
      .required("Please add  name")
      .min(
        MIN_LENGTH_NAME,
        `Name cant be less than ${MIN_LENGTH_NAME} characters`
      )
  );

  const { value: agree, errorMessage: aError, handleBlur: aBlur } = useField(
    "agree",
    yup.boolean().required("Please check it")
  );

  const onSubmit = handleSubmit(async values => {
    try {
      console.log(values);
      await store.dispatch("register", values);
      router.push("/");
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    name,
    nError,
    nBlur,
    agree,
    aError,
    aBlur,
    onSubmit,
    isSubmitting
  };
}
