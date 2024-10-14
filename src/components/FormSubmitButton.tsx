"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();
  //useFormStatus is designed for React Server Components,

  return <LoadingButton {...props} type="submit" loading={pending} />;
}
