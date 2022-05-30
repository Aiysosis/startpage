<template>
  <div
    class="custom-input"
    :style="styleVars"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <div
      :class="{ placeholder: true, 'placeholder-focus': isFocus }"
      @click="forceFocus"
    >
      {{ placeholder }}
    </div>
    <input
      ref="inputDom"
      type="text"
      class="input"
      placeholder=""
      v-model="data"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
    />
    <div
      class="clean-input"
      v-show="data !== '' && isMouseOver"
      @click="cleanInput"
      @mousedown="preventBlur"
    ></div>

    <transition name="downshow">
      <!-- 有error优先展示error -->
      <div class="error" v-if="hasError">{{ error }}</div>
      <div class="warning" v-else-if="hasWarning">{{ warning }}</div>
      <div v-else></div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  StyleValue,
  toRefs,
  watch,
} from "vue";
import _init_validate from "./scripts/validate";

interface ValidateRes {
  type: string; //["error","warning","pass"]
  message: string;
}

interface ValidateFunc {
  //trigger in ["blur","input","focus"]
  (value: string): ValidateRes;
}

interface ValidateRule {
  trigger: string;
  func: ValidateFunc;
}

export default defineComponent({
  props: {
    modelValue: String,
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    preInput: {
      type: String,
      required: false,
    },
    rules: {
      type: Array as PropType<ValidateRule[]>,
      required: false,
    },
    //显式指定error和warning
    errorContent: {
      type: String,
      required: false,
    },
    warningContent: {
      type: String,
      required: false,
    },
  },
  components: {},
  emits: ["update:modelValue", "blur", "input", "focus"],
  setup(props, ctx) {
    const data = ref<string>("");
    const isFocus = ref<boolean>(false);
    const isMouseOver = ref<boolean>(false);
    const inputDom = ref<HTMLElement | null>(null);
    const { warning, hasWarning, error, hasError } = _init_validate();
    const externalError = toRefs(props).errorContent;
    const externalWarning = toRefs(props).warningContent;

    watch(externalError, () => {
      if (externalError.value) error.value = externalError.value;
    });
    watch(externalWarning, () => {
      if (externalWarning.value) warning.value = externalWarning.value;
    });

    const styleVars = computed(() => {
      let width = props.width.toString() + "px";
      let height = props.height.toString() + "px";
      return {
        "--width": width,
        "--height": height,
      };
    }) as StyleValue;

    const validate = (trigger: string) => {
      if (props.rules) {
        props.rules.forEach((rule) => {
          if (rule.trigger === trigger) {
            let res = rule.func(data.value);
            if (res.type === "error") error.value = res.message;
            if (res.type === "warning") warning.value = res.message;
            if (res.type === "pass") {
              error.value = "";
              warning.value = "";
            }
          }
        });
      }
    };

    //输入时更新
    const updateValue = () => {
      ctx.emit("update:modelValue", data.value);
      validate("input");
      ctx.emit("input");
    };

    const cleanInput = () => {
      data.value = "";
      error.value = "";
      warning.value = "";
      forceFocus();
      updateValue();
    };

    const preventBlur = (e: Event) => {
      e.preventDefault();
    };

    const forceFocus = () => {
      inputDom.value?.focus();
    };

    const focus = () => {
      error.value = "";
      warning.value = "";
      if (props.preInput && data.value === "") {
        // eslint-disable-next-line vue/no-setup-props-destructure
        data.value = props.preInput;
      }
      updateValue();
      isFocus.value = true;
      validate("focus");
      ctx.emit("focus");
    };

    const blur = () => {
      if (data.value === "") {
        isFocus.value = false;
        warning.value = "";
        error.value = "";
      }
      validate("blur");
      ctx.emit("blur");
    };

    const mouseover = () => {
      isMouseOver.value = true;
    };

    const mouseleave = () => {
      isMouseOver.value = false;
    };

    return {
      data,
      updateValue,
      forceFocus,
      isFocus,
      focus,
      blur,
      styleVars,
      warning,
      hasWarning,
      error,
      hasError,
      cleanInput,
      isMouseOver,
      mouseover,
      mouseleave,
      inputDom,
      preventBlur,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-input {
  position: relative;
  width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  .placeholder {
    font-size: 1rem;
    color: gray;
    position: absolute;
    left: 0;
    bottom: 5px;
    transition: all 0.2s ease;
    z-index: 2;
  }
  .placeholder-focus {
    transform: translateY(calc(0px - var(--height)));
    font-size: 0.8rem;
    user-select: none;
  }
  .clean-input {
    position: absolute;
    right: 0;
    width: 15px;
    height: 15px;
    background-image: url("@/assets/close.png");
    background-size: cover;
    background-position: center;
    z-index: 2;
  }
  .input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: rgba($color: #000000, $alpha: 0);
    border-bottom: gray 2px solid;
    letter-spacing: 1.2px;
    padding-right: 20px;
    z-index: 1;
    &:focus {
      border: none;
      border-bottom: gray 2px solid;
    }
  }
  .warning {
    position: absolute;
    width: 100%;
    height: 30px;
    padding-top: 5px;
    bottom: -30px;
    z-index: 0;
    color: gray;
    transition: all 0.28s ease;
    font-size: 0.6rem;
  }
  .error {
    position: absolute;
    width: 100%;
    height: 30px;
    padding-top: 5px;
    bottom: -30px;
    z-index: 0;
    color: red;
    transition: all 0.28s ease;
    font-size: 0.6rem;
  }
}
</style>
