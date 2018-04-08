<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
        <h1 class="title">
          We're always happy to help
        </h1>
        <h2 class="subtitle">
          If you have any questions or complaints, don't hesitate to let us know. We take our service to you very seriously
        </h2>
        </div>
      </div>
      <transition name="fade">
        <b-field label="Message" style="max-width: 800px">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
      </transition>
    </section>
    </div>
</template>

<script>
export default {
  name: "CreditCards",
  data: function() {
    return {
      credit_card_data: ["", ""],
      columns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "annualFee",
          label: "Annual Fee",
          numeric: true
        },
        {
          field: "introApr",
          label: "Intro APR",
          numeric: true
        },
        {
          field: "regularApr",
          label: "Regular APR"
        },
        {
          field: "rewardRate",
          label: "Reward Rate"
        },
        {
          field: "rewardBonus",
          label: "Reward Bonus"
        },
        {
          field: "lateFee",
          label: "Late Fee"
        },
        {
          field: "creditHistory",
          label: "Credit History"
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      try {
        const rawData = await fetch(
          "http://localhost:8090/api/getCreditCards"
        ).then(response => response.json());

        this.credit_card_data = rawData;

        rawData.map(row => {
          row.annualFee = `\$${row.annualFee.toFixed(2)}`;
          row.introApr = `${row.introApr}% for ${row.monthsOfIntro} months`;
          row.rewardRate = `${(row.rewardRateMin * 10).toFixed(2)}% - ${(
            row.rewardRateMax * 10
          ).toFixed(2)}%`;
          row.regularApr = `${(row.regularAprMin * 10).toFixed(2)}% - ${(
            row.regularAprMax * 10
          ).toFixed(2)}%`;
          row.rewardBonus = `\$${row.rewardBonus.toFixed(2)}`;
          row.lateFee = `\$${row.lateFee.toFixed(2)}`;
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.hero-content {
  width: 100%;
  max-width: 1200px;
}
</style>