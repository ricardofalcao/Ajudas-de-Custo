<template>
    <div class="national-tab">
        <trip 
        v-model="dates"
        v-bind:format="dateFormat"
        v-bind:pickTime="true"></trip>

        <div class="stats">
            <h3>Nacional</h3>
            <div v-if="!isSameDay">
                <p>% AJC (dia de partida): {{ this.getLeaveTax }}% <i>({{this.getLeavePrice.toFixed(2)}}€)</i></p>
                <p>% AJC (dia de chegada): {{ this.getReturnTax }}% <i>({{this.getReturnPrice.toFixed(2)}}€)</i></p>
                
                <p>Número de dias completos: {{ this.getFullDays }} <i>({{this.getFullDaysPrice.toFixed(2)}}€)</i></p>
            </div>
            <div v-else>
                <p>% AJC: {{ this.getDailyTax }}% <i>({{this.getDailyPrice}}€)</i></p>
            </div>
            <p>Subs. de refeição retirados: {{ this.getEatdays }} <i>(-{{(this.getEatdays * this.$config.mealPrice).toFixed(2)}}€)</i></p>

            <p>Ajudas de custo: 
                <strong>{{ (this.getLeavePrice + this.getReturnPrice + this.getDailyPrice + this.getFullDaysPrice - this.getEatdays * this.$config.mealPrice).toFixed(2) }}€</strong>
            </p>
        </div>
    </div>
</template>

<script>
import Trip from './Trip.vue'
import utils from '../utils/DateUtils.js'

export default {
  name: 'national-tab',
  data: function() {
    return {
      dateFormat: "DD-MM-YYYY HHh",
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

      isSameDay: function() {
          return utils.isSameDay(this.getLeaveDate, this.getReturnDate);
      },

      getLeaveTax: function() {
          let hour = this.getLeaveDate.getHours();

          if(this.isSameDay) {
              return 0;
          }

          return hour < 13 ? 100 : hour <= 21 ? 75 : 50;
      },

      getLeavePrice: function() {
          return this.$config.nationalPrice[this.getLeaveTax + '%'] || 0;
      },

      getReturnTax: function() {
          let hour = this.getReturnDate.getHours();

          if(this.isSameDay) {
              return 0;
          }

          return hour < 13 ? 0 : hour <= 20 ? 25 : 50;
      },

      getReturnPrice: function() {
          return this.$config.nationalPrice[this.getReturnTax + '%'] || 0;
      },

      getDailyTax: function() {
          if(!this.isSameDay) {
              return 0;
          }

          let startHour = this.getLeaveDate.getHours();
          let endHour = this.getReturnDate.getHours();

          let amount = 0;
          if(startHour < 13 && endHour >= 13) {
              amount += 25;
          }

          if(startHour < 20 && endHour >= 20) {
              amount += 25;
          }
          
          return amount;
        },

      getDailyPrice: function() {
          return this.$config.nationalPrice[this.getDailyTax + '%'] || 0;
      },

      getFullDays: function() {
          let leaveDate = new Date(this.getLeaveDate);
          leaveDate.setDate(leaveDate.getDate() + 1);

          let returnDate = new Date(this.getReturnDate);
          returnDate.setDate(returnDate.getDate() - 1);
          return Math.max(utils.calculateDays(leaveDate, returnDate), 0);
      },

      getFullDaysPrice: function() {
          return this.$config.nationalPrice['100%']*this.getFullDays || 0;
      },

      getFullWorkDays: function() {
          let leaveDate = new Date(this.getLeaveDate);
          leaveDate.setDate(leaveDate.getDate() + 1);

          let returnDate = new Date(this.getReturnDate);
          returnDate.setDate(returnDate.getDate() - 1);
          return Math.max(utils.calculateWorkdays(leaveDate, returnDate), 0);
      },

      getEatdays: function() {
        let eatDays = 0;
        
        if(this.getLeaveDate.getHours() <= 13 && utils.isWorkday(this.getLeaveDate)) {
            if(!this.isSameDay || this.getReturnDate.getHours() >= 13) {
                eatDays++;
            }
        }

        if(!this.isSameDay) {
            if(this.getReturnDate.getHours() >= 13 && utils.isWorkday(this.getReturnDate)) {
                eatDays++;
            }

            eatDays += this.getFullWorkDays;
        }

        return eatDays;
      }
  },
  components: {
      Trip
  }
}
</script>

<style lang="scss">
.national-tab {
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