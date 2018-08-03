<template>
  <f7-page color-theme="orange">

    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Data Monitoring System</f7-nav-title>

    </f7-navbar>

    <f7-block-title>Connected Devices</f7-block-title>
    <f7-card>
      <f7-card-content :padding="false">
      <f7-list media-list inset>
            <f7-list-item v-for="device in devices" :key="device.id" :title="device.name" :subtitle="device.description" :link="device | toUrl">
              <img slot="media" :src="'static/img/device.jpg'" width="44" height="44" />
            </f7-list-item>
      </f7-list>
      </f7-card-content>
      <f7-card-footer><f7-button fill round color="orange">New Device</f7-button></f7-card-footer>
    </f7-card>
    <!-- 
    <f7-card>
      <f7-card-header>Temperature Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>

    <f7-card>
      <f7-card-header>Conductivity Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>

    <f7-card>
      <f7-card-header>Acidity Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>
    


    <f7-block-title>Latest Log</f7-block-title>

    <f7-list>
      <f7-list-group v-for="log in latestLogs" :key="log.id">
        <f7-list-item :title="displayTimeFormat(log.date)" group-title></f7-list-item>
        <f7-list-item  :title="log.temperature" :after="log.device" :link="`/device/${log.deviceId}/`">
          <span slot="after-title">&nbsp;&#8451;</span>
          <f7-icon fa="thermometer-half" size="64px" class="temperature" slot="media"></f7-icon>
        </f7-list-item>
        <f7-list-item :title="log.conductivity" :after="log.device" :link="`/device/${log.deviceId}/`">
          <span slot="after-title">&nbsp;&#181;S</span>
          <f7-icon fa="bolt" size="64px" class="conductivity" slot="media"></f7-icon>
        </f7-list-item>
        <f7-list-item :title="log.acidity" :after="log.device" :link="`/device/${log.deviceId}/`">
          <f7-icon fa="vial" size="64px" class="acidity" slot="media"></f7-icon>
        </f7-list-item>
      </f7-list-group>
    </f7-list> -->


  </f7-page>


</template>


<script>
import Service from '../service';
import LineChart from '@/components/LineChart'

let moment = require('moment');

export default {
  components: {LineChart},
  methods: {
    hourEarlier(hour) {
      return moment().subtract(hour * 1, 'hours').toDate();
    },
    displayTimeFormat: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  data() {
    return {
      latestLogs: [],
      chartData: {},
    };
  },
  created() {
    this.$store.dispatch('initDevices')
    this.latestLogs = Service.getLatestLogs(5);
    this.chartData = {
          labels: [this.hourEarlier(7), this.hourEarlier(6), this.hourEarlier(5), this.hourEarlier(4), this.hourEarlier(3), this.hourEarlier(2), this.hourEarlier(1)],
          datasets: [{
            label: "Device 1",
            data: [24.5, 25.3, 24.7, 24.9, 25.0, 25.1, 23.2],
            lineTension: 0.25,
            borderColor: '#55efc4',
            fill: false,
            backgroundColor: '#FFFFFF',
            pointBorderColor: '#00b894',
            pointBackgroundColor: 'rgba(85, 239, 196,0.3)',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: "Device 2",
            data: [24.0, 26.3, 24.7, 25.3, 25.1, 22.3, 21.3],
            lineTension: 0.25,
            borderColor: '#e74c3c',
            backgroundColor: '#FFFFFF',
            fill: false,
            pointBorderColor: '#0984e3',
            pointBackgroundColor: 'rgba(116, 185, 255,0.3)',
            pointRadius: 4,
            pointHoverRadius: 6,
          }]
        }
  },
  filters: {
    toUrl(device) {
      return `/device/${device.id}/`;
    },
  },
  computed: {
    devices() {
      return this.$store.state.devices;
    }
  }
}
</script>
<style>
.temperature {
  color: #e17055 !important;
}

.conductivity {
  color: #fdcb6e !important;
}

.acidity {
  color: #00b894 !important;
}
</style>