<template>
  <nav>
    <form class="d-flex" @submit="submitForm">
      <input placeholder="VILLE" v-on:keyup="barre()" v-model="input"  class="form-control me-2" style="border-color: #40b983;" type="search" aria-label="Search">
      <button v-on:click="sea()" class="btn btn-outline-success" type="submit" style="white-space: nowrap;border-color: #40b983;color: #35495e;">{{ place }}</button>
    </form>

    <br>

    <router-link v-for='u in this.u' :key="u" :to="u[0]" >
      <span v-if="preplace!=u[0]">     /{{ u[0] }}</span>
      <span style="text-decoration:underline;color:#3fba83;" v-else>    /{{ u[0] }}</span>
    </router-link>
    <!-- <router-link to="/about">About</router-link> -->

    <br>

    <!-- <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Button with data-bs-target
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div> -->
  </nav>
  <router-view/>
</template>

<script>

export default {
  data(){
    return{
      u:{},
      input:this.input,
      place:"Resultats",
      preplace:"",
    }
  },
  mounted(){
    this.final();
  },
  methods:{
    sea(){
      // this.$router.push('../');
      if (this.place!="Resultats") {
        // if (this.input==="Resultats") {

          this.$router.push('/' + this.place);
          this.place="Resultats";
          this.input="";
        // }
        // console.log(window.location.href);
      }else{
        this.place="Resultats";
      }
    },
    submitForm(event) {
      event.preventDefault(); // Empêche le rechargement de la page
    },
    barre(){
      // if(this.osef){
      //   console.log("||"+this.osef);
      //   console.log("//"+this.input.substr(this.osef,this.input.length))
      // }
      if (this.input.length<3) {
        this.place="Resultats";
        return;

      }
      // console.log(this.input);

      let url="https://api-adresse.data.gouv.fr/search/?q="+this.input+"&limit=1";
      fetch(url,{
        method: "GET",
      })
      .then(response=>response.json())
      .then(reponse=>{
        console.log(reponse.features[0].properties.city);
        this.place=reponse.features[0].properties.city;
        // this.osef=lol.length;
        // console.log(lol.substr(this.input.length));
      })
    },
    final(){
      this.preplace=window.location.href.split("/")[3];
    },
  },
  watch:{
    "$store.state.url": {
      deep: true,
      handler(val) {
        // this.u=[];
        // console.log(val)
        val.forEach((element,key) => {
          this.u[key]=[]
          this.u[key][0]=decodeURI(element);
          // this.u[key][1]="/#"+decodeURI(element);
        });
        // this.u.url="/#"+val;
        console.log(this.u)
        this.final();
      }
    }
  }
}

</script>


<style>
a{
  text-decoration: none;
}










#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
