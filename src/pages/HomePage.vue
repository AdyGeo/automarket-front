<template>
  <q-page class="relative-position">
    <div class="flex flex-center">
      <div class="text-body1 text-justify q-py-md q-px-sm-xl q-px-md" v-if="currentPage==1">
        &emsp;Bine ați venit pe site-ul companiei noastre, dealer auto second-hand!<br>
        &emsp;Suntem dedicați să oferim clienților noștri servicii de top și cea mai bună selecție de vehicule. Inventarul nostru include o gamă largă de mărci și modele, de la opțiuni economice până la mărci de lux.<br>
        &emsp;Avem, de asemenea, o echipă de reprezentanți de vânzări cu experiență, care sunt gata să vă ajute în găsirea mașinii perfecte pentru nevoile și bugetul dumneavoastră.<br>
        &emsp;Pe lângă vânzări, oferim opțiuni de finanțare și un centru de service complet echipat pentru toate nevoile dvs. de întreținere și reparații auto. Vă mulțumim că ne considerați pentru nevoile dumneavoastră auto.<br>
        &emsp;Așteptăm cu nerăbdare să vă servim!
      </div>
    </div>
    <q-list class="flex flex-center">
      <q-card clickable @click="cardDetails(auto.slug)" v-ripple class="my-card q-ma-md cursor-pointer" style="width:350px;" v-for="auto in autovehicule.results" :key="auto.id">
        <q-img fit="cover" no-spinner height="230px" :src="(auto.imagine_auto.length > 0 ? auto.imagine_auto[0].foto : '')">
          <div v-if="auto.vandut" class="absolute-full text-h6 flex flex-center">
          VANDUT
          </div>
        </q-img>
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

      <q-separator />

      </q-card>
    </q-list>


  </q-page>
  
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        color="deep-orange"
        :max="maxPage"
        :max-pages="6"
        @update:model-value="val => updatePage(val)"
        boundary-links
      />
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'



export default {
  name: 'HomePage',
  preFetch({store, currentRoute}){
    const url= !currentRoute.query.page ? "https://auto-pitesti.ro/app/api/auto-de-vanzare/" : `https://auto-pitesti.ro/app/api/auto-de-vanzare/?page=${currentRoute.query.page}`;
    return store.dispatch('fetchCars', url)
  },
  setup(){
    const $store = useStore()
    const router = useRouter()
   
    return {
      
      autovehicule: ref($store.state.autovehicule),
      currentPage: ref($store.state.autovehicule.current_page_number),
      maxPage: ref($store.state.autovehicule.total_pages),
      cardDetails(slug){
        $store.dispatch('saveScrollPosition', {varName: router.currentRoute.value.fullPath, posY: window.scrollY});
        router.push({name:'CarDetailPage',params:{slug:slug}})
      },

      updatePage(page){
        router.push({name:'HomePage',query: {page:page}})
      },

      async fetchData(url="/app/api/auto-de-vanzare/") {
            if(this.$route.query.page){
              url += `?page=${this.$route.query.page}`
            }
            this.autovehicule = [];
            const res = await fetch(url);
            this.autovehicule = await res.json();
            this.maxPage = this.autovehicule.total_pages;
            this.currentPage = this.autovehicule.current_page_number;
      },
    }
  },
  mounted(){
    const $store = useStore()
    const router = useRouter()
    setTimeout(() => {
        window.scroll({
        top: $store.state[router.currentRoute.value.fullPath] || 0,
        left: 0
      })
      $store.dispatch('saveScrollPosition', {varName: router.currentRoute.value.fullPath, posY: 0});
    })
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    }
  }
}

</script>

