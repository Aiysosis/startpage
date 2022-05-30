import { ref, computed } from "vue";
export default function _init_validate() {
  const warning = ref<string>("");
  const error = ref<string>("");

  const hasWarning = computed(() => {
    return warning.value !== "";
  });

  const hasError = computed(() => {
    return error.value !== "";
  });

  return {
    warning,
    hasWarning,
    error,
    hasError,
  };
}
