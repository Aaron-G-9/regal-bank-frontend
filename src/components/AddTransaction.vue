<template>
  <transition appear name="fade">
    <div class="container is-widescreen">
      <section>
        <h1 class="title">
          Transfer
        </h1/>
        <b-field class="input-div" label="Transfer From:">
            <b-select placeholder="Select an account" icon="account">
                <optgroup label="Checking Accounts">
                    <option value="flint">Totally Gold Checking</option>
                    <option value="silver">Premium Checking</option>
                </optgroup>

                <optgroup label="Savings Accounts">
                    <option value="heisenberg">Grizzly Saver</option>
                </optgroup>

                <optgroup label="Credit Cards">
                    <option value="jamie-lannister">Alpha</option>
                    <option value="tyrion-lannister">Foxtrot</option>
                </optgroup>

            </b-select>
        </b-field>
        
        <b-field class="input-div" label="Transfer To:">
            <b-select placeholder="Select an account" icon="account">
                <optgroup label="Checking Accounts">
                    <option value="flint">Totally Gold Checking</option>
                    <option value="silver">Premium Checking</option>
                </optgroup>

                <optgroup label="Savings Accounts">
                    <option value="heisenberg">Grizzly Saver</option>
                </optgroup>

                <optgroup label="Credit Cards">
                    <option value="jamie-lannister">Alpha</option>
                    <option value="tyrion-lannister">Foxtrot</option>
                </optgroup>

            </b-select>
        </b-field>

        <b-field class="input-div" label="Amount" >
          <b-input type="number" style="max-width: 250px;" v-model="income"></b-input>
        </b-field>

        <button class="button is-primary">Transfer</button>

      </section>
    </div>
  </transition>

</template>
<script>

</script>
<style scoped>
.input-div{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
