<template>
  <div id="app">
    <div class="container">
      <div class="select">
        <div class="content_select">
          <span>choose</span>
        </div>
        <div class="icon_down">
        </div>
      </div>
      <TreeItem v-for="item in treeData" :key="item.id" :data="item" :level="1" />
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
      currentItem: null,
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
    setSelectedID(id) {
      this.selectedID = id;
    },
    onSelect: function (uuid) {
      if (this.currentItem === uuid) {
        this.currentItem = null;
      } else {
        this.currentItem = uuid;
      }
      console.log(this.currentItem);
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
.container {
  width: 300px;
  border: 1px solid #e4e4e4;
  padding: 10px;
  border-radius: 4px;
}
.select {
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.icon_down {
  width: 10px;
  height: 10px;
  background: #000;
}
</style>
