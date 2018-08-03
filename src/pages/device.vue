<template>
  <f7-page :page-content="false" color-theme="orange">
    <f7-navbar :title="selectedDeviceName" back-link="Back"></f7-navbar>
    <f7-toolbar tabbar labels bottom-md>
      <f7-link tab-link="#tab-1" tab-link-active text="Temperature" icon-fa="thermometer-half" icon-size="26"></f7-link>
      <f7-link tab-link="#tab-2"  text="Settings" icon-fa="cogs" icon-size="26"></f7-link>
    </f7-toolbar>
    <f7-tabs swipeable>
      <f7-tab id="tab-1"  class="page-content hide-bars-on-scroll" tab-active>
        <f7-block>
          <f7-card v-if="tempData">
            <f7-card-header>Temperature Data</f7-card-header>
            <f7-card-content><line-chart :data="tempData" :colors="['#c0392b']"></line-chart></f7-card-content>
          </f7-card>

        </f7-block>
      </f7-tab>
      
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <f7-block-title>Settings</f7-block-title>
          <f7-card>
            <f7-card-header>Device Description</f7-card-header>
            <f7-card-content>
              <f7-list inline-labels no-hairlines-md>
                <f7-list-item>
                  <f7-label>Name</f7-label>
                  <f7-input type="text" placeholder="Device name" v-model="selectedDeviceName" clear-button></f7-input>
                </f7-list-item>

                <f7-list-item>
                  <f7-label>Description</f7-label>
                  <f7-input type="text" placeholder="Device Description" v-model="description" clear-button></f7-input>
                </f7-list-item>

              </f7-list>
            </f7-card-content>
            <f7-card-footer><f7-button fill raised @click="submitInput">Submit</f7-button></f7-card-footer>

            <p v-if="success">{{ success }}</p>

            
          </f7-card>
            
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
let moment = require('moment');

export default {
  data() {
    return {
      nameInput: '',
      descriptionInput: '',
      success: ''
    }
  },
  computed: {
    selectedDeviceName: {
      get () {
        if (!this.$store.state.selected_device) {
          return "Loading device.."
        }
        this.nameInput = this.$store.state.selected_device.name;
        return this.$store.state.selected_device.name;
      },
      set (e) {
        this.nameInput = e.target.value;
      }
    },
    tempData() {
      let result = [];
      this.$store.state.latestTemperatures.map(a => result.push([moment(a.date_added).toDate(), parseFloat(a['value'])]))
      return result;
    },
    description: {
      get () {
        if (!this.$store.state.selected_device) {
          return "Loading device.."
        }
        this.descriptionInput = this.$store.state.selected_device.description
        return this.$store.state.selected_device.description
      },
      set (e) {
        this.descriptionInput = e.target.value;
      }
    }
  },
  // components: {
  //   LineChart
  // },
  async beforeCreate() {
    try {
      await this.$store.dispatch('initDevices')
      await this.$store.dispatch('selectDevice', this.$store.state.devices.find((obj) => { return obj.id == this.$f7route.params.id}));
      await this.$store.dispatch('fetchLatestTemperatures')
    }
    catch(e) {
      console.log(e)
    }
  },
  created() {
    const vm = this;
    setInterval(function() {
      vm.$store.dispatch('fetchLatestTemperatures')
    }, 5000)
  },
  methods: {
    async submitInput() {
      if (this.nameInput == '' || this.descriptionInput == '') {
        console.log("Error")
      }
      else {
        await this.$store.dispatch('updateDevice', {
          name: this.nameInput,
          description: this.descriptionInput
        })
        this.success = "Berhasil mengupdate device"
      }
    }
  }
}
</script>