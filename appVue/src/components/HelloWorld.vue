<template>
  <div class="hello" style="color:#35495e;">
    <h1><a>#{{ commune.nom }}</a></h1>

    <br>

    <div class="spinner-border text-success" role="status" id="ani" style="display:none;">
      <!-- <span class="sr-only">chargement</span> -->
    </div>

    <div v-for="(yo,keys) in prise" :key="yo" >
      <div v-if="yo.lib_taf!=='undefined'" class="card" style="max-width: 400px;display: inline-block;background-color: #40b9834d;margin:1em;">
        <div class="card-body" v-on:click="f(keys)">
          <h5 class="card-title">{{ yo.lib_taf }}</h5>
          <p class="card-text">{{ yo.nom_complet }}</p>
          <p class="card-text"><small class="text-muted">{{ yo.matching_etablissements[0].adresse }}</small></p>
        </div>

        <div :id=keys style="display:none;margin:1em;">
          <div class="card text-center" >
            <div class="card-body">
              Salle {{ yo.salleNameId }} de {{ commune.nom }}
              <i class="fas fa-plus-square"></i>
            </div>
          </div>

          <div :v-if="yo.info" v-for="yo2 in yo.info"  :key="yo2" class="card text-center" style="margin:5px;" >
            <div class="card-header">
              {{yo2.usernom}}
            </div>
            
            <div class="card-body">
              <p class="card-text"> {{yo2.text}}</p>
            </div>
          </div>

          <div class="card text-center" >
            <div class="card-body">
              <form @submit="submitForm">
                <input type="text" v-model="rep.user" class="form-control" placeholder="pseudo"/>
                <input type="text"  v-model="rep.rep" class="form-control" placeholder="message"/>
                <input style="margin-top: 10px;" class="btn btn-dark" type="submit" v-on:click="poster(rep.user,rep.rep,keys)"/>
                <!-- <svg type="submit" v-on:click="poster(rep.user,rep.rep,keys)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
    
    <br>
  </div>
</template>

<script type="module">
// import { type } from 'os';
// import axios from "axios"
// import { getAll } from 'tiny-cookie';
import Cookies from 'js-cookie'

export default {
  name: 'HelloWorld',
  // props: {
  //   ville: {
  //     type: String,
  //   }
  // },
  // props: {
  //   msg: String
  // },
  data(){
    return{
      // ref:"no",
      commune:{},
      long:"",
      lat:"",
      prise:{},
      fora:{},
      rep:{},
      gu:"https://api.alternativeadapt.com",

    }
  },
  watch:{
    "$route": {
      deep: true,
      handler() {
        // this.commune=this.ville;
        this.gogo();
      }
    }
  },
  async mounted(){
    this.gogo();
  },
  methods:{
    submitForm(event) {
      event.preventDefault(); // Empêche le rechargement de la page
    },
    gogo(){

      console.log("launch on the sworl");
      console.log(this.prise);
      console.log(Cookies.get());

      // document.cookie="";
      // Cookies.set("name2", "value2")
      
      // console.log(document.cookie);







      if (this.getSave()) {
        console.log("on recupe du cookie")
        // console.log(this.prise);

        let u=window.location.href;
        let tabU=u.split("/");
        this.commune.nom=decodeURI(tabU[3]);
        // this.getForum();
      }else{
        console.log("on recupe du fetch")
        // console.log(this.getSave());
        // console.log(Cookies.get());
        this.load(true);
        this.start();
      }
      console.log(this.prise);


      this.sw();

    },





    sw(){
      if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage({
        type: 'updateCache',
        url: window.location.href
      });
    });
  }
    },




    start(){
      let u=window.location.href;
      let tabU=u.split("/");  
      if (tabU[3]!=="") {
        let url="https://api-adresse.data.gouv.fr/search/?q="+decodeURI(tabU[3]);
        this.commune.nom=decodeURI(tabU[3]);

        fetch(url,{
          method: "GET",
        })
        .then(response=>response.json())
        .then(response => {
          // console.log(response.features[0].geometry.coordinates);
          this.long=response.features[0].geometry.coordinates[0];
          this.lat=response.features[0].geometry.coordinates[1];
          let url="https://geo.api.gouv.fr/communes?lon="+this.long+"&lat="+this.lat;

          this.bonjour(url);
        })
      }else{
        navigator.geolocation.getCurrentPosition((position) => {
          let url="https://geo.api.gouv.fr/communes?lon="+position.coords.longitude+"&lat="+position.coords.latitude;
          this.long=position.coords.longitude;
          this.lat=position.coords.latitude;
          this.bonjour(url);
        });
      }
    },


    async bonjour(url){
      console.log("!!!!!");
      console.log(url);
      await fetch(url,{
      }).then(response => response.json())
      .then(response=>{
        
        // console.log(response);
        this.commune=response[0];

        let u=window.location.href;
        let tabU=u.split("/");
        if (!tabU[3]) {
          window.location.href=this.commune.nom;
        }
  
        this.bonjour2boite();
      })
    },
    async bonjour2boite(){
      console.log(this.commune);
      //https://recherche-entreprises.api.gouv.fr/search?categorie_entreprise=PME&code_postal=68000&departement=68&est_organisme_formation=true&section_activite_principale=J&page=1&per_page=25
      await fetch("https://recherche-entreprises.api.gouv.fr/search?code_postal="+this.commune.codesPostaux+"&est_organisme_formation=true&section_activite_principale=J&etat_administratif=A&limite_matching_etablissements=1&page=1&per_page=25",{
          method: "GET",
      })
      .then(response=>response.json())
      .then(response => {
        // console.log(response),
        this.prise=response.results,
        this.bonjour3trad()
        
      })
    },
    async bonjour3trad(){
      // console.log(this.prise);
      await this.prise.forEach((element, index, object) => {
        fetch("https://api.insee.fr/metadonnees/V1/codes/nafr2/sousClasse/"+element.matching_etablissements[0].activite_principale,{
          method: "GET",
          headers:{
            "Accept": "application/json",
            Authorization:'Bearer '+'2c32c9b2-2159-3dab-b761-b11314415124',
          },
        })
        .then(response=>response.json())
        .then(response => {
          // console.log(index +" kkk0 "+ response.intitule);

          element.lib_taf="";
          if ( typeof response.intitule==="undefined" | response.intitule==="undefined" ) {
          // console.log(index +" kkk1 "+ response.intitule);
          object.splice(index, 1);
          // console.log(this.prise[key].getOwnPropertyNames("lib_taf"));
          
          }else{
            element.lib_taf=response.intitule;
            // if (element.lib_ta==undefined) {
            //   object.splice(index, 1);

            // }
          }
        
        // console.log(index +"  =  "+element.lib_taf+"   =   "+response.intitule);
        }).catch(()=>{
          // console.log(index+" kkk2  ");
          element.lib_taf='undefined';
          // object.splice(index+1, 1);
          object = object.slice(0, index+1).concat(object.slice(index + 1));
          // console.log(element);
          // console.log(object);

          // console.log(this.prise);
                    // console.log(this.prise[key].getOwnPropertyNames("lib_taf")) ;
        })
        .then(()=>{
          if (index==object.length-1) {

            this.load(false);
             this.getForum();
          }
        })
      })
    },

    async getForum(){
      let a=this.gu+"/api/salles?populate=forums.forumuser";
      


      // console.log(this.prise);:
      
      try {
        this.prise.forEach(element => {
          if(element.lib_taf!=='undefined'){
            a+="&filters[salleName][$eq]="+String(element.lib_taf).replace(/\s/g,'')+String(this.commune.nom).replace(/\s/g,'');
          }
        });
      }
      catch (error) {
        // console.log(error+" and made by gu ^^");
        // let b=this.prise;
        
        for (let i = 0; i < 10; i++) {
          
          try{
            // console.log(this.prise[i].lib_taf);
            if(this.prise[i].lib_taf!=='undefined'){
              a+="&filters[salleName][$eq]="+String(this.prise[i].lib_taf).replace(/\s/g,'')+String(this.commune.nom).replace(/\s/g,'');
            }
          }
          catch(error){
            // console.log("fuuuukcu: " +error);
          }
        }
      }

      console.log(a);
      
      // console.log(a);
      await fetch(a,{
        method: "GET",
        headers:{
          "Accept": "application/json",
          // Authorization:'Bearer '+'2c32c9b2-2159-3dab-b761-b11314415124',
        },
      })
      .then(response=>response.json())
      .then(response=>{
        // console.log(response)

        for (let ii = 0; ii < 10; ii++) {
          if (this.prise[ii]) {
            // console.log("uno");
            for (let xx = 0; xx < response.data.length; xx++) {
              // console.log(String(this.prise[ii].lib_taf).replace(/\s/g,'')+"  !!  "+response.data[xx].attributes.salleName);
              // console.log("dos");
              
              console.log(this.prise[ii].salleName);
              if(!this.prise[ii].salleName || this.prise[ii].salleName == null){
                this.prise[ii].salleName=String(this.prise[ii].lib_taf).replace(/\s/g,'')+String(this.commune.nom).replace(/\s/g,'');
              }
              // console.log(this.prise[ii].salleName+"  ===   "+String(response.data[xx].attributes.salleName).replace(/\s/g,''));

              if(this.prise[ii].salleName===String(response.data[xx].attributes.salleName).replace(/\s/g,'')){


                this.prise[ii].salleName=response.data[xx].attributes.salleName;
                this.prise[ii].salleNameId=response.data[xx].id;

                // console.log("dosdos");
                // console.log(response.data[xx]);
                for (let xx2 = 0; xx2 < response.data[xx].attributes.forums.data.length; xx2++) {
                  // console.log("tres");
                  if (!this.prise[ii].info) {
                    this.prise[ii].info=[];
                  }
                  if (!this.prise[ii].info[xx2]) {
                    this.prise[ii].info[xx2]={};
                  }
                  

                  this.prise[ii].info[xx2].text=response.data[xx].attributes.forums.data[xx2].attributes.text;
                  this.prise[ii].info[xx2].textId=response.data[xx].attributes.forums.data[xx2].id;

                  this.prise[ii].info[xx2].usernom=response.data[xx].attributes.forums.data[xx2].attributes.forumuser.data.attributes.usernom;
                  this.prise[ii].info[xx2].usernomId=response.data[xx].attributes.forums.data[xx2].attributes.forumuser.data.id;

                  // console.log("!!!!!!!!!!!!!! : "+xx2);
                }
              }
            } 
          }
        }

        console.log(this.prise);
        // this.fora=info;
        

      })
      .then(()=>{
        this.save();
      })

      
      
    },











    async poster(user,rep,keys){
      if (rep.length<2|user.length<2) {
        console.log("ecrit plus boi");
        return;
      }



      let data2;
      let u;
      if (this.prise[keys].lib_taf) {
        u=String(this.prise[keys].lib_taf).replace(/\s/g,'')+String(this.commune.nom).replace(/\s/g,'');
        await fetch(
          this.gu+'/api/salles/'+this.prise[keys].salleNameId, {
            method: 'GET'
        })
        .then(response=>response.json())
        .then(response=>{
          console.log(response);
          data2=response.data.id;
        })
        .catch (()=> {
          fetch(this.gu+'/api/salles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
              "data":{
                "salleName":u
              }
            })
          })
          .then(response=>response.json())
          .then((response)=>{
            console.log(response);
            data2=response.data.id;
          })
        })
      }




      // +



      let idlol;
      let l=true;
      if (this.prise[keys].info) {
        this.prise[keys].info.forEach(element => {
          if (element.usernom==user) {
            idlol=element.usernomId;
            l=false;
          }
        });
      }

      let data3;
      if (l) {
        data3 = {"data":{
          "usernom":user,
    
        }}
        await fetch(this.gu+'/api/forumusers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data3)
        })
        .then(response=>response.json())
        .then(response=>{
          data3 = response;
          // console.log(data3);
        })
        .catch ((err)=> {
          console.error(err);
        })
      }else{
        data3 = {"data":{
          "id":idlol,
        }}
      }




      // =





      let data = {"data":{
        "text":rep,
        "forumuser":data3.data.id,
        "salle":data2
      }}

      await fetch(this.gu+'/api/forums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response)=>{
        const createdData = response.json();
        console.log(createdData);
        this.getForum();
        // location.reload();
        this.rep.rep="";
      })
      .catch ((err)=> {
        console.error(err);
      })
    },


    // =============================


    save(){
      // writeCookie("url",window.location.href,61);
      // let info=this.commune.nom+"§§"+this.prise.libtaf+"§§"+this.prise.nom_complet+"§§"+this.prise.matching_etablissements[0].adresse;
      
      let lol=[];
      let yop=this.prise;
      // console.log(yop);
      for (let i = 0; i < yop.length; i++) {
        // console.log(yop[i]);
        lol[i]=[];
        lol[i][0]=String(yop[i].lib_taf);
        lol[i][1]=yop[i].nom_complet;
        lol[i][2]=yop[i].matching_etablissements[0].adresse;

        lol[i][3]=yop[i].salleName;
        lol[i][4]=yop[i].salleNameId;

        // console.log(yop);
        if (yop[i].info) {
          for (let ii = 0; ii < yop[i].info.length; ii++) {
            if (!lol[i][5]) {
              lol[i][5]=[];
            }
            lol[i][5][ii]=[]

            lol[i][5][ii][0]=yop[i].info[ii].text;
            lol[i][5][ii][1]=yop[i].info[ii].textId;

            lol[i][5][ii][2]=yop[i].info[ii].usernom;
            lol[i][5][ii][3]=yop[i].info[ii].usernomId;
          }
        }
      }
      

     


      
      console.log(lol);
      let info=JSON.stringify(lol);

      // let u=window.location.href;
      // let tabU=u.split("/");  

      this.writeCookie(this.commune.nom,info);
      // location.reload();

    },
    getSave(){
      console.log(window.location.href);
      let u=window.location.href;
      let tabU=u.split("/");

      let prise=this.readCookie(decodeURI(tabU[3]));
      console.log(prise);

      if(prise!==undefined && prise!=="[]"){
        let array=JSON.parse(prise);
        // console.log(array);

        // let array2={};
        // array.forEach((element) => {
        //   console.log(element);
        //   // array2[key]={};
        //   this.prise.lib_taf=String(element[0]);
        //   this.prise.nom_complet=element[1];
        //   this.prise.matching_etablissements[0].adresse=element[2];
        // });
        for (let j = 0; j < array.length; j++) {
          this.prise[j]={};
          
          this.prise[j].lib_taf=String(array[j][0]);

          this.prise[j].nom_complet=array[j][1];

          this.prise[j].matching_etablissements=[];
          this.prise[j].matching_etablissements[0]={};
          this.prise[j].matching_etablissements[0].adresse=array[j][2];

          this.prise[j].salleName=array[j][3];
          this.prise[j].salleNameId=array[j][4];

          console.log(array[j][5]);
          if (array[j][5]) {
            for (let ii = 0; ii < array[j][5].length; ii++) {
              if (!this.prise[j].info) {
                this.prise[j].info=[];
              }
              this.prise[j].info[ii]={};

              this.prise[j].info[ii].text=array[j][5][ii][0];
              this.prise[j].info[ii].textId=array[j][5][ii][1];

              this.prise[j].info[ii].usernom=array[j][5][ii][2];
              this.prise[j].info[ii].usernomId=array[j][5][ii][3];
            }
          }
        }
        console.log(this.prise);
      //  this.prise.forEach((element,index,object) => {
      //   if(element.lib_taf | element.lib_taf.includes(undefined)){
      //       object.splice(index,1);
      //     }
      //  });
        return true;
      }else{
        return false;
      }
    },

    writeCookie(name,value) {
      // console.log(name+" <br> "+value)
      // document.cookie="lol=lool";
      // let str=name+"="+value;
      // document.cookie=str;
      name=decodeURI(name);
      Cookies.remove(name);
      Cookies.set(name, value);
      // console.log(Cookies.get(name));


      // let u=window.location.href.split("#")[2];
      // this.$store.state.url=u;
      // console.log(Cookies.get())
      this.majCoo();
    },
    readCookie(name) {
      
      this.majCoo();
      return Cookies.get(name)
    },

    majCoo(){
      let coo=Cookies.get();
      // console.log(coo);
      coo = Object.keys(coo).map(function(cle) {
          return [(cle), coo[cle]];
      });
      // console.log(coo);

      let tab=[];
      let i=0;
      coo.forEach((element)=> {
        // console.log(element[0]);
        tab[i]=element[0];
        i++;
      });

      // console.log(coo);
      this.$store.state.url=tab;
    },







    f(keysid){
      let div=document.getElementById(String(keysid));
      // console.log(div.style);

      if (div.style.display=="none") {
        div.style.display=" inline-block"
      }else{
        div.style.display="none";
      }
    },
    // f2(keysid){
    //   let div=document.getElementById(String(keysid));
    //   div.style.display=" inline-block"
    // },
    load(trulse){
      let ani=document.getElementById("ani");
      // console.log(div.style);

      if (trulse) {
        ani.style.display="inline-block"
      }else if(!trulse){
        ani.style.display="none";
      }else{
        ani.style.display="none";
      }
    }
      
      
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
