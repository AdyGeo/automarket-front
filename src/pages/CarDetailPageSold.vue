<template>
  <q-page v-if="auto" padding>

    <div class="row">
    
      <q-responsive class="col-12 col-md-6" :ratio="16/9">
        <q-carousel 
        swipeable
        animated
        arrows
        control-type="unelevated"
        control-color="grey-8"
        v-model="slide"
        v-model:fullscreen="fullscreen"
        infinite
      >
      <q-carousel-slide v-for="[index,foto] in auto.imagine_auto.entries()" :key="foto.id" class="column no-wrap flex-center" :name="(index+1)">
          <q-img fit="contain" no-spinner :src="foto.foto">
            <div v-if="auto.vandut" class="absolute-full text-h6 flex flex-center">
            VANDUT
            </div>
            <div class="text-caption q-pa-xs">{{(index+1)}}/{{auto.imagine_auto.length}}</div>
          </q-img>
        </q-carousel-slide>
        <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push dense round color="grey-8" text-color="white"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
        </q-carousel>
      </q-responsive>
    

      <q-card class="my-card col-12 col-md-6">

        <q-card-section>
          <div class="items-center text-subtitle1">
            {{auto.titlu}}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{auto.an_fabricatie}}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.km}}&nbsp;km&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.combustibil.toLowerCase()}}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.capacitate_cilindrica}}&nbsp;cm3
          </div>
          <div class="text-h6 text-orange-10" v-bind:class="{'text-strike': auto.vandut}">
            {{auto.pret_euro}}&nbsp;EUR
          </div>
        </q-card-section>
        <q-card-section class="row">
          <p v-if="auto.marca" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Marca:</span>{{auto.marca}}</p>
          <p v-if="auto.model" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Model:</span>{{auto.model}}</p>
          <p v-if="auto.versiune" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Versiune:</span>{{auto.versiune}}</p>
          <p v-if="auto.an_fabricatie" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Anul:</span>{{auto.an_fabricatie}}</p>
          <p v-if="auto.km" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Km:</span>{{auto.km}} km</p>
          <p v-if="auto.combustibil" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Combustibil:</span>{{auto.combustibil.toLowerCase()}}</p>
          <p v-if="auto.putere" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Putere:</span>{{auto.putere}} CP</p>
          <p v-if="auto.capacitate_cilindrica" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Capacitate cilindrica:</span>{{auto.capacitate_cilindrica}} cm3</p>
          <p v-if="auto.transmisie" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Transmisie:</span>{{auto.transmisie}}</p>
          <p v-if="auto.norma_de_poluare" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Norma de poluare:</span>{{auto.norma_de_poluare}}</p>
          <p v-if="auto.cutie_de_viteza" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Cutie de viteze:</span>{{auto.cutie_de_viteza}}</p>
          <p v-if="auto.caroserie" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Tip Caroserie:</span>{{auto.caroserie}}</p>
          <p v-if="auto.numar_portiere" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Numar de portiere:</span>{{auto.numar_portiere}}</p>
          <p v-if="auto.culoare" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Culoare:</span>{{auto.culoare}}</p>
          <p v-if="auto.optiuni_culoare" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Optiuni culoare:</span>{{auto.optiuni_culoare}}</p>
          <p v-if="auto.consum_urban" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Consum Urban:</span>{{auto.consum_urban}}</p>
          <p v-if="auto.stare" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">Stare:</span>{{auto.stare}}</p>
          <p v-if="auto.VIN" class="col-sm-6 col-12"><span class="text-subtitle2 q-pr-sm">VIN:</span>{{auto.VIN}}</p>
        </q-card-section>
      </q-card>
    </div>
    <q-card v-if="auto.review_post_vanzare && auto.vandut" class="my-card col-12 col-md-6 q-mt-md">
      <q-card-section class="text-h6">Recenzie</q-card-section>
      <q-card-section> 
      <div style="white-space: pre-wrap;">{{auto.review_post_vanzare}}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card col-12 col-md-6 q-mt-md">
      <q-card-section class="text-h6">Dotari</q-card-section>
      <q-card-section> 
      <div v-for="[categ,dotari] in Object.entries(categoriiDotari)" :key="categ" class="row text-subtitle2 q-mt-sm">{{categ}}
        <div class="col-12 q-pt-md"></div>
        <p v-for="dot in dotari" :key="dot" class="col-sm-6 col-12 text-body2"><q-icon name="o_check_circle" size="xs" color="primary" />{{dot}}</p>
      </div>
      </q-card-section>
    </q-card>
  </q-page>
  
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {

    name: 'CarDetailPage',
    preFetch({store, currentRoute}){
      const url= `https://auto-pitesti.ro/app/api/auto-all/${currentRoute.params.slug}/`;
      return store.dispatch('fetchCarDetails', url)
    },
    setup () {
      const $store = useStore()
      const router = useRouter()
      return {
        auto: ref($store.state.auto),
        slide: ref(1),
        fullscreen: ref(false),
        async fetchData() {
            const res = await fetch(`/app/api/auto-all/${this.$route.params.slug}/`);
            if(res.ok){
              //pass
            }
            else if(res.status == 404){
              router.push({name:'404Error'})
            }else{
              console.log(res.status);
            }
        },
      }
    },
    mounted() {
      this.fetchData();
    },
    computed: {
    categoriiDotari() {

      let categoriiUnice = {};
      this.auto.dotari.forEach(element => {
        if(element.categorie_dotari in categoriiUnice){
          categoriiUnice[element.categorie_dotari].push(element.denumire)
        }else{
          categoriiUnice[element.categorie_dotari]=[];
          categoriiUnice[element.categorie_dotari].push(element.denumire)
        }
      });
      return categoriiUnice
    }
  }
  }
</script>

