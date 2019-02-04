<template>
    <div class="trip">
        <label class="trip-date">
            <span>Partida:</span>
            <datepicker
                v-model="leaveDate"
                v-bind:format="format"
                v-bind:brother="returnDate"
                v-bind:pickTime="pickTime">
            </datepicker>
        </label>

        <label class="trip-date">
            <span>Chegada:</span>
            <datepicker
                v-model="returnDate"
                v-bind:format="format"
                v-bind:brother="leaveDate"
                v-bind:isDateDisabled="isBeforeLeave"
                v-bind:pickTime="pickTime">
            </datepicker>
      </label>
    </div>
</template>

<script>
import Datepicker from './Datepicker.vue'
import utils from '../utils/DateUtils.js'

export default {
  name: 'trip',
  props: {
      format: { type: String },
      value: { type: Object },
      pickTime: {type: Boolean, default: false}
  },
  methods: {
      isBeforeLeave(date) {
          return Math.floor(date.getTime() / utils.DAY) < Math.floor(this.leaveDate.getTime() / utils.DAY);
      }
  },
  computed: {
      leaveDate: {
          get: function() {
              return this.value.leaveDate;
          },
          set: function(newDate) {
              this.$emit('input', { 'leaveDate': newDate, 'returnDate': utils.maxDate(this.value.returnDate, newDate) })
          }
      },
      returnDate: {
          get: function() {
              return this.value.returnDate;
          },
          set: function(newDate) {
              this.$emit('input', { 'leaveDate': this.value.leaveDate, 'returnDate': utils.maxDate(this.value.leaveDate, newDate) })
          }
      }
  },
  components: {
      Datepicker
  }
}
</script>

<style lang="scss">
.trip-date {
    span {
        margin-right: 0.5rem;
    }
}
</style>
