<template>
  <div class="sand-box">
    <div class="scroll-wrapper">
      <div class="scroll-main">
        <transition-group name="list" tag="div">
          <div v-for="i in data" :key="i" class="item" @click="drop(i)">
            {{ i }}
            <div class="test" v-show="index === i"></div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = ref<boolean>(false);
    const data = ref<Array<number>>([]);
    for (let i = 0; i < 50; i++) {
      data.value.push(i);
    }
    let bs = reactive<any>({});
    const index = ref<number>(-1);
    const showIndex = (n: number) => {
      index.value = n;
      bs && bs.refresh();
    };

    const drop = (n: number) => {
      data.value.splice(n, 1);
      bs && bs.refresh();
    };

    const checkShow = (n: number) => {
      return index.value === n;
    };

    onMounted(() => {
      bs = new BScroll(document.querySelector(".scroll-wrapper") as any, {
        // ...... 详见配置项
        probeType: 3,
        mouseWheel: true,
      });
    });

    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      });
    });

    return {
      state,
      showIndex,
      checkShow,
      index,
      data,
      drop,
    };
  },
});
</script>

<style lang="scss" scoped>
.sand-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  .scroll-wrapper {
    width: 800px;
    height: 600px;
    background-color: lightgray;
    overflow: hidden;
    .scroll-main {
      width: 100%;
      height: fit-content;

      .item {
        min-height: 60px;
        width: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px gray solid;
        transition: all 0.3s ease;
        .test {
          width: 100px;
          height: 0px;
          background-color: lightblue;
        }
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
