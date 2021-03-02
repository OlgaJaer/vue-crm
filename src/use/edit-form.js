import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useEditForm(fn) {
  const formValue = {
    limit: 100
  };
  const { resetForm, handleSubmit, isSubmitting } = useForm({
    initialValues: formValue
  });

  const MIN_LENGTH = 3;
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title",
    yup
      .string()
      .trim()
      .required("Введите название категории")
      .min(MIN_LENGTH, `Category cant be less than ${MIN_LENGTH} characters`)
  );

  const { value: limit, errorMessage: lError, handleBlur: lBlur } = useField(
    "limit",
    yup
      .number()
      .required("Введите лимит")
      .min(100, "Минимальная величина ${min}")
  );

  const onSubmit = handleSubmit(fn);

  return {
    title,
    tError,
    tBlur,
    limit,
    lError,
    lBlur,
    onSubmit,
    isSubmitting,
    resetForm
  };
}
