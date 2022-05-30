<template>
  <div class="list-item">
    <div class="upper">
      <div class="title">{{ item.title }}</div>
      <div class="right-part">
        <div class="time">{{ getInterval(now, item.time) }} Days</div>
        <div
          class="isTopItem"
          v-show="item.top"
          @click="cancleTop(index)"
        ></div>
      </div>
    </div>
    <div class="date">{{ item.time }}</div>
    <div class="content">{{ item.content }}</div>
    <div class="lower" v-show="index == currentIndex">
      <div class="icon" id="edit" @click="edit(index)"></div>
      <div class="icon" id="copy"></div>
      <div class="icon" id="set-top" @click="setTop(index)"></div>
      <div class="icon" id="delete" @click="deleteItem(index)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getInterval } from "@/utils/time";

export interface ListItemData {
  index: number;
  title: string;
  time: string;
  top: boolean;
  content: string;
}

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ListItemData>,
      required: true,
    },
  },
  components: {},
  setup() {
    return {
      getInterval,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  flex: 1;
  transition: all 0.3s ease;
  margin: 2rem;
  .upper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--toDoListTitleColor);
    }
    .right-part {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .time {
        font-size: 1.4rem;
        // color:lightcoral;
        color: var(--dayCountColor);
        margin-right: 0.5rem;
      }
      .isTopItem {
        width: 1.4rem;
        height: 1.4rem;
        background-image: url("../assets/top.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
  .date {
    margin-top: 0.5rem;
    font-size: 1rem;
    // color:rgb(197, 194, 194);
    color: var(--timeColor);
  }
  .content {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    // color:rgb(63, 63, 63);
    color: var(--contentColor);
  }
  .lower {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .icon {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.8rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.2);
      }
    }
    #edit {
      background-image: url("../assets/edit.png");
    }
    #delete {
      width: 2rem;
      height: 2rem;
      background-image: url("../assets/delete.png");
    }
    #copy {
      background-image: url("../assets/copy.png");
    }
    #set-top {
      width: 2rem;
      height: 2rem;
      background-image: url("../assets/setTop.png");
    }
  }
}
</style>
