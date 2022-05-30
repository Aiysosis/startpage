<template>
  <div class="dialogue-wrapper">
    <div class="dialogue">
      <div class="head-bar">
        <div class="head-left">
          <slot name="title" />
        </div>
        <div class="head-right"></div>
      </div>

      <div class="main">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.dialogue-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 999;
  .dialogue {
    border-radius: 5px;
    background-color: white;
    .head-bar {
      height: 15px;
      width: 100%;
      .head-left {
        position: relative;
      }
      .head-right {
        position: relative;
      }
    }
    .main {
      padding: 20px 40px;
    }
  }
}
</style>
