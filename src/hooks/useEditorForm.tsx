import { ValidationMode, useForm } from "react-hook-form";

const useEditorForm = (mode: keyof ValidationMode) => {
  const result = useForm({
    mode,
  });
  return result;
};

export default useEditorForm;
