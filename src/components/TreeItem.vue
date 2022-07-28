<template>
  <li>
    <div @click="toggle" class="name">
      <div class="level">{{ level }}</div>
      {{ data.name }}
    </div>
    <ul v-show="isOpen">
      <component-a
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
        :level="level + 1"
      />
    </ul>
  </li>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "component-a",
  components: {
    "component-a": this,
  },
  props: ["data", "level"],

  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.data.children && this.data.children.length;
    },
    lineColor() {
      return this.level <= 1 ? "none" : "red";
    },
    selectedID() {
      return this.getSelectedID();
    },
  },
  created() {},
  mounted() {
    if (this.selectedID == this.data.id) console.log(true);
  },
  methods: {  
    ...mapGetters(["getSelectedID"]),
    ...mapMutations(["SET_SELECTED_ID"]),
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        if (this.isOpen) this.SET_SELECTED_ID(this.data.id);
      } else {
        this.SET_SELECTED_ID(this.data.id);
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 8px;
}
ul li {
  padding: 0;
  padding-left: 10px;

  line-height: 1.5em;
  position: relative;
  border-left: 1px solid #acacac;
}
.name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  position: relative;
}
.name::before {
  position: absolute;
  content: "";
  left: -10px;
  width: 7px;
  height: 1px;
  background: v-bind(lineColor);
}
.level {
  height: 17px !important;
  width: 17px !important;
  /* padding: 20px; */
  background: rgb(41, 142, 209);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
}
</style>
>
