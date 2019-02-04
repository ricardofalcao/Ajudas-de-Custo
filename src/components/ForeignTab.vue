<template>
    <div class="foreign-tab">
        <trip 
        v-model="dates"
        v-bind:format="dateFormat"></trip>
        
        <div class="stats">
            <h3>Estrangeiro</h3>
            <p>Número de dias: {{ this.getDays }} <i>({{(this.getDays * this.$config.foreignPrice).toFixed(2)}}€)</i></p>
            <p>Subs. de refeição retirados: {{ this.getWorkdays }} <i>(-{{(this.getWorkdays * this.$config.mealPrice).toFixed(2)}}€)</i></p>
            <p>Ajudas de custo: 
                <strong>{{ (this.getDays * this.$config.foreignPrice - this.getWorkdays * this.$config.mealPrice).toFixed(2) }}€</strong>    
            </p>
        </div>
    </div>
</template>

<script>
import Trip from './Trip.vue'
import utils from '../utils/DateUtils.js'

export default {
  name: 'foreign-tab',
  props: {
  },
  data: function() {
    return {
      dateFormat: "DD-MM-YYYY",
      dates: {
          leaveDate: new Date(),
          returnDate: new Date()
      }
    }
  },
  created: function() {
      this.dates.leaveDate.setMilliseconds(0);
      this.dates.leaveDate.setSeconds(0);
      this.dates.returnDate.setMilliseconds(0);
      this.dates.returnDate.setSeconds(0);
  },
  computed: {
      getLeaveDate: function() {
          return this.dates.leaveDate;
      },
      getReturnDate: function() {
          let returnDate = this.dates.returnDate;

          if(returnDate.getTime() < this.dates.leaveDate.getTime()) {
              return new Date(this.dates.leaveDate);
          }

          return returnDate;
      },
      getDays: function() {
          return utils.calculateDays(this.getLeaveDate, this.getReturnDate);
      },
      getWorkdays: function() {
          return utils.calculateWorkdays(this.getLeaveDate, this.getReturnDate);
      }
  },
  components: {
      Trip
  }
}
</script>

<style lang="scss">
.foreign-tab {
    display: flex;
    flex-wrap: wrap;

    .stats {
        border: 1px solid black;
        padding: 2rem;
    }

    .trip {
        margin-right: 4rem;

        &-date {
            display: block;
            margin: 2rem 0;
        }
    }
}
</style>