<template>
  <div id="app">
    <div class="container">
      <div class="select">
        <div class="select__content">
          <span>ポジションコ</span>
        </div>
        <div class="select__icon_down" @click="toggleTreeView()"></div>
      </div>
      <div class="tree" v-show="showTreeView">
        <TreeItem
          v-for="item in treeData"
          :key="item.id"
          :data="item"
          :level="1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./components/TreeItem.vue";
export default {
  components: {
    TreeItem,
  },
  data() {
    return {
      showTreeView: false,
      treeData: [
        {
          name: "My Tree",
          id: "lv1001",
          children: [
            { name: "hello", id: "lv2001" },
            { name: "wat", id: "lv2002" },
            {
              name: "child folder",
              id: "lv2003",
              children: [
                {
                  name: "child folder",
                  id: "lv3001",
                  children: [
                    { name: "hello", id: "lv4001" },
                    { name: "wat", id: "lv4002" },
                  ],
                },
                { name: "hello", id: "lv3002" },
                { name: "wat", id: "lv3003" },
                {
                  name: "child folder",
                  id: "lv3004",
                  children: [
                    {
                      name: "hello",
                      id: "lv4003",
                      children: [
                        { name: "hello", id: "lv5001" },
                        { name: "wat", id: "lv5002" },
                      ],
                    },
                    { name: "wat", id: "lv4004" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleTreeView() {
      this.showTreeView = !this.showTreeView;
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.container {
  width: 230px;
  border: 1px solid #e4e4e4;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__icon_down {
      width: 10px;
      height: 8px;
      padding: 2px;
      clip-path: polygon(0 24%, 0 45%, 51% 100%, 100% 44%, 100% 25%, 51% 79%);
      background: rgb(74, 74, 74);
      cursor: pointer;
    }
    &__content {
      font-size: 13px;
    }
  }
  .tree {
    max-height: 250px;
    overflow-x: auto;
    li {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
