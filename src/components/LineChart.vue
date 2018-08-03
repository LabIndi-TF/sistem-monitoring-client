<!-- <script>
/* eslint-disable */
import { Line, mixins } from 'vue-chartjs'

export default {
	extends: Line,
	props: ['data'],
	mixins: [mixins.reactiveProp],
	data() {
		return {
	      options: {
	      	tooltips: {
	      		mode: 'x'
	      	},
	      	legend: {
	      	  display: true,
	      	  position: 'top',
	      	},
	      	scales: {
	      	  xAxes: [{
	      	    type: "time",
	      	    distribution: 'linear',
	      	    gridLines: {
	      	      display: false
	      	    }
	      	  }],
	      	  yAxes: [{
	      	    gridLines: {
	      	      display: true
	      	    },
	      	    scaleLabel: {
	      	      display: true,
	      	      labelString: "Temperature (Celcius)",
	      	      fontFamily: "Helvetica",
	      	      fontSize: 13    	    
	      	  	}
	      	  }]
	      	},
	      	responsive: true,
	      	maintainAspectRatio: false
	    	}
		}
	},
	mounted() {
		this.renderChart(this.data, this.options);
	}
}
</script> -->