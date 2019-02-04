<template>
  <div id="app">
    <div class="menu">
      <button
      v-for="tab in tabs"
      v-bind:key="tab.name"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="currentTab = tab"
    >{{ tab.name }}</button>
    </div>

    <component
      v-bind:is="currentTabComponent"
      class="tab"
    ></component>


  </div>
</template>

<script>
import ForeignTab from './components/ForeignTab.vue'
import NationalTab from './components/NationalTab.vue'

export default {
  name: 'app',
  data: function() {
    return {
      tabs: [
        {
          name: "Nacional",
          component: "national-tab"
        },
        {
          name: "Estrangeiro",
          component: "foreign-tab"
        }
      ],
      currentTab: {}
    }
  },
  created: function() {
    this.currentTab = this.tabs[0];
  },
  computed: {
    currentTabComponent() {
      return this.currentTab.component;
    }
  },
  components: {
    ForeignTab,
    NationalTab
  }
}
</script>

<style lang="scss">
$primaryColor: #56928d !default;
$secondaryColor: #74c2bc;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 90%;
  max-width: 1200px;
  margin: 4rem auto;
}

.menu {
  margin: 1rem 0;
}

.tab-button {
  margin-right: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.2rem;
  box-shadow: 0 2px 4px solid rgba(0,0,0, .5);

  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0px 1px 1px rgba(0,0,0,.7);
  border: 0;
  background-color: $secondaryColor;
  transition: all 0.5s;
  
  &:hover, &.active {
    background-color: $primaryColor;
  }
}
</style>
