import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import router from "../router/index";

export function useLoginForm() {
  const store = useStore();
  const { handleSubmit, isSubmitting } = useForm();

  const MIN_LENGTH = 6;
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
      .min(MIN_LENGTH, `Password cant be less than ${MIN_LENGTH} characters`)
  );

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch("login", values);
      console.log(values);
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
    onSubmit,
    isSubmitting
  };
}
