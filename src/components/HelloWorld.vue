<template>
  <div>
    <section class="hero is-info is-fullheight has-bg-img">
      <div class="hero-body">
        <div class="container title-thing">
          <h1 class="title">
            Bank Easily
          </h1>
          <h2 class="subtitle">
            Focus on what you love
          </h2>
          <router-link class="button is-info" to="/join">
            Join Now
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .has-bg-img{
    background-image: url('../assets/coffe-table.jpeg');
    background-size:cover;
  }

  .photo-filter{
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .title-thing{
    margin-left: -64px
  }

</style>
